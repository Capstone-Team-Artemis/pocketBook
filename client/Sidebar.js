import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Text, Drawer } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from './context';
import { useDispatch, useSelector } from 'react-redux';
// import { connect } from 'react-redux';
import { changeImage, fetchUser } from './store/user';
import { useFonts } from 'expo-font';

const Sidebar = (props) => {
  // Loading fonts:
  const [loaded] = useFonts({
    'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
  });

  // Set custom image state
  const imageURL = useSelector((state) => state.user.image);
  const dispatch = useDispatch();
  dispatch(fetchUser(props.userId));
  const { logOut } = React.useContext(AuthContext);

  // Allows user to custom pick an image from camera roll
  const pickImage = async () => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permission to make this work!');
      return;
    } else {
      const pickImage = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
      });
      if (!pickImage.cancelled) {
        let id = Number(props.userId);
        dispatch(changeImage(id, pickImage.uri));
        dispatch(fetchUser(props.userId));
      }
    }
  };

  // For when font can't load:
  if (!loaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <ImageBackground
          imageStyle={{ opacity: 0.6 }}
          source={{
            uri: 'https://i.ibb.co/S7JTqyM/desk.jpg',
          }}
          style={{ padding: 20, paddingTop: 50 }}
        >
          <View>
            <Image
              source={{
                uri: imageURL,
              }}
              style={styles.profile}
            />
          </View>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={{
                uri: 'https://i.ibb.co/rfwKq09/camera.png',
              }}
              style={styles.camera}
            />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row' }}></View>
          <Text style={styles.name}>{props.userToken}</Text>
        </ImageBackground>
        <Drawer.Section>
          <DrawerItem
            icon={({ size }) => (
              <Icon name="search" color={'#000'} size={size} />
            )}
            labelStyle={styles.drawerSection}
            label="Find a Book"
            onPress={() => {
              props.navigation.navigate('LandingPage');
            }}
          />
          <DrawerItem
            icon={({ size }) => <Icon name="book" color={'#000'} size={size} />}
            labelStyle={styles.drawerSection}
            label="My Bookshelf"
            onPress={() => {
              props.navigation.navigate('UserProfile');
            }}
          />
          <DrawerItem
            icon={({ size }) => (
              <Icon name="calendar" color={'#000'} size={size} />
            )}
            labelStyle={styles.drawerSection}
            label="Events"
            onPress={() => {
              props.navigation.navigate('AllEvents');
            }}
          />
          <DrawerItem
            icon={({ size }) => (
              <Icon name="sign-out" color={'#000'} size={size} />
            )}
            labelStyle={styles.drawerSection}
            label="Sign Out"
            onPress={() => {
              logOut();
            }}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
    </View>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: 'rgba(50, 50, 50, 100)',
  },
  name: {
    color: '#000',
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    textShadowOffset: { width: 0.9, height: 0.5 },
    textShadowColor: '#000',
  },
  followers: {
    color: '#000',
    fontSize: 13,
    fontWeight: '700',
    marginRight: 4,
  },
  drawerSection: {
    fontFamily: 'Roboto-Light',
    fontSize: 15,
    color: '#000',
  },
  camera: {
    width: 19,
    height: 19,
    position: 'absolute',
    marginTop: -20,
    marginLeft: 55,
  },
});
