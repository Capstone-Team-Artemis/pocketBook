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
  } from 'react-native';
  import React, { Component } from 'react';
  import { connect } from 'react-redux';
  import Icon from 'react-native-vector-icons/FontAwesome';
  import RNDateTimePicker from '@react-native-community/datetimepicker';
  import {
    postEvent,
    updateEvent,
    deleteEvent,
  } from "./store/event";
  
  //import GoogleAPI from '../test/GoogleAPI';
  
  const { width: WIDTH } = Dimensions.get('window');
  
  class CreateEvent extends Component {
    constructor(props) {
      super(props);
      //assign variable path to get event information
      const path = this.props.route.params
      //let formatDate = DateTime.fromISO(path.startTime).toLocaleString(DateTime.DATE_FULL)
      // let time = new Date()
      this.state = {
        //if event has id, then we are updating the event, if not we are creating event!
        eventTitle: path.id ? path.eventTitle : "",
        //update parent component to use start and end date
        date: path.id ? path.date : new Date(),
        startTime: path.id ? path.startTime : new Date(),
        endTime: path.id ? path.endTime : new Date(),
        // time: this.props.event.id ? this.props.event.time : new Date(),
        description: path.id ? path.description : "",
        hostId: path.hostId ?  path.hostId : path.userId,
      };
      this.handleSubmit.bind(this);
      this.handleDelete.bind(this);
      this.handleGoBack.bind(this);
    }
  
    //component did update to update auto populate as well.  
    // componentDidUpdate(prevProps) {
    //   console.log("PREV PROPS event Id?", prevProps)
    //   let path = this.props.route.params
    //   //console.log("PREV PROPS. navigation.navigate?", prevProps.navigation.state.params.eventTitle)
    //   if (prevProps.route.params.id !== this.props.route.params.id) {
    //     console.log("component did update")
    //     this.setState({
    //       eventTitle: this.state.eventTitle,
    //       date: this.state.date,
    //       startTime: this.state.startTime,
    //       endTime: this.state.endTime,
    //       description: path.description,
    //     });
    //   }
    // }
    async handleSubmit() {
      //if event id exist then update the event otherwise create an event
      let eventId = this.props.route.params.id;
      let hostId = this.state.hostId
      console.log("props", this.props)
      console.log("this.state", this.state)
      try {
        eventId
          ? await this.props.update(hostId, eventId, { 
            ...this.state,
              date: this.state.date,
              startTime: this.state.startTime.toLocaleTimeString("en", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }),
              endTime: this.state.endTime.toLocaleTimeString('en', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })
           })
          : await this.props.create({
              ...this.state,
              date: this.state.date,
              startTime: this.state.startTime.toLocaleTimeString("en", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }),
              endTime: this.state.endTime.toLocaleTimeString('en', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              }),
            });
        this.props.navigation.navigate('AllEvents');
      } catch (error) {
        console.log(error.response.data);
        Alert.alert("Error", "Please fill out all information");
      }
    }
  
    handleDelete() {
      let eventId = this.props.route.params.id;
      let hostId = this.state.hostId
      this.props.delete(hostId, eventId);
      //after delete, go back to All event page 
      this.props.navigation.navigate("AllEvents");
    }
  
    handleGoBack() {
      this.props.navigation.navigate('AllEvents');
    }
  
    render() {
      const {eventTitle, date, description, startTime, endTime, hostId} = this.props.route.params;
  
      console.log("***PROPS***", this.props.route.params)
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.navbar}>
            <TouchableOpacity
              style={styles.navbar}
              style={{ alignItems: 'flex-end', margin: 16 }}
              onPress={this.props.navigation.openDrawer}
            >
              <Icon name="bars" size={24} color="#161924" />
            </TouchableOpacity>
          </View>
          <Text style={styles.heading}>
            {eventTitle ? "Update Event" : "Create Event"}
          </Text>
  
          <View style={styles.inputContainer}>
            {/* <GoogleAPI /> */}
            <TextInput
              style={styles.input}
              placeholder={"Title"}
              onChangeText={(eventTitle) => {
                this.setState({ eventTitle });
              }}
            >{eventTitle? `${this.state.eventTitle}` : "" }</TextInput>
  
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
              style={[styles.input, description]}
              placeholder={'Description'}
              onChangeText={(description) => {
                this.setState({ description });
              }}
            >{eventTitle? `${this.state.description}` : "" }</TextInput>
  
            <TouchableHighlight
              style={styles.button}
              onPress={() => this.handleSubmit()}
            >
              <Text style={styles.submitText}>Submit</Text>
            </TouchableHighlight>
  
            {eventTitle ? (
              <Button title='Delete Event' onPress={() => this.handleDelete()} />
            ) : (
              <Button title="Go Back" onPress={() => this.handleGoBack()} />
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
      alignItems: 'center',
      justifyContent: 'space-evenly',
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
      backgroundColor: '#f0f8ff',
      borderRadius: 50,
      borderWidth: 1.5,
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#6475a5',
      padding: 10,
      borderRadius: 45,
      marginTop: 20,
      borderWidth: 1.5,
    },
    submitText: {
      color: 'white',
      fontSize: 15,
      fontWeight: 'bold',
      textAlign: 'center',
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
  