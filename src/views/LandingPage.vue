<template lang="pug">
.wrapper
    .background(
        id="particles-js"
    )
    //- vue-particles.background(
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        )
    img.frontItem.logo(
        src="/images/oboprologo.svg"
        )
    template(v-if="loggedIn")
        actionButton.frontItem.b(
            @click="$router.push({name: 'Search'})"
            ) Get Started
    template(v-else)
        actionButton.frontItem.b(
            @click="$auth0.login()"
            ) LogIn

</template>

<script>
import actionButton from "@/components/actionButton"
import particleConf from "@/util/particleConf"
export default {
    name: 'LandingPage',
    components: {
        actionButton,
    },
    computed: {
        loggedIn(){
            return this.$store.state.authenticated
        }
    },
    mounted(){
        require('particles.js')
        particlesJS('particles-js',particleConf)
    }
}
</script>

<style lang="stylus" scoped>
.wrapper
    background #29ABE2
    position relative
    height 100vh
    width 100vw
    display flex
    flex-direction column
    align-items center
    justify-content center
.background
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    height 100vh
    width 100vw
    display block
    z-index 0
    &:after
        content: ""
        position absolute
        top 1rem
        left 1rem
        right 1rem
        bottom 1rem
        border 5px solid black
.frontItem
    z-index 1
.logo
    width: 10rem;
    margin: 7rem 0 2rem;
.b
    border: 2px solid #fff;
    background: inherit;
    width: 70vw;
</style>
