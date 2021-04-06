import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import { fetchUser } from './store/user';
import { IconButton } from 'react-native-paper';
import { io } from 'socket.io-client';

// const socket = io();
// const socket = io('http://127.0.0.1:3000');
//'http://5d0f23dd9334.ngrok.io'
// const socket = io('https://pocketbook-gh.herokuapp.com/');

// thisComponent.setState({ discussion: [...discussion, msg] });

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
    this.submitChatMessage.bind(this);
    this.getColor.bind(this);
    this.scrollToBottomComponent.bind(this);
    this.renderBubble.bind(this);
    this.renderSend.bind(this);
  }
  componentDidMount() {
    // place ngrok or deployed link here!
    this.socket = io('https://pocketbook-gh.herokuapp.com/', {
      transports: ['websocket'],
      jsonp: false,
    });

    this.socket.connect();

    //******send room info to backend socket
    let roomName = this.props.route.params.title;
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
    let eventTitle = this.props.route.params.title;
    let submittedMessage = message[0];
    let addRoom = { ...submittedMessage, eventTitle };

    let newMessage = [];
    newMessage.push(addRoom);
    //step1: socket is emitting chat message to the backend line6 of index.js
    this.socket.emit('chat message', newMessage);

    this.setState((previousMessages) =>
      GiftedChat.append(previousMessages, message)
    );
  }
  //user get's different background color for their text message based on the number of characters of their username
  getColor() {
    let username = this.props.userName;
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

  scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon="chevron-double-down" size={36} color="#24aae2" />
      </View>
    );
  }

  renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon="send-circle" size={32} color="#24aae2" />
        </View>
      </Send>
    );
  };

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
        usernameStyle={{
          color: '#fff', //gray30
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
          left: {
            color: '#fff',
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
        renderSend={this.renderSend}
        showUserAvatar
        alwaysShowSend
        scrollToBottom
        scrollToBottomComponent={this.scrollToBottomComponent}
        renderUsernameOnMessage={true}
      />
    );
  }
}

const mapState = (state) => {
  //console.log("STATE***", state)
  return {
    userId: state.user.id,
    userName: state.user.username,
    image: state.user.image,
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
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});