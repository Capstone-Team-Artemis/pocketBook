import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TextInput,
  ImageBackground,
} from 'react-native';
import { DrawerItems } from 'react-navigation';
import { DrawerNavigationItems } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

export default Sidebar = (props) => {
  console.log('propsssss---->', props);
  return (
    <ScrollView>
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
        <Text style={styles.name}>Test User</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.followers}>10 followers</Text>
        </View>
        <DrawerItems {...props} />
      </ImageBackground>
    </ScrollView>
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
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
  },
});
