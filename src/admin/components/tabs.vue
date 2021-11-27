<template lang="pug">
  .tabs
    ul.list
      li.item(
        v-for="(tab, index) in tabs"
        :class="{'item--active' : tab.active}")
        router-link(:to="tab.href").link {{tab.name}}
          span(v-on:click="changeTab(index, tab.href)") 
</template>
<script>
export default {
  data() {
    return {
      prevTab: 0,
      tabs: [
        { name: 'Skills', href: '/about', active: false },
        { name: 'Articles', href: '/blog', active: false },
        { name: 'Works', href: '/works', active: false }
      ]
    };
  },
  methods: {
    changeTab(next, href) {
      this.tabs[this.prevTab].active = false;
      this.tabs[next].active = true;
      this.prevTab = next;
      this.$emit('update', href);
    }
  }
};
</script>
<style src="adminStyles/tabs.scss" lang="scss" scoped></style>