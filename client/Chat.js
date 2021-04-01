import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, Button, StyleSheet } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  // Changes styling on Chat bubble messages
  const renderBubble = (props) => {
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

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      scrollToBottom
    />
  );
};

export default Chat;

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
