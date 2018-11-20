<template lang="pug">
.thumbnail-container
    img(
        :src="src"
        :alt="alt"
        @click="$emit('click',$event)"
    )
</template>

<script>
export default {
    name: "thumbnail-image",
    props: {
        src: String,
        alt: {
            type:String,
            default: ""
        }
    }
}
</script>

<style lang="stylus">
.thumbnail-container
    width: 100%
    height: 100%;
    position relative
    padding-top 100%
    overflow hidden
    border-radius 100%
    > img
        position absolute
        width 100%
        top 0
        left 0
        right 0
        bottom 0
        margin auto
        object-fit cover
        object-position center

</style>
