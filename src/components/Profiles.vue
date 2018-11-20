<template lang="pug">
.profile__list
  .profile(
    v-if="data.length"
    v-for="profile in data"
    :key="profile.name"
    )
    .item__inner(
      @click="showProfile(profile.id)"
      )
      thumbnailImage(:src="profile.thumbnailUrl", alt="")
      p.name {{profile.name}}
      p.furigana {{profile.furigana}}

</template>

<script>
import thumbnailImage from "@/components/thumbnailImage"

export default {
  name: 'Profiles',
  components: {
    thumbnailImage
  },
  props: {
    data: Array
  },
  methods: {
    showProfile(profile_id){
      this.$router.push({ name: 'Profile', params: { id: profile_id }})
    },
  },
};
</script>

<style lang="stylus">
@import '../stylus/util.styl'

.profile__list
  width 100%
  display flex
  flex-wrap wrap
  justify-content flex-start
  box-sizing border-box

.profile
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

  .name
    margin 1rem 0 0
    font-size 1rem
    // font-weight bold
  .furigana
    margin .2rem 0 0
    font-size .5rem
    color gray

.searchBox
  display block
  position relative
  margin 2rem 0
  input
    width: 100%;
    height: 3.5rem;
    border: 0;
    border-radius 5px
    font-size: 1rem;
    padding: 0 2.5rem;
    outline: 0;
    box-sizing: border-box;
    font-weight: bold
    transition .5s ease
    &:focus
      box-shadow: 0 0 30px 0px rgba(0,0,100,0.1);
  .searchIcon
    position: absolute;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 1rem;

</style>
