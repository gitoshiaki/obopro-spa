<template lang="pug">
#app
  router-view
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="stylus">
html
body
  width 100%
  height 100%

#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
  min-width 100%
  min-height 100%
  position relative

#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
</style>
