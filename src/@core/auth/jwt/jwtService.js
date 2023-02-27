import axios from 'axios'
import { baseurl } from '../../../config'
import jwtDefaultConfig from './jwtDefaultConfig'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export default class JwtService {
  // ** jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig }

  // ** For Refreshing Token
  isAlreadyFetchingAccessToken = false

  // ** For Refreshing Token
  subscribers = []

  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    axios.create({
      baseURL: baseurl,    
      headers: {
        "Content-type": "application/json",
        accept: "application/json"
      }
    })
    // ** Request Interceptor
    axios.interceptors.request.use(
      config => {
        // ** Get token from localStorage
        const accessToken = this.getToken()

        config.baseURL = baseurl

        // ** If token is present add it to request's Authorization Header
        if (accessToken) {
          // ** eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
        }
        return config
      },
      error => Promise.reject(error)
    )

    // ** Add request/response interceptor
    axios.interceptors.response.use(
      response => {
        const MySwal = withReactContent(Swal)
        if (response.status === 201) {
          MySwal.fire({
            position: 'top-end',
            icon: 'success',
            title: response?.data?.message,
            showConfirmButton: false,
            timer: 1500
          })
        }        
        return response
      },
      error => {
        // const MySwal = withReactContent(Swal)
        // MySwal.fire({
        //   position: 'top-end',
        //   icon: 'error',
        //   title: error?.response?.data?.message,
        //   showConfirmButton: false,
        //   timer: 1500
        // })        
        // const { config, response } = error        
        // const originalRequest = config
        

        if (error?.response?.status === 401) {          
          const MySwal = withReactContent(Swal)
          MySwal.fire({
            position: 'top-end',
            icon: 'error',
            title: error?.response?.data?.message,
            showConfirmButton: false,
            timer: 2500
          })

          // const user = getUserData()
          // console.log("🚀 ~ file: jwtService.js:79 ~ constructor ~ user", user)

          // if (user) {    
          //   console.log("🚀 ~ file: jwtService.js:79 ~ constructor ~ user true")
          //   // navigate('/')  
          // } else {
          //   console.log("🚀 ~ file: jwtService.js:79 ~ constructor ~ user false")
          // }
        }
        return error

        // // ** if (status === 401) {
        // if (response && response.status === 401) {
        //   if (!this.isAlreadyFetchingAccessToken) {
        //     this.isAlreadyFetchingAccessToken = true
        //     this.refreshToken().then(r => {
        //       this.isAlreadyFetchingAccessToken = false

        //       // ** Update accessToken in localStorage
        //       this.setToken(r.data.accessToken)
        //       this.setRefreshToken(r.data.refreshToken)

        //       this.onAccessTokenFetched(r.data.accessToken)
        //     })
        //   }
        //   const retryOriginalRequest = new Promise(resolve => {
        //     this.addSubscriber(accessToken => {
        //       // ** Make sure to assign accessToken according to your response.
        //       // ** Check: https://pixinvent.ticksy.com/ticket/2413870
        //       // ** Change Authorization header
        //       originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
        //       resolve(this.axios(originalRequest))
        //     })
        //   })       
        //   return retryOriginalRequest
        // }
        // return Promise.reject(error)
      }
    )
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter(callback => callback(accessToken))
  }

  addSubscriber(callback) {
    this.subscribers.push(callback)
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value)
  }

  login(...args) {
    return axios.post(this.jwtConfig.loginEndpoint, ...args)
  }

  register(...args) {
    return axios.post(this.jwtConfig.registerEndpoint, ...args)
  }

  refreshToken() {
    return axios.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: this.getRefreshToken()
    })
  }
}
