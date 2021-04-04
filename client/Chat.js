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
      messages: [],
    };
  }
  componentDidMount() {
    // Place ngrok or deployed link here!
    this.socket = io('http://874f31212d3f.ngrok.io', {
      transports: ['websocket'],
      jsonp: false,
    });

    this.socket.connect();

    //******Send room info to backend socket
    let roomName = this.props.route.params.title;
    this.socket.emit('room', roomName);

    const thisComponent = this;

    //Connecting to the backend socket
    this.socket.on('connection', () => {
      console.log('FE: Connected to socket server');
    });

    //STEP3: receiving messages from the backend
    this.socket.on('messages', (message) => {
      const messages = thisComponent.state.messages.slice();
      //Adding new message recived from the backend to the state
      thisComponent.setState({ messages: [message, ...messages] });
    });
  }

  submitChatMessage(message) {
    //Step1: socket is emitting chat message to the backend line6 of index.js
    let eventTitle = this.props.route.params.title;
    let submittedMessage = message[0];
    let addRoom = { ...submittedMessage, eventTitle };

    let newMessage = [];
    newMessage.push(addRoom);

    // Emit chat message event to backend
    this.socket.emit('chat message', newMessage);

    this.setState((previousMessages) =>
      GiftedChat.append(previousMessages, message)
    );
  }

  //User gets different background color for their text message based on the number of characters of their username
  getColor() {
    let username = this.props.username;
    let sumChars = 0;
    for (let i = 0; i < username.length; i++) {
      sumChars += username.charCodeAt(i);
    }

    const colors = [
      '#Ef5c2b', // flamingo
      '#2ecc71', // emerald
      '#e74c3c', // alizarin
      '#16a085', // green tea
      '#002850', // dark blue
      '#6646ee', // purple
    ];
    return colors[sumChars % colors.length];
  }

  renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#24aae2',
            borderTopRightRadius: 15,
          },
          left: {
            backgroundColor: this.getColor(),
            borderTopLeftRadius: 15,
          },
        }}
        timeTextStyle={{
          left: {
            color: '#FFF',
          },
          right: {
            color: '#FFF',
          },
        }}
        usernameStyle={{
          color: '#FFF',
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
          left: {
            color: '#fff',
          },
        }}
        containerToPreviousStyle={{
          right: { borderTopRightRadius: 15 },
          left: { borderTopLeftRadius: 15 },
        }}
        containerToNextStyle={{
          right: { borderTopRightRadius: 15 },
          left: { borderTopLeftRadius: 15 },
        }}
        containerStyle={{
          right: { borderTopRightRadius: 15 },
          left: { borderTopLeftRadius: 15 },
        }}
      />
    );
  };

  render() {
    console.log('USER ID?? -->', this.props.userId);
    console.log('username? ==>', this.props.username);
    console.log('eventId?? ==>', this.props.route.params.eventId);
    return (
      <GiftedChat
        messages={this.state.messages}
        // onSend={(messages) => onSend(messages)}
        onSend={(message) => this.submitChatMessage(message)}
        // user={{
        //   _id: 1,
        // }}
        user={{
          _id: this.props.userId,
          name: this.props.username,
          avatar: this.props.image,
        }}
        renderBubble={this.renderBubble}
        alwaysShowSend
        scrollToBottom
        renderUsernameOnMessage={true}
      />
    );
  }
}

const mapState = (state) => {
  return {
    userId: state.user.id,
    username: state.user.username,
    image: state.user.image,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUser: (userId) => dispatch(fetchUser(userId)),
  };
};

export default connect(mapState, mapDispatch)(Chat);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
