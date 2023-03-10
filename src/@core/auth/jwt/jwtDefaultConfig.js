import { baseurl } from "../../../config"

// ** Auth Endpoints
export default {
  loginEndpoint: `${baseurl}/login`,
  // loginEndpoint: `/jwt/login`,
  registerEndpoint: `${baseurl}/register`,
  refreshEndpoint: `${baseurl}/refresh-token`,
  logoutEndpoint: `${baseurl}/logout`,

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken'
}
