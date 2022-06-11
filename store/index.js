import Vuex from "vuex";
import axios from "axios";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null,
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
      addPost(state, post) {
        state.loadedPosts.push(post);
      },
      editPost(state, editPost) {
        const postIndex = state.loadedPosts.findIndex(
          (post) => post.id === editPost.id
        );
        state.loadedPosts[postIndex] = editPost;
      },
      setToken(state, token) {
        state.token = token;
      },
    },
    actions: {
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
      },
      nuxtServerInit(vuexContext, context) {
        return axios
          .get(`${process.env.baseUrl}/posts.json`)
          .then((res) => {
            const postArray = [];
            for (const key in res.data) {
              postArray.push({ ...res.data[key], id: key });
            }
            vuexContext.commit("setPosts", postArray);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      addPost(vuexContext, post) {
        const createdPost = { ...post, updateDate: new Date() };
        return axios
          .post(`${process.env.baseUrl}/posts.json`, createdPost)
          .then((result) => {
            vuexContext.commit("addPost", {
              ...createdPost,
              id: result.data.name,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      },
      editPost(vuexContext, editPost) {
        return axios
          .put(`${process.env.baseUrl}/posts/${editPost.id}.json`, editPost)
          .then((res) => {
            vuexContext.commit("editPost", editPost);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      authenticateUser(vuexContext, authData) {
        let authUrl =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
          process.env.firebaseApiKey;
        if (!authData.isLogin) {
          authUrl =
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
            process.env.firebaseApiKey;
        }
        return this.$axios
          .$post(authUrl, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          })
          .then((result) => {
            vuexContext.commit("setToken", result.idToken);
          })
          .catch((e) => {
            console.warn("Auth Error MSG: ", e.response.data.error.message);
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
