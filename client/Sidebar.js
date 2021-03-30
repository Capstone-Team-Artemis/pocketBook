import React from 'react';
import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import { Text, Drawer } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from './context';

export default Sidebar = (props) => {
  const { logOut } = React.useContext(AuthContext);
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <ImageBackground
          source={{
            uri:
              'https://png.pngtree.com/thumb_back/fw800/back_pic/04/00/88/6157ff435466669.jpg',
          }}
          style={{ width: undefined, padding: 20, paddingTop: 50 }}
        >
          <Image
            source={{
              uri: 'https://cdn.nohat.cc/thumb/f/720/comvecteezy268447.jpg',
            }}
            style={styles.profile}
          />
          <Text style={styles.name}>{props.userToken}</Text>
          <View style={{ flexDirection: 'row' }}></View>
        </ImageBackground>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="search" color={color} size={size} />
            )}
            label="Search For Book"
            onPress={() => {
              props.navigation.navigate('LandingPage');
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="user-circle" color={color} size={size} />
            )}
            label="My Profile"
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
    color: 'black',
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

{
  /* <ImageBackground
        source={{
          uri:
            'https://png.pngtree.com/thumb_back/fw800/back_pic/04/00/88/6157ff435466669.jpg',
        }}
        style={{ width: undefined, padding: 20, paddingTop: 50 }}
      >
        <Image
          source={{
            uri: 'https://cdn.nohat.cc/thumb/f/720/comvecteezy268447.jpg',
          }}
          style={styles.profile}
        />
        <Text style={styles.name}>Test User</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.followers}>10 followers</Text>
        </View>
      </ImageBackground> */
}
