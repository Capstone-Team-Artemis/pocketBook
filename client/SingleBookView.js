import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import { addBook, deleteBook } from "./store/books";

import {
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "formik";
import { connect as reduxConnect } from "react-redux";

function SingleBookView(props) {
  const [status, setStatus] = useState("Completed");
  const [inBookshelf, setInBookshelf] = useState(false);
  const bookPath = props.route.params;
  const userId = props.route.params.userId;
  useEffect(() => {
    const getStatus = async () => {
      try {
        // MADE URL DYNAMIC TO TAKE INTO ACCOUNT NAVIGATING FROM PROFILE TO SINGLEBOOKVIEW

        const id = bookPath.id ? bookPath.id : bookPath.book.googleId;
        const url = `http://localhost:3000/api/books/${id}`;

        const { data } = await axios.get(url);

        setStatus(data);
        setInBookshelf(true);
      } catch (err) {
        setInBookshelf(false);
      }
    };
    getStatus();
  }, [setStatus, setInBookshelf, bookPath]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <TouchableOpacity
            style={{ alignItems: "flex-end", margin: 16 }}
            onPress={props.navigation.openDrawer}
          >
            <Icon name='bars' size={24} color='#161924' />
          </TouchableOpacity>
          <View style={styles.center}>
            <Image
              style={{ width: 200, height: 300 }}
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
            <Text style={styles.textTitle}>
              {bookPath.volumeInfo
                ? bookPath.volumeInfo.title
                : bookPath.book.title}
            </Text>
            <Text>
              {bookPath.volumeInfo
                ? bookPath.volumeInfo.authors
                : bookPath.book.authors}
            </Text>
            <Text>
              {bookPath.volumeInfo
                ? bookPath.volumeInfo.description
                : bookPath.book.description}
            </Text>
          </View>
          <Text style={styles.textTitle}>Book Status</Text>
          <DropDownPicker
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
            <Button
              title='Add to Bookshelf'
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
            />
          ) : (
            <>
              <Button
                title='Change Status'
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
                    googleId: props.route.params.id,
                  };
                  props.addBook({
                    status,
                    book: bookToAdd,
                  });
                }}
              />
              <Button
                title='Delete from Bookshelf'
                onPress={() => {
                  props.deleteBook(bookPath.book.id, userId);
                  setInBookshelf(false);
                }}
              />
            </>
          )}
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
  textTitle: {
    fontWeight: "bold",
    alignContent: "center",
    width: "100%",
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
