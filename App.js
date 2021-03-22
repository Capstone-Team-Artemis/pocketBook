import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import axios from 'axios';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Button,
  SafeAreaView,
  TextInput,
  Image
} from 'react-native';
import { Formik } from 'formik';
import GOOGLE_API from './secrets';
import Chat from './SocketFrontend';

export default function App() {
  // REACT HOOKS
  const [book, setBook] = useState('');
  const [result, setResult] = useState([]);
  const [apikey, setApiKey] = useState(GOOGLE_API);
  const [toggle, setToggle] = useState(true);

  function handleChange(bookTitle) {
    console.log('BOOK TITLE: ', bookTitle)
    console.log('IN HANDLE CHANGE')
    setBook(bookTitle);
  }

  function handleSubmit() {
    console.log('IN HANDLE SUBMIT!!')
    console.log('BOOK: ', book)
    axios
      .get(
        'https://www.googleapis.com/books/v1/volumes?q=' +
          book +
          '&key=' +
          GOOGLE_API +
          '&maxResults=1'
      )
      .then((data) => {
        console.log('IN AXIOS!!');
        setResult(data.data.items);
        console.log("RESULTS: ", result)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Formik>
      <View style={styles.container}>
        <View>
          {toggle ? (
            <View>
              <Text style={{ marginTop: 50, textAlign: 'center' }}>
                Google Book Search
              </Text>
              <TextInput
                onChangeText={handleChange}
              />
            </View>
          ) : (
            <Chat setToggle={setToggle} />
          )}
        </View>
        <Button title="Submit" onPress={handleSubmit} />

        <Button
          onPress={() => setToggle(!toggle)}
          title={toggle ? 'chat' : 'search'}
        />
        <View>
          {result.map((book, idx) => {
            console.log('book in map: ', book.volumeInfo)
            return <View key={idx}>
              <Text>
              {book.volumeInfo.title}
              {"\n"}
              </Text>
              <Text>
              {book.volumeInfo.authors}
              {"\n"}
              </Text>
              <Text>
              {book.volumeInfo.averageRating}
              {"\n"}
              </Text>
              
              {/* <View> {book.volumeInfo.imageLinks.smallThumbnail} </View> */}
              <Image
                alt = {book.volumeInfo.title}
                source={{
                uri: 'http://books.google.com/books/content?id=5iTebBW-w7QC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
                }}
                />
            </View>;
          })}
        </View>
      </View>
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: "center",
  },
});