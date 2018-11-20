import Vue from 'vue';
import Router from 'vue-router';

import Project from '@/views/projects/Project.vue';
import EditProject from '@/views/projects/EditProject.vue';
import CreateProject from '@/views/projects/CreateProject.vue';

import Profile from '@/views/profiles/Profile.vue';
import EditProfile from '@/views/profiles/EditProfile.vue';
import CreateProfile from '@/views/profiles/CreateProfile.vue';
import CreateProfiles from '@/views/profiles/CreateProfiles.vue';

import Search from '@/views/Search.vue';
import Callback from '@/views/Callback.vue';
import LandingPage from '@/views/LandingPage.vue';

import store from '@/store/index'
import AuthService from '@/Auth/AuthService'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage
    },
    {
      path: '/callback',
      name: 'callback',
      component: Callback
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search,
      meta: { requiresAuth: true },
    },


    //////////// プロジェクト
    {
      path: '/projects/create',
      name: 'CreateProject',
      component: CreateProject,
      meta: { requiresAuth: true },
    },
    {
      path: '/projects/:id',
      name: 'Project',
      component: Project,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: '/projects/:id/edit',
      name: 'EditProject',
      component: EditProject,
      props: true,
      meta: { requiresAuth: true },
    },


    //////////// プロフィール
    {
      path: '/profiles/bulkcreate',
      name: 'CreateProfiles',
      component: CreateProfiles,
      meta: { requiresAuth: true },
    },
    {
      path: '/profiles/create',
      name: 'CreateProfile',
      component: CreateProfile,
      meta: { requiresAuth: true },
    },
    {
      path: '/profiles/:id',
      name: 'Profile',
      component: Profile,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: '/profiles/:id/edit',
      name: 'EditProfile',
      component: EditProfile,
      props: true,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  console.log("before each!");
  
  if (!to.matched.some(record => record.meta.requiresAuth)) {
    return next()
  }
  console.log("require auth!");
  if (!store.state.authenticated) {
    return new AuthService().login()
  }
  if (
    to.name != 'CreateProfile' &&
    !(store.state.profile && store.state.profile.name)
  ) {
    return store.dispatch("fetchUserData",{id:store.state.user_id})
    .then((User)=>{
      if (!User.profile && !User.profile.name) {
        return next({ name: 'CreateProfile' })
      }
      return next()
    })
  }
  return next()
})

export default router