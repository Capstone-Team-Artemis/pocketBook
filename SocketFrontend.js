import io from 'socket.io-client';
import { Text, TextInput, StyleSheet, View } from 'react-native';
import React, { Component } from 'react';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: '',
      chatMessages: [],
    };
  }

  componentDidMount() {
    console.log('in component did mount')
    this.socket = io('http://127.0.0.1:3000');
    this.socket.on('chat message', (msg) => {
      this.setState({ chatMessages: [...this.state.chatMessages, msg] });
    });
  }

  submitChatMessage() {
    console.log('in submit chat message')
    this.socket.emit('chat message', this.state.chatMessage);
    this.setState({ chatMessage: '' });
  }

  render() {
    console.log('in render')
    const chatMessages = this.state.chatMessages.map((chatMessage, index) => (
      <Text key={index} style={{ borderWidth: 2, marginTop: 20 }}>
        {chatMessage}
      </Text>
    ));
    return (
      <View style={styles.container}>
        {chatMessages}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // height: 400,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

export default Chat;