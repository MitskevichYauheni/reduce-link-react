import React from 'react'
import { connect } from 'react-redux'
import { ROUTING } from '../../constants/Routing'

export default function requireAuthentication(Component) {

  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      this.checkAuth(this.props.user)
    }
    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps.user)
    }
    checkAuth(user) {
      if(Component.name === 'ReduceApp'){
        if (!user.isAuthenticated ) {
          this.props.dispatch({
            type: ROUTING,
            payload: {
              method: 'push',
              nextUrl: '/'
            }
          })
        }
      } else if(Component.name === 'SignIn'){
        if (user.isAuthenticated === true) {
          this.props.dispatch({
            type: ROUTING,
            payload: {
              method: 'push',
              nextUrl: '/reduce-app'
            }
          })
        }
      }
    }
    render() {
      return (
        <div>
          <Component {...this.props} />
        </div>
      )
    }
  }

  function mapStateToProps(state) {
    return {
      user: state.user
    }
  }

  return connect(mapStateToProps)(AuthenticatedComponent)
}
