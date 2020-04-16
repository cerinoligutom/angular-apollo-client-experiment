import { CustomResolver } from './common';
import { MutationAddToBolbetsListArgs, GetBolbetsQuery, GetBolbetsDocument } from '../generated/graphql';

export const addToBolbetsList: CustomResolver<any, MutationAddToBolbetsListArgs> = (_, { user }, { cache, getCacheKey }) => {
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
