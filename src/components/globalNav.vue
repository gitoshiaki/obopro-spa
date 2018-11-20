<template lang="pug">
nav.nav
    .nav__button(@click="$router.push({name:'Search'})")
        font-awesome-icon(icon="search")
    
    .nav__button(@click="$router.push({name:'Profile',params: {id:$store.state.profile.id}})")
        font-awesome-icon(icon="user")
    
    .nav__button(@click="$router.push({name:'CreateProject'})")
        font-awesome-icon(icon="plus")

    //- template(v-if="!$store.state.authenticated")
    //-     .nav__button(
    //-         @click="$auth0.login()"
    //-         ) Log In
    //- template(v-else)
    //-     .nav__button(
    //-         @click="$router.push({name:'create'})"
    //-         ) New

    //-     .nav__button(
    //-         @click="$store.dispatch('logout')"
    //-         ) Log Out
</template>

<script>
export default {
    name: "globalNav",
    data(){
        return {
            profile: {}
        }
    },
    mounted(){
        const profile = this.$store.state.profile
        console.log(profile);
        
        if(!profile){
            const id = this.$store.state.user_id
            this.$store.dispatch("fetchUserData",{id})
            .then((data)=>{
                this.profile = data.User.profile
            })
        }
        this.profile = profile
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
