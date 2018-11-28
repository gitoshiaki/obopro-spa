<template lang="pug">
.attached__profile(
    @click.stop="showProfile(profile.id)"
    ) 
    .thumbnail
        thumbnailImage(:src="profile.thumbnailUrl", alt="")
    p.name {{profile.name}}
</template>

<script>
import thumbnailImage from "@/components/thumbnailImage"

export default {
    name: 'attachedProfile',
    components: {
        thumbnailImage
    },
    props: {
        profile: Object
    },
    methods: {
        showProfile(profile_id){
           this.$router.push({ name: 'Profile', params: { id: profile_id }})
        }
    }
}
</script>

<style lang="stylus" scoped>
.attached__profile
    display inline-flex
    vertical-align bottom
    justify-content flex-start
    align-items: center;
    .thumbnail
        width 1.5rem
        margin-right .5rem
    .name
        font-size .7rem
        color: dimgray;
</style>
