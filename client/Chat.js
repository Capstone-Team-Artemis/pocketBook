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
      chatMessage: '',
      discussion: [],
      messages: [],
    }
  }
  componentDidMount() {
    this.socket = io('http://0715f6ca17fa.ngrok.io', {
      transports: ['websocket'],
      jsonp: false,
    });

    this.socket.connect();

    //******send room info to backend socket
    this.socket.emit('room', this.props.route.params.eventId)

    const thisComponent = this;
    //connecting to the backend socket
    this.socket.on('connection', () => {
      console.log('FE: Connected to socket server');
    });
    //STEP3: receiving messages from the backend 
    this.socket.on('messages', (message) => {
      // console.log('MESSAGES IN SOCKET MESSAGE -->', message);
      // console.log(
      //   'THISCOMPONENT.STATE.MESSAGES -->',
      //   thisComponent.state.messages
      // );
      const messages = thisComponent.state.messages.slice();
    //adding new message recived from the backend to the state
      thisComponent.setState({ messages: [message, ...messages] });
    });
  }

  //********ROOMS
  // componentWillUnmount() {
  //   socket.emit('leaveChat', this.props.eventId)
  // }

  // onSend = ((messages = []) => {
  //     setMessages((previousMessages) =>
  //       GiftedChat.append(previousMessages, messages)
  //     );
  //     socket.emit('chat message', messages);
  //   },
  //   []);

  submitChatMessage(message) {
    //step1: socket is emitting chat message to the backend line6 of index.js
    this.socket.emit('chat message', message);

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
    console.log("username? ==>", this.props.userName)
    console.log("eventId?? ==>", this.props.route.params.eventId)
    return (
      <GiftedChat
        messages={this.state.messages}
        // onSend={(messages) => onSend(messages)}
        onSend={(message) => this.submitChatMessage(message)}
        // user={{
        //   _id: 1,
        // }}
        user={{ _id: this.props.userId }}
        // renderBubble={renderBubble}
        alwaysShowSend
        scrollToBottom
      />
    );
  }
}

const mapState = (state) => {
  console.log("STATE***", state)
  return {
    userId: state.user.id,
    //userName: state.user.userName,
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

// import { Text, TextInput, StyleSheet, View } from 'react-native';
// import React, { Component } from 'react';

// if (!window.location) {
//   // App is running in simulator
//   window.navigator.userAgent = 'react-native';
// }

// import { io } from 'socket.io-client';

// // const io = require('socket.io-client/socket.io');

// class Chat extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       chatMessage: '',
//       discussion: [],
//     };
//   }

//   componentDidMount() {
//     // Instead of connecting with local backend server...
//     // We are connecting with NGROK (allows us to access local backend server)
//     // MAKE SURE to have ngrok installed on your terminal
//     // After installed, run 'ngrok http 3000' on your terminal
//     // Paste generated URL into 'this.socket = io('****HERE***')' (line 36)

//     // this.socket = io('http://127.0.0.1:3000', {
//     //   transports: ['websocket'],
//     //   jsonp: false,
//     // });
//     this.socket = io('http://721e1df4d08b.ngrok.io', {
//       transports: ['websocket'],
//       jsonp: false,
//     });
//     this.socket.connect();

//     const thisComponent = this;

//     //connection between client and server starts
//     // Step4: (putting msg to the front end) listening for the 'messages' event from the backend index.js line 10
//     this.socket.on('connect', () => {
//       console.log('Connected to socket server');
//     });
//     this.socket.on('messages', (msg) => {
//       //[listening..]it's adding emitted discussion to the discussion already exist
//       console.log('**msg**', msg);
//       console.log(
//         'THISCOMPONENT.STATE.DISCUSSION ->',
//         thisComponent.state.discussion
//       );
//       // console.log('thisComponent ->', this);
//       const discussion = thisComponent.state.discussion.slice();
//       thisComponent.setState({ discussion: [...discussion, msg] });
//       console.log('**discussion!', thisComponent.state.discussion);
//     });
//   }

//   submitChatMessage() {
//     //step1: socket is emitting chat message to the backend line6 of index.js
//     this.socket.emit('chat message', this.state.chatMessage);
//     console.log('in submit chat message: ', this.state.chatMessage);
//     this.setState({ chatMessage: '' });
//   }

//   render() {
//     const discussion = this.state.discussion.map((chatMessage, index) => (
//       <Text key={index} style={styles.chatStyle}>
//         {chatMessage}
//       </Text>
//     ));
//     return (
//       <View style={styles.container}>
//         {discussion}
//         <TextInput
//           style={{
//             height: 40,
//             width: '100%',
//             borderWidth: 2,
//             top: 500,
//             position: 'absolute',
//             justifyContent: 'center',
//           }}
//           autoCorrect={false}
//           value={this.state.chatMessage}
//           onSubmitEditing={() => this.submitChatMessage()}
//           onChangeText={(chatMessage) => {
//             this.setState({ chatMessage });
//           }}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     // height: 400,
//     flex: 1,
//     backgroundColor: '#F5FCFF',
//   },
//   chatStyle: {
//     height: 30,
//     borderWidth: 2,
//     marginTop: 20,
//     backgroundColor: '#F5FCFF',
//   },
// });

// export default Chat;
