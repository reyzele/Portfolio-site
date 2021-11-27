<template lang="pug">
  .admin
    .header
      app-header(:href="href")
    .tabs
      tabs(@update="updateHref")
    .content
      router-view
</template>

<script>
import header from "./components/header";
import tabs from "./components/tabs";

export default {
  components: {
    appHeader: header,
    tabs
  },
  data() {
    return {
      href: "/works"
    };
  },
  methods: {
    updateHref: function(href) {
      if (href === "/admin") {
        this.href = "/about";
      }
      this.href = href;
    }
  }
};
</script>

