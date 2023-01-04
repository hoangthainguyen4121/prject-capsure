import * as React from 'react'
import Auth from '../auth/Auth'
import { Button } from 'semantic-ui-react'

interface LogInProps {
  auth: Auth
}

interface LogInState {}

export class LogIn extends React.PureComponent<LogInProps, LogInState> {
  onLogin = () => {
    this.props.auth.login()
  }

  render() {
    return (
      <div>
        <h1> Click the Login Button to login</h1>
        <Button icon = 'LogIn' onClick={this.onLogin} size="large" color="green"> Login </Button>
      </div>
    )
  }
}
