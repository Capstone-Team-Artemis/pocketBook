import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Searchbar, Button } from 'react-native-paper';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Formik } from 'formik';
import GOOGLE_API from '../secrets';
import axios from 'axios';
// import SingleBookView from "./SingleBookView";
// const GOOGLE_API = "AIzaSyCCv2Y7h0jPvMK1NF0y_nmI9V-4_lTXsWg";

export default function LandingPage({ navigation, route }) {
  const [loaded] = useFonts({
    'Asap-Bold': require('../assets/fonts/Asap-Bold.ttf'),
    'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
    'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
  });

  const [book, setBook] = useState('');
  const [result, setResult] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [featureBook, setFeatureBook] = useState({});
  //You can think of useEffect like componentDidMount
  useEffect(() => {
    //makes an axios call to fetch all books with query of "book" & ordered by newest published books
    const getRandomBook = async () => {
      try {
        const { data } = await axios.get(
          'https://www.googleapis.com/books/v1/volumes',
          {
            //breaking up params can help with entering in different inputs for keys below and easier to see the params
            params: {
              q: 'food',
              key: GOOGLE_API,
              orderBy: 'newest',
            },
          }
        );
        //book gives us a random book from data from the axios call
        const book = data.items[Math.floor(Math.random() * data.items.length)];
        //sets the chosen book into featureBook
        setFeatureBook(book);
      } catch (err) {
        console.log(err);
      }
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
          GOOGLE_API +
          // "AIzaSyCCv2Y7h0jPvMK1NF0y_nmI9V-4_lTXsWg" +
          // GOOGLE_API +
          '&maxResults=15'
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
    setBook('');
    setModalVisible(true);
  }

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <ImageBackground
          source={{ uri: 'https://i.ibb.co/0t3nZGK/loginscreen-copy.jpg' }}
          style={styles.background}
          imageStyle={{
            resizeMode: 'stretch',
          }}
        >
          <Formik>
            <View style={styles.container}>
              <TouchableOpacity
                style={{ alignItems: 'flex-end', margin: 16 }}
                onPress={navigation.openDrawer}
              >
                <Icon name="bars" size={24} color="#161924" />
              </TouchableOpacity>
              <View style={styles.center}>
                <Image
                  source={{
                    uri: 'https://i.ibb.co/Gn9bqym/pocketbook-icon.png',
                  }}
                  style={styles.image}
                />
                <Text style={styles.heading}>Find a Book</Text>
                <View style={styles.center}>
                  {/* <Icon name={"search"} size={30} color={"grey"} style={styles.icon} /> */}
                  <Searchbar
                    theme={{
                      colors: { primary: '#000', placeholder: '#000' },
                    }}
                    style={styles.searchBar}
                    // placeholder='Search by Title, Author, or Keyword'
                    onChangeText={handleChange}
                    value={book}
                  />
                </View>
                <View>
                  <TouchableOpacity
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                    onPress={handleSubmit}
                  >
                    <Button mode="contained" style={styles.subButton}>
                      <Text style={styles.submitText}>SUBMIT</Text>
                    </Button>
                  </TouchableOpacity>
                </View>
                {/* <Button title='Submit' onPress={handleSubmit} /> */}
                {/* featureBook will only show up once the component mounts */}
                {featureBook.id && (
                  <View>
                    <Text style={styles.published}>Newly Published</Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('SingleBookView', {
                          ...featureBook,
                          userId: route.params.userId,
                        });
                      }}
                    >
                      {featureBook.volumeInfo.imageLinks ? (
                        <Image
                          alt={featureBook.volumeInfo.title}
                          source={{
                            uri: featureBook.volumeInfo.imageLinks.thumbnail,
                          }}
                          style={{ width: 200, height: 300, margin: 'auto' }}
                        />
                      ) : (
                        <Image
                          alt={'flowers'}
                          source={{
                            uri:
                              'http://books.google.com/books?id=GxXGDwAAQBAJ&printsec=frontcover&dq=Flowers&hl=&cd=3&source=gbs_api',
                          }}
                          style={{ width: 200, height: 300, margin: 'auto' }}
                        />
                      )}
                    </TouchableOpacity>
                    {/* <Text>{featureBook.volumeInfo.description}</Text> */}
                  </View>
                )}
              </View>
              <View style={styles.centeredView}>
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={modalVisible}
                >
                  <SafeAreaView>
                    <View style={styles.topBar}>
                      <TouchableOpacity
                        style={styles.arrow}
                        onPress={() => setModalVisible(false)}
                      >
                        <Icon name="arrow-left" size={24} color="#161924" />
                      </TouchableOpacity>
                    </View>
                    <ScrollView>
                      {/* CSS on View to have books render left to right */}
                      <View style={styles.bookList} style={styles.centeredView}>
                        {/* Map over "result" state and render each book object details */}
                        {result.map((book, idx) => {
                          console.log('BOOK', book);
                          return (
                            <View key={idx}>
                              <TouchableOpacity
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                                onPress={() => {
                                  setModalVisible(false);
                                  navigation.navigate('SingleBookView', {
                                    ...book,
                                    userId: route.params.userId,
                                  });
                                }}
                              >
                                {book.volumeInfo.imageLinks.smallThumbnail ? (
                                  <Image
                                    alt={book.volumeInfo.title}
                                    style={{ width: 100, height: 150 }}
                                    source={{
                                      uri:
                                        book.volumeInfo.imageLinks
                                          .smallThumbnail,
                                    }}
                                  />
                                ) : (
                                  'N/A'
                                )}

                                <Text style={styles.modalTitle}>
                                  {book.volumeInfo.title}
                                </Text>
                                <Text style={styles.modalAuthor}>
                                  {book.volumeInfo.authors}
                                </Text>
                                <Text style={styles.modalRating}>
                                  Rating:{' '}
                                  {book.volumeInfo.averageRating
                                    ? book.volumeInfo.averageRating
                                    : 'N/A'}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          );
                        })}
                      </View>
                    </ScrollView>
                  </SafeAreaView>
                </Modal>
              </View>
            </View>
          </Formik>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginTop: 15,
    padding: 0,
    width: 100,
    height: 100,
  },
  heading: {
    margin: 0,
    fontSize: 35,
    fontFamily: 'Asap-Bold',
  },
  published: {
    margin: 0,
    fontSize: 20,
    paddingTop: 10,
    paddingLeft: 25,
    paddingBottom: 10,
    fontFamily: 'Roboto-Medium',
  },
  inputText: {
    fontWeight: 'bold',
    marginBottom: 4,
    marginLeft: 50,
    width: '100%',
  },
  searchBar: {
    margin: 0,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  subButton: {
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 350,
    width: 200,
    backgroundColor: '#24aae2',
  },
  submitText: {
    fontFamily: 'Roboto-Regular',
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    bottom: 0,
    position: 'fixed',
    top: 200,
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
  modalTitle: {
    marginTop: 5,
    justifyContent: 'center',
    fontFamily: 'Roboto-Regular',
  },
  modalAuthor: {
    marginTop: 5,
    fontFamily: 'Roboto-Light',
  },
  modalRating: {
    marginTop: 5,
    marginBottom: 15,
    fontFamily: 'Roboto-Light',
  },
  arrow: {
    marginLeft: -325,
    marginTop: 7,
  },
  topBar: {
    alignItems: 'center',
    backgroundColor: '#24aae2',
    height: 40,
  },

  background: {
    width: '100%',
    height: '100%',
  },
});
