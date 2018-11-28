<template lang="pug">
.project__list
  .project(
    v-if="data.length"
    v-for="project in data"
    :key="project.name"
    @click="showProject(project.id)"
    )
    //- img.image(src="/images/ichgei_banner.png")
    .date {{project.updatedAt | relativeTime}}
    .name {{project.name | truncate(30)}}
    attachedProfile.profile(
      :profile="project.owner.profile"
      )
</template>

<script>
import attachedProfile from "@/components/attachedProfile"
import moment from 'moment'

export default {
  name: 'Projects',
  components: {
    attachedProfile
  },
  props: {
    data: Array
  },
  methods: {
    showProject(project_id){
      this.$router.push({ name: 'Project', params: { id: project_id }})
    },
  },
};
</script>

<style lang="stylus">
@import '../stylus/util.styl'

.project__list
  width 100%
  display flex
  flex-wrap wrap
  justify-content flex-start
  box-sizing border-box
  // padding 1rem

.project
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 10rem;
  margin: 1rem 0;
  padding: 1.5rem;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius 5px
  transition: 0.5s ease;
  cursor: pointer;
  &:hover
    box-shadow: 0 5px 30px -5px rgba(0,0,0,0.2)

  > .name
    font-size 1rem
    font-weight bold
  > .date
    font-size: .7rem;
    margin-bottom .5rem
    font-weight bold
    color gray
  > .profile
    margin-top .5rem

  


</style>
