<template lang="pug">
page-container.wrapper
  .content_container
    projectInputs(
      v-model="project"
      )
    actionButton(@click="update()") 保存
    actionButton.cancel(@click="$router.go(-1)") キャンセル
</template>

<script>
import projectInputs from '@/components/projectInputs'
import actionButton from "@/components/actionButton"
import api from '@/util/api'

export default {
  name: "EditProject",
  components: {
    projectInputs,
    actionButton
  },
  props: {
    id: String
  },
  data(){
    return {
      project: {}
    }
  },
  mounted(){
    this.$store.dispatch('project/get',{id: this.id})
      .then(data => this.project = data.Project)
  },
  methods: {
    async update(){
      const {id,name,description} = this.project
      const data = await this.$store.dispatch('project/update',{
          id,
          name,
          description
        }).catch(this.handleError)
      if(!data.updateProject) return this.handleError(data)
      this.$router.push(
        { name: 'Project', params: { id: data.updateProject.id }}
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
.button
    box-sizing border-box
    width: 100%;
    max-width: 30rem;
    font-size: 1rem;
    display: block;
    text-align: center;
    padding: 1rem;
    margin: 1rem auto 0;
    background: linear-gradient(to right, #f80759, #bc4e9c);
    color: white;
    font-weight: bold;
    border-radius: 5px;
    box-shadow: 0 1px 20px -5px lightblue;
    transition .1s ease
    &.cancel
      background: transparent
      border: 0
      box-shadow: none
      color gray
    &:focus
    &:active
      outline 0
      transform scale(.8)
</style>
