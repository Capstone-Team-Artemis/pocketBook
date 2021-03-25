import React, { userState } from 'react'
import { SafeAreaView, ScrollView, View, Text, StyleSheet, StatusBar} from 'react-native'

export default UserProfile = () => {
    return (
        <SafeAreaView style ={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View>
                <Text>UserName</Text>
                </View>

                <View>
                <Text>My Bookshelf</Text>
                </View>

                <View>
                <Text>Currently Reading</Text>
                <ScrollView horizontal={true}>
                    {/* add book info */}
                <View style={styles.bookList}>
                    {/* map out book list here */}
                </View>
                </ScrollView>
                </View>

                <View>
                <Text>To Read</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        paddingTop: StatusBar.currentHeight
    },
    scrollView:{
        backgroundColor: 'pink',
        marginHorizontal:10,
    },
    bookList: {
        flexDirection: 'row'
    }
})

//export default UserProfile