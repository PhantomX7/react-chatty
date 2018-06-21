import React, { Component } from 'react';
import Title from './Title';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import { ChatManager, TokenProvider } from '@pusher/chatkit';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
  }

  async componentDidMount() {
    const chatManager = new ChatManager({
      instanceLocator: 'v1:us1:f7156a69-5e8f-4554-a08b-df33b7e4e39c',
      userId: 'phantom',
      tokenProvider: new TokenProvider({
        url:
          'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/f7156a69-5e8f-4554-a08b-df33b7e4e39c/token'
      })
    });

    const currentUser = await chatManager.connect();
    currentUser.subscribeToRoom({
      roomId: currentUser.rooms[0].id,
      hooks: {
        onNewMessage: message => {
          this.setState({
            messages: [...this.state.messages, message]
          });
        }
      }
    });
    console.log(currentUser.rooms);
    console.log('aaaaaa');

    // currentUser.subscribeToRoom({
    //   roomId: roomId,
    //   hooks: {
    //     onNewMessage: message => {
    //       this.setState({
    //         messages: [...this.state.messages, message]
    //       });
    //     }
    //   }
    // });
  }

  render() {
    return (
      <div className="app">
        <Title />
        <MessageList messages={this.state.messages} />
        <SendMessageForm />
      </div>
    );
  }
}
