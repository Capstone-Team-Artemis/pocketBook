import { Text, StyleSheet, View, ScrollView, SafeAreaView, Button, Image } from 'react-native';
// import DropdownMenu from 'react-native-dropdown-menu';
import { connect } from "react-redux";
import React from 'react';

// import thunk creator
import {fetchEvents} from './store/events';

export class AllEvents extends React.Component {
    
    componentDidMount() {
        this.props.getEvents();
    }
    
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.buttonContainer}>
                        <Button
                        title='Create Event'
                        onPress={() => {this.props.navigation.navigate("CreateEvent")}}
                        color='white'
                        accessibilityLabel="Create Event"
                        />
                    </View>
                    <View >
                        {this.props.events.map((event) => (
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
                                <Text style={styles.description}>Description: {event.description}</Text>
                            </View>
                        </View>
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const mapState = (state) => {
    console.log('mapState: ',state)

    return {
      events: state.events.all
    };
  };
  
const mapDispatch = (dispatch) => {
    console.log('mapDispatch: ', dispatch)
    return {
        getEvents: () => dispatch(fetchEvents()),
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
        marginLeft: 10
    },
    eventTitle: {
        fontSize: 20,
        marginBottom: 2, 
        fontWeight: 'bold'
    },
    date: {
        fontSize: 15,
        marginBottom: 5
    },
    time: {
        fontSize: 15,
        marginBottom: 5
    },
    description: {
        fontSize: 15,
        marginBottom: 5
    },
    buttonContainer: {
        backgroundColor: '#6475a5',
        marginTop: 20,
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
        marginBottom: 15
    },
    eventData: {
        padding: 10,
        width: 250
    }

    // attendingButtonContainer: {
    // backgroundColor: '#808080',
    // borderRadius: 15,
    // padding: 0.8,
    // width: 100,
    // height: 40
    // }
});
