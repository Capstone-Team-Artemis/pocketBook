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

export default function SingleBookView(props) {
  const [status, setStatus] = useState('Completed');
  useEffect(() => {
    const getStatus = async () => {
      try {
        // MADE URL DYNAMIC TO TAKE INTO ACCOUNT NAVIGATING FROM PROFILE TO SINGLEBOOKVIEW
        const { data } = await axios.get(
          `http://localhost:3000/api/books/${
            props.route.book ? props.route.book.googleId : props.route.params.id
          }`
        );
        setStatus(data);
      } catch (err) {}
    };
    getStatus();
  }, [setStatus]);
  const bookPath = props.route.params;

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <TouchableOpacity
            style={{ alignItems: 'flex-end', margin: 16 }}
            onPress={props.navigation.openDrawer}
          >
            <Icon name="bars" size={24} color="#161924" />
          </TouchableOpacity>
          <Image
            style={{ width: 200, height: 300 }}
            alt={
              bookPath.volumeInfo
                ? bookPath.volumeInfo.title
                : bookPath.book.title
            }
            source={{
              uri: bookPath.volumeInfo
                ? bookPath.volumeInfo.imageLinks.thumbnail
                : bookPath.book.image,
            }}
          />
          <Text style={styles.textTitle}>
            {bookPath.volumeInfo
              ? bookPath.volumeInfo.title
              : bookPath.book.title}
          </Text>
          <Text>
            {bookPath.volumeInfo
              ? bookPath.volumeInfo.authors
              : bookPath.book.authors}
          </Text>
          <Text>
            {bookPath.volumeInfo
              ? bookPath.volumeInfo.description
              : bookPath.book.description}
          </Text>
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
          {/* CHANGE BELOW CODE TOO */}
          <Button
            title="Add to Bookshelf"
            onPress={() => {
              axios.post('http://localhost:3000/api/books', {
                status,
                book: {
                  title: bookPath.volumeInfo
                    ? bookPath.volumeInfo.title
                    : bookPath.book.title,
                  image: bookPath.volumeInfo
                    ? bookPath.volumeInfo.imageLinks.thumbnail
                    : bookPath.book.image,
                  authors: bookPath.volumeInfo
                    ? bookPath.volumeInfo.authors
                    : bookPath.book.authors,
                  rating: bookPath.volumeInfo
                    ? bookPath.volumeInfo.averageRating
                    : bookPath.book.rating,
                  description: bookPath.volumeInfo
                    ? bookPath.volumeInfo.description
                    : bookPath.book.description,
                  googleId: props.route.params.id,
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
