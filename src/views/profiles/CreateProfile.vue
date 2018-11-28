<template lang="pug">
page-container(:hasNav="false").wrapper
  .content_container
    profileInputs(
      v-model="profile"
      )
    actionButton(@click="create()") 作成
</template>

<script>
import profileInputs from '@/components/profileInputs'
import actionButton from "@/components/actionButton"
import api from '@/util/api'
import { thumbnailDefault } from '@/util/config'
import {mapState} from 'vuex'

export default {
  name: "CreateProfile",
  components: {
    profileInputs,
    actionButton
  },
  data(){
    return {
      profile: {
        thumbnailUrl: thumbnailDefault,
        name: "",
        furigana: "",
        descriptioin: ""
      }
    }
  },
  computed: {
    ...mapState(['user_id'])
  },
  mounted(){
    if (this.$store.state.profile && this.$store.state.profile.id) this.$router.go(-1)
  },
  methods: {
    async create(){
      const {name,furigana,description} = this.profile
      const userId = this.user_id
      const thumbnailUrl = await this.handleThumb({
          file: this.profile.thumbnailData,
          url: this.profile.thumbnailUrl
        }).catch(this.handleError)
      const data = await this.$store.dispatch('profile/create',{
          thumbnailUrl,
          name,
          furigana,
          description,
          userId
        }).catch(this.handleError)
      if(!data.createProfile) return this.handleError(data)
      this.$router.push(
        { 
          name: 'Profile', 
          params: { id: data.createProfile.id }
        }
      )
    },
    handleError(e){
        console.log("error",e)
        return
    },
    async handleThumb({file,url}){
      console.log(file,url);
      if(api.validateUrl(url)) return url
      if(file) {
        const result = await api.imageUploader(file)
        return result.data.secure_url
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
</style>
