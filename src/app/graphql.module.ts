import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { resolvers } from './resolvers';

export const cache = new InMemoryCache();
cache.writeData({
  data: {
    // You can initialize ahead your local states.
    // You can also add later on if you want, just make sure to
    // do the optional checks. For example:
    // results.data?.nonExistentDataInCache
    customRandomNumber: 0,
    bolbets: [],
    latestBolbetUpdated: {},
  },
});

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
