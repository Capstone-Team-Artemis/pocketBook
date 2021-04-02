// SINGLE EVENT PAGE COMPONENT w/CHAT COMPONENT

import {
  Text,
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DateTime } from 'luxon';

export default class SingleEventView extends React.Component {
  render() {
      const {eventTitle, date, description, startTime, endTime, hostId} = this.props.route.params;
      
      // create DateTime instance so can covert to properly formatted string
      const formattedStartTime= DateTime.fromISO(startTime).toLocaleString(DateTime.TIME_SIMPLE);
      const formattedEndTime= DateTime.fromISO(endTime).toLocaleString(DateTime.TIME_SIMPLE);
      const formattedDate = DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL);
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
                  <View style={styles.listContainer}>
                      {/* Adds event info */}
                      <View style={styles.eventData}>
                          <Text style={styles.eventTitle}>{eventTitle}</Text> 
                          <Text style={styles.date}>Date: {formattedDate}</Text>
                          <Text style={styles.startTime}>Start Time: {formattedStartTime}</Text>
                          <Text style={styles.endTime}>End Time: {formattedEndTime}</Text>
                          <Text style={styles.description}>{description}</Text>
                      </View> 
                      {/* Adds book image for each event */}
                      <Image
                          source={{
                          uri: 'https://static.scientificamerican.com/sciam/cache/file/1DDFE633-2B85-468D-B28D05ADAE7D1AD8_source.jpg?w=590&h=800&D80F3D79-4382-49FA-BE4B4D0C62A5C3ED',
                          }}
                          style={styles.image}
                      />
                  </View> 
                  <Text>*Live chat shows up below at the exact date and time of the event!</Text>
                  <Button
                      title={'Join Now'}
                      style={styles.clickMe}
                      onPress={() => {this.props.navigation.navigate('Chat', {title: eventTitle})}}
                      color= '#e9967a'
                      accessibilityLabel="Join Now"
                      /> 
                  <Button title="Go Back" onPress={() => {this.props.navigation.navigate('AllEvents')}} />
          </ScrollView>
      </SafeAreaView>
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
    marginLeft: 8,
  },
  eventTitle: {
    fontSize: 30,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 15,
    marginBottom: 5,
  },
  startTime: {
    fontSize: 15,
    marginBottom: 5,
  },
  endTime: {
    fontSize: 15,
    marginBottom: 5,
  },
  description: {
    fontSize: 15,
    marginBottom: 5,
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
  clickMe: {
    backgroundColor: '#ff00ff',
    borderRadius: 15,
    padding: 0.8,
    width: 200,
    height: 100,
    marginLeft: 95,
  },
});
