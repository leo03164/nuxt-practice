import Vuex from "vuex";
import axios from "axios";
import Cookie from "js-cookie";

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
      clearToken(state) {
        state.token = null;
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
          .post(
            `${process.env.baseUrl}/posts.json?auth=${vuexContext.state.token}`,
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
            `${process.env.baseUrl}/posts/${editPost.id}.json?auth=${vuexContext.state.token}`,
            editPost
          )
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
            const expirationDate =
              new Date().getTime() + Number.parseInt(result.expiresIn) * 1000;

            vuexContext.commit("setToken", result.idToken);
            localStorage.setItem("token", result.idToken);
            localStorage.setItem("tokenExpiration", expirationDate);
            Cookie.set("jwt", result.idToken);
            Cookie.set("expirationDate", expirationDate);

            return this.$axios.$post("http://localhost:3000/api/track-data", {
              data: "Authenticated",
            });
          })
          .catch((e) => {
            console.warn("Auth Error MSG: ", e.response.data.error.message);
          });
      },
      initAuth(vuexContext, req) {
        let token;
        let expirationDate;
        if (req) {
          if (!req.headers.cookie) {
            return;
          }

          const cookieInfo = req.headers.cookie.split(";");
          const jwtToken = cookieInfo.find((content) =>
            content.trim().startsWith("jwt=")
          );
          if (!jwtToken) {
            return;
          }

          token = jwtToken.split("=")[1];

          expirationDate = req.headers.cookie
            .split(";")
            .find((c) => c.trim().startsWith("expirationDate=").split("=")[1]);
        } else {
          token = localStorage.getItem("token");
          expirationDate = localStorage.getItem("tokenExpiration");
        }
        if (new Date().getTime() > +expirationDate || !token) {
          vuexContext.commit("clearToken");
          return;
        }
        vuexContext.commit("setToken", token);
      },
      logout(vuexContext) {
        vuexContext.commit("clearToken");
        Cookie.remove("jwt");
        Cookie.remove("expirationDate");
        if (process.client) {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
        }
      },
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      },
      isAuthticated(state) {
        return state.token !== null;
      },
    },
  });
};

export default createStore;
