import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import { GraphQLClient } from 'graphql-request'
import { _ENDPOINT_ } from '@/util/config'
import AuthService from '@/Auth/AuthService'

import profileModule from '@/store/profileModule.js'
import projectModule from '@/store/projectModule.js'
import userModule from '@/store/userModule.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    profile: profileModule,
    user: userModule,
    project: projectModule
  },
  state: {
    authenticated: !!localStorage.getItem('node_token'),
    user_id: localStorage.getItem('user_id'),
    profile: null
  },
  getters: {
    client(state) {
      if (state.authenticated) {
        console.log("authed request initialized!");
        const node_token = localStorage.getItem('node_token')
        return new GraphQLClient(_ENDPOINT_, {
          headers: { Authorization: `Bearer ${node_token}` }
        })
      } else {
        console.log("not authed request initialized!");
        return new GraphQLClient(_ENDPOINT_)
      }
    }
  },
  mutations: {
    login(state) {
      state.authenticated = true
    },
    logout(state) {
      state.authenticated = false
      state.user_id = null
    }
  },
  actions: {
    authenticate({ commit, getters }) {
      console.log("graphcool auth start!");
      const accessToken = localStorage.getItem('access_token')
      getters.client.request(`
                mutation {
                    authenticateUser(
                        accessToken: "${accessToken}"
                    ){
                        id
                        token
                    }
                }
            `)
        .then((data) => {
          console.log("graphcool auth success!:", data);
          const authenticated = data.authenticateUser
          commit("login")
          localStorage.setItem('user_id', authenticated.id)
          localStorage.setItem('node_token', authenticated.token)
          return
        })
        .catch((e) => {
          console.log(e)
          return
        })
    },

    logout({ commit }) {
      console.log("logout!");
      commit("logout")
      localStorage.removeItem('use_id')
      localStorage.removeItem('node_token')
      router.push("/")
      return
    },

    fetchUserData({ commit, getters, state }, {
      id
    }){
      console.log("fetchUserData!")
      return getters.client.request(`
      query {
        User(id: "${id}") {
          id,
          profile {
            id,
            name,
            thumbnailUrl
          }
        }
      }
      `).then(data => {
        state.profile = data.User.profile
        return data.User
      })
    }

  }
})