// SINGLE event component (child component of AllEvents component)
import {
  Alert,
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Button, Card, Surface } from 'react-native-paper';
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
      'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
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
        <Surface style={styles.surface}>
        <Card style={styles.cardContainer}>
          <TouchableOpacity
            onPress={() => navigate.navigate('SingleEventView', event)}
          >
            <View style={styles.listContainer} key={event.id}>
              {/* Adds book image for each event */}
              <Card.Content style={styles.cardContent}>
                  <Image source={{ uri: event.image }} style={styles.image} /> 
                {/* Adds event info for each event */}
                <View style={styles.eventData}>
                  <Text style={styles.eventTitle}>{event.eventTitle}</Text>
                  <Text style={styles.info}>Date: 
                      <Text style={styles.innerText}>{` ${formattedDate}`}</Text>
                  </Text>
                  <Text style={styles.info}>Start Time: 
                      <Text style={styles.innerText}>{` ${formattedStartTime}`}</Text>
                  </Text>
                  <Text style={styles.info}>End Time: 
                      <Text style={styles.innerText}>{` ${formattedEndTime}`}</Text>
                  </Text>
                  <Text style={styles.info}>Description: 
                    <Text style={styles.innerText}>{` ${event.description}`}</Text>
                  </Text>

                  {/* if logged in user is the HOST, button can only say 'Edit/Delete'.
                              if not host, button can also say 'Un/Register' */}
                  <View style={styles.registerButtonContainer}>
                    {user === event.hostId ? (
                      <Button
                      onPress={() => {
                        this.openTwoButtonAlert();
                      }}
                      color="white"
                      accessibilityLabel="Status">
                      <Text style={styles.deleteText}>Delete </Text>
                      </Button>
                    ) : (
                      <Button onPress={() => {
                        event.users[0] ? this.unregister() : this.register();
                      }}
                      color="white"
                      accessibilityLabel="Status">
                        {/* // check the event obj to see if logged-in user exists in the associated user array
                        // if user exists, that means user is attending and button should give 'Unregister' option
                        // else, the user isn't registered and should have the button option to 'Register' for the event */}
                        <Text style={styles.registerText}>{event.users[0] ? 'Unregister' : 'Register'} </Text>
                      </Button>
                    )}
                  </View>
                </View>
              </Card.Content>
            </View>
          </TouchableOpacity>
        </Card>
        </Surface>
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
    marginLeft: 3,
  },
  eventTitle: {
    fontSize: 20,
    marginBottom: 4,
    fontFamily: 'Roboto-Bold'
  },
  info: {
    fontFamily: 'Roboto-Regular',
    color: '#E92228',
    fontSize: 15,
    marginBottom: 5
  },
  innerText: {
    fontFamily: 'Roboto-Regular',
    color: 'black',
    fontSize: 15,
    marginBottom: 5
  },
  eventData: {
    padding: 10,
    width: 200,
  },
  noEvents: {
    fontSize: 20,
  },
  deleteText: {
    fontFamily: 'Roboto-Regular',
  },
  registerText: {
    fontFamily: 'Roboto-Regular',
  },
  registerButtonContainer: {
    backgroundColor: '#24aae2',
    borderRadius: 15,
    padding: 0.8,
    width: 135,
    height: 38,
    marginTop: 10,
    marginLeft: 50,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10
  },
  cardContent: {
    flexDirection: 'row'
  },
  surface: {
    elevation: 15
  }
});

const mapDispatch = (dispatch) => {
  return {
    delete: (userId, eventId) => dispatch(deleteEvent(userId, eventId)),
  };
};
export default connect(null, mapDispatch)(SingleEvent);
