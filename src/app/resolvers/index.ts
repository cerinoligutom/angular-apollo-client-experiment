import { Mutation, Query } from '../generated/graphql';
import { CustomResolver } from './common';

// As practiced in our backend, 1 file per resolver
import { writeCustomRandomNumber } from './writeCustomRandomNumber.mutation';
import { addToBolbetsList } from './addToBolbetsList.mutation';
import { removeFromBolbetsList } from './removeFromBolbetsList.mutation';
import { randomizeUsername } from './randomizeUsername.mutation';

/**
 * Relevant explanation:
 * https://www.apollographql.com/docs/angular/basics/local-state/#resolvers
 */
export const resolvers: {
  Query: Partial<Record<keyof Query, CustomResolver>>;
  Mutation: Partial<Record<keyof Mutation, CustomResolver>>;
} = {
  /**
   * It's also possible to create queries if need be.
   *
   * One use case could be to hit REST endpoints and abstract that as a GraphQL query
   * while also getting the benefits of Apollo Cache.
   */
  Query: {},
  Mutation: {
    writeCustomRandomNumber,
    addToBolbetsList,
    removeFromBolbetsList,
    randomizeUsername,
  },
};
