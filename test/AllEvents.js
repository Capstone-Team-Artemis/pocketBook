import { Text, TextInput, StyleSheet, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { Component } from 'react';

const DATA = [
    {
        eventTitle: "Welcome to Hogwarts!",
        date: "04/08/21",
        time: "06:00pm - 08:00pm",
        description: "Muggles of pocketbook, finished reading the series? Let’s discuss our favorite scenes, characters, and more! If we have time, let’s take the Sorting Hat quiz in the end to find our houses!",
        host: 1
    }
]

const Item = ({title}) => (
    <View style={styles.item}>
         <Text style={styles.title}>{title}</Text>
    </View>
)

export default function  AllEvents () {

    const renderItem = ({ item }) => (
        <Item title={item.title} />
      );


    return (
        <SafeAreaView>
            <Text>All Events</Text>
        </SafeAreaView>
    )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
      },
      item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 32,
      },
});

export default AllEvents;