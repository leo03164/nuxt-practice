<template>
    <section class="posts-list">
      <PostPreview
        id="1"
        :is-admin="isAdmin"
        thumbnail="http://img.alicdn.com/imgextra/i1/1122991732/O1CN01qw4HDf1OfIYVUPkr1_!!1122991732.jpg"
        title="First"
        previewText="First One"
      />
      <PostPreview
        id="2"
        :is-admin="isAdmin"
        thumbnail="http://img.alicdn.com/imgextra/i1/1122991732/O1CN01qw4HDf1OfIYVUPkr1_!!1122991732.jpg"
        title="Second"
        previewText="Second One"
      />
      <PostPreview
        id="3"
        :is-admin="isAdmin"
        thumbnail="http://img.alicdn.com/imgextra/i1/1122991732/O1CN01qw4HDf1OfIYVUPkr1_!!1122991732.jpg"
        title="Third"
        previewText="Third One"
      />
      
    </section>
</template>

<script>
import PostPreview from "@/components/Posts/PostPreview";

export default {  
  components:{
    PostPreview
  },
  props:{
    isAdmin:{
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

.posts-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>