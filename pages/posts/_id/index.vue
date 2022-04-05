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
export default {
  asyncData(context, callback) {
    setTimeout(() => {
      callback(null, {
        loadedPosts: {
          id: "leo",
          title: `About ${context.params.id}`,
          previewText: "she is my girl friend",
          author: "leo",
          updateDate: new Date(),
          content: "Just a content not preview text",
          thumbnail:
            "https://thepolysh.com/blog/wp-content/uploads/2018/11/WhooliChen_cover.png",
        },
      });
    }, 1000);
  },
};
</script>

<style></style>
