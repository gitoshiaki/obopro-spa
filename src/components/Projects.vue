<template lang="pug">
.project__list
  .project(
    v-if="data.length"
    v-for="project in data"
    :key="project.name"
    @click="showProject(project.id)"
    )
    //- img.image(src="/images/ichgei_banner.png")
    .date {{project.updatedAt | dateFormat}}
    .name {{project.name | truncate(30)}}
    attachedProfile(
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
  filters: {
    dateFormat (value) {
      if (!value) return ''
      value = value.toString()
      return moment(value).format('YYYY/MM/DD HH:MM')
    },
    truncate (value, length, omission) {
      const len = length ? parseInt(length, 10) : 20;
      const omm = omission ? omission.toString() : '...';
      if(value.length <= len) return value
      return value.substring(0, length) + omm;
    }
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
  justify-content: center;
  flex-direction: column;
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

  


</style>
