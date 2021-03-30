import {
    Text,
    StyleSheet,
    View,
    Image,
    SafeAreaView,
    ScrollView,
  } from 'react-native'; 
import React from 'react';


export default class SingleEventPage extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        // console.log('props: ', this.props.navigation.state.params)
        const {eventTitle, date, description, startTime, endTime, hostId} = this.props.navigation.state.params
        
        console.log(description)
        
        return (     
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.listContainer}>
                        {/* Adds book info for each event */}
                        <View style={styles.eventData}>
                            <Text style={styles.date}>{eventTitle}</Text> 
                            <Text style={styles.date}>Date: {date}</Text>
                            <Text style={styles.time}>Start Time: {startTime}</Text>
                            <Text style={styles.time}>End Time: {endTime}</Text>
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
    marginTop: 15
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
    marginLeft: 95
    }
  });