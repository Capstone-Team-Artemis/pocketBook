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
        const { data } = await axios.get(
          `http://localhost:3000/api/books/${props.route.params.id}`
        );
        setStatus(data);
      } catch (err) {}
    };
    getStatus();
  }, [setStatus]);
  const bookPath = props.route.params.volumeInfo;

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
            alt={bookPath.title}
            source={{
              uri: bookPath.imageLinks.thumbnail,
            }}
          />
          <Text style={styles.textTitle}>{bookPath.textTitle}</Text>
          <Text>{bookPath.authors}</Text>
          <Text>{bookPath.description}</Text>
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
                  title: bookPath.title,
                  image: bookPath.imageLinks.thumbnail,
                  authors: bookPath.authors,
                  rating: bookPath.averageRating,
                  description: bookPath.description,
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
