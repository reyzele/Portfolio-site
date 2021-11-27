<template lang="pug">
  .header
    h1 Admin panel
    .links
      a(:href='href').return-back Return to site
      a(href='/logout').sign-out Exit
</template>
<script>
export default {
  props: {
    href: {
      type: String
    }
  }
};
</script>
<style lang="scss" src="adminStyles/header.scss" scoped></style>
