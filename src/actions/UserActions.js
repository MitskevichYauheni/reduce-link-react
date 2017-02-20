import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from '../constants/User'

import {
  ROUTING
} from '../constants/Routing'

export function login(payload) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          isAuthenticated: payload.isAuthenticated
        }
      })
      if(payload.isAuthenticated === true){
        dispatch({
          type: ROUTING,
          payload: {
            method: 'push',
            nextUrl: '/reduce-app'
          }
        })
      }
    },2000)
  }
}

export function authorizationEnd(payload) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          isAuthenticated: payload.isAuthenticated
        }
      })

      dispatch({
        type: ROUTING,
        payload: {
          method: 'push',
          nextUrl: '/'
        }
      })
    },2000)
  }
}
