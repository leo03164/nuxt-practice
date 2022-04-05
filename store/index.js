import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
    },
    actions: {
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
      },
      nuxtServerInit(vuexContext, context) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            vuexContext.commit("setPosts", [
              {
                id: "leo",
                title: "about nancy",
                previewText: "she is my girl friend",
                thumbnail:
                  "https://thepolysh.com/blog/wp-content/uploads/2018/11/WhooliChen_cover.png",
              },
              {
                id: "nancy",
                title: "about leo",
                previewText: "he is my boy friend",
                thumbnail:
                  "https://thepolysh.com/blog/wp-content/uploads/2018/11/WhooliChen_cover.png",
              },
            ]);
            resolve();
          }, 1500);
        });
      },
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      },
    },
  });
};

export default createStore;
