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
      .get(`${process.env.baseUrl}/posts/${context.params.id}.json`)
      .then((res) => {
        return {
          loadedPosts: res.data,
        };
      })
      .catch((error) => {
        console.log(error);
      });
  },
  head: {
    title: "This is a cool website",
  },
};
</script>

<style></style>
