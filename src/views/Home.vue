<template lang="pug">
.root_container
  .items
    .item(
      v-for="item in [0,1,2,3,4,5,6,7,8,9,]"
    )
      .item__inner
        img.thumbnail(src="/images/user_icon.png", alt="")
        p.name.textHighlighting 松村 寿明
        p.furigana Matsumura Toshiaki

</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    // HelloWorld,
  },
};
</script>

<style lang="stylus">
@import '../stylus/util.styl'

.items
  width 100%
  display flex
  flex-wrap wrap
  justify-content flex-start
  box-sizing border-box
  // background rgba(0,0,0,0.1)
  padding 1rem

.item
  box-sizing border-box
  display flex

  +mobile()
    width 50%
  +tablet()
    width 33.3%
  +pc()
    width 20%

.item__inner
  margin: 1rem;
  // background: #d3d3d3;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content flex-start

  .thumbnail
    width 100%
  .name
    margin 1rem 0 0
    font-size 1rem
    // font-weight bold
  .furigana
    margin .2rem 0 0
    font-size .5rem
    color gray


</style>
