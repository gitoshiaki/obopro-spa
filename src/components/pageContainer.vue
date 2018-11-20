<template lang="pug">
.page-container(:class="{hasNav}")
    globalNav(v-if="hasNav")
    slot
</template>

<script>
import globalNav from '@/components/globalNav'
export default {
    name: "page-container",
    components: {
        globalNav
    },
    props: {
        hasNav: {
            type: Boolean,
            default: true
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '../stylus/util.styl'

.page-container
    min-width 100%
    min-height 100vh
    position relative
    overflow hidden
.hasNav
    padding-bottom 3rem
    
</style>
