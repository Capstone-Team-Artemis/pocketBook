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
} from 'react-native';

export default function SingleBookView(route, { navigation }) {
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
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
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
            onPress={() => navigation.navigate('LandingPage')}
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
