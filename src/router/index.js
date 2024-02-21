import React, {useEffect, useState, useContext, useRef} from 'react';
import {
  ActivityIndicator,
  View,
  Platform,
  Linking,
  Alert,
  Image,
  SafeAreaView,
  AppState,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NetInfo from '@react-native-community/netinfo';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';

// import ForgetScreen from '../screens/forget/Forget';
// import RecoverPass from '../screens/forget/Recover';
// import CheckCode from '../screens/forget/CheckCode';
// import NewPass from '../screens/forget/NewPass';

import NoInternet from '../components/global/NoInternet';
import {AuthContext} from '../context/AuthContext';
import api from '../api';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../components/global/CustomDrawer';

const RootStack = createStackNavigator();

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator
    initialRouteName="Login"
    screenOptions={{headerShown: false}}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    {/* <AuthStack.Screen name="Forget" component={ForgetScreen} />
    <AuthStack.Screen name="RecoverPass" component={RecoverPass} />
    <AuthStack.Screen name="CheckCode" component={CheckCode} />
    <AuthStack.Screen name="NewPass" component={NewPass} /> */}
  </AuthStack.Navigator>
);

const InternetStack = createStackNavigator();
const InternetStackScreen = () => (
  <InternetStack.Navigator
    initialRouteName="NetworkFail"
    screenOptions={{headerShown: false}}>
    <InternetStack.Screen name="NetworkFail" component={NoInternet} />
  </InternetStack.Navigator>
);

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator
    initialRouteName="HomeStack"
    screenOptions={{
      headerShown: true,
      headerStyle: {},
      headerTitleStyle: {
        fontSize: 14,
      },
      headerBackTitle: 'Буцах',
      headerBackTitleStyle: {
        fontSize: 14,
      },
      headerBackgroundContainerStyle: {
        backgroundColor: '#fff',
      },
    }}>
    <HomeStack.Group>
      <HomeStack.Screen
        name="HomeStack"
        component={HomeScreen}
        options={{
          title: '',
          headerBackground: () => (
            <SafeAreaView>
              <Image
                style={{
                  width: 200,
                  marginTop: 4,
                  marginLeft: 10,
                }}
                resizeMode="contain"
                source={require('../assets/logo.png')}
              />
            </SafeAreaView>
          ),
        }}
      />
    </HomeStack.Group>
  </HomeStack.Navigator>
);

const Tab = createBottomTabNavigator();
const TabScreen = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="TabHome"
      component={HomeStackScreen}
      options={{
        tabBarItemStyle: {display: 'none'},
        headerShown: false,
        title: 'Нүүр хуудас',
        tabBarLabel: 'Нүүр хуудас',
        tabBarIcon: ({color, size, focused}) => {
          const image = require('../assets/tab/idcard.png');
          return (
            <Image
              resizeMode="contain"
              source={image}
              style={{width: 25, height: 25}}
            />
          );
        },
      }}
    />
    {/* <Tab.Screen
      name="TabIdCard"
      // харуулахгүй component
      component={HomeStackScreen}
      options={{
        // tabBarItemStyle: {display: 'none'},
        headerShown: false,
        title: 'Ажлын үнэмлэх',
        tabBarLabel: 'Ажлын үнэмлэх',
        tabBarIcon: ({color, size, focused}) => {
          const image = require('../assets/tab/idcard.png');
          return (
            <Image
              resizeMode="contain"
              source={image}
              style={{width: 25, height: 25}}
            />
          );
        },
      }}
      listeners={({navigation}) => ({
        tabPress: e => {
          e.preventDefault();
          navigation.navigate('IdCardScreen');
        },
      })}
    />
    <Tab.Screen
      name="QrScreen"
      component={QrScreen}
      options={{
        title: 'Цаг бүртгэл',
        tabBarLabel: 'Цаг бүртгэл',
        tabBarIcon: ({color, size, focused}) => {
          const image = require('../assets/tab/qrcode.png');
          return (
            <Image
              resizeMode="contain"
              source={image}
              style={{width: 25, height: 25}}
            />
          );
        },
      }}
    /> */}
  </Tab.Navigator>
);

const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator
    drawerContent={props => <CustomDrawer {...props} />}
    screenOptions={{headerShown: false, drawerPosition: 'right'}}>
    <Drawer.Screen
      name="DrawerHome"
      component={TabScreen}
      options={{
        title: 'Нүүр хуудас',
      }}
    />
  </Drawer.Navigator>
);

const Navigation = ({navigation}) => {
  const {isLoading, userToken, setIsLoading, logout} = useContext(AuthContext);
  const [netInfo, setNetInfo] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetInfo(state.isConnected);
      setIsLoading(false);
    });

    getNetInfo();
    return () => {
      unsubscribe();
    };
  }, [netInfo]);

  const getNetInfo = () => {
    // To get the network state once
    NetInfo.fetch().then(state => {
      setNetInfo(state.isConnected);
      setIsLoading(false);
    });
  };

  if (isLoading) {
    // We haven't finished checking for the token yet
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="#1660AB" size="large" />
      </View>
    );
  }
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      {!netInfo ? (
        <RootStack.Screen
          name="NoInternet"
          component={InternetStackScreen}
          options={{
            animationEnabled: false,
          }}
        />
      ) : userToken ? (
        <RootStack.Screen name="App" component={DrawerScreen} />
      ) : (
        <RootStack.Screen name="Auth" component={AuthStackScreen} />
      )}
    </RootStack.Navigator>
  );
};

export default Navigation;
