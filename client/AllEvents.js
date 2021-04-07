import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  // Button,
  TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { connect } from 'react-redux';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import SingleEvent from './SingleEvent';
import * as Font from 'expo-font';
// import thunk
import { fetchEvents } from './store/events';

export class AllEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'Upcoming', // state for dropdown menu
      userId: Number(this.props.route.params.userId), // convert from string
      fontsLoaded: false,
    };
  }
  async loadFonts() {
    await Font.loadAsync({
      // Load a font from a static resource
      'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
      'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFonts();
    // get all events (regardless of attending/created status) for a specific user
    this.props.getEvents(this.state.userId);
  }

  render() {
    if (this.state.fontsLoaded) {
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
                onPress={() => {
                  this.props.navigation.navigate('CreateEvent');
                }}
                color="white"
                accessibilityLabel="Create Event"
              >
                <Text style={styles.createText}>Create Event </Text>
              </Button>
            </View>
            {/* Adds Dropdown menu */}
            <DropDownPicker
              style={{ backgroundColor: '#fafafa' }}
              itemStyle={{ justifyContent: 'flex-start' }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              containerStyle={{ height: 40 }}
              labelStyle={{ fontFamily: 'Roboto-Medium' }}
              activeLabelStyle={{ color: 'red' }}
              defaultValue={this.state.status}
              onChangeItem={(item) =>
                this.setState({
                  status: item.value,
                })
              }
              items={[
                { label: 'Upcoming Events', value: 'Upcoming' },
                { label: 'Attending Events', value: 'Attending' },
                { label: 'Created Events', value: 'Created' },
              ]}
            />
            {/* Adds event list */}
            <View>
              {this.props.events ===
              'There are currently no upcoming events!' ? (
                <Text style={styles.noEvents}>
                  There are currently no upcoming events!
                </Text>
              ) : (
                // depending on the dropdown menu status and user id, the event list displayed will vary
                // a SINGLE event should be displayed:
                // if dropdown status is 'Upcoming" -OR-
                // if dropdown status is 'Attending' & logged in user's id is in the users array for that specific event obj -OR-
                // if dropdown status is 'Created' & logged in user's userId is the same value as the hostId for that specific event obj
                this.props.events
                  .filter((event) => {
                    return (
                      this.state.status === 'Upcoming' ||
                      (this.state.status === 'Attending' && event.users[0]) ||
                      (this.state.status === 'Created' &&
                        this.state.userId === event.hostId)
                    );
                    // then map to render out each filtered event
                  })
                  .map((event) => (
                    // pass Props to SingleEvent component
                    <SingleEvent
                      key={event.id}
                      event={event}
                      user={this.state.userId}
                      status={this.state.status}
                      navigate={this.props.navigation}
                      getEvents={() => this.props.getEvents(this.state.userId)}
                      userId={this.props.route.params.userId}
                    />
                  ))
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    } else {
      return null;
    }
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
    backgroundColor: 'white',
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
  createButtonContainer: {
    backgroundColor: '#Ef5c2b',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 15,
    width: 170,
    height: 40,
  },
  createText: {
    fontFamily: 'Roboto-Regular',
  },
  eventData: {
    padding: 10,
    width: 250,
  },
  noEvents: {
    fontSize: 20,
  },
});
