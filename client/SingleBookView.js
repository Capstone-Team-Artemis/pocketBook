import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";

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

export default function SingleBookView(route) {
  const [status, setStatus] = useState("Completed");
  useEffect(() => {
    //Sets the current status of the book in the dropdown list
    const getStatus = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/books/${route.params.id}`
        );
        setStatus(data);
      } catch (err) {}
    };
    getStatus();
  }, [setStatus]);

  const bookPath = route.navigation.state.params.volumeInfo;
  // console.log("NAVIGATION?? -->", route.navigation);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          {/* //NAVIGATION BAR */}
          <TouchableOpacity
            style={{ alignItems: "flex-end", margin: 16 }}
            onPress={route.navigation.openDrawer}
          >
            <Icon name='bars' size={24} color='#161924' />
          </TouchableOpacity>
          {/* //BOOK DISPLAY */}
          <Image
            style={{ width: 200, height: 300 }}
            alt={bookPath.title}
            source={{
              uri: bookPath.imageLinks.thumbnail,
            }}
          />
          <Text style={styles.textTitle}>{bookPath.title}</Text>
          <Text>{bookPath.authors}</Text>
          <Text>{bookPath.description}</Text>
          <Text>Book Status</Text>
          {/* //DROPDOWN */}
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
          {/* //ADD TO SHELF BUTTON */}
          <Button
            title='Add to Bookshelf'
            onPress={() => {
              //Creates book and status of book
              axios.post("http://localhost:3000/api/books", {
                //sends both book status, and book information
                status,
                book: {
                  title: bookPath.title,
                  image: bookPath.imageLinks.thumbnail,
                  authors: bookPath.authors,
                  rating: bookPath.averageRating,
                  description: bookPath.description,
                  //googleId does not use bookPath because it path
                  //does not have volumeInfo
                  googleId: route.navigation.state.params.id,
                },
              });
            }}
          />
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
