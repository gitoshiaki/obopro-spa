<template lang="pug">
page-container
  .wrapper
    h1.title データをインポートする
    b-upload.upload(
      v-model="files"
      multiple
      drag-drop
      )
      p(style="padding:1rem") Drop your files here or click to upload
    template(v-if="data.length")
      actionButton.fab(
        @click="createProfiles()"
        ) アップロード
      b-table.table(
        :data="data"
        :columns="columns"
        )
</template>

<script>
import actionButton from "@/components/actionButton"
import api from '@/util/api'
import CSV from '@/util/csv'
const thumbnailDefault = "https://res.cloudinary.com/dp5qt2zx6/image/upload/v1540882398/Obopro/user_icon.png"

export default {
  name: "CreateProfile",
  components: {
    actionButton
  },
  data(){
    return {
      files: [],
      data: [],
      columns: [
          {
            field: 'thumbnailUrl',
            label: "画像"
          },
          {
              field: 'name',
              label: "名前"
          },
          {
              field: 'furigana',
              label: "フリガナ"
          },
          {
              field: 'description',
              label: "自己紹介"
          }
      ]
    }
  },
  watch: {
    files(files){
      this.handleFile(files[0])
    }
  },
  methods: {
    handleFile(file){
      var reader = new FileReader();
      reader.onerror = () => alert('ファイル読み取りに失敗しました')
      reader.onload =  e => {
        const text = e.target.result
        this.data = CSV.parse(text)
      }
      reader.readAsText(file);
    },
    createProfiles(){
      this.$store.dispatch('profile/bulkCreate',this.data)
      .then((data)=>{
        console.log(data)
      })
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
.title
  font-size: 2rem;
  margin: 2rem 0 1rem;
.table
  margin 1rem 0 7rem
.fab
  bottom: 5rem;
  left: 0;
  right: 0;
  z-index: 1;
  max-width: calc(100% - 2rem);
  position: fixed;
</style>
