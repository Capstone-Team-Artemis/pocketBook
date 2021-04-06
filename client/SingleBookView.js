import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import { addBook, deleteBook } from "./store/books";
import { Button } from "react-native-paper";
import { useFonts } from "expo-font";

import {
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "formik";
import { connect as reduxConnect } from "react-redux";

function SingleBookView(props) {
  const [loaded] = useFonts({
    "Asap-Bold": require("../assets/fonts/Asap-Bold.ttf"),
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
  });
  const [status, setStatus] = useState("Completed");
  const [inBookshelf, setInBookshelf] = useState(false);
  const bookPath = props.route.params;
  const userId = props.route.params.userId;
  if (bookPath.usedb) {
    bookPath.volumeInfo = undefined;
    bookPath.id = undefined;
    bookPath.usedb = false;
  }

  useEffect(() => {
    console.log(props.route);
    const getStatus = async () => {
      try {
        // MADE URL DYNAMIC TO TAKE INTO ACCOUNT NAVIGATING FROM PROFILE TO SINGLEBOOKVIEW

        const id = bookPath.id ? bookPath.id : bookPath.book.googleId;
        // const url = `http://localhost:3000/api/books/${id}`;
        const url = `https://pocketbook-gh.herokuapp.com/api/books/${id}`;

        const { data } = await axios.get(url);

        setStatus(data);
        setInBookshelf(true);
      } catch (err) {
        setInBookshelf(false);
      }
    };
    getStatus();
  }, [setStatus, setInBookshelf, bookPath]);

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <ImageBackground
            source={{ uri: "https://i.ibb.co/0t3nZGK/loginscreen-copy.jpg" }}
            style={styles.background}
            imageStyle={{
              resizeMode: "stretch",
            }}
          >
            <TouchableOpacity
              style={{ alignItems: "flex-end", margin: 16 }}
              onPress={props.navigation.openDrawer}
            >
              <Icon name='bars' size={24} color='#161924' />
            </TouchableOpacity>
            <View style={styles.center}>
              <TouchableOpacity
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Image
                  style={styles.image}
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
                <Text style={styles.title}>
                  {bookPath.volumeInfo
                    ? bookPath.volumeInfo.title
                    : bookPath.book.title}
                </Text>
                <Text style={styles.authors}>
                  {bookPath.volumeInfo
                    ? bookPath.volumeInfo.authors
                    : bookPath.book.authors}
                </Text>
                <Text style={styles.description}>
                  {bookPath.volumeInfo
                    ? bookPath.volumeInfo.description
                    : bookPath.book.description}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.status}>Book Status</Text>

            <DropDownPicker
              style={styles.dropDown}
              dropDownStyle={{ marginTop: -150 }}
              containerStyle={{ height: 40 }}
              defaultValue={status}
              onChangeItem={(item) => setStatus(item.value)}
              items={[
                { label: "Completed", value: "Completed" },
                { label: "Currently Reading", value: "Currently Reading" },
                { label: "To Read", value: "To Read" },
              ]}
            />

            {/* CHANGE BELOW CODE TOO */}
            {!inBookshelf ? (
              <TouchableOpacity
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Button
                  mode='contained'
                  title='Add to Bookshelf'
                  style={styles.buttonAdd}
                  onPress={async () => {
                    const bookToAdd = {
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
                    };
                    await props.addBook({
                      status,
                      book: bookToAdd,
                    });
                    bookPath.book = bookToAdd;
                    setInBookshelf(true);
                  }}
                >
                  <Text>ADD TO BOOKSHELF</Text>
                </Button>
              </TouchableOpacity>
            ) : (
              <View>
                <TouchableOpacity
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Button
                    mode='contained'
                    title='Change Status'
                    style={styles.buttonChange}
                    onPress={() => {
                      const bookToAdd = {
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
                        googleId:
                          props.route.params.id || bookPath.book.googleId,
                      };
                      props.addBook({
                        status,
                        book: bookToAdd,
                      });
                    }}
                  >
                    <Text>CHANGE STATUS</Text>
                  </Button>
                  <Button
                    style={styles.buttonDelete}
                    mode='contained'
                    title='Delete from Bookshelf'
                    onPress={() => {
                      props.deleteBook(bookPath.book.id, userId);
                      setInBookshelf(false);
                    }}
                  >
                    <Text>DELETE FROM BOOKSHELF</Text>
                  </Button>
                </TouchableOpacity>
              </View>
            )}
          </ImageBackground>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 20,
    marginTop: 5,
  },
  status: {
    fontFamily: "Roboto-Medium",
    alignContent: "center",
    fontSize: 18,
    width: "100%",
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 5,
  },
  image: {
    width: 200,
    height: 300,
  },
  description: {
    fontFamily: "Roboto-Light",
    marginTop: 8,
    marginLeft: 15,
    marginRight: 15,
    fontSize: 15,
  },
  authors: {
    fontFamily: "Roboto-Medium",
    marginTop: 5,
    fontSize: 15,
  },
  buttonChange: {
    fontFamily: "Roboto-Regular",
    marginTop: 20,
    marginBottom: 6,
    borderRadius: 350,
    width: 200,
    backgroundColor: "#24aae2",
  },
  buttonDelete: {
    fontFamily: "Roboto-Regular",
    marginTop: 6,
    marginBottom: 20,
    borderRadius: 350,
    width: 275,
    backgroundColor: "#E92228",
  },
  buttonAdd: {
    fontFamily: "Roboto-Regular",
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 350,
    width: 275,
    backgroundColor: "#24aae2",
  },
  background: {
    width: "100%",
    height: "100%",
  },
  dropDown: {
    marginLeft: 15,
    marginRight: 15,
  },
});

const mapState = (state) => ({
  user: state.user,
});

const mapDispatch = (dispatch) => ({
  addBook: (body) => dispatch(addBook(body)),
  deleteBook: (bookId, userId) => dispatch(deleteBook(bookId, userId)),
});

export default reduxConnect(mapState, mapDispatch)(SingleBookView);
