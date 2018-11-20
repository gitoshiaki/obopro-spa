<template lang="pug">
page-container.wrapper
  .content_container
    projectInputs(
      v-model="project"
      )
    actionButton(@click="create()") 保存
</template>

<script>
import projectInputs from '@/components/projectInputs'
import actionButton from "@/components/actionButton"
import api from '@/util/api'

export default {
  name: "CreateProject",
  components: {
    projectInputs,
    actionButton
  },
  data(){
    return {
      id: localStorage.getItem('user_id'),
      project: {
        name: "",
        descriptioin: ""
      }
    }
  },
  methods: {
    async create(){
      const {name,description} = this.project
      const ownerId = this.id
      const data = await this.$store.dispatch('project/create',{
          name,
          description,
          ownerId
        }).catch(this.handleError)
      if(!data.createProject) return this.handleError(data)
      this.$router.push(
        { 
          name: 'Project', 
          params: { id: data.createProject.id }
        }
      )
    },
    handleError(e){
        console.log("error",e)
        return
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  background: #F5F5F5;
</style>
