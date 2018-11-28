<template lang="pug">
page-container
  .profile-upper
    .profile-bg(:class="{loading:loading}")
    .profile-single(:class="{loading:loading}")
      thumbnailImage(:src="profile.thumbnailUrl", alt="" style="box-shadow: 0 0 0 7px white;")
    p.furigana {{ profile.furigana | capitalize }}
    p.name {{ profile.name }}
    span.arrow
      font-awesome-icon(icon="angle-down")
  .profile-lower
    .tabs
      .tab(
        :class="{active:tabs=='profile'}"
        @click="tabs='profile'"
        ) プロフィール
      .tab(
        :class="{active:tabs=='project'}"
        @click="tabs='project'"
        ) プロジェクト
    template(v-if="tabs == 'profile'")
      .tabcontent
        MDrenderer.description(
          v-if="profile.description"
          :raw="profile.description"
          )
      actionButton(
        v-if="isOwner"
        @click="$router.push({ name: 'EditProfile', params: { id: profile.id }})"
      ) プロフィールを編集する
    template(v-else)
      .tabcontent
        .myprojects(v-if="profile.user && profile.user.ownerProjects && profile.user.ownerProjects.length")
          .myproject(
            v-for="project in profile.user.ownerProjects"
            @click="$router.push({name:'Project',params: {id:project.id} })"
            ) {{project.name | resizeTitle}}
              span.date {{project.updatedAt | moment}}
      actionButton(
        v-if="isOwner"
        @click="$router.push({ name: 'CreateProject'})"
      ) 新しいプロジェクト



</template>

<script>
import thumbnailImage from "@/components/thumbnailImage"
import actionButton from "@/components/actionButton"
import MDrenderer from '@/components/MDrenderer'

export default {
  name: 'Profile',
  components: {
    thumbnailImage,
    actionButton,
    MDrenderer,
  },
  props: {
    id: String
  },
  data(){
    return {
      profile: {},
      loading: true,
      tabs: 'profile'
    }
  },
  computed: {
    isOwner(){
      return  this.profile.user &&
      localStorage.getItem("user_id") == this.profile.user.id
    }
  },
  mounted(){
    this.$store.dispatch('profile/get',{id: this.id})
      .then(data => {
        console.log(this.profile = data.Profile)
        this.loading = false
        }
      );
  },
  methods: {
    handleDelete(){
      this.$store.dispatch('profile/delete',{id: this.id})
        .then(data => 
          this.$router.push({name:"home"})
        );
    }
  },
};
</script>

<style lang="stylus">
@import '../../stylus/util.styl'

.profile-upper
  position: relative;
  height: 100vh;
  padding-top: 50vh;
  color: white;
  text-align: center;
  z-index 1
  .furigana
    font-family: 'Lobster', cursive;
    font-size: 2rem;
    margin: 0;
    margin-top: 1rem;
  .name
    margin: 0 0 .5rem;
  .arrow
    display block
    font-size 1.5rem
    animation bound 1s ease infinite alternate

.profile-bg
  z-index -1
  position: absolute;
  bottom: 3rem;
  width: 100rem;
  height: 100rem;
  border-radius: 100rem;
  left: -50rem;
  right: -50rem;
  margin: auto;
  background: #bc4e9c;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #f80759, #bc4e9c);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #f80759, #bc4e9c); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  // transition all 0.6s cubic-bezier(.87,-.41,.19,1.44)
  transition all 1s ease
  transition-delay .5s
  // animation: spin 1.5s linear infinite;
  &.loading
    transform scale(2)

@keyframes spin {
  0% {
    transform rotate(0deg) scale(1)
  }
  100% {
    transform rotate(360deg) scale(1)
  }
}

@keyframes bound {
  0% {
    transform translateY(0px) rotateY(0deg)
  }
  100% {
    transform translateY(5px) rotateY(90deg)
  }
}


.profile-single
  display: flex;
  position: relative;
  bottom: 1rem;
  right: 0;
  left: 0;
  justify-content: center;
  width: 40%;
  margin: auto;
  transition all 0.6s cubic-bezier(.87,-.41,.19,1.44)
  opacity 1
  max-width 10rem
  &.loading
    transform scale(0) translateY(10vh)
    opacity 0

.profile-lower
  position: relative;
  height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .tabcontent
      width 100%
      max-width: 40rem;
      min-height 10rem
    .description
      line-height: 1.7rem;
      margin 1rem auto
    .myprojects
      width 100%
      .myproject
        padding: 1rem;
        box-shadow: 0 0 30px -10px rgba(169, 150, 212, 0.6);
        margin: 1rem 0;
        border-radius: 4px;
        cursor: pointer;
        border: .5px solid rgba(0,0,0,0.05);
        box-sizing: border-box;
        display flex
        justify-content space-between
        align-items center
        .date
          color: rgba(0,0,0,0.5);
          font-size: .8rem;
  .tabs
    display: flex;
    justify-content: center;
    padding: 0;
    width: 100%;
    max-width: 40rem;
    margin-bottom: 1rem;
    .tab
      width: 10rem;
      text-align: center;
      padding: .7rem 0;
      font-weight: bold;
      cursor: pointer;
      margin: 0 1rem;
      &.active
        border-bottom: 5px solid #0000ff3d;


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
