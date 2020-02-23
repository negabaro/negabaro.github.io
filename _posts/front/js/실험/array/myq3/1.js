const state = {
  articleList: {},
  apiStatus: {}
};

console.log(state.articleList[0]);

state.articleList[0] = { xx: "xx" };

console.log(state.articleList[0]);

export const state2: () => ArticleListState = () => ({
  articleList: {},
  apiStatus: {}
});
