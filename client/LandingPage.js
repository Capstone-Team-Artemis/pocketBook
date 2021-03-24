import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Modal,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { Formik } from "formik";
// import GOOGLE_API from "../secrets";
import axios from "axios";
import SingleBookView from "./SingleBookView";
const GOOGLE_API = "AIzaSyCCv2Y7h0jPvMK1NF0y_nmI9V-4_lTXsWg";

export default function LandingPage() {
  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [featureBook, setFeatureBook] = useState({});
  useEffect(() => {
    const getRandomBook = async () => {
      const { data } = await axios.get(
        "https://www.googleapis.com/books/v1/volumes",
        {
          params: {
            q: "book",
            key: GOOGLE_API,
            orderBy: "newest",
          },
        }
      );
      const book = data.items[Math.floor(Math.random() * data.items.length)];
      setFeatureBook(book);
    };
    getRandomBook();
  }, [setFeatureBook]);

  function handleChange(bookTitle) {
    // Sets "book" state to the book title we typed in
    setBook(bookTitle);
  }

  function handleSubmit() {
    // Axios runs, passing in "book" & our Google Books API key
    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          book +
          "&key=" +
          "AIzaSyCCv2Y7h0jPvMK1NF0y_nmI9V-4_lTXsWg" +
          // GOOGLE_API +
          "&maxResults=5"
      )
      // Axios retrieves max list of 10 results
      .then((data) => {
        // We set array of book objects inside "result" state
        setResult(data.data.items);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });

    setModalVisible(true);
  }
  return (
    <Formik>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Search by Title, Author, or Keyword'
          onChangeText={handleChange}
        />
        <Button title='Submit' onPress={handleSubmit} />
        {featureBook.id && (
          <Image
            alt={featureBook.volumeInfo.title}
            source={{ uri: featureBook.volumeInfo.imageLinks.thumbnail }}
            style={{ width: 200, height: 300, margin: "auto" }}
          />
        )}
        <View style={styles.centeredView}>
          <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}
          >
            <SafeAreaView>
              <ScrollView>
                {/* CSS on View to have books render left to right */}
                <View style={styles.bookList} style={styles.centeredView}>
                  {/* Map over "result" state and render each book object details */}
                  {result.map((book, idx) => {
                    // console.log('book in map: ', book.volumeInfo);
                    return (
                      <View key={idx}>
                        {/* Render book cover image first, with styling */}
                        <Image
                          // put react navigation here
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
                <Button title='submit' onPress={() => setModalVisible(false)}>
                  Done
                </Button>
              </ScrollView>
            </SafeAreaView>
          </Modal>
        </View>
      </View>
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1,
    borderRadius: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 0,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
