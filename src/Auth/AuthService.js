import auth0 from 'auth0-js'
import router from '@/router'
import store from '@/store/index'
import { GraphQLClient } from 'graphql-request'
import {
  _ENDPOINT_,
  _NAMESPACE_,
  AUTH0_CLIENT_ID,
  AUTH0_DOMAIN,
  REDIRECT_URL,
  AUDIENCE,
  LOGOUT_URL,
  RETURN_TO_URL,
} from '@/util/config'
const {log} = console

export default class AuthService {

  constructor() {
    this.login = this.login.bind(this)
    this.setTokenSession = this.setTokenSession.bind(this)
    this.isTokenSessionAlive = this.isTokenSessionAlive.bind(this)
  }

  auth0 = new auth0.WebAuth({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    redirectUri: REDIRECT_URL,
    audience: AUDIENCE,
    responseType: 'token',
    scope: 'openid email'
  })

  login() {
    this.auth0.authorize()
  }
  
  logout() {
    this.removeTokenSession()
    location.href = `https://${AUTH0_DOMAIN}/v2/logout?returnTo=${RETURN_TO_URL()}`
  }

  handleCallback() {
    return new Promise((resolve,reject)=>{
      this.auth0.parseHash((err, auth0Result)=>{
        if (err) reject()
        if (!auth0Result || !auth0Result.accessToken) reject()
        this.setTokenSession(auth0Result)
        resolve()
      })
    })
  }

  setTokenSession({ expiresIn, accessToken }) {
    let expiresAt = JSON.stringify(
      expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('expires_at', expiresAt)
  }

  removeTokenSession() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('expires_at')
    log(`
    removed!
    access_token: ${localStorage.getItem('access_token')}
    expires_at: ${localStorage.getItem('expires_at')}
    `)
  }

  isTokenSessionAlive() {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }
}