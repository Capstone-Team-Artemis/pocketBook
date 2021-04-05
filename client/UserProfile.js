import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { connect, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { getBooks } from "./store/books";
import { Card, Title } from 'react-native-paper';
import { useFonts } from 'expo-font';

const { width: WIDTH } = Dimensions.get("window");

const UserProfile = (props) => {
  console.log("props in userprofile component", props.username)
  //hardcode it to 1 since no user loged in

  let id = props.userId || 4;
  let mybooks = props.books || [];
  let username = props.username || '';

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks(id));
  }, [getBooks]);

  //filter the saved books by status
  let currentBooks = mybooks.filter(
    (book) => book.status === "Currently Reading"
  );
  let futureRead = mybooks.filter((book) => book.status === "To Read");
  let completed = mybooks.filter((book) => book.status === "Completed");

  // Loading fonts:
   const [loaded] = useFonts({
    'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
  });

  // For when font can't load:
  if (!loaded) {
    return null;
  }

//  const getColor = (bookTitle) => {
//     let sumChars = 0;
//     for(let i = 0;i < bookTitle.length; i++){
//       sumChars += bookTitle.charCodeAt(i);
//     }

//     const colors = [
//       '#Ef5c2b', // flamingo
//       '#2ecc71', // emerald
//       '#e74c3c', // alizarin
//       '#16a085', // green tea
//       '#002850', // dark blue
//       '#6646ee', // purple
//     ];
//     return colors[sumChars % colors.length];

//{backgroundColor: getColor(book.book.title)
// }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          <TouchableOpacity
            style={styles.nav}
            onPress={props.navigation.openDrawer}
          >
            <Icon name='bars' size={24} color='#161924' />
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.heading}>{`${username}'s Bookshelf`}</Text>
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
                  <Card key={idx} style={styles.cardContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate("SingleBookView", {
                        usedb: true,
                        book: book.book,
                        userId: Number(props.route.params.userId),
                      });
                    }}
                  >           
                      <Card.Cover
                        alt={book.book.title}
                        style={styles.image}
                        source={{
                          uri: book.book.image,
                        }}
                      />
                    <Card.Content> 
                      <Title style={styles.title}>{book.book.title}</Title>
                    </Card.Content>
                  </TouchableOpacity>
                  </Card>
                ))
              ) : (
                <Text style={styles.text}>No books</Text>
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
                  <Card key={idx} style={styles.cardContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate("SingleBookView", {
                        usedb: true,
                        book: book.book,
                        userId: Number(props.route.params.userId),
                      });
                    }}
                  >           
                      <Card.Cover
                        alt={book.book.title}
                        style={styles.image}
                        source={{
                          uri: book.book.image,
                        }}
                      />
                    <Card.Content> 
                      <Title style={styles.title}>{book.book.title}</Title>
                    </Card.Content>
                  </TouchableOpacity>
                  </Card>
                ))
              ) : (
                <Text style={styles.text}>No books</Text>
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
                  <Card key={idx} style={styles.cardContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate("SingleBookView", {
                        usedb: true,
                        book: book.book,
                        userId: Number(props.route.params.userId),
                      });
                    }}
                  >           
                      <Card.Cover
                        alt={book.book.title}
                        style={styles.image}
                        source={{
                          uri: book.book.image,
                        }}
                      />
                    <Card.Content> 
                      <Title style={styles.title}>{book.book.title}</Title>
                    </Card.Content>
                  </TouchableOpacity>
                  </Card>
                ))
              ) : (
                <Text style={styles.text}>No books</Text>
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
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    backgroundColor: "#fff",
    marginHorizontal: 1,
    width: WIDTH - 20,
  },
  nav: {
    alignItems: "flex-end", 
    margin: 16
  },
  heading: {
    fontSize: 30,
    margin: 0,
    alignSelf: "center",
    fontFamily: 'Roboto-Regular',
  },
  text: {
    fontSize: 20,
    fontFamily: 'Roboto-Light', 
    marginBottom: 20,
    alignSelf: "center",
    textAlign: 'center',
  },
  bookList: {
    flexDirection: "row",
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    padding: 5,
    marginBottom: 20,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20
  },
  image: {
    width: 250, 
    height: 150, 
    resizeMode: 'contain',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignSelf: "center",
  },
});

const mapState = (state) => ({
  books: state.books,
  userId: state.user.id,
  username: state.user.username
});

const mapDispatch = (dispatch) => ({
  getBooks: (userId) => dispatch(getBooks(userId)),
});

export default connect(mapState, mapDispatch)(UserProfile);
