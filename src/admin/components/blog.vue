<template lang="pug">
  div.blog
    h2 Page «My Blog»
    .form-container
      form.form#blog(@submit.prevent="sendArticle" @reset="resetForm")
        .blog-title Insert article
        .status {{msg}}
        .blog-row
          input(v-model="title" type="text" placeholder="Name").blog-input
        .blog-row
          input(v-model="date" type="date" ).blog-input
        .blog-row
          editor(v-model="text" type="textarea" api-key="ehcyh59a2fvkf3g91t3kfzdk5q76ic1c0nr6rm4jgg32p912" :init="{plugins: 'wordcount'}")      
        input(name="" type="submit" value="Add article").blog-btn
        input(name="" type="reset" value="Reset").blog-btn
</template>
<script>
import moment from "moment";
import Editor from "@tinymce/tinymce-vue";

export default {
  components: {
    editor: Editor
  },
  data: () => {
    return {
      moment: moment,
      title: "",
      date: moment(new Date(), "DD/MM/YYYY").format("YYYY-MM-DD"),
      text: "",
      msg: ""
    };
  },
  methods: {
    resetForm: function() {
      this.title = "";
      this.text = "";
    },
    sendArticle: function() {
      this.axios({
        method: "post",
        url: "/api/blog",
        data: {
          title: this.title,
          date: this.date,
          text: this.text
        }
      }).then(rs => {
        this.msg = rs.data.status;
        this.title = "";
        this.text = "";
        // this.$emit('updateList'); не нужно, потому что в админку не выводим статьи
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.blog {
  position: relative;
}
.blog-row {
  position: relative;
  margin-top: 1.3rem;

  input {
    width: 80%;
    max-width: 25rem;
    padding: 0.5rem 1rem;
    border: none;
    outline: none;
    border-radius: 5px;
  }

  textarea {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    resize: none;
    outline: none;
    width: 100%;
    max-width: 35rem;
    height: 10rem;
  }
}
.blog-btn {
  margin-top: 1.5rem;
  margin-right: 15px;
  width: 119px;
  height: 46px;
  background-color: $green;
  border-radius: 5px;
  border: none;
  color: white;
  outline: none;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    cursor: pointer;
  }
}
</style>
