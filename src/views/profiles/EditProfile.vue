<template lang="pug">
page-container
  .wrapper
    profileInputs(
      v-model="profile"
      )
    actionButton(@click="update()") 保存
    actionButton.cancel(@click="backToProfile") キャンセル
</template>

<script>
import profileInputs from '@/components/profileInputs'
import actionButton from "@/components/actionButton"
import api from '@/util/api'

export default {
  name: "EditProfile",
  components: {
    profileInputs,
    actionButton
  },
  props: {
    id: String
  },
  data(){
    return {
      profile: {}
    }
  },
  mounted(){
    this.$store.dispatch('profile/get',{id: this.id})
      .then(data => 
          console.log(this.profile = data.Profile)
      )
  },
  methods: {
    backToProfile(){
      this.$router.push({name:'Profile',params: {id:this.id}})
    },
    async update(){
      const {id,name,furigana,description} = this.profile
      const thumbnailUrl = await this.handleThumb({
          file: this.profile.thumbnailData,
          url: this.profile.thumbnailUrl
        }).catch(this.handleError)
      const data = await this.$store.dispatch('profile/update',{
          id,
          thumbnailUrl,
          name,
          furigana,
          description
        }).catch(this.handleError)
      if(!data.updateProfile) return this.handleError(data)
      this.$router.push(
        {
          name: 'Profile',
          params: { id: data.updateProfile.id }
        }
      )
    },
    handleError(e){
        console.log("error",e)
        return
    },
    async handleThumb({file,url}){
      console.log(url,file)
      if(api.validateUrl(url)) return url
      if(file){
        console.log("let's upload!")
        const res = await api.imageUploader(file)
        return res.data.secure_url
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  background: #F5F5F5;
  min-height: 100vh;
  padding 1rem
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
