import {
  Text,
  TextInput,
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import React, { Component } from "react";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import RNDateTimePicker from "@react-native-community/datetimepicker";

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
    const { eventTitle } = this.props.route.params;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.navbar}>
          <TouchableOpacity
            style={styles.navbar}
            style={{ alignItems: "flex-end", margin: 16 }}
            onPress={this.props.navigation.openDrawer}
          >
            <Icon name='bars' size={24} color='#161924' />
          </TouchableOpacity>
        </View>
        <Text style={styles.heading}>{"Create Event"}</Text>

        <View style={styles.inputContainer}>
          {/* <GoogleAPI /> */}
          <TextInput
            value={this.state.eventTitle}
            style={styles.input}
            placeholder={"Title"}
            onChangeText={(eventTitle) => {
              this.setState({ eventTitle });
            }}
          ></TextInput>

          <RNDateTimePicker
            value={this.state.date}
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
            placeholder={"Description"}
            onChangeText={(description) => {
              this.setState({ description });
            }}
          ></TextInput>

          <TouchableHighlight
            style={styles.button}
            onPress={() => this.handleSubmit()}
          >
            <Text style={styles.submitText}>Submit</Text>
          </TouchableHighlight>

          <Button title='Go Back' onPress={() => this.handleGoBack()} />
        </View>
      </SafeAreaView>
    );
  }
}

const description = { height: 155 };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  inputContainer: {
    //backgroundColor:'#f0f8ff',
  },
  heading: {
    fontSize: 40,
  },
  input: {
    width: WIDTH - 55,
    height: 35,
    marginTop: 20,
    backgroundColor: "#f0f8ff",
    borderRadius: 50,
    borderWidth: 1.5,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#6475a5",
    padding: 10,
    borderRadius: 45,
    marginTop: 20,
    borderWidth: 1.5,
  },
  submitText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    bottom: 2,
  },
  navbar: {
    paddingLeft: 300,
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
