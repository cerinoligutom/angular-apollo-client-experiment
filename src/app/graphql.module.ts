import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {
  Mutation,
  MutationWriteCustomRandomNumberArgs,
  GetFromCacheDocument,
  GetFromCacheQuery,
  MutationAddToBolbetsListArgs,
  GetBolbetsDocument,
  GetBolbetsQuery,
  MutationRemoveFromBolbetsListArgs,
  MutationRandomizeUsernameArgs,
} from './generated/graphql';

const cache = new InMemoryCache();
cache.writeData({
  data: {
    customRandomNumber: 0,
    bolbets: [],
    latestBolbetUpdated: {},
  },
});

type GetCacheKeyFn = (args: Record<any, any>) => string;

type CustomResolver<R = any, A = Record<any, any>> = (
  rootValue: R,
  args: A,
  context: {
    [key: string]: any;
    // The apollo-angular docs mention this is of type DataProxy but that seems to only
    // be the case for "updates" after a mutation. It does have the same interface
    // with InMemoryCache so that's probably the case.
    // Either way, whatever cache you pass to the apollo factory method would most
    // likely be the type here.
    cache: InMemoryCache;
    getCacheKey: GetCacheKeyFn;
  }
) => any;

const writeCustomRandomNumber: CustomResolver<
  any,
  MutationWriteCustomRandomNumberArgs
> = (_, { input }, { cache }) => {
  const data = cache.readQuery<GetFromCacheQuery>({
    query: GetFromCacheDocument,
  });

  data.customRandomNumber = input;

  cache.writeQuery({
    query: GetFromCacheDocument,
    data,
  });

  // Returning something here ensures that the "update" option after a mutation
  // gets a result. Otherwise, it'd be a plain "data" object (e.g. { data: {} }).
  return input;
};

const addToBolbetsList: CustomResolver<any, MutationAddToBolbetsListArgs> = (
  _,
  { user },
  { cache, getCacheKey }
) => {
  console.log('getCacheKey', getCacheKey);
  const data = cache.readQuery<GetBolbetsQuery>({
    query: GetBolbetsDocument,
  });

  if (!data.bolbets.find((x) => x.id === user.id)) {
    data.bolbets.push(user);
  }

  cache.writeQuery({
    query: GetBolbetsDocument,
    data,
  });

  return true;
};

const removeFromBolbetsList: CustomResolver<
  any,
  MutationRemoveFromBolbetsListArgs
> = (_, { userId }, { cache }) => {
  const data = cache.readQuery<GetBolbetsQuery>({
    query: GetBolbetsDocument,
  });

  data.bolbets = data.bolbets.filter((x) => x.id !== userId);

  cache.writeQuery({
    query: GetBolbetsDocument,
    data,
  });

  return true;
};

const randomizeUsername: CustomResolver<any, MutationRandomizeUsernameArgs> = (
  _,
  { userId },
  { cache, getCacheKey }
) => {
  const data = cache.readQuery<GetBolbetsQuery>({
    query: GetBolbetsDocument,
  });

  const bolbet = data.bolbets.find((x) => x.id === userId);
  // Randomize
  bolbet.username = `${Math.random()}`;

  const cacheKey = getCacheKey(bolbet);
  console.log('cacheKey', cacheKey);

  cache.writeData({
    id: cacheKey,
    data: bolbet,
  });

  cache.writeQuery({
    query: GetBolbetsDocument,
    data,
  });

  return true;
};

/**
 * Relevant explanation:
 * https://www.apollographql.com/docs/angular/basics/local-state/#resolvers
 */
const resolvers: {
  Mutation: Partial<Record<keyof Mutation, CustomResolver>>;
} = {
  Mutation: {
    writeCustomRandomNumber,
    addToBolbetsList,
    removeFromBolbetsList,
    randomizeUsername,
  },
};

const uri = 'http://localhost:8080/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({ uri }),
    cache,
    // typeDefs,
    /**
     * Hitting resolvers hits backend even with "@client" directive
     * so make sure to at least return an empty object in the resolvers property
     * for the createApollo() method. See:
     * https://github.com/apollographql/apollo-client/issues/4845
     *
     * Though if you find yourself needing a way to write to the cache thru
     * mutations, it'll get populated anyway like in this example.
     */
    resolvers,
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
