import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  TouchableHighlight,
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
    };
    this.handleSubmit.bind(this);
    this.handleGoBack.bind(this);
  }

  async handleSubmit() {
    try {
      await this.props.create({
        ...this.state,
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
      <SafeAreaView style={styles.container}>
      <ImageBackground source={{ uri: 'https://i.ibb.co/3cP8BQC/booksignupscreen.jpg' }} style={styles.backgroundImg} >
        
        {/* navigation bar */}
        <View style={styles.navbar}>
        <Image
          source={{
          uri: 'https://i.ibb.co/yWQvLJL/POCKETBOOK-1-IN-01.png',
          }}
          style={styles.image}
        />
          <TouchableOpacity
            style={styles.navbar}
            style={{ alignItems: "flex-end", margin: 16 }}
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

          <Button title='Go Back' onPress={() => this.handleGoBack()} />
        </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const description = { height: 170 };

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImg:{
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  image: {
    //marginTop: 10,
    marginBottom: -50,
    width: 180,
    height: 100,
  },
  navbar: {
    paddingLeft: 300,
  },
  heading: {
    fontSize: 40,
    textAlign: 'center'
  },
  input: {
    width: WIDTH - 45,
    height: 55,
    marginTop: 20,
    backgroundColor: "#fff",
    alignSelf: 'center'
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
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
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
