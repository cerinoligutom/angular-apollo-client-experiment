/**
 * Apollo Client only offers very generic resolver types so
 * I had to create these to get some type safety.
 */

import { InMemoryCache } from 'apollo-cache-inmemory';

export type GetCacheKeyFn = (args: Record<any, any>) => string;

export type CustomResolver<R = any, A = Record<any, any>> = (
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
  },
) => any;
