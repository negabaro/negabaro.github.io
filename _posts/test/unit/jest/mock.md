

# js code


```js
const Repository = axios.create( {
  baseURL: process.env.VUE_APP_API_HOST
} );

export const state: ArticleListState = {
  articleList: {},
  apiStatus: {}
};

const getters = {
  getArticleList: ( state ) => (id) => {
    return state.articleList[id] && state.articleList[id].items;
  },
  apiStatus: ( state ) => ( id ) => {
    return state.apiStatus[id];
  }
};

const mutations = {
  setArticleList: (
    state,
    { articleListResponse, id }) => {
    state.articleList[id] = articleListResponse;
    state.articleList = Object.assign( {}, state.articleList );
  },

  changeApiStatus( state, { status, id } ) {
    state.apiStatus[id] = status;
    state.apiStatus = Object.assign( {}, state.apiStatus );
  }
};


const actions = {
  fetch: async ( { commit, getters }, { apiPath, id } ) => {
    if ( ['response', 'success'].includes( getters.apiStatus( id ) ) ) {
      console.log( 'skip' );
      return;
    }

    commit( 'changeApiStatus', { status: 'request', id } );
    const response = await Repository.get( apiPath );

    if ( !response ) {
      commit( 'changeApiStatus', { status: 'failure', id } );
      console.error( 'error' );
      return;
    }

    commit( 'setArticleList', { response.data, id } );
    commit( 'changeApiStatus', { status: 'success', id } );
  }
};

export const articleList = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
```


# jest

```js
import { store as store2 } from './store';
import { createLocalVue } from '@vue/test-utils';
const localVue = createLocalVue();
localVue.use( Vuex );


jest.mock( '@/store/modules/article_list' );
describe( 'store article_list test: ', () => {

  let store;
  beforeEach( () => {
    store = new Vuex.Store( store2 );
  } );

  describe( 'test actions', () => {
    test( 'get value correctly', async () => {
      const apiPath = 'api/v1/article_list.json';
      const id = 1;
      if ( store.getters ) {

        expect( store.getters['articleList/getArticleList']( id ) ).toBe( undefined );

        await store.dispatch( 'articleList/fetch', { apiPath, id } );

        expect( store.getters['articleList/getArticleList']( id ) ).not.toBe( undefined );

      }
    } );
  } );


} );

```


# store.js

```js
import Vue from 'vue';
import Vuex from 'vuex';
import { aa } from '@/store/modules/aa';
import { bb } from '@/store/modules/bb';
import { articleList } from '@/store/modules/article_list';

Vue.use( Vuex );

export const store = {
  state: {
    version: '1.0.0'
  },
  modules: {
    aa,
    bb,
    articleList
  }
};
export default new Vuex.Store( store );
```






```js
await store.dispatch( 'articleList/fetch', { apiPath, id } );
```

Currently this code has an `Error: Error: connect ECONNREFUSED 127.0.0.1: 8080` error

I would like to mock　this part　`const response = await Repository.get( apiPath );`

But I have no idea how to mock variables in action of vuex store with jest.

Let me know if you know how to mock this part.

Thanks for reading my question.
