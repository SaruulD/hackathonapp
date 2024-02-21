import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../../context/AuthContext';
import {Colors} from './Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawer = props => {
  const {navigation} = props;
  const {logout} = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    fetchUser();
  }, []);

  fetchUser = async () => {
    var userData = await AsyncStorage.getItem('userInfo');
    var convert_userData = await JSON.parse(userData);
    setUserInfo(convert_userData);
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: Colors.primary}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('UserProfileStack')}
          style={{
            padding: 10,
            flexDirection: 'row',
            backgroundColor: Colors.primary,
          }}>
          {userInfo && (
            <Image
              source={{uri: userInfo.img}}
              style={{
                height: 60,
                width: 60,
                borderRadius: 40,
                marginBottom: 10,
              }}
            />
          )}
          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                marginBottom: 5,
              }}>
              {userInfo.lname}.{userInfo.name}
            </Text>
            <Text
              style={{
                color: '#fff',
                marginRight: 5,
              }}>
              {userInfo.job}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          marginHorizontal: 10,
          paddingVertical: 20,
          borderTopWidth: 1,
          borderTopColor: '#ccc',
        }}>
        <TouchableOpacity
          onPress={() => {
            logout();
          }}
          style={{
            padding: 10,
            backgroundColor: '#1b3a59',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} color={'#fff'} />
            <Text
              style={{
                fontSize: 15,
                // fontFamily: 'Roboto-Medium',
                marginLeft: 5,
                color: '#fff',
              }}>
              Гарах
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
