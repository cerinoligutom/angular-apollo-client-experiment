import { CustomResolver } from './common';
import { MutationRandomizeUsernameArgs, GetBolbetsQuery, GetBolbetsDocument } from '../generated/graphql';

export const randomizeUsername: CustomResolver<any, MutationRandomizeUsernameArgs> = (_, { userId }, { cache, getCacheKey }) => {
  const data = cache.readQuery<GetBolbetsQuery>({
    query: GetBolbetsDocument,
  });

  const bolbet = data.bolbets.find((x) => x.id === userId);
  // Randomize
  bolbet.username = `${Math.random()}`;

  /**
   * Query Document way
   */
  cache.writeQuery({
    query: GetBolbetsDocument,
    data,
  });

  // OR

  /**
   * Cache Key way
   */

  // Prefer using `getCacheKey()` because it is possible to override
  // the formation of the cache key logic.
  const cacheKey = getCacheKey(bolbet);

  cache.writeData({
    id: cacheKey,
    data: bolbet,
  });

  return true;
};
