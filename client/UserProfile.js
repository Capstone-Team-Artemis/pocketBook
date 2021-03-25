import React, { userState } from 'react'
import { SafeAreaView, ScrollView, View, Text, StyleSheet, StatusBar, Dimensions} from 'react-native'


const { width: WIDTH } = Dimensions.get('window')

export default UserProfile = (props) => {
    console.log("props",props)
    return (
        <SafeAreaView style ={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View>
                <Text style={styles.heading}>UserName</Text>
                </View>

                <View>
                <Text>My Bookshelf</Text>
                </View>

                <View>
                <Text>Currently Reading</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        paddingTop: StatusBar.currentHeight,
        justifyContent: "space-evenly",
        alignItems: "center"
        
    },
    heading: {
        fontSize: 40,
    },
    scrollView:{
        backgroundColor: '#f0f8ff',
        marginHorizontal:1,
        width: WIDTH - 20
    },
    // bookList: {
    //     flexDirection: 'row'
    // }
})

//export default UserProfile