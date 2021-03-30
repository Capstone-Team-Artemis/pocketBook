import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

import {
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default function SingleBookView(route) {
  const [status, setStatus] = useState('Completed');
  useEffect(() => {
    const getStatus = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/books/${route.params.id}`
        );
        setStatus(data);
      } catch (err) {}
    };
    getStatus();
  }, [setStatus]);
  const bookPath = route.navigation.state.params;

  // console.log('NAVIGATION?? -->', route.navigation);

  console.log('NAVIGATION?? -->', route.navigation);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <TouchableOpacity
            style={{ alignItems: 'flex-end', margin: 16 }}
            onPress={route.navigation.openDrawer}
          >
            <Icon name="bars" size={24} color="#161924" />
          </TouchableOpacity>
          <Image
            style={{ width: 200, height: 300 }}
            alt={bookPath.volumeInfo.title}
            source={{
              uri: bookPath.volumeInfo.imageLinks.thumbnail,
            }}
          />
          <Text style={styles.textTitle}>{bookPath.volumeInfo.title}</Text>
          <Text>{bookPath.volumeInfo.authors}</Text>
          <Text>{bookPath.volumeInfo.description}</Text>
          <Text>Book Status</Text>
          <DropDownPicker
            containerStyle={{ height: 40 }}
            defaultValue={status}
            onChangeItem={(item) => setStatus(item.value)}
            items={[
              { label: 'Completed', value: 'Completed' },
              { label: 'Currently Reading', value: 'Currently Reading' },
              { label: 'To Read', value: 'To Read' },
            ]}
          />
          <Button
            title="Add to Bookshelf"
            onPress={() => {
              axios.post('http://localhost:3000/api/books', {
                status,
                book: {
                  title: bookPath.volumeInfo.title,
                  image: bookPath.volumeInfo.imageLinks.thumbnail,
                  authors: bookPath.volumeInfo.authors,
                  rating: bookPath.volumeInfo.averageRating,
                  description: bookPath.volumeInfo.description,
                  googleId: bookPath.id,
                },
              });
            }}
          />
          {/* <Button
            title="Go Back"
            onPress={() => route.navigation.navigate('LandingPage')}
          /> */}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    fontWeight: 'bold',
    alignContent: 'center',
    width: '100%',
  },
});
