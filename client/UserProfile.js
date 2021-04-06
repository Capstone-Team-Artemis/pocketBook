import React, { useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image
} from "react-native";
import { connect, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { getBooks } from "./store/books";
import { Card, Title, Appbar, List } from 'react-native-paper';
import { useFonts } from 'expo-font';

const { width: WIDTH } = Dimensions.get("window");

const img = { uri: "https://i.ibb.co/0t3nZGK/loginscreen-copy.jpg"}

const UserProfile = (props) => {

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
    'Asap-Bold': require('../assets/fonts/Asap-Bold.ttf'),
    'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
  });

  // For when font can't load:
  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={{ uri:'https://i.ibb.co/BVg4wzs/Screen-Shot-2021-04-05-at-10-58-01-PM.png'}} style={styles.backgroundImg}>

      <Appbar.Header 
      style={styles.appBar}>
        <Appbar.Action
        style={styles.arrow} 
        icon= 'arrow-left' 
        size={24} 
        color='#161924'
        onPress={() => props.navigation.navigate("LandingPage")}
        />

        <Image
          source={{
          uri: 'https://i.ibb.co/NmBN3gY/pocketbook-icon.png',
          }}
          style={styles.logo}
        />
        <Appbar.Action
            icon='menu'
            size={27} 
            color='#161924' 
            style={styles.nav}
            onPress={props.navigation.openDrawer}
          />
      </Appbar.Header>
      <ScrollView style={styles.scrollView}>

        <View>
          <Text style={styles.heading}>{`${username}'s Bookshelf`}</Text>
        </View>

        {/* <List.Section> */}
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
                <Card style={[styles.cardContainer, noBooks]}>
                <Card.Content>
                <Title style={styles.title}>No books currently saved</Title>
                </Card.Content>
              </Card>
              )}
            </View>
          </ScrollView>
        </View>

        <View>
          <View style={styles.title}>
          <Text style={styles.text}>To Read</Text>
          </View>
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
                <Card style={[styles.cardContainer, noBooks]}>
                <Card.Content>
                <Title style={styles.title}>No books currently saved</Title>
                </Card.Content>
              </Card>
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
                  <Card style={[styles.cardContainer, noBooks]}>
                  <Card.Content>
                  <Title style={styles.title}>No books currently saved</Title>
                  </Card.Content>
                </Card>
              )}
            </View>
          </ScrollView>
        </View>
        {/* </List.Section> */}
      </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const noBooks = {marginLeft: 64}

const styles = StyleSheet.create({
  appBar:{
    backgroundColor: '#Faea26',
    width: WIDTH
  },
  logo:{
    marginBottom: -5,
    width: 35,
    height: 50,
    left: 115,
  },
  nav: {
    alignItems: 'flex-end', 
    left: 225,
    bottom: 0
  },
  container: {
    paddingTop: StatusBar.currentHeight,
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: `#fff`,
  },
  scrollView: {
    marginHorizontal: 1,
    width: WIDTH,
  },
  backgroundImg:{
    resizeMode: 'stretch',
  },
  heading: {
    fontSize: 30,
    fontFamily: 'Asap-Bold',
    marginTop: 15,
    alignSelf: 'center',
  },
  text: {
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    marginBottom: 20,
    alignSelf: 'center',
    textAlign: 'center',
  },
  bookList: {
    flexDirection: 'row',
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginLeft: 12,
    backgroundColor: '#fafafa'
  },
  title: {
    fontFamily:'Roboto-Regular',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5
  },
  image: {
    width: 150, 
    height: 210, 
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
