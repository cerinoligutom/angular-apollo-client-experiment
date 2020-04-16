import { CustomResolver } from './common';
import {
  MutationRemoveFromBolbetsListArgs,
  GetBolbetsQuery,
  GetBolbetsDocument,
  FetchUsersQuery,
  FetchUsersDocument,
} from '../generated/graphql';

export const removeFromBolbetsList: CustomResolver<any, MutationRemoveFromBolbetsListArgs> = (_, { userId }, { cache, getCacheKey }) => {
  const data = cache.readQuery<GetBolbetsQuery>({
    query: GetBolbetsDocument,
  });

  data.bolbets = data.bolbets.filter((x) => x.id !== userId);

  cache.writeQuery({
    query: GetBolbetsDocument,
    data,
  });

  // Note:
  // If you need to alter other queries as well. Do more cache stuffs.
  // DevTools seems like a scam, it keeps the cache but the
  // emitted values are "correct" (what we expect).
  const usersData = cache.readQuery<FetchUsersQuery>({
    query: FetchUsersDocument,
  });

  usersData.users.nodes = usersData.users.nodes.filter((x) => x.id !== userId);

  cache.writeQuery({
    query: FetchUsersDocument,
    data,
  });

  return true;
};
