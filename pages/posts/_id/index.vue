<template>
  <div class="single-post-page">
    <section class="post">
      <h1>{{ loadedPosts.title }}</h1>
      <div class="post-details">
        <div>Last updated on {{ loadedPosts.updateDate }}</div>
        <div>Written by Name: {{ loadedPosts.author }}</div>
      </div>
      <p>{{ loadedPosts.content }}</p>
    </section>

    <section class="post-feedback">
      <p>Let me know what you think</p>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  asyncData(context) {
    return axios
      .get(
        `https://nuxt-project-9e89b-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${context.params.id}.json`
      )
      .then((res) => {
        return {
          loadedPosts: res.data,
        };
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style></style>
