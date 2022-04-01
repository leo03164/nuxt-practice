<template>
  <nuxt-link :to="postLink" class="post-preview">
    <article >
        <div class="post-thumbnail" :style="{backgroundImage: `url(${thumbnail})`}"></div>
        <div class="post-content"></div>
        <h1>{{title}}</h1>
        <p>{{previewText}}</p>
    </article>
  </nuxt-link>
</template>

<script>
export default {
  name: 'PostPreview',
    props:{
      id:{
        type: String,
        require: true
      },
      title: {
        type: String,
        require: true
      },
      previewText: {
        type: String,
        require: true
      },
      thumbnail: {
        type: String,
        require: true
      },
      isAdmin: {
        type: Boolean,
        require: true
      }
  },
  computed:{
    postLink(){
      return this.isAdmin? '/admin/' + this.id : '/posts/' + this.id;
    }
  }
}
</script>

<style scoped>

.intro {
  height: 300px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-position: center;
  background-size: cover;
}

.intro h1 {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: black;
  background-color: rgb(211, 211, 211);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px black;
  box-sizing: border-box;
  border: 1px solid black;
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}

.featured-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.post-preview {
  border: 1px solid #ccc;
  box-shadow: 0 2px 2px #ccc;
  background-color: white;
  width: 90%;
}

a {
  text-decoration: none;
  color: black;
}

@media (min-width: 850px) {
  .post-preview {
    width: 400px;
    margin: 10px;
  }
}

.post-thumbnail {
  width: 100%;
  height: 200px;
  background-position: center;
  background-size: cover;
}

.post-content {
  padding: 10px;
  text-align: center;
}

a:hover .post-content,
a:active .post-content {
  background-color: #ccc;
}
</style>