import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { TextInput, Button, List } from 'react-native-paper';
// import thunk
import { postEvent } from './store/events';
import * as Font from 'expo-font';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width: WIDTH } = Dimensions.get('window');
const { height: HEIGHT } = Dimensions.get('window');
//CreateEvent Component
class CreateEvent extends Component {
  constructor(props) {
    super(props);
    //assign variable path to get event information
    const path = this.props.route.params;
    const id = Number(path.userId);
    this.state = {
      eventTitle: '',
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      description: '',
      hostId: path.hostId ? path.hostId : id,
      fontsLoaded: false,
    };
    this.handleSubmit.bind(this);
    this.handleGoBack.bind(this);
  }

  async loadFonts() {
    await Font.loadAsync({
      'Asap-Bold': require('../assets/fonts/Asap-Bold.ttf'),
      'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
      'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
      'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFonts();
  }

  async handleSubmit() {
    try {
      await this.props.create({
        eventTitle: this.state.eventTitle,
        date: this.state.date,
        startTime: this.state.startTime.toLocaleTimeString('en', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
        endTime: this.state.endTime.toLocaleTimeString('en', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
        description: this.state.description,
        hostId: this.state.hostId,
      });
      this.setState({
        eventTitle: '',
        description: '',
      });
      //after creating an event, navigate to the all events page
      this.props.navigation.navigate('AllEvents');
    } catch (error) {
      //give alert message if the user did not fill out all required filed
      Alert.alert('Error', 'Please fill out all information');
    }
  }

  handleGoBack() {
    this.props.navigation.navigate('AllEvents');
  }

  render() {
    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <SafeAreaView style={styles.container}>
          {/* top bar */}
          <View style={styles.topBar}>
            <Image
              source={{
                uri: 'https://i.ibb.co/NmBN3gY/pocketbook-icon.png',
              }}
              style={styles.image}
            />

            {/* Go-back button */}
            <TouchableOpacity
              style={styles.arrow}
              onPress={() => this.handleGoBack()}
            >
              <Icon name="arrow-left" size={24} color="#161924" />
            </TouchableOpacity>

            {/* nav bar */}
            <TouchableOpacity
              onPress={this.props.navigation.openDrawer}
              style={styles.threeBar}
            >
              <Icon name="bars" size={24} color="#161924" />
            </TouchableOpacity>
          </View>

          <Text style={styles.heading}>Create Event</Text>

          <View>
            <TextInput
              value={this.state.eventTitle}
              style={styles.input}
              mode="outlined"
              label="Title"
              multiline={true}
              theme={{
                colors: { primary: '#6646ee', placeholder: '#6646ee' },
                fonts: { regular: { fontFamily: 'Roboto-Regular' } },
              }}
              left={<TextInput.Icon name="heart" color="#6646ee" />}
              onChangeText={(eventTitle) => {
                this.setState({ eventTitle });
              }}
            ></TextInput>

            <List.Section>
              <List.Item
                title="Date"
                style={styles.list}
                left={() => <List.Icon icon="calendar" />}
              />
              <RNDateTimePicker
                value={this.state.date}
                type={'outlined'}
                mode="date"
                display="default"
                style={styles.picker}
                onChange={(event, selectedDate) =>
                  this.setState({
                    date: selectedDate,
                  })
                }
              />

              <List.Item
                title="Start Time"
                style={styles.list}
                left={() => <List.Icon icon="clock-start" />}
              />
              <RNDateTimePicker
                value={this.state.startTime}
                mode="time"
                display="default"
                style={[styles.picker, timePicker]}
                onChange={(event, selectedTime) =>
                  this.setState({
                    startTime: selectedTime,
                  })
                }
              />

              <List.Item
                title="End Time"
                style={styles.list}
                left={() => <List.Icon icon="clock-end" />}
              />
              <RNDateTimePicker
                value={this.state.endTime}
                mode="time"
                display="default"
                style={[styles.picker, timePicker]}
                onChange={(event, selectedTime) =>
                  this.setState({
                    endTime: selectedTime,
                  })
                }
              />
            </List.Section>

            <TextInput
              value={this.state.description}
              style={[styles.input, description]}
              multiline={true}
              error={true}
              mode="outlined"
              label="Description"
              numberOfLines={10}
              theme={{
                colors: { primary: '#E92228', placeholder: '#E92228' },
                fonts: { regular: { fontFamily: 'Roboto-Regular' } },
              }}
              left={<TextInput.Icon name="star" color="#E92228" />}
              onChangeText={(description) => {
                this.setState({ description });
              }}
            ></TextInput>

            <Button
              mode="contained"
              style={styles.button}
              onPress={() => this.handleSubmit()}
            >
              <Text style={styles.submitText}>Submit</Text>
            </Button>

            {/* <Button mode="contained" style={styles.button} onPress={() => this.handleGoBack()}>
          <Text style={styles.submitText}>Go Back</Text>
          </Button> */}
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  }
}

const description = {
  paddingVertical: -50,
  height: 130,
  paddingTop: -500,
  textAlignVertical: 'top',
};
const timePicker = { right: -235, textAlign: 'left' };

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#FFF',
    flexGrow: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  //   resizeMode: 'stretch',
  image: {
    marginTop: 20,
    marginBottom: -50,
    width: 35,
    height: 50,
    left: -150,
    top: 40,
  },
  topBar: {
    top: -50,
    marginBottom: -10,
    paddingLeft: 300,
    alignItems: 'center',
    backgroundColor: '#EF5C2B',
    height: 110,
    width: WIDTH,
  },
  arrow: {
    left: -310,
    bottom: -50,
  },
  threeBar: {
    right: -10,
    bottom: -25,
  },
  heading: {
    top: -20,
    fontSize: 35,
    textAlign: 'center',
    fontFamily: 'Asap-Bold',
  },
  input: {
    width: WIDTH - 45,
    height: 55,
    marginTop: 20,
    backgroundColor: '#fff',
    paddingTop: 0,
    fontFamily: 'Roboto-Medium',
  },
  list: {
    left: -15,
  },
  picker: {
    right: -215,
    top: -52,
    marginBottom: -65,
    alignContent: 'flex-end',
  },
  button: {
    width: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#E92228',
    marginTop: 30,
    borderRadius: 350,
    fontFamily: 'Roboto-Regular',
  },
  submitText: {
    color: '#fff',
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    bottom: 2,
  },
  // errorMsg: {
  //   marginTop: 15,
  //   color: '#E92228',
  //   fontSize: 12,
  //   marginBottom: -5,
  //   fontFamily: 'Roboto-Light',
  // },
});

const mapState = (state) => {
  return {
    event: state.event,
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    create: (newEventInfo) => dispatch(postEvent(newEventInfo)),
  };
};
export default connect(mapState, mapDispatch)(CreateEvent);
