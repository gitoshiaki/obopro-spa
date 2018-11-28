<template lang="pug">
page-container
  .content_container
    p.name {{ project.name }}
    .meta
      .modified last modified {{project.updatedAt | relativeTime}}
      attachedProfile.profile(
        :profile="project.owner.profile"
        )
    MDrenderer.description(
      v-if="project.description"
      :raw="project.description"
      )
    template(v-if="isOwner")
      .fabs
        .fab(
          v-if="isOwner"
          @click="$router.push({ name: 'EditProject', params: { id: project.id }})"
          ) 
          font-awesome-icon(icon="pen")
        .fab(
          v-if="isOwner"
          @click="handleDelete"
          ) 
          font-awesome-icon(icon="trash")

</template>

<script>
import actionButton from "@/components/actionButton"
import MDrenderer from '@/components/MDrenderer'
import attachedProfile from "@/components/attachedProfile"

export default {
  name: 'Project',
  components: {
    actionButton,
    MDrenderer,
    attachedProfile
  },
  props: {
    id: String
  },
  data(){
    return {
      project: {},
      loading: true
    }
  },
  computed: {
    isOwner(){
      return  this.project.owner &&
      localStorage.getItem("user_id") == this.project.owner.id
    }
  },
  mounted(){
    this.$store.dispatch('project/get',{id: this.id})
      .then(data => {
        console.log(this.project = data.Project)
        this.loading = false
        }
      );
  },
  methods: {
    handleDelete(){
      this.$store.dispatch('project/delete',{id: this.id})
        .then(data => 
          this.$router.push({name:"Search"})
        );
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../stylus/util.styl'
.name
  font-size: 2rem;
  font-weight: bold;
  margin: 1rem 0;
  line-height: 3rem;
.description
  margin 3rem 0 5rem
.row
  display flex
  justify-content flex-start
  align-items center
.meta
  > *
    margin-bottom 1rem
.modified
  font-size: .8rem;
  color: darkgray;
.profile
  &:before
    content: "by";
    margin-right: .5rem;
    font-size: .8rem;
    color: darkgray;
</style>
