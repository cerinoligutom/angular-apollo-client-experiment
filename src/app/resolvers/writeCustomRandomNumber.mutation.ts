import { CustomResolver } from './common';
import { MutationWriteCustomRandomNumberArgs, GetFromCacheQuery, GetFromCacheDocument } from '../generated/graphql';

export const writeCustomRandomNumber: CustomResolver<any, MutationWriteCustomRandomNumberArgs> = (_, { input }, { cache }) => {
  console.log('writeCustomRandomNumber resolver', input);

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
