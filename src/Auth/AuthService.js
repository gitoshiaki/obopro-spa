import auth0 from 'auth0-js'
import router from '@/router'
import store from '@/store/index'
import { GraphQLClient } from 'graphql-request'
import { _ENDPOINT_ } from '@/util/config'


const AUTH0_CLIENT_ID = "9nFlL8Mr1rGLZ7v2PMlmlXSfVe6eTTGS"
const AUTH0_DOMAIN = "obopro.auth0.com"

export default class AuthService {

  authenticated = this.isAuthenticated()

  constructor() {
    this.login = this.login.bind(this)
    this.setSession = this.setSession.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  auth0 = new auth0.WebAuth({
    domain: 'obopro.auth0.com',
    clientID: '9nFlL8Mr1rGLZ7v2PMlmlXSfVe6eTTGS',
    redirectUri: 'http://localhost:8080/callback',
    audience: 'https://obopro.com',
    responseType: 'token',
    scope: 'openid email'
  })

  login() {
    store.dispatch("logout")
    this.auth0.authorize()
  }

  handleCallback() {
    this.auth0.parseHash(this.handleToken.bind(this))
  }

  handleToken(err, auth0Result){
    console.log("auth0 authentication result!", auth0Result, err);

    if (err) this.handleAuthFailure(err)
    if (!auth0Result && !auth0Result.accessToken) this.handleAuthFailure(err)
    this.setSession(auth0Result)
    store.dispatch("authenticate")
  }

  handleAuthFailure(err){
    if (err) console.log(err)
    router.replace('/') // todo: error page
  }

  // session作成
  setSession(auth0Result) {
    let expiresAt = JSON.stringify(
      auth0Result.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', auth0Result.accessToken)
    localStorage.setItem('expires_at', expiresAt)
  }

  logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('expires_at')
  }

  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }
}