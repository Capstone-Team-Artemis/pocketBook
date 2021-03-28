import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { connect } from 'react-redux';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import SingleEvent from './SingleEvent';
// import thunk creator
import { fetchEvents } from './store/events';

export class AllEvents extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'Upcoming', // state for dropdown menu
      userId: 1  // hard coded 1 => userId (Selina)  ** need to change to be the variable representing the user Id
    }
  }
  
  componentDidMount() {
    this.props.getEvents(this.state.userId);  // hard coded above as 1 => userId (Selina)
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {/* Adds Navbar */}
          <TouchableOpacity
            style={{ alignItems: 'flex-end', margin: 16 }}
            onPress={this.props.navigation.openDrawer}
          >
            <Icon name="bars" size={24} color="#161924" />
          </TouchableOpacity>
          {/* Adds create event button */}
          <View style={styles.createButtonContainer}>
            <Button
              title="Create Event"
              onPress={() => {
                this.props.navigation.navigate('CreateEvent');
              }}
              color="white"
              accessibilityLabel="Create Event"
            />
          </View>
          {/* Adds Dropdown menu */}
          <DropDownPicker
              style={{backgroundColor: '#fafafa'}}
              itemStyle={{justifyContent: 'flex-start'}}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              containerStyle={{ height: 40 }}
              activeLabelStyle={{color: 'red'}}
              defaultValue={this.state.status}
              onChangeItem={item => this.setState({
                status: item.value
              })}
              items={[
                { label: 'Upcoming Events', value: 'Upcoming' },
                { label: 'Attending Events', value: 'Attending' },
                { label: 'Created Events', value: 'Created' },
              ]}
          />
          {/* Adds event list */}
          <View>
            {this.props.events === 'There are currently no upcoming events!' ? (
              <Text style={styles.noEvents}>
                There are currently no upcoming events!
              </Text>
            ) : (
              // depending on the dropdown menu status and user id, the events displayed will vary
              // a single event should be displayed:
                // if dropdown status is 'Upcoming" -OR-
                // if dropdown status is 'Attending' & logged in user's userId is in the userEvents array that is the specific event obj -OR-
                // if dropdown status is 'Created & logged in user's userId is the same value as the hostId in the specific event obj
                this.props.events.filter(event => {
                  console.log('event obj: ', event)
                return this.state.status === 'Upcoming' || 
                (this.state.status === 'Attending' && event.users[0]) || 
                (this.state.status === 'Created' && this.state.userId === event.hostId)
                // then map to render out each filtered event
              }).map((event) => (
                <SingleEvent key={event.id} event={event} user={this.state.userId} status={this.state.status}/> 
                // <View style={styles.listContainer} key={event.id}>
                //   <Image
                //     source={{
                //       uri: 'https://i.ibb.co/rpJ7vjb/signupbook.png',
                //     }}
                //     style={styles.image}
                //   />
                //   <View style={styles.eventData}>
                //     <Text style={styles.eventTitle}>{event.eventTitle}</Text>
                //     <Text style={styles.date}>Date: {event.date}</Text>
                //     <Text style={styles.time}>Time: {event.time}</Text>
                //     <Text style={styles.description}>
                //       Description: {event.description}
                //     </Text>
                //     {/* Adds not/attending, edit/delete button */}
                //     <View style={styles.attendingButtonContainer}>
                //       <Button
                //         title={this.state.status === 'Upcoming' ? 'Attending' : this.state.status === 'Attending' ? 'Not Attending' : 'Edit/Delete'}
                //         onPress={() => {
                //           this.state.status === 'Created' ?
                //           this.props.navigation.navigate('CreateEvent') :
                //           null 

                //         }}
                //         color="white"
                //         accessibilityLabel="Status"
                //       />
                //     </View>
                //   </View>
                // </View>
              ))
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapState = (state) => {
  return {
    events: state.events.all,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getEvents: (userId) => dispatch(fetchEvents(userId)),
  };
};

export default connect(mapState, mapDispatch)(AllEvents);

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
