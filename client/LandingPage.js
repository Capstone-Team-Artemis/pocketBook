import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Modal,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Formik } from 'formik';
// import GOOGLE_API from "../secrets";
import axios from 'axios';
// import SingleBookView from "./SingleBookView";
const GOOGLE_API = 'AIzaSyCCv2Y7h0jPvMK1NF0y_nmI9V-4_lTXsWg';

export default function LandingPage({ navigation }) {
  const [book, setBook] = useState('');
  const [result, setResult] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [featureBook, setFeatureBook] = useState({});
  //You can think of useEffect like componentDidMount
  useEffect(() => {
    //makes an axios call to fetch all books with query of "book" & ordered by newest published books
    const getRandomBook = async () => {
      const { data } = await axios.get(
        'https://www.googleapis.com/books/v1/volumes',
        {
          //breaking up params can help with entering in different inputs for keys below and easier to see the params
          params: {
            q: 'book',
            key: GOOGLE_API,
            orderBy: 'newest',
          },
        }
      );
      //book gives us a random book from data from the axios call
      const book = data.items[Math.floor(Math.random() * data.items.length)];
      //sets the chosen book into featureBook
      setFeatureBook(book);
    };
    //invoke getRandomBook
    getRandomBook();
    //useEffect takes in 2nd argument - an array of dependencies
    //dependencies are values defined outside of useEffect that are being used inside useEffect
  }, [setFeatureBook]);

  function handleChange(bookTitle) {
    // Sets "book" state to the book title we typed in
    setBook(bookTitle);
  }

  function handleSubmit() {
    // Axios runs, passing in "book" & our Google Books API key
    axios
      .get(
        'https://www.googleapis.com/books/v1/volumes?q=' +
          book +
          '&key=' +
          'AIzaSyCCv2Y7h0jPvMK1NF0y_nmI9V-4_lTXsWg' +
          // GOOGLE_API +
          '&maxResults=5'
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
  // console.log('navigation --->', navigation.state.params.user.firstName);
  return (
    <Formik>
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://i.ibb.co/rpJ7vjb/signupbook.png',
          }}
          style={styles.image}
        />
        <Text style={styles.heading}>Find a Book</Text>
        <View style={styles.inputContainer}>
          {/* <Icon name={"search"} size={30} color={"grey"} style={styles.icon} /> */}
          <TextInput
            style={styles.inputText}
            // placeholder='Search by Title, Author, or Keyword'
            onChangeText={handleChange}
          />
        </View>
        <TouchableOpacity
          style={[styles.inputContainer, styles.submitContainer]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitText}>SUBMIT</Text>
        </TouchableOpacity>
        {/* <Button title='Submit' onPress={handleSubmit} /> */}
        {/* featureBook will only show up once the component mounts */}
        {featureBook.id && (
          <View>
            {/* <Text style={{ textAlign: 'center', fontSize: 30 }}>
              Hi, {navigation.state.params.user.firstName}!
            </Text> */}
            <Text style={styles.published}>Newly Published</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SingleBookView', featureBook);
              }}
            >
              <Image
                alt={featureBook.volumeInfo.title}
                source={{ uri: featureBook.volumeInfo.imageLinks.thumbnail }}
                style={{ width: 200, height: 300, margin: 'auto' }}
              />
            </TouchableOpacity>
            {/* <Text>{featureBook.volumeInfo.description}</Text> */}
          </View>
        )}
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={false}
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
                        {/* <TouchableOpacity onPress={() => }> */}
                        <TouchableOpacity
                          onPress={() => {
                            setModalVisible(false);
                            navigation.navigate('SingleBookView', book);
                          }}
                        >
                          <Image
                            // put react navigation here
                            alt={book.volumeInfo.title}
                            style={{ width: 100, height: 150 }}
                            source={{
                              uri: book.volumeInfo.imageLinks.smallThumbnail,
                            }}
                          />
                          {/* </TouchableOpacity> */}
                          {/* Render book title, authors array, rating */}
                          <Text style={styles.bookInfo}>
                            {book.volumeInfo.title}
                          </Text>
                          <Text style={styles.bookInfo}>
                            {book.volumeInfo.authors}
                          </Text>
                          <Text style={styles.bookInfo}>
                            {book.volumeInfo.averageRating}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
                <TouchableOpacity
                  style={[
                    styles.inputContainer,
                    styles.submitContainer,
                    styles.button,
                  ]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.submitText}>DONE</Text>
                </TouchableOpacity>
                {/* <Button
                  style={styles.published}
                  title='DONE'
                  onPress={() => setModalVisible(false)}
                > */}
                {/* Done
                </Button> */}
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginTop: 40,
    padding: 0,
    width: 100,
    height: 100,
    marginTop: 50,
  },
  heading: {
    margin: 0,
    fontSize: 30,
  },
  published: {
    margin: 0,
    fontSize: 20,
    paddingTop: 10,
    paddingLeft: 25,
  },
  inputText: {
    fontWeight: 'bold',
    marginBottom: 4,
    marginLeft: 50,
    width: '100%',
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: 'row',
    width: '80%',
    height: 35,
    borderRadius: 50,
    borderWidth: 1.5,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
  },
  submitContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6475a5',
  },
  submitText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    bottom: 2,
  },

  //CSS for Modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 0,
    padding: 35,
    opacity: 0,
    alignItems: 'center',
    shadowOpacity: 100,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginLeft: 35,
  },
  bookInfo: {
    fontWeight: 'bold',
    marginBottom: 4,
    width: '100%',
  },
});
