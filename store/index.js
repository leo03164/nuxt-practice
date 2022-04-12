import Vuex from "vuex";
import axios from "axios";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
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
    },
    actions: {
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
      },
      nuxtServerInit(vuexContext, context) {
        return axios
          .get(
            "https://nuxt-project-9e89b-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json"
          )
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
          .post(
            "https://nuxt-project-9e89b-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json",
            createdPost
          )
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
          .put(
            `https://nuxt-project-9e89b-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${editPost.id}.json`,
            editPost
          )
          .then((res) => {
            vuexContext.commit("editPost", editPost);
          })
          .catch((error) => {
            console.log(error);
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
