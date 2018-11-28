<template lang="pug">
nav.nav
    .nav__button(@click="openSearchPage")
        font-awesome-icon(icon="search")
    
    .nav__button(@click="openCreateProjectPage")
        font-awesome-icon(icon="plus")
    
    .nav__button(@click="openModal")
        font-awesome-icon(icon="bars")
</template>

<script>
import {mapState} from 'vuex'
import CardMenu from '@/components/CardMenu'

export default {
    name: "globalNav",
    computed: {
        ...mapState({
            profile: state => state.profile || null
        })
    },
    methods: {
        openModal(){
            this.$modal.open({
                parent: this,
                component: CardMenu,
                })
        },
        openCreateProjectPage(){
            this.$router.push({
                name:'CreateProject'
                })
        },
        openSearchPage(){
            this.$router.push({
                name:'Search'
                })
        },
        
    }
}
</script>

<style lang="stylus">
$height = 3rem
.nav
    position fixed
    bottom 0
    left 0
    right 0
    z-index 2

    display flex
    justify-content space-around

    width 100%
    height $height
    background white
    // border-top 1px solid rgba(0,0,0,0.2)
    box-shadow: 0 0 20px 0px rgba(0,0,0,0.1)
    &__button
        display flex
        padding 0 1rem
        justify-content center
        align-items center
        cursor pointer
        font-size: 1.2rem;


.nav-section
    display flex
    align-items center
    width 33.3%
    &.left
        justify-content flex-start
    &.center
        justify-content center
        font-weight bold
    &.right
        justify-content flex-end

.button
    display: block;
    margin: 2rem auto;
    width: auto;
    border: 1px solid rgba(0,0,0,0.1);
    padding: .5rem 2rem;
    border-radius: 5rem;
    font-size: 1rem;
</style>
