import { Component, OnInit } from '@angular/core';
import {
  FetchUsersGQL,
  FetchUsersQuery,
  LogoutGQL,
  FetchUsersDocument,
  FetchUsersQueryVariables,
  GetFromCacheDocument,
  GetFromCacheQuery,
  GetFromCacheGQL,
  WriteToCacheGQL,
  WriteToCacheMutation,
  WriteToCacheMutationVariables,
  WriteToCacheDocument,
  GetBolbetsGQL,
  AddToBolbetsListGQL,
  UserInput,
  GetBolbetsQuery,
  RemoveFromBolbetsListGQL,
  RandomizeUsernameGQL,
} from './generated/graphql';
import { Apollo, QueryRef } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  customRandomNumberListener1 = 0;
  customRandomNumberListener2 = 0;
  customRandomNumberListener3: Observable<number>;
  cacheInput = 0;

  users: FetchUsersQuery['users']['nodes'] = [];
  pageInfo?: FetchUsersQuery['users']['pageInfo'];
  bolbets: GetBolbetsQuery['bolbets'] = [];

  loading: boolean;

  // This is needed to use `fetchMore()`. You must use the same
  // query instance.
  fetchUsersQuery: QueryRef<FetchUsersQuery, FetchUsersQueryVariables>;

  constructor(
    private fetchUsers: FetchUsersGQL,
    private apollo: Apollo,
    private getFromCache: GetFromCacheGQL,
    private writeToCache: WriteToCacheGQL,
    private getBolbets: GetBolbetsGQL,
    private addToBolbetsList: AddToBolbetsListGQL,
    private removeFromBolbetsList: RemoveFromBolbetsListGQL,
    private randomizeUsername: RandomizeUsernameGQL,
  ) {}

  ngOnInit() {
    this.fetchUsersQuery = this.fetchUsers.watch();

    this.listenToCache();
    this.listenToCache2();
    // ListenToCache3 via async pipe
    this.customRandomNumberListener3 = this.getFromCache.watch().valueChanges.pipe(map((result) => result.data?.customRandomNumber));

    this.fetchInitialUsers();
    this.observeBolbets();
  }

  listenToCache() {
    console.log('AppComponent -> listenToCache -> listenToCache');
    this.getFromCache.watch().valueChanges.subscribe((result) => {
      this.customRandomNumberListener1 = result.data?.customRandomNumber;
    });

    // this.apollo
    //   .watchQuery<GetFromCacheQuery>({
    //     query: GetFromCacheDocument,
    //   })
    //   .valueChanges.subscribe((result) => {
    //     console.log('AppComponent -> listenToCache -> result', result);
    //     this.customRandomNumber = result.data?.customRandomNumber;
    //   });
  }

  listenToCache2() {
    this.getFromCache.watch().valueChanges.subscribe((result) => {
      console.log('listenToCache2 new value', result);
      this.customRandomNumberListener2 = result.data?.customRandomNumber;
    });
  }

  writeToCacheDirectWay() {
    this.apollo.getClient().writeData({
      data: {
        customRandomNumber: Math.random(),
      },
    });
  }

  writeToCacheMutationWay(value: number) {
    this.writeToCache
      .mutate({
        input: value,
      })
      .subscribe();

    // or

    // this.apollo
    //   .mutate<WriteToCacheMutation, WriteToCacheMutationVariables>({
    //     mutation: WriteToCacheDocument,
    //     variables: {
    //       input: value,
    //     },
    //   })
    //   .subscribe();
  }

  writeToCacheMutationWayWithCacheUpdate(value: number) {
    this.writeToCache
      .mutate(
        {
          input: +value,
        },
        {
          // Note:
          // Careful of the result parameter. If this is a client-side resolver,
          // it will contain whatever you return from your resolver.
          // The examples in the docs don't show this because you don't normally
          // do it like this as we're just updating the client cache for our
          // local states in this example.
          // https://www.apollographql.com/docs/angular/features/cache-updates/#update
          update: (proxy, result) => {
            console.log('AppComponent -> writeToCacheMutationWayWithCacheUpdate -> update', result);
            const {
              data: { writeCustomRandomNumber },
            } = result;

            const data = proxy.readQuery<GetFromCacheQuery>({
              query: GetFromCacheDocument,
            });

            data.customRandomNumber = +writeCustomRandomNumber * 10;

            proxy.writeQuery({
              query: GetFromCacheDocument,
              data,
            });
          },
          // Note:
          // If using the `update` option above isn't enough because there are
          // parts in your fields that only the server can provide. For example,
          // having a field that can only be computed by the server such as total rating/score.
          // Then just use the `refetchQueries` option and pass your query and variable
          // for each query instead of calling another GQL query service here.
          // Do take note that's an array so you can possibly think of the possibilities.
          // https://www.apollographql.com/docs/angular/features/cache-updates/#refetchqueries
          refetchQueries: [
            {
              query: GetFromCacheDocument,
              variables: {},
            },
          ],
        },
      )
      .subscribe();
  }

  async getUsers() {
    this.apollo
      .watchQuery<FetchUsersQuery, FetchUsersQueryVariables>({
        query: FetchUsersDocument,
        variables: {
          after: this.pageInfo?.endCursor,
        },
      })
      .valueChanges.subscribe((result) => {
        this.users = result.data.users.nodes;
        this.pageInfo = result.data.users.pageInfo;
        this.loading = result.loading;
      });

    // OR

    // this.fetchUsers.watch().valueChanges.subscribe((result) => {
    //   this.users = result.data.users.nodes;
    //   this.pageInfo = result.data.users.pageInfo;
    //   this.loading = result.loading;
    // });
  }

  fetchInitialUsers() {
    this.fetchUsersQuery.valueChanges.subscribe((result) => {
      console.log('AppComponent -> fetchInitialUsers -> result', result);
      this.users = result.data.users.nodes;
      this.pageInfo = result.data.users.pageInfo;
      this.loading = result.loading;
    });
  }

  async fetchMoreUsers() {
    this.fetchUsersQuery.fetchMore({
      variables: {
        after: this.pageInfo?.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        // Check if continuation is still allowed
        if (!fetchMoreResult.users.pageInfo.hasNextPage) {
          return previousResult;
        }

        // Update local states
        this.pageInfo = fetchMoreResult.users.pageInfo;

        return {
          __typename: 'Query',
          users: {
            __typename: 'UserConnection',
            nodes: [...previousResult.users.nodes, ...fetchMoreResult.users.nodes],
            pageInfo: fetchMoreResult.users.pageInfo,
          },
        };
      },
    });
  }

  async observeBolbets() {
    this.getBolbets.watch().valueChanges.subscribe((result) => {
      this.bolbets = result.data?.bolbets ?? [];
    });
  }

  async addAsBolbets(bolbetsInput: UserInput) {
    this.addToBolbetsList
      .mutate({
        user: bolbetsInput,
      })
      .subscribe();
  }

  async removeAsBolbets(bolbetsId: string) {
    this.removeFromBolbetsList
      .mutate({
        userId: bolbetsId,
      })
      .subscribe();
  }

  async generateNewUsername(userId: string) {
    this.randomizeUsername
      .mutate({
        userId,
      })
      .subscribe();
  }
}
