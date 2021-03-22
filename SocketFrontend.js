import io from 'socket.io-client';
import { Text, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import React, { Component } from 'react';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: '',
      discussion: [],
    };
  }

  componentDidMount() {
    console.log('in component did mount')
    //connection between client and server starts 
    this.socket = io('http://127.0.0.1:3000');
    // Step4: (putting msg to the front end) listening for the 'messages' event from the backend index.js line 10
    this.socket.on('messages', (msg) => {
      //it's adding emitted discussion to the discussion already exist 
      this.setState({ discussion: [...this.state.discussion, msg] });
    });
  }

  submitChatMessage() {
    //step1: socket is emitting chat message to the backend line6 of index.js
    this.socket.emit('chat message', this.state.chatMessage);
    console.log('in submit chat message', this.state.chatMessage)
    this.setState({ chatMessage: '' });
    console.log("********discussion********", this.state.discussion)
  }

  render() {
    console.log('in render')
    const discussion = this.state.discussion.map((chatMessage, index) => (
      <Text key={index} style={styles.chatStyle}>
        {chatMessage}
      </Text>
    ));
    return (
      <SafeAreaView style={styles.container}>
        {discussion}
        <TextInput
          style={{
            height: 40,
            width: '100%',
            borderWidth: 2,
            top: 500,
            position: 'absolute',
            justifyContent: 'center',
          }}
          autoCorrect={false}
          value={this.state.chatMessage}
          onSubmitEditing={() => this.submitChatMessage()}
          onChangeText={(chatMessage) => {
            this.setState({ chatMessage });
          }}
        />
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    // height: 400,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  chatStyle: {
    height: 30,
    borderWidth: 2, 
    marginTop: 20, 
    backgroundColor: '#F5FCFF', 
  }
});

export default Chat;