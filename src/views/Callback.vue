<template lang="pug">
.cover
  ball-beat-loader(color="blue" size="20px")
  p 認証中
</template>

<script>

export default {
  name: 'callback',
  computed: {
    authenticated(){
      return this.$store.state.authenticated
    }
  },
  watch: {
    authenticated(value){
      if(value){
        this.$router.push({name:"Search"})
      }
    }
  },
  mounted(){
    this.$auth0.handleCallback()
  }
}
</script>

<style lang="stylus">
.cover
  position fixed
  display flex
  justify-content center
  align-items center
  flex-direction column
  top 0
  left 0
  right 0
  bottom 0
  z-index 999
  background white
</style>
