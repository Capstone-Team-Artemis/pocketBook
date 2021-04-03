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

const Sidebar = (props) => {
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

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <ImageBackground
          imageStyle={{ opacity: 0.9 }}
          source={{
            uri:
              'https://media.istockphoto.com/vectors/interior-illustration-of-a-workspace-vector-id1167352352?k=6&m=1167352352&s=612x612&w=0&h=W5TFLBZx_vgB51-fgInOeuc8X_hE2PsCPR-ptaqkWdY=',
          }}
          style={{
            padding: 20,
            paddingTop: 50,
          }}
        >
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={{
                uri: imageURL,
              }}
              style={styles.profile}
            />
          </TouchableOpacity>
          <Text style={styles.name}>{props.userToken}</Text>
          <View style={{ flexDirection: 'row' }}></View>
        </ImageBackground>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="search" color={color} size={size} />
            )}
            label="Find a Book"
            onPress={() => {
              props.navigation.navigate('LandingPage');
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="book" color={color} size={size} />
            )}
            label="My Bookshelf"
            onPress={() => {
              props.navigation.navigate('UserProfile');
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="calendar" color={color} size={size} />
            )}
            label="Events"
            onPress={() => {
              props.navigation.navigate('AllEvents');
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="sign-out" color={color} size={size} />
            )}
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

// const mapState = (state) => {
//   return {
//     image: state.image,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     changeImage: (userId, imageURL) => dispatch(changeImage(userId, imageURL)),
//   };
// };

export default Sidebar;
// export default connect(mapState, mapDispatch)(Sidebar);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
  },
  followers: {
    color: 'black',
    fontSize: 13,
    fontWeight: '700',
    marginRight: 4,
  },
});
