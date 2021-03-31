import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { connect, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getUserProfile, getBooks } from './store/userProfile';

const { width: WIDTH } = Dimensions.get('window');

const UserProfile = (props) => {
  console.log('PROPS --->', props.route.params.userId);
  // console.log("props in userprofile component", props)
  //hardcode it to 1 since no user loged in

  let id = props.userId || 4;
  let mybooks = props.books || [];
  //const [user, setUser] = useState(id);
  const [books, setbooks] = useState(mybooks);

  //do not need this if we can get the user through props
  // useEffect(()=> {
  //     dispatch(getUser)
  // })

  //gettting books by status
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks(id));
  }, [books]);

  //filter the saved books by status
  let currentBooks = mybooks.filter(
    (book) => book.status === 'Currently Reading'
  );
  let futureRead = mybooks.filter((book) => book.status === 'To Read');
  let completed = mybooks.filter((book) => book.status === 'Completed');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.navbar}>
          <TouchableOpacity
            style={styles.navbar}
            style={{ alignItems: 'flex-end', margin: 16 }}
            onPress={props.navigation.openDrawer}
          >
            <Icon name="bars" size={24} color="#161924" />
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.heading}>My Bookshelf</Text>
        </View>

        {/* <View>
                <Text style={styles.text}>My Bookshelf</Text>
                </View> */}
        <View>
          <Text>{props.id}</Text>
          <Text style={styles.text}>Currently Reading</Text>
          <ScrollView horizontal={true}>
            <View style={styles.bookList}>
              {currentBooks.length > 0 ? (
                currentBooks.map((book, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => {
                      props.navigation.navigate('SingleBookView', book);
                    }}
                  >
                    <View style={styles.bookData}>
                      <Image
                        alt={book.book.title}
                        style={{ width: 100, height: 150 }}
                        source={{
                          uri: book.book.image,
                        }}
                      />
                      <Text>{book.book.title}</Text>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <Text>No books</Text>
              )}
            </View>
          </ScrollView>
        </View>

        <View>
          <Text style={styles.text}>To Read</Text>
          <ScrollView horizontal={true}>
            <View style={styles.bookList}>
              {futureRead.length > 0 ? (
                futureRead.map((book, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => {
                      props.navigation.navigate('SingleBookView', book);
                    }}
                  >
                    <View style={styles.bookData}>
                      <Image
                        alt={book.book.title}
                        style={{ width: 100, height: 150 }}
                        source={{
                          uri: book.book.image,
                        }}
                      />
                      <Text>{book.book.title}</Text>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <Text>No books</Text>
              )}
            </View>
          </ScrollView>
        </View>

        <View>
          <Text style={styles.text}>Completed</Text>
          <ScrollView horizontal={true}>
            <View style={styles.bookList}>
              {completed.length > 0 ? (
                completed.map((book, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => {
                      props.navigation.navigate('SingleBookView', book);
                    }}
                  >
                    <View style={styles.bookData}>
                      <Image
                        alt={book.book.title}
                        style={{ width: 100, height: 150 }}
                        source={{
                          uri: book.book.image,
                        }}
                      />
                      <Text>{book.book.title}</Text>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <Text>No books</Text>
              )}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 40,
    margin: 0,
  },
  content: {
    marginTop: 20,
    flexDirection: 'row',
    width: '80%',
    height: 35,
    borderRadius: 50,
    borderWidth: 1.5,
    alignItems: 'center',
    paddingTop: 5,
  },
  bookList: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
  },
  bookData: {},
  scrollView: {
    backgroundColor: '#f0f8ff',
    marginHorizontal: 1,
    width: WIDTH - 20,
  },
});

const mapState = (state) => ({
  books: state.userProfile,
  userId: state.user.id,
});

const mapDispatch = (dispatch) => ({
  //getUser: (userId) => dispatch(getUserProfile(userId)),
  getBooks: (userId) => dispatch(getBooks(userId)),
});

export default connect(mapState, mapDispatch)(UserProfile);
