<template>
  <div class="admin-post-page">
      <section class="update-form">
          <AdminPostForm :post="loadedPost"/>
      </section>
  </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm";

export default {
    components:{
        AdminPostForm
    },
    data(){
        return {
            loadedPost: {
                author: 'Leo',
                title: 'My awesome Post',
                content: 'Super amazine',
                thumbnailLink: 'https://miro.medium.com/max/676/1*XEgA1TTwXa5AvAdw40GFow.png'
            }
        }
    }
}
</script>

<style>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>