import { Text, TextInput, StyleSheet, View, FlatList, TouchableOpacity, SafeAreaView, StatusBar, Button, Select } from 'react-native';
// import DropdownMenu from 'react-native-dropdown-menu';

import React, { useState } from 'react';

const DATA = [
    {
        id: 1,
        eventTitle: "Welcome to Hogwarts!",
        date: "04/08/21",
        time: "06:00pm - 08:00pm",
        description: "Muggles of pocketbook, finished reading the series? Let’s discuss our favorite scenes, characters, and more! If we have time, let’s take the Sorting Hat quiz in the end to find our houses!",
        host: 1
    },
    {
        id: 2,
        eventTitle: "Book Writing Class for Kids!",
        date: "04/09/21",
        time: "02:00pm - 04:00pm",
        description:"Enjoy this FREE virtual club for kids led by child authors & illustrators, Avery & Avion, along with author, educator and Luxe Library co-founder- Delicia B. Davis. We will work step by step to plan, create, design, and finish our books. You won’t want to miss this opportunity to engage with artistic youth while creating your own lasting work of art! Register NOW for your Free Spot!",
        host: 2
    }
]

const Item = ({eventTitle, date, time, description, onPress, style}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <Text style={styles.eventTitle}>{eventTitle}</Text>
        <Text style={styles.event}>Date: {date}</Text>
        <Text style={styles.event}>Time: {time}</Text>
        <Text style={styles.event}>Description: {description}</Text>
        <View style={styles.attendingButtonContainer}>
            <Button
                title='Chat'
                // onPress={() => }
                color="#f194ff"
                accessibilityLabel="Create Event"
            />
        </View>
    </TouchableOpacity>
)

export default function AllEvents () {
    const [selectedId, setSelectedId] = useState(null);

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
        return (
            <Item eventTitle={item.eventTitle}
                date={item.date}
                time={item.time}
                description={item.description}
                onPress={() => setSelectedId(item.id)}
                style={{backgroundColor}}
            />
        )
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button
                title='Create Event'
                // onPress={() => }
                color="#f194ff"
                accessibilityLabel="Create Event"
                />
            </View>
            <View>
                <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={selectedId}
                />
            </View>
        </SafeAreaView>
    );
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
    eventTitle: {
    fontSize: 20,
    },
    event: {
    fontSize: 15,
    },
    buttonContainer: {
    backgroundColor: '#808080',
    borderRadius: 15,
    padding: 1,
    width: 125,
    height: 40
    },
    attendingButtonContainer: {
    backgroundColor: '#808080',
    borderRadius: 15,
    padding: 0.8,
    width: 100,
    height: 40
    }
});
