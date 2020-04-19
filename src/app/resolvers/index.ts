import { Mutation } from '../generated/graphql';
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
  Mutation: Partial<Record<keyof Mutation, CustomResolver>>;
} = {
  Mutation: {
    writeCustomRandomNumber,
    addToBolbetsList,
    removeFromBolbetsList,
    randomizeUsername,
  },
};
