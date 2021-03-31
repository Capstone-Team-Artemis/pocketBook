// SINGLE event component (child component of AllEvents component)
import {
  Text,
  StyleSheet,
  View,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import axios from 'axios';
import {DateTime} from 'luxon';

export default class SingleEvent extends React.Component {
  constructor(props) {
    super(props);
    this.unregister = this.unregister.bind(this);
    this.register = this.register.bind(this);
  }
  // UNREGISTER the logged in user from a specific event
  unregister = async () => {
    try {
      // make call to update DB by unregistering user
      await axios.delete(
        `http://localhost:3000/api/events/${this.props.user}/unregister/${this.props.event.id}`
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
        `http://localhost:3000/api/events/${this.props.user}/register/${this.props.event.id}`
      );
      // if successful, need to update store so can trigger re-render -> do this by calling getEvents fx
      this.props.getEvents();
    } catch (error) {
      console.log(error);
    }
  };

  render() {    
    // passed down event, navigate, and dropdown menu status as props from AllEvents componenet
    const {event, navigate, status, user} = this.props;
    // create DateTime instance so can covert to properly formatted string
    const formattedStartTime= DateTime.fromISO(event.startTime).toLocaleString(DateTime.TIME_SIMPLE);
    const formattedEndTime= DateTime.fromISO(event.endTime).toLocaleString(DateTime.TIME_SIMPLE);
    const formattedDate = DateTime.fromISO(event.date).toLocaleString(DateTime.DATE_FULL);
        
    return (     
        <TouchableOpacity onPress={() => navigate.navigate('SingleEventPage', event)}>
            <View style={styles.listContainer} key={event.id}>
                {/* Adds book image for each event */}
                <Image
                    source={{
                    uri: 'https://static.scientificamerican.com/sciam/cache/file/1DDFE633-2B85-468D-B28D05ADAE7D1AD8_source.jpg?w=590&h=800&D80F3D79-4382-49FA-BE4B4D0C62A5C3ED',
                    }}
                    style={styles.image}
                />
                {/* Adds event info for each event */}
                <View style={styles.eventData}>
                    <Text style={styles.eventTitle}>{event.eventTitle}</Text>
                    <Text style={styles.date}>Date: {formattedDate}</Text>
                    <Text style={styles.time}>Start Time: {formattedStartTime}</Text>
                    <Text style={styles.time}>End Time: {formattedEndTime}</Text>
                    <Text style={styles.description}>
                    Description: {event.description}
                    </Text>
                </View>
                {/* if logged in user is the HOST, button can only say 'Edit/Delete'.
                        if not host, button can also say 'Un/Register' */}
                <View style={styles.registerButtonContainer}>
                    {user === event.hostId ? (
                    <Button
                        // 'Edit/Delete' button takes you to EditEvent page
                        title={'Edit/Delete'}
                        onPress={() => {
                        navigate.navigate('CreateEvent', event); // needs to be switched to EditEvent once that page is created
                        }}
                        color="white"
                        accessibilityLabel="Status"
                    />
                    ) : (
                    <Button
                        // check the event obj to see if logged-in user exists in the associated user array
                        // if user exists, that means user is attending and button should give 'Unregister' option
                        // else, the user isn't registered and should have the button option to 'Register' for the event
                        title={event.users[0] ? 'Unregister' : 'Register'}
                        onPress={() => {
                        event.users[0] ? this.unregister() : this.register();
                        }}
                        color="white"
                        accessibilityLabel="Status"
                    />
                    )}       
                </View>
            </View>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    marginHorizontal: 10,
  },
  image: {
    padding: 0,
    width: 100,
    height: 100,
    marginTop: 10,
    marginLeft: 10,
  },
  eventTitle: {
    fontSize: 20,
    marginBottom: 2,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 15,
    marginBottom: 5,
  },
  time: {
    fontSize: 15,
    marginBottom: 5,
  },
  description: {
    fontSize: 15,
    marginBottom: 5,
  },
  listContainer: {
    flexDirection: 'row',
    borderStyle: 'solid',
    borderColor: 'black',
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
    backgroundColor: '#6475a5',
    borderRadius: 15,
    padding: 0.8,
    width: 130,
    height: 38,
    marginLeft: 95,
  },
});
