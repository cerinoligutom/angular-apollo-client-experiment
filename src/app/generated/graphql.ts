import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * A date string, such as 2007-12-03, compliant with the `full-date` format
   * outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for
   * representation of dates and times using the Gregorian calendar.
   */
  Date: any;
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the
   * `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO
   * 8601 standard for representation of dates and times using the Gregorian calendar.
   */
  DateTime: any;
  /**
   * A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format
   * outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for
   * representation of dates and times using the Gregorian calendar.
   */
  Time: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};





export type DummySubscriptionPayload = {
   __typename?: 'DummySubscriptionPayload';
  dummy?: Maybe<Scalars['String']>;
};

export type File = {
   __typename?: 'File';
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  encoding: Scalars['String'];
};

export type LoginInput = {
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
};

export type LoginPayload = {
   __typename?: 'LoginPayload';
  user?: Maybe<User>;
};

export type Mutation = {
   __typename?: 'Mutation';
  /** @deprecated Field no longer supported */
  _dummy?: Maybe<Scalars['String']>;
  addToBolbetsList?: Maybe<Scalars['Boolean']>;
  login?: Maybe<LoginPayload>;
  logout: Scalars['Boolean'];
  multipleUpload: Array<File>;
  randomizeUsername?: Maybe<Scalars['Boolean']>;
  register?: Maybe<RegisterPayload>;
  removeFromBolbetsList?: Maybe<Scalars['Boolean']>;
  singleUpload: File;
  writeCustomRandomNumber?: Maybe<Scalars['Float']>;
};


export type MutationAddToBolbetsListArgs = {
  user: UserInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationMultipleUploadArgs = {
  files: Array<Scalars['Upload']>;
};


export type MutationRandomizeUsernameArgs = {
  userId: Scalars['ID'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRemoveFromBolbetsListArgs = {
  userId: Scalars['ID'];
};


export type MutationSingleUploadArgs = {
  file: Scalars['Upload'];
};


export type MutationWriteCustomRandomNumberArgs = {
  input?: Maybe<Scalars['Float']>;
};

export type Node = {
  id: Scalars['ID'];
};

export type PageInfo = {
   __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
   __typename?: 'Query';
  /** @deprecated Field no longer supported */
  _authorizedOnlyQuery?: Maybe<Scalars['Boolean']>;
  /** @deprecated Field no longer supported */
  _dummy?: Maybe<Scalars['String']>;
  /** @deprecated Field no longer supported */
  _sampleDateScalar?: Maybe<Scalars['Date']>;
  /** @deprecated Field no longer supported */
  _sampleDateTimeScalar?: Maybe<Scalars['DateTime']>;
  /** @deprecated Field no longer supported */
  _sampleTimeScalar?: Maybe<Scalars['Time']>;
  bolbets: Array<User>;
  customRandomNumber: Scalars['Float'];
  node?: Maybe<Node>;
  users: UserConnection;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  sortBy?: Maybe<UserSort>;
};

export type RegisterInput = {
  firstName: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterPayload = {
   __typename?: 'RegisterPayload';
  success: Scalars['Boolean'];
};

export enum SortDirection {
  /** Specifies an ascending order for a given `sortBy` argument. */
  Asc = 'ASC',
  /** Specifies an descending order for a given `sortBy` argument. */
  Desc = 'DESC'
}

export type Subscription = {
   __typename?: 'Subscription';
  /** @deprecated Field no longer supported */
  _dummy?: Maybe<DummySubscriptionPayload>;
};



export type User = Node & {
   __typename?: 'User';
  id: Scalars['ID'];
  firstName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserConnection = {
   __typename?: 'UserConnection';
  edges: Array<Maybe<UserEdge>>;
  nodes: Array<Maybe<User>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type UserEdge = {
   __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node?: Maybe<User>;
};

export type UserInput = {
  id: Scalars['ID'];
  email: Scalars['String'];
  username: Scalars['String'];
};

export type UserSort = {
  field: UserSortField;
  direction: SortDirection;
};

export enum UserSortField {
  CreatedAt = 'CREATED_AT',
  UpdatedAt = 'UPDATED_AT'
}

export type GetFromCacheQueryVariables = {};


export type GetFromCacheQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'customRandomNumber'>
);

export type WriteToCacheMutationVariables = {
  input?: Maybe<Scalars['Float']>;
};


export type WriteToCacheMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'writeCustomRandomNumber'>
);

export type GetBolbetsQueryVariables = {};


export type GetBolbetsQuery = (
  { __typename?: 'Query' }
  & { bolbets: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'username'>
  )> }
);

export type AddToBolbetsListMutationVariables = {
  user: UserInput;
};


export type AddToBolbetsListMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addToBolbetsList'>
);

export type RemoveFromBolbetsListMutationVariables = {
  userId: Scalars['ID'];
};


export type RemoveFromBolbetsListMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeFromBolbetsList'>
);

export type RandomizeUsernameMutationVariables = {
  userId: Scalars['ID'];
};


export type RandomizeUsernameMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'randomizeUsername'>
);

export type FetchUsersQueryVariables = {
  after?: Maybe<Scalars['String']>;
};


export type FetchUsersQuery = (
  { __typename?: 'Query' }
  & { users: (
    { __typename?: 'UserConnection' }
    & { nodes: Array<Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'username'>
    )>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'endCursor' | 'hasNextPage' | 'hasPreviousPage' | 'startCursor'>
    ) }
  ) }
);

export type LogoutMutationVariables = {};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export const GetFromCacheDocument = gql`
    query GetFromCache {
  customRandomNumber @client
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetFromCacheGQL extends Apollo.Query<GetFromCacheQuery, GetFromCacheQueryVariables> {
    document = GetFromCacheDocument;
    
  }
export const WriteToCacheDocument = gql`
    mutation WriteToCache($input: Float) {
  writeCustomRandomNumber(input: $input) @client
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class WriteToCacheGQL extends Apollo.Mutation<WriteToCacheMutation, WriteToCacheMutationVariables> {
    document = WriteToCacheDocument;
    
  }
export const GetBolbetsDocument = gql`
    query GetBolbets {
  bolbets @client {
    id
    email
    username
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetBolbetsGQL extends Apollo.Query<GetBolbetsQuery, GetBolbetsQueryVariables> {
    document = GetBolbetsDocument;
    
  }
export const AddToBolbetsListDocument = gql`
    mutation AddToBolbetsList($user: UserInput!) {
  addToBolbetsList(user: $user) @client
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddToBolbetsListGQL extends Apollo.Mutation<AddToBolbetsListMutation, AddToBolbetsListMutationVariables> {
    document = AddToBolbetsListDocument;
    
  }
export const RemoveFromBolbetsListDocument = gql`
    mutation RemoveFromBolbetsList($userId: ID!) {
  removeFromBolbetsList(userId: $userId) @client
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RemoveFromBolbetsListGQL extends Apollo.Mutation<RemoveFromBolbetsListMutation, RemoveFromBolbetsListMutationVariables> {
    document = RemoveFromBolbetsListDocument;
    
  }
export const RandomizeUsernameDocument = gql`
    mutation RandomizeUsername($userId: ID!) {
  randomizeUsername(userId: $userId) @client
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RandomizeUsernameGQL extends Apollo.Mutation<RandomizeUsernameMutation, RandomizeUsernameMutationVariables> {
    document = RandomizeUsernameDocument;
    
  }
export const FetchUsersDocument = gql`
    query FetchUsers($after: String) {
  users(after: $after, first: 10) @connection(key: "users") {
    nodes {
      id
      email
      username
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FetchUsersGQL extends Apollo.Query<FetchUsersQuery, FetchUsersQueryVariables> {
    document = FetchUsersDocument;
    
  }
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LogoutGQL extends Apollo.Mutation<LogoutMutation, LogoutMutationVariables> {
    document = LogoutDocument;
    
  }