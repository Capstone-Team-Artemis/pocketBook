// SINGLE event component (child component of AllEvents component)
import {
  Alert,
  Text,
  StyleSheet,
  View,
  // Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import React from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';
import * as Font from 'expo-font';
// import thunk 
import { deleteEvent } from './store/events';

//SingleEvent component
class SingleEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
    }
    this.unregister = this.unregister.bind(this);
    this.register = this.register.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.openTwoButtonAlert = this.openTwoButtonAlert.bind(this);
  }

  componentDidMount() {
    this.loadFonts();
  }

  async loadFonts() {
    await Font.loadAsync({
      // Load a font `Roboto` from a static resource
      'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
      'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
    });
    this.setState({ fontsLoaded: true });
  }

  // UNREGISTER the logged in user from a specific event
  unregister = async () => {
    try {
      // make call to update DB by unregistering user
      await axios.delete(
        `https://pocketbook-gh.herokuapp.com/api/events/${this.props.user}/unregister/${this.props.event.id}`
      );
      // if successful, need to update store so can trigger re-render -> do this by calling getEvents fx
      const res = await this.props.getEvents();
    } catch (error) {
      console.log(error);
    }
  };

  // REGISTER the logged in user for a specific event
  register = async () => {
    try {
      // make call to update DB by registering user
      await axios.post(
        `https://pocketbook-gh.herokuapp.com/api/events/${this.props.user}/register/${this.props.event.id}`
      );
      // if successful, need to update store so can trigger re-render -> do this by calling getEvents fx
      this.props.getEvents();
    } catch (error) {
      console.log(error);
    }
  };

  handleDelete() {
    let hostId = this.props.event.hostId;
    let eventId = this.props.event.id;
    this.props.delete(hostId, eventId);
  }

  openTwoButtonAlert = () => {
    Alert.alert(
      'Delete Event',
      'Are you sure you want to delete this event?',
      [
        { text: 'Delete', onPress: () => this.handleDelete() },
        {
          text: 'Cancel',
          onPress: () => console.log('No button clicked'),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  render() {
    // passed down event, navigate, and dropdown menu status as props from AllEvents componenet
    const { event, navigate, status, user } = this.props;
    // create DateTime instance so can covert to properly formatted string
    const formattedStartTime = DateTime.fromISO(event.startTime).toLocaleString(
      DateTime.TIME_SIMPLE
    );
    const formattedEndTime = DateTime.fromISO(event.endTime).toLocaleString(
      DateTime.TIME_SIMPLE
    );
    const formattedDate = DateTime.fromISO(event.date).toLocaleString(
      DateTime.DATE_FULL
    );
    if (this.state.fontsLoaded) {
      return (
        <TouchableOpacity
          onPress={() => navigate.navigate('SingleEventView', event)}
        >
          <View style={styles.listContainer} key={event.id}>
            {/* Adds book image for each event */}
            <Image source={{ uri: event.image }} style={styles.image} />
            {/* Adds event info for each event */}
            <View style={styles.eventData}>
              <Text style={styles.eventTitle}>{event.eventTitle}</Text>
              <Text style={styles.date}>Date: {formattedDate}</Text>
              <Text style={styles.time}>Start Time: {formattedStartTime}</Text>
              <Text style={styles.time}>End Time: {formattedEndTime}</Text>
              <Text style={styles.description}>
                Description: {event.description}
              </Text>

              {/* if logged in user is the HOST, button can only say 'Edit/Delete'.
                          if not host, button can also say 'Un/Register' */}
              <View style={styles.registerButtonContainer}>
                {user === event.hostId ? (
                  <Button
   onPress={() => {
                    this.openTwoButtonAlert();
                  }}
                  color="black"
                  accessibilityLabel="Status">
                    Delete 
                  </Button>
                ) : (
                  <Button onPress={() => {
                    event.users[0] ? this.unregister() : this.register();
                  }}
                  color="black"
                  accessibilityLabel="Status">
                    {/* // check the event obj to see if logged-in user exists in the associated user array
                    // if user exists, that means user is attending and button should give 'Unregister' option
                    // else, the user isn't registered and should have the button option to 'Register' for the event */}
                    {event.users[0] ? 'Unregister' : 'Register'}
                  </Button>
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  scrollView: {
    marginHorizontal: 10,
  },
  image: {
    padding: 0,
    width: 100,
    height: 160,
    marginTop: 10,
    marginLeft: 10,
  },
  eventTitle: {
    fontSize: 20,
    marginBottom: 2,
    fontFamily: 'Roboto-Bold'

  },
  date: {
    fontSize: 15,
    marginBottom: 5,
    fontFamily: 'Roboto-Regular'
  },
  time: {
    fontSize: 15,
    marginBottom: 5,
    fontFamily: 'Roboto-Regular'
  },
  description: {
    fontSize: 15,
    marginBottom: 5,
    fontFamily: 'Roboto-Regular'
  },
  listContainer: {
    flexDirection: 'row',
    borderStyle: 'solid',
    borderColor: '#Ef5c2b',
    borderWidth: 1,
    marginBottom: 15,
    marginTop: 15,
  },
  eventData: {
    padding: 10,
    width: 250,
  },
  noEvents: {
    fontSize: 20,
  },
  registerButtonContainer: {
    backgroundColor: '#24aae2',
    borderRadius: 15,
    padding: 0.8,
    width: 135,
    height: 38,
    marginLeft: 90,
  },
});

const mapDispatch = (dispatch) => {
  return {
    delete: (userId, eventId) => dispatch(deleteEvent(userId, eventId)),
  };
};
export default connect(null, mapDispatch)(SingleEvent);
