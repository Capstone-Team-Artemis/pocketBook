import { Text, TextInput, StyleSheet, View, SafeAreaView, Dimensions, TouchableHighlight} from 'react-native';
import React, { Component } from 'react';
//move axios when we create redux store
import axios from 'axios'

import GoogleAPI from '../test/GoogleAPI';

const { width: WIDTH} = Dimensions.get('window')

export default class CreateEvent extends Component {
    constructor(props){
        super(props)
        this.state = {
            title : '',
            date: '',
            time: '',
            description: '',
            host: 1
        }
        this.handleSubmit.bind(this)
    }
    async handleSubmit() {
        //post new events
        //POST api/events/:userId/createEvent
        try {
            let newEventInfo = this.state
            console.log("newEventInfo", newEventInfo)
            const newEvent = await axios.post(`/api/events/1/createEvent`, newEventInfo)
            console.log("newEvent", newEvent)
        } catch (error) {
            console.log(error)
        }
    }

    render() {

        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.heading}>CreateEvent</Text>
                <View style={styles.inputContainer}>
                {/* <GoogleAPI /> */}
                <TextInput style={styles.input} placeholder={'Title'}  onChangeText={(title) => {this.setState({ title })}}></TextInput>

                <TextInput style={styles.input} placeholder={'Date'} value={this.state.date} onChangeText={(date) => {this.setState({ date })}}></TextInput>
                
                <TextInput style={styles.input} placeholder={'Time'} value={this.state.time} onChangeText={(time) => {this.setState({ time })}}></TextInput>
                
                <TextInput style={[styles.input, description]} placeholder={'Description'} onChangeText={(description) => {this.setState({ description })}}></TextInput>
                
                <TouchableHighlight style={styles.button} onPress={() => this.handleSubmit()}>
                <Text>Submit</Text>
                </TouchableHighlight>
                </View>
            </SafeAreaView>
        )
    }
}

const description = {height: 155}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    inputContainer: {
        //backgroundColor:'#f0f8ff',
    },
    heading: {
        fontSize: 40,
    },
    input: {
        width: WIDTH -55,
        height: 25,
        marginTop: 20,
        backgroundColor:'#f0f8ff',
    },
    button: {
        alignItems: "center",
        backgroundColor: `#e9967a`,
        padding: 10,
        borderRadius: 45,
        marginTop: 20
    }

})
