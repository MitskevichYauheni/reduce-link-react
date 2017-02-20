import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from '../constants/User'

const initialState = JSON.parse(window.localStorage.getItem('rr_user')) || {}

export default function userstate(state = initialState, action) {

  switch (action.type) {

    case LOGIN_REQUEST:
      // TODO
      return {}

      case LOGIN_SUCCESS:
        return {...state, isAuthenticated: action.payload.isAuthenticated}

    default:
      return state
    }
}
