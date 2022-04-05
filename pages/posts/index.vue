<template>
  <div class="posts-page">
    <PostList :posts="loadedPost" />
  </div>
</template>

<script>
import PostList from "@/components/Posts/PostList";

export default {
  components: {
    PostList,
  },
  data() {
    return {
      loadedPost: [
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
      ],
    };
  },
};
</script>

<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
