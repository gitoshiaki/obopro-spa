<template lang="pug">
.inputs-container
    .group.img
        input(
            ref="thumbnail"
            type="file"
            accept="image/*"
            @change="previewFile"
            style="display:none"
            )
        thumbnailImage(
            :src="profile.thumbnailUrl"
            @click="editThumbnail"
            )
    .group
        input.text(
            type="text"
            v-model="profile.name"
            placeholder="姓名（例：山田 太郎）"
            )
    .group
        input.text(
            type="text"
            v-model="profile.furigana"
            placeholder="kana（例：matsumura toshiaki）"
            )
    .group
        SimpleMDE(
            v-model="profile.description"
            placeholder="自己紹介（例：好きなadobeソフトは「adobe  AfterEffect」です"
            )
</template>

<script>
import thumbnailImage from "@/components/thumbnailImage"
import SimpleMDE from 'vue-simplemde/src/markdown-editor'

export default {
    name: "profileInputs",
    components: {
        thumbnailImage,
        SimpleMDE
    },
    props: {
        value: Object
    },
    data(){
        return {
            profile: this.value
        }
    },
    watch: {
        value(value){
            this.profile = value
        },
        profile(value){
            this.$emit("input",value)
        }
    },
    methods: {
        editThumbnail(){
            console.log("cliced!")
            this.$refs.thumbnail.click()
        },
        previewFile(){
            const file = this.$refs.thumbnail.files[0];
            if(!file) return
            const objectURL = URL.createObjectURL(file);
            this.profile.thumbnailUrl = objectURL
            this.profile.thumbnailData = file
        }
    }

}
</script>

<style lang="stylus" scoped>
.inputs-container
    width 100%
.group
    width 100%
    margin-top: .7rem;
    &.img
        text-align center
        max-width 10rem
        padding 1rem 0
.text
    width: 100%;
    height: 3.5rem;
    line-height: 1.5rem;
    font-size: 1rem;
    border: 0;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    background: #fff;
    padding: 1rem;
    box-sizing: border-box;
    &.large
        height 10rem
    &:focus
        outline none
        background: rgba
.label
    margin: 1rem 0 .3rem;
    color: rgba(0,0,0,0.5);
    font-size: 0.9rem;
    text-align: left;

.thumbnail
    width: 200px;
    height: 200px;
    border-radius: 100px;
    object-fit cover
    margin: 1rem auto;
</style>
