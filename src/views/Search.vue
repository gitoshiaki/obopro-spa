<template lang="pug">
page-container(pageTitle="一覧")
  .content_container
    .searchBox
      .searchIcon
        font-awesome-icon(icon="search")
      input(v-model="searchText" placeholder="search here...")
    b-tabs(v-model="activeTab" :animated="false")
      b-tab-item(:label="tabs[0]")
        Projects(
          v-if="activeTab == 0"
          :data="filtered"
          )
      b-tab-item(:label="tabs[1]")
        Profiles(
          v-if="activeTab == 1"
          :data="filtered"
          )
    //- component(
        :is="activeComponentName"
        :data="filtered"
        )

</template>

<script>
import Projects from '@/components/Projects'
import Profiles from '@/components/Profiles'

export default {
  name: 'Search',
  components: {
    Projects,
    Profiles
  },
  data(){
    return {
      searchText: "",
      activeTab: 0,
      Profiles: [],
      Projects: [],
    }
  },
  computed: {
    tabs(){
        return {
            '0': 'Projects',
            '1': 'Profiles',
        }
    },
    activeComponentName(){
        return this.tabs[this.activeTab]
    },
    data(){
        return this[this.activeComponentName]
    },
    filtered(){
        const data = this.data
        const searchText = this.searchText

        if(searchText){
            return data.filter((v,i,a)=>{
            return new RegExp(searchText)
                .test((v.name+v.furigana).toLowerCase())
            })
        }

      return data
    }
  },
  watch: {
        activeTab: {
            async handler(){
                const name = this.activeComponentName
                if(this[name].length) return
                const methodName = 'fetch' + name
                this[name] = await this[methodName]()
            },
            immediate: true
        },
  },
  methods: {
    fetchProfiles(){
      return this.$store.dispatch('profile/list')
        .then(data => data.allProfiles)
    },
    fetchProjects(){
      return this.$store.dispatch('project/list')
        .then(data => data.allProjects)
    }
  },
};
</script>

<style lang="stylus">
@import '../stylus/util.styl'

.searchBox
  display block
  position relative
  margin 7rem 0 2rem
  input
    width: 100%;
    height: 3.5rem;
    border: 0;
    border-radius 5px
    font-size: 1rem;
    padding: 0 2.5rem;
    outline: 0;
    box-sizing: border-box;
    font-weight: bold
    transition .5s ease
    box-shadow: 0 0 30px 0px rgba(0,0,100,0.1);
    // &:focus
      // box-shadow: 0 0 30px 0px rgba(0,0,100,0.1);
  .searchIcon
    position: absolute;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 1rem;
</style>
