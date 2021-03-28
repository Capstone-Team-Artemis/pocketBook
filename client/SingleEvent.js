import {
    Text,
    StyleSheet,
    View,
    Button,
    Image,
  } from 'react-native'; 
import React from 'react';
  
export default class SingleEvent extends React.Component {
    constructor(props) {
        super(props);
        this.unregister = this.unregister.bind(this);
        this.register = this.register.bind(this);
    }
    // unregister the logged in user from a specific event
    unregister = async () => {
        await axios.delete(`http://localhost:3000/api/events/${this.props.user.id}/unregister/${this.props.event.id}`)
    };

    // register the logged in user for a specific event
    register = async () => {
        await axios.post(`http://localhost:3000/api/events/${this.props.user.id}/register/${this.props.event.id}`);
    };

    render() {
        const event = this.props.event;
        const user = this.props.user;
        return (       
        <View style={styles.listContainer} key={event.id}>
        <Image
            source={{
            uri: 'https://i.ibb.co/rpJ7vjb/signupbook.png',
            }}
            style={styles.image}
        />
        <View style={styles.eventData}>
            <Text style={styles.eventTitle}>{event.eventTitle}</Text>
            <Text style={styles.date}>Date: {event.date}</Text>
            <Text style={styles.time}>Time: {event.time}</Text>
            <Text style={styles.description}>
            Description: {event.description}
            </Text>
            {/* Adds not/attending, edit/delete button */}
            <View style={styles.attendingButtonContainer}>
            <Button
                // check the event obj to see if logged-in user exists in returned event obj
                    // if user exists, that means user is attending and button should give unregister option
                    // else the user isn't registered and should have the option to register for the event
                title={this.props.event.users[0] ? 'Unregister' : 'Register'}
                onPress={() => {
                    this.props.event.users[0] ? this.unregister() : this.register()
                }}
                color="white"
                accessibilityLabel="Status"
            />
            </View>
        </View>
        </View>
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
createButtonContainer: {
    backgroundColor: '#6475a5',
    marginBottom: 20,
    borderRadius: 15,
    width: 125,
    height: 40,
},
listContainer: {
    flexDirection: 'row',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 15,
    marginTop: 15
},
eventData: {
    padding: 10,
    width: 250,
},
noEvents: {
    fontSize: 20,
},
attendingButtonContainer: {
    backgroundColor: '#6475a5',
    borderRadius: 15,
    padding: 0.8,
    width: 130,
    height: 38,
    marginLeft: 95
    }
  });