import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import { GraphQLClient } from 'graphql-request'
import { _ENDPOINT_ } from '@/util/config'
import AuthService from '@/Auth/AuthService'

import profileModule from '@/store/profileModule.js'
import projectModule from '@/store/projectModule.js'
import userModule from '@/store/userModule.js'

const {log} = console

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
    login(state, { user_id }) {
      state.authenticated = true
      state.user_id = user_id
    },
    logout(state) {
      state.authenticated = false
      state.user_id = null
    }
  },
  actions: {
    authenticate({ commit, getters, dispatch }) {
      const auth = new AuthService()
      const accessToken = localStorage.getItem('access_token')
      if (!auth.isTokenSessionAlive || !accessToken) auth.login()

      dispatch('authenticateUser', { accessToken })
      .then((data) => {
        console.log("authentication success", data)
        const {authenticateUser} = data
        localStorage.setItem('user_id', authenticateUser.id)
        localStorage.setItem('node_token', authenticateUser.token)
        commit("login", { user_id: authenticateUser.id })
        router.push({ name: "Search" })
      })
      .catch((e) => {
        console.log("graphcool authentication error",e)
        router.push("/")
      })
    },


    authenticateUser({ commit, getters, state }, {
      accessToken
    }) {
      return getters.client.request(
      `
        mutation {
          authenticateUser(
            accessToken: "${accessToken}"
          ){
            id
            token
          }
        }
      `)
    },

    logout({ commit }) {
      localStorage.removeItem('user_id')
      localStorage.removeItem('node_token')
      commit("logout")
    },

    fetchUserData({ commit, getters, state }, {
      id
    }){
      return getters.client.request(
      `
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
        const {User} = data
        if(User === null) return
        state.profile = User.profile
        return data.User
      }).catch(e => {
        console.log(e)
      })
    }

  }
})