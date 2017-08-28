import React, { Component } from 'react'
import Button from 'components/Button'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import LeftSidebar from '../LeftSidebar'
import { hyloNameWhiteBackground } from 'util/assets'
import { bgImageStyle } from 'util/index'
import '../Signup.scss'

export default class CreateCommunity extends Component {
  constructor () {
    super()
    this.state = {
      fireRedirect: false
    }
    this.redirectUrl = '/signup/upload-photo'
  }
  handleCommunityNameChange = (event) => {
    const communityName = event.target.value
    this.setState({
      communityName
    })
  }
  submit = (communityName) => {
    this.props.createCommunity(communityName)
  }

  redirect = () => {
    this.setState({
      fireRedirect: true
    })
  }

  render () {
    const { fireRedirect } = this.state
    const avatarUrl = hyloNameWhiteBackground
    return <div styleName='wrapper'>
      <LeftSidebar
        header="Great, let's get started"
        body="All good things start somewhere! Let's kick things off with a catchy name for your community."
      />
      <div styleName='detail'>
        <span styleName='white-text step-count'>STEP 1/4</span>
        <br />
        <div styleName='center'>
          <div styleName='logo center' style={bgImageStyle(avatarUrl)} />
        </div>
        <div styleName='center center-vertical'>
          <input
            styleName='create-community-input'
            onChange={this.handleCommunityNameChange}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                this.redirect()
              }
            }}
            autoFocus
          />
        </div>
        <div>
          <div styleName='float-right bottom'>
            <div>
              <Link to={'/signup/create-community'}>
                <Button styleName='continue-button' label='Continue' />
              </Link>
            </div>
            <div styleName='instruction'>or press Enter</div>
          </div>
        </div>
      </div>
      { fireRedirect && <Redirect to={this.redirectUrl} /> }
    </div>
  }
}
