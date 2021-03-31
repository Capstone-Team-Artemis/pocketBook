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
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  postEvent,
  updateEvent,
  deleteEvent,
} from "./store/event";

//import GoogleAPI from '../test/GoogleAPI';

const { width: WIDTH } = Dimensions.get("window");

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventTitle: this.props.navigation.state.params.id ? this.props.navigation.state.params.eventTitle : "",
      //update parent component to use start and end date
      date: this.props.event.id ? this.props.navigation.state.params.date : new Date(),
      startTime: this.props.event.id ? this.props.event.date : new Date(),
      endTime: this.props.event.id ? this.props.event.date : new Date(),
      // time: this.props.event.id ? this.props.event.time : new Date(),
      description: this.props.navigation.state.params.id ? this.props.navigation.state.params.description : "",
      hostId: this.props.navigation.state.params.hostId ?  this.props.navigation.state.params.hostId : this.props.navigation.state.params.users.id,
    };
    this.handleSubmit.bind(this);
    this.handleDelete.bind(this);
    this.handleGoBack.bind(this);
  }

  // componentDidUpdate(prevProps) {
  //   console.log("PREV PROPS event Id?", prevProps.navigation.state.params.id)
  //   console.log("PREV PROPS. navigation.navigate?", prevProps.navigation.state.params.eventTitle)
    // if (!prevProps.navigation.state.params.id && this.props.navigation.state.params.id) {
    //   console.log("component did update")
    //   // this.setState({
    //   //   eventTitle: this.props.navigation.state.params.eventTitle,
    //   //   date: this.props.event.eventTitle,
    //   //   time: this.props.event.eventTitle,
    //   //   description: prevProps.navigation.state.params.description,
    //   //   host: this.props.navigation.state.params.hostId,
    //   // });
    // }
  //}
  async handleSubmit() {
    //if event id exist then update the event otherwise create an event
    let eventId = this.props.navigation.state.params.id;
    let hostId = this.state.hostId
    console.log("date", this.props.navigation.state.params.date)
    console.log("this.state", this.state)
    try {
      eventId
        ? await this.props.update(hostId, eventId, { ...this.state })
        : await this.props.create({
            ...this.state,
            date: this.state.date,
            startTime: this.state.startDate.toLocaleTimeString("en", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }),
            endTime: this.state.endDate.toLocaleTimeString("en", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }),
          });
      this.props.navigation.navigate("AllEvents");
    } catch (error) {
      console.log(error.response.data);
      Alert.alert("Error", "Please fill out all information");
    }
  }

  handleDelete() {
    let eventId = this.props.navigation.state.params.id;
    let hostId = this.state.hostId
    console.log("hostid",hostId)
    this.props.delete(hostId, eventId);
    this.props.navigation.navigate("AllEvents");
  }

  handleGoBack() {
    this.props.navigation.navigate("AllEvents");
  }

  render() {
    //const eventPath = this.props.navigation.state.params.eventTitle || !1;
    console.log("***EVENT PATH***", this.props.navigation.state.params.id)
    console.log("***Event ID ***", this.props.navigation.state.params.id )
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.navbar}>
          <TouchableOpacity
            style={styles.navbar}
            style={{ alignItems: "flex-end", margin: 16 }}
            //onPress={this.props.navigation.openDrawer}

          >
            <Icon name='bars' size={24} color='#161924' />
          </TouchableOpacity>
        </View>
        <Text style={styles.heading}>
          {this.props.navigation.state.params.id ? "Update Event" : "Create Event"}
        </Text>

        <View style={styles.inputContainer}>
          {/* <GoogleAPI /> */}
          <TextInput
            style={styles.input}
            placeholder={this.props.navigation.state.params.id? "this.state.eventTitle" : "Title"}
            onChangeText={(eventTitle) => {
              this.setState({ eventTitle });
            }}
          >{this.props.navigation.state.params.id? `${this.state.eventTitle}` : "" }</TextInput>

          <DateTimePicker
            value={this.state.date}
            mode='date'
            display='default'
            onChange={(event, selectedDate) =>
              this.setState({
                startDate: selectedDate,
                endDate: selectedDate,
              })
            }
          />

          {/* <TextInput
            style={styles.input}
            placeholder={"Date (mm/dd/yy)"}
            value={this.state.date}
            onChangeText={(date) => {
              this.setState({ date });
            }}
          ></TextInput> */}
          <DateTimePicker
            value={this.state.startTime}
            mode='time'
            display='default'
            onChange={(event, selectedTime) =>
              this.setState({
                startDate: selectedTime,
              })
            }
          />
          <DateTimePicker
            value={this.state.endTime}
            mode='time'
            display='default'
            onChange={(event, selectedTime) =>
              this.setState({
                endDate: selectedTime,
              })
            }
          />

          {/* <TextInput
            style={styles.input}
            placeholder={"Time (00:00Am - 00:00pm)"}
            value={this.state.time}
            onChangeText={(time) => {
              this.setState({ time });
            }}
          ></TextInput> */}

          <TextInput
            style={[styles.input, description]}
            placeholder={"Description"}
            onChangeText={(description) => {
              this.setState({ description });
            }}
          >{this.props.navigation.state.params.id? `${this.state.description}` : "" }</TextInput>

          <TouchableHighlight
            style={styles.button}
            onPress={() => this.handleSubmit()}
          >
            <Text style={styles.submitText}>Submit</Text>
          </TouchableHighlight>

          {this.props.navigation.state.params.id ? (
            <Button title='Delete Event' onPress={() => this.handleDelete()} />
          ) : (
            <Button title='Go Back' onPress={() => this.handleGoBack()} />
          )}
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
    update: (userId, eventId, editedInfo) =>
      dispatch(updateEvent(userId, eventId, editedInfo)),
    delete: (userId, eventId) => dispatch(deleteEvent(userId, eventId)),
  };
};
export default connect(mapState, mapDispatch)(CreateEvent);
