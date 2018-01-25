import PropTypes from 'prop-types'
import React from 'react'
import MessageSection from 'components/MessageSection'
import MessageForm from 'components/MessageForm'
import PeopleTyping from 'components/PeopleTyping'
import SocketSubscriber from 'components/SocketSubscriber'
import Header from './Header'
import './Thread.scss'

const { func, object } = PropTypes

export default class Thread extends React.Component {
  static propTypes = {
    currentUser: object,
    thread: object,
    fetchThread: func
  }

  componentDidMount () {
    this.onThreadIdChange()
  }

  componentDidUpdate (prevProps) {
    if (this.props.id && this.props.id !== prevProps.id) {
      this.onThreadIdChange()
    }
  }

  focusForm = () => this.form.focus()

  onThreadIdChange = () => {
    this.props.fetchThread()
    this.focusForm()
  }

  render () {
    const { thread, currentUser, id } = this.props
    return <div styleName='thread'>
      <Header thread={thread} currentUser={currentUser} />
      <MessageSection thread={thread} messageThreadId={id} />
      <div styleName='message-form'>
        <MessageForm
          formRef={textArea => this.form = textArea} // eslint-disable-line no-return-assign
          focusForm={this.focusForm}
          messageThreadId={id} />
      </div>
      <PeopleTyping styleName='people-typing' />
      <SocketSubscriber type='post' id={id} />
    </div>
  }
}

// export function Header ({ thread, currentUser, showAll }) {
//   const participants = get('participants', thread) || []
//   const id = get('id', currentUser)
//   const others = map('name', filter(f => f.id !== id, participants))
//   const maxCharacters = 60
//   const maxShown = showAll ? undefined : calculateMaxShown(others, maxCharacters)
//   const headerText = isEmpty(others)
//     ? 'You'
//     : formatNames(others, maxShown)
//
//   return <div styleName='header' id='thread-header'>
//     <div styleName='header-text'>
//       {headerText}
//     </div>
//     <div>show</div>
//     <CloseMessages />
//   </div>
// }
//
// export function calculateMaxShown (names, maxCharacters) {
//   let count = 0
//   for (let i = 0; i < names.length; i++) {
//     count += names[i].length
//     if (count > maxCharacters) return i
//   }
// }
