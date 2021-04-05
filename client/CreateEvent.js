import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
} from "react-native";
import React, { Component } from "react";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { TextInput, Button } from 'react-native-paper'
// import thunk
import { postEvent } from "./store/events";
import * as Font from 'expo-font';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width: WIDTH } = Dimensions.get("window");

//CreateEvent Component
class CreateEvent extends Component {
  constructor(props) {
    super(props);
    //assign variable path to get event information
    const path = this.props.route.params;
    const id = Number(path.userId);
    this.state = {
      eventTitle: "",
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      description: "",
      hostId: path.hostId ? path.hostId : id,
      fontsLoaded: false,
    };
    this.handleSubmit.bind(this);
    this.handleGoBack.bind(this);
  }

  async loadFonts() {
    await Font.loadAsync({
      // Load a font `Montserrat` from a static resource
      'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
      'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
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
        startTime: this.state.startTime.toLocaleTimeString("en", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        endTime: this.state.endTime.toLocaleTimeString("en", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        description: this.state.description,
        hostId: this.state.hostId,
      });
      this.setState({
        eventTitle: "",
        description: "",
      });
      //after creating an event, navigate to the all events page
      this.props.navigation.navigate("AllEvents");
    } catch (error) {
      //give alert message if the user did not fill out all required filed
      Alert.alert("Error", "Please fill out all information");
    }
  }

  handleGoBack() {
    this.props.navigation.navigate("AllEvents");
  }

  render() {

    return (
      <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
      contentContainerStyle={styles.scrollContainer}
    >
      <SafeAreaView style={styles.container}>
      {/* <ImageBackground source={{ uri: 'https://i.ibb.co/3cP8BQC/booksignupscreen.jpg' }} style={styles.backgroundImg} > */}
        
        {/* navigation bar */}
        <View style={styles.navbar}>
        <Image
          source={{
          uri: 'https://i.ibb.co/NmBN3gY/pocketbook-icon.png',
          }}
          style={styles.image}
        />

          <TouchableOpacity style={styles.arrow} onPress={() => this.handleGoBack()}>
          <Icon name='arrow-left' size={24} color='#161924' />
          </TouchableOpacity>
          
          <TouchableOpacity
            // style={styles.navbar}
            // style={{  margin: 10 }}
            onPress={this.props.navigation.openDrawer}
          >
            <Icon name='bars' size={24} color='#161924' />
          </TouchableOpacity>
        </View>

        <Text style={styles.heading}>Create Event</Text>

        <View >

          <TextInput
            value={this.state.eventTitle}
            style={styles.input}
            label="Title"
            multiline = {true}
            onChangeText={(eventTitle) => {
              this.setState({ eventTitle });
            }}
          ></TextInput>

          <RNDateTimePicker
            value={this.state.date}
            type = {'outlined'}
            mode='date'
            display='default'
            onChange={(event, selectedDate) =>
              this.setState({
                date: selectedDate,
              })
            }
          />

          <RNDateTimePicker
            value={this.state.startTime}
            mode='time'
            display='default'
            onChange={(event, selectedTime) =>
              this.setState({
                startTime: selectedTime,
              })
            }
          />
          <RNDateTimePicker
            value={this.state.endTime}
            mode='time'
            display='default'
            onChange={(event, selectedTime) =>
              this.setState({
                endTime: selectedTime,
              })
            }
          />

          <TextInput
            value={this.state.description}
            style={[styles.input, description]}
            multiline = {true}
            error={true}
            label="Description"
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
        {/* </ImageBackground> */}
      </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  }
}

const description = { height: 170 };

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  backgroundImg:{
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  image: {
    marginTop: 20,
    marginBottom: -50,
    width: 90,
    height: 80,
    left: -150
  },
  navbar: {
    top: -50,
    marginBottom: -10,
    paddingLeft: 300,
    alignItems: "center",
    backgroundColor: '#EF5C2B'
  },
  arrow: {
    left: -310,
    bottom: -23
  },
  heading: {
    top: -20,
    fontSize: 35,
    textAlign: 'center',
    fontFamily: 'Roboto-Light'
  },
  input: {
    width: WIDTH - 45,
    height: 55,
    marginTop: 20,
    backgroundColor: "#fff",
    alignSelf: 'center',
    fontFamily: 'Roboto-Light'
  },
  button: {
    width: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#E92228',
    marginTop: 30,
    borderRadius: 350,
  },
  submitText: {
    color: '#fff',
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    bottom: 2,
  },
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
