// SINGLE EVENT PAGE COMPONENT w/CHAT COMPONENT

import {
  Text,
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  // ImageBackground
} from 'react-native';
import { Button, Card, Surface } from 'react-native-paper';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DateTime } from 'luxon';
import * as Font from 'expo-font';

export default class SingleEventView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
    }
  }

  componentDidMount() {
    this.loadFonts();
  }

  async loadFonts() {
    await Font.loadAsync({
      // Load a font `Roboto` from a static resource
      'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
      'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
    });
    this.setState({ fontsLoaded: true });
  }

  render() {
    const {
      id,
      eventTitle,
      date,
      description,
      startTime,
      endTime,
      hostId,
      image,
    } = this.props.route.params;
    
    // create DateTime instance so can covert to properly formatted string
    const formattedStartTime = DateTime.fromISO(startTime).toLocaleString(
      DateTime.TIME_SIMPLE
    );
    const formattedEndTime = DateTime.fromISO(endTime).toLocaleString(
      DateTime.TIME_SIMPLE
    );
    const formattedDate = DateTime.fromISO(date).toLocaleString(
      DateTime.DATE_FULL
    );

    // Getting current time and date
    const todaysDate = DateTime.now().toLocaleString(DateTime.DATE_FULL);
    const todaysTime = DateTime.now().toLocaleString(DateTime.TIME_SIMPLE);

    if (this.state.fontsLoaded) {
      return (
          <SafeAreaView style={styles.container}>
            {/* Adds Navbar */}
            <View style={styles.navbar}>
                <TouchableOpacity style={{ alignItems: 'flex-end', margin: 16 }} onPress={() => {
                      this.props.navigation.navigate('AllEvents');
                    }}>
                  <Icon  
                    name='arrow-left' 
                    size={24} 
                    color='#161924'
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ alignItems: 'flex-end', margin: 16}}
                  onPress={this.props.navigation.openDrawer}
                >
                  <Icon name="bars" size={24} color="#161924" />
                </TouchableOpacity>
              </View>
            <ScrollView style={styles.scrollView}>
              <Surface style={styles.surface}>
              <Card style={styles.cardContainer}>
                <View style={styles.listContainer}>
                  {/* Adds event info */}
                  <View style={styles.eventData}>
                    <Text style={styles.eventTitle}>{eventTitle}</Text>
                    <Text style={styles.info}>Date: 
                      <Text style={styles.innerText}>{` ${formattedDate}`}</Text>
                    </Text>
                    <Text style={styles.info}>Start Time: 
                      <Text style={styles.innerText}>{` ${formattedStartTime}`}</Text>
                    </Text>
                    <Text style={styles.info}>End Time: 
                      <Text style={styles.innerText}>{` ${formattedEndTime}`}</Text>
                    </Text>
                    <Text style={styles.info}></Text>
                    <Text style={styles.description}>{description}</Text>
                  </View>
                  {/* Adds book image for each event */}
                  <Image
                    source={{
                      uri: image,
                    }}
                    style={styles.image}
                  />
                </View>
                <Text style={styles.liveChat}>
                  ** Live chat shows up below at the exact date and time of the event!
                </Text>
                {/* {todaysDate === formattedDate &&
                todaysTime >= formattedStartTime &&
                todaysTime <= formattedEndTime ? ( */}
                <View style={styles.joinButtonContainer}>
                  <Button
                    onPress={() => {
                      this.props.navigation.navigate('Chat', {
                        title: eventTitle,
                      });
                    }}
                    color="white"
                    accessibilityLabel="Join Now"
                    >
                    <Text style={styles.joinNowText}>Join Now</Text>
                  </Button>
                </View>
                {/* ) : null} */}
              </Card>
              </Surface>
            </ScrollView>
          </SafeAreaView>
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
  },
  eventTitle: {
    fontSize: 30,
    marginBottom: 8,
    fontFamily: 'Roboto-Bold'
  },
  listContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    marginTop: 15,
  },
  eventData: {
    padding: 10,
    width: 250,
  },
  cardContainer: {
    marginTop: 20,
  },
  joinButtonContainer: {
    backgroundColor: '#Ef5c2b',
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 100,
    borderRadius: 15,
    width: 150,
    height: 40,
  },
  goBackText: {
    fontFamily: 'Roboto-Regular'
  },
  joinNowText: {
    fontFamily: 'Roboto-Regular'
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#24aae2',
    width: '100%',
    height: '15%',
    alignItems: 'flex-end'
    },
  surface: {
    elevation: 5
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
  description: {
    fontFamily: 'Roboto-Regular',
    color: 'black',
    fontSize: 15,
  },
  liveChat: {
    fontFamily: 'Roboto-Regular',
    
  }

});
