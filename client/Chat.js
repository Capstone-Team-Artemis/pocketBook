import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, Button, StyleSheet } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import { fetchUser } from './store/user';

import { io } from 'socket.io-client';
// const socket = io();
// const socket = io('http://127.0.0.1:3000');
//'http://5d0f23dd9334.ngrok.io'
// const socket = io('https://pocketbook-gh.herokuapp.com/');

// thisComponent.setState({ discussion: [...discussion, msg] });

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //chatMessage: '',
      //discussion: [],
      messages: [],
    };
  }
  componentDidMount() {
    // place ngrok or deployed link here! 
    this.socket = io('http://127.0.0.1:3000', {
      transports: ['websocket'],
      jsonp: false,
    });

    this.socket.connect();
    let roomName = this.props.route.params.title
    //******send room info to backend socket
    this.socket.emit('room', roomName);

    const thisComponent = this;
    //connecting to the backend socket
    this.socket.on('connection', () => {
      console.log('FE: Connected to socket server');
    });
    //STEP3: receiving messages from the backend
    this.socket.on('messages', (message) => {

      const messages = thisComponent.state.messages.slice();
      //adding new message recived from the backend to the state
      thisComponent.setState({ messages: [message, ...messages] });
    });
  }

  submitChatMessage(message) {
    //step1: socket is emitting chat message to the backend line6 of index.js
    let eventTitle = this.props.route.params.title
    let submittedMessage = message[0]
    let addRoom = {...submittedMessage, eventTitle}

    let newMessage = []
    newMessage.push(addRoom)
    this.socket.emit('chat message', newMessage);

    this.setState((previousMessages) =>
      GiftedChat.append(previousMessages, message)
    );
  }

  renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#6475a5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  render() {
    console.log('USER ID?? -->', this.props.userId);
    console.log("eventId?? ==>", this.props.route.params.eventId)
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={(message) => this.submitChatMessage(message)}

        user={{ 
          _id: this.props.userId,
          name: this.props.userName,
          avatar: this.props.image,
         }}
        renderBubble={this.renderBubble}
        showUserAvatar
        alwaysShowSend
        scrollToBottom
        renderUsernameOnMessage={true}
      />
    );
  }
}

const mapState = (state) => {
  console.log("STATE***", state)
  return {
    userId: state.user.id,
    userName: state.user.username,
    image: state.user.image,
    event: state,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUser: (userId) => dispatch(fetchUser(userId)),
  };
};

// export default Chat;
export default connect(mapState, mapDispatch)(Chat);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
