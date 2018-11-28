<template lang="pug">
.wrapper
    .background(
        id="particles-js"
        )
    img.frontItem.logo(
        src="/images/oboprologo.svg"
        )
    template(v-if="loggedIn")
        actionButton.frontItem.b(
            @click="$router.push({name: 'Search'})"
            ) Get Started
        actionButton.frontItem.b(
            @click="$store.dispatch('logout')"
            ) SignOut
    template(v-else)
        actionButton.frontItem.b(
            @click="$auth0.login()"
            ) LogIn

</template>

<script>
import { TimelineLite, Back, Elastic, Expo } from "gsap"
import actionButton from "@/components/actionButton"
import particleConf from "@/util/particleConf"
export default {
    name: 'LandingPage',
    components: {
        actionButton,
    },
    data(){
        return {
            title: "We Are Creators",
            subtitle: "Acceralating Collaboration",
        }
    },
    computed: {
        loggedIn(){
            return this.$store.state.authenticated
        }
    },
    mounted(){
        require('particles.js')
        particlesJS('particles-js',particleConf)
        setTimeout(()=>{
            this.$toast.open('Something happened')
            this.animate()
        },1000)
    },
    methods: {
        animate(){
            const { bubble, bubblePulse } = this.$refs
            const timeline = new TimelineLite()
            
            timeline.to(bubble, 0.4, {
                scale: 0.8,
                rotation: 16,
                ease: Back.easeOut.config(1.7),
            })   
            timeline.to(
                bubblePulse,
                0.5, 
            {
                scale: 0.9,
                opacity: 1,
            },
            '-=0.6' 
            )
            
            timeline.to(bubble, 1.2, {
                scale: 1,
                rotation: '-=16',
                ease: Elastic.easeOut.config(2.5, 0.5),
            })
            timeline.to(
                bubblePulse,
                1.1,
            {
                scale: 3,
                opacity: 0,
                ease: Expo.easeOut,
            },
            '-=1.2'
            )
        }
    },
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
.title
    width: 70vw;
    z-index: 1;
    font-size: 4rem;
    line-height: 6rem;
    font-family: 'Merriweather', serif;



.bubble-wrapper
  position: relative;
.bubble
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
  background: #272727;
  border-radius: 50%;
  height: 100px;
  width: 100px;
.bubble-pulse
  position: absolute;
  z-index: 1;
  height: 120px;
  width: 120px;
  top: 50%;
  left: 50%;
  margin-top: -60px;
  margin-left: -60px;
  background: #272727;
  border-radius: 50%;
  opacity: 0;
  transform: scale(0);
.bubble-image
  height: 50%;
</style>
