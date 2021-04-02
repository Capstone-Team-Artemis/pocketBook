import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Button,
  SafeAreaView,
  TextInput,
  Image,
} from "react-native";
import { Formik } from "formik";
import GOOGLE_API from "../secrets";
import Chat from "./SocketsFrontend";

export default function GoogleAPI() {
  // REACT HOOKS
  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  const [toggle, setToggle] = useState(true);

  // <TextInput onChangeText={handleChange} /> triggers this
  function handleChange(bookTitle) {
    // Sets "book" state to the book title we typed in
    setBook(bookTitle);
  }

  // <Button title="Submit" onPress={handleSubmit} /> triggers this
  function handleSubmit() {
    // Axios runs, passing in "book" & our Google Books API key
    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          book +
          "&key=" +
          GOOGLE_API +
          "&maxResults=10"
      )
      // Axios retrieves max list of 10 results
      .then((data) => {
        // We set array of book objects inside "result" state
        setResult(data.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Formik>
      <View style={styles.container}>
        <View>
          {/* Toggle ternary to render either Google Book Search or Socket live chat */}
          {toggle ? (
            <View>
              <Text style={{ marginTop: 50, textAlign: "center" }}>
                Google Book Search
              </Text>
              <TextInput onChangeText={handleChange} />
              <Button title='Submit' onPress={handleSubmit} />

              {/* SafeAreaView & Scrollview to allow horizontal scrolling */}
              <SafeAreaView>
                <ScrollView horizontal={true}>
                  {/* CSS on View to have books render left to right */}
                  <View style={styles.bookList}>
                    {/* Map over "result" state and render each book object details */}
                    {result.map((book, idx) => {
                      // console.log('book in map: ', book.volumeInfo);
                      return (
                        <View key={idx}>
                          {/* Render book cover image first, with styling */}
                          <Image
                            alt={book.volumeInfo.title}
                            style={{ width: 100, height: 150 }}
                            source={{
                              uri: book.volumeInfo.imageLinks.smallThumbnail,
                            }}
                          />
                          {/* Render book title, authors array, rating */}
                          <Text>{book.volumeInfo.title}</Text>
                          <Text>{book.volumeInfo.authors}</Text>
                          <Text>{book.volumeInfo.averageRating}</Text>
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
              </SafeAreaView>
            </View>
          ) : (
            <Chat setToggle={setToggle} />
          )}
        </View>
        {/* Separate button to toggle between Google Book Search & Sockets live chat */}
        <Button
          onPress={() => setToggle(!toggle)}
          title={toggle ? "chat" : "search"}
        />
      </View>
    </Formik>
  );
}

// CSS STYLING
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bookList: {
    flexDirection: "row",
  },
});
