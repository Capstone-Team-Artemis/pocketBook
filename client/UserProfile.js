import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import { connect, useDispatch } from 'react-redux';

import { getUserProfile, getBooks } from './store/userProfile';

const { width: WIDTH } = Dimensions.get('window');

const UserProfile = (props) => {
  //console.log("props in userprofile component", props)
  //hardcode it to 1 since no user loged in
  let id = props.userId || 1;
  let mybooks = props.books || [];
  //let currentBooks = props.books || []
  const [user, setUser] = useState(id);
  const [books, setbooks] = useState(mybooks);
  //console.log("****books****", mybooks)
  //const [currentlyReading, setCurrentlyReading] = useState(mybooks)
  const status = 'Currently Reading';
  //const future = "To Read"
  //const past = "Completed"

  //do not need this if we can get the user through props
  // useEffect(()=> {
  //     dispatch(getUser)
  // })

  //gettting books by status
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks(id, status));
  }, {});

  //const title = books[0].book.title

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          <Text style={styles.heading}>My Bookshelf</Text>
        </View>

        {/* <View>
                <Text style={styles.text}>My Bookshelf</Text>
                </View> */}
        <View>
          <Text>{props.id}</Text>
          <Text style={styles.text}>Currently Reading</Text>
          <View style={styles.bookContainer}>
            {mybooks.map((book) => (
              <View style={styles.bookData}>
                <Text>{book.book.image}</Text>
                <Text>{book.book.title}</Text>
                <Text>{}</Text>
              </View>
            ))}
          </View>
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
  text: {
    fontSize: 20,
  },
  bookContainer: {},
  bookData: {},
  scrollView: {
    backgroundColor: '#f0f8ff',
    marginHorizontal: 1,
    width: WIDTH - 20,
  },
  // bookList: {
  //     flexDirection: 'row'
  // }
});

const mapState = (state) => ({
  books: state.userProfile,
  userId: state.user.id,
});

const mapDispatch = (dispatch) => ({
  //getUser: (userId) => dispatch(getUserProfile(userId)),
  getBooks: (userId, status) => dispatch(getBooks(userId, status)),
});

export default connect(mapState, mapDispatch)(UserProfile);
