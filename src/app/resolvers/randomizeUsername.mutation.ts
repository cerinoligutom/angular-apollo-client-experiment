import { CustomResolver } from './common';
import { MutationRandomizeUsernameArgs, GetBolbetsQuery, GetBolbetsDocument } from '../generated/graphql';

export const randomizeUsername: CustomResolver<any, MutationRandomizeUsernameArgs> = (_, { userId }, { cache, getCacheKey }) => {
  const data = cache.readQuery<GetBolbetsQuery>({
    query: GetBolbetsDocument,
  });

  const bolbet = data.bolbets.find((x) => x.id === userId);
  // Randomize
  bolbet.username = `${Math.random()}`;

  cache.writeQuery({
    query: GetBolbetsDocument,
    data,
  });

  // OR

  // Prefer using `getCacheKey()` because you
  // can override the cache key logic.
  const cacheKey = getCacheKey(bolbet);

  cache.writeData({
    id: cacheKey,
    data: bolbet,
  });

  return true;
};
