import { Text, TextInput, StyleSheet, View, SafeAreaView, Dimensions, TouchableHighlight} from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { postEvent } from './store/event'

//import GoogleAPI from '../test/GoogleAPI';

const { width: WIDTH } = Dimensions.get('window')

class CreateEvent extends Component {
    constructor(props){
        super(props)
        this.state = {
            eventTitle : '',
            date: '',
            time: '',
            description: '',
            host: 1
        }
        this.handleSubmit.bind(this)
    }
    handleSubmit() {
        let newEventInfo = this.state
        console.log("newEventInfo", newEventInfo)
        this.props.create({...this.state})
    }

    render() {
        console.log("props in createEvent", this.props)
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.heading}>CreateEvent</Text>
                <View style={styles.inputContainer}>
                {/* <GoogleAPI /> */}
                <TextInput style={styles.input} placeholder={'Title'}  onChangeText={(eventTitle) => {this.setState({ eventTitle })}}></TextInput>

                <TextInput style={styles.input} placeholder={'Date (mm/dd/yy)'} value={this.state.date} onChangeText={(date) => {this.setState({ date })}}></TextInput>
                
                <TextInput style={styles.input} placeholder={'Time (00:00Am - 00:00pm)'} value={this.state.time} onChangeText={(time) => {this.setState({ time })}}></TextInput>
                
                <TextInput style={[styles.input, description]} placeholder={'Description'} onChangeText={(description) => {this.setState({ description })}}></TextInput>
                
                <TouchableHighlight style={styles.button} onPress={() => this.handleSubmit()}>
                <Text style={styles.submitText}>Submit</Text>
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
        height: 35,
        marginTop: 20,
        backgroundColor:'#f0f8ff',
        borderRadius: 50,
        borderWidth: 1.5,
    },
    button: {
        alignItems: "center",
        backgroundColor: '#6475a5',
        padding: 10,
        borderRadius: 45,
        marginTop: 20,
        borderWidth: 1.5,
    },
    submitText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        bottom: 2,
      },

})
// const mapState = (state) => {
//     console.log("map state", state)
// }

const mapDispatch = dispatch => {
    return {
      create: (newEventInfo) => dispatch(postEvent(newEventInfo))
    }
  }
export default connect(null, mapDispatch)(CreateEvent)