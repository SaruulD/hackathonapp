import React, {useState, useEffect, useContext} from 'react';
import {
  Image,
  Alert,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  Text,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Colors} from '../components/global/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput} from 'react-native-paper';
import api from '../api';
import {getUniqueId, getVersion, getModel} from 'react-native-device-info';
import {AuthContext} from '../context/AuthContext';

const LoginScreen = props => {
  const {navigation} = props;
  const {login} = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [uniqueId, setUniqueId] = useState('');
  const [saveLoginInfo, setSaveLoginInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();

    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return function cleanup() {
      unsubscribe();
    };
  }, []);

  const fetchData = async () => {
    let loginData = await AsyncStorage.getItem('loginInfo');
    let loginUserData = await JSON.parse(loginData);
    if (loginUserData !== null) {
      setSaveLoginInfo(loginUserData.saveLoginInfo || false);
      setUsername(loginUserData.username);
      setPassword(loginUserData.password);
    }
  };

  const signIn = async () => {
    if (!username != '' || !password != '') {
      Alert.alert('', 'Нэвтрэх код, нууц үгээ оруулна уу');
    } else {
      setIsLoading(true);

      api
        .post('auth', {
          username,
          password,
          platform: Platform.OS,
        })
        .then(res => {
          if (res.data.code == '200') {
            loginAuthenticated(res.data);
          } else {
            setIsLoading(false);
            Alert.alert(
              'Алдаа гарлаа.',
              'Нэвтрэх нэр эсвэл нууц үг буруу байна',
            );
          }
        })
        .catch(error => {
          Alert.alert('Алдаа гарлаа', error.message);
          setIsLoading(false);
        });
    }
  };

  const loginAuthenticated = async (responseData, isFirst = false) => {
    if (isFirst) {
    }
    await AsyncStorage.setItem('userInfo', JSON.stringify(responseData));
    if (saveLoginInfo) {
      let obj = {};
      obj.username = username;
      obj.password = password;
      obj.saveLoginInfo = saveLoginInfo;
      await AsyncStorage.setItem('loginInfo', JSON.stringify(obj));
    } else {
      AsyncStorage.removeItem('loginInfo');
    }
    login(responseData.jwt);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <View style={{flexGrow: 1, justifyContent: 'center'}}>
          <View style={styles.Loginbox1}>
            <Image
              resizeMode="cover"
              style={styles.loginShape}
              source={require('../assets/login/loginBG.png')}
            />
            <Image
              resizeMode="contain"
              style={styles.loginLogo}
              source={require('../assets/login/loginLogo.png')}
            />
            <Text style={styles.loginText}>АЖИЛТНЫ АПП</Text>
          </View>
          <View>
            <View style={styles.inputContainer}>
              <TextInput
                label="Нэвтрэх нэр"
                value={username}
                keyboardType="numeric"
                onChangeText={text => setUsername(text)}
                mode="outlined"
                style={styles.input}
                textColor={Colors.text}
                outlineStyle={{borderColor: Colors.primary}}
                theme={{
                  colors: {
                    primary: Colors.primary,
                  },
                }}
                left={<TextInput.Icon icon="account-outline" color={'#000'} />}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                label="Нууц үг"
                value={password}
                onChangeText={text => setPassword(text)}
                mode="outlined"
                style={styles.input}
                textColor={Colors.text}
                outlineStyle={{borderColor: Colors.primary}}
                // secureTextEntry={!showPassword ? true : false}
                secureTextEntry={true}
                theme={{
                  colors: {
                    primary: Colors.primary,
                  },
                }}
                left={<TextInput.Icon icon="lock-outline" color={'#000'} />}
              />
            </View>
            <TouchableOpacity
              style={styles.forgotTextContainer}
              onPress={() => {
                navigation.navigate('Forget');
              }}>
              <Text style={{color: '#333'}}>Та нууц үгээ мартсан уу?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSaveLoginInfo(!saveLoginInfo)}
              style={styles.checkboxContainer}>
              {!saveLoginInfo ? (
                <View style={styles.checkbox}></View>
              ) : (
                <View style={styles.checkboxCheckedContainer}>
                  <View style={styles.checkboxChecked} />
                </View>
              )}
              <Text style={{marginLeft: 5, color: '#000'}}>Сануулах</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.button, {flexDirection: 'row'}]}
            disabled={isLoading ? true : false}
            onPress={() => signIn()}>
            {isLoading && (
              <ActivityIndicator
                color="white"
                size="small"
                style={{marginRight: 5}}
              />
            )}
            <Text style={styles.buttonText}>Нэвтрэх</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, {flexDirection: 'row'}]}
            disabled={isLoading ? true : false}
            onPress={() => signIn()}>
            {isLoading && (
              <ActivityIndicator
                color="white"
                size="small"
                style={{marginRight: 5}}
              />
            )}
            <Text style={styles.buttonText}>Бүртгүүлэх</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert('', uniqueId);
            }}
            style={styles.versionContainer}>
            <Text style={{color: Colors.text}}>v.{getVersion()}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginHorizontal: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {color: '#fff'},
  checkboxContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 180,
    width: 16,
    height: 16,
  },
  checkboxChecked: {
    width: 9,
    height: 9,
    backgroundColor: Colors.primary,
    borderRadius: 300,
  },
  checkboxCheckedContainer: {
    borderWidth: 1,
    borderColor: Colors.primary,
    width: 16,
    height: 16,
    borderRadius: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {flex: 1, backgroundColor: '#fff'},
  forgotTextContainer: {
    marginVertical: 5,
    paddingHorizontal: 10,
    width: 200,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    height: 50,
    marginTop: 10,
  },
  input: {flex: 1, backgroundColor: '#fff', color: '#000'},
  logo: {height: 80, alignSelf: 'center'},
  versionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.1,
    marginBottom: 20,
    width: '20%',
    alignSelf: 'center',
  },
  Loginbox1: {
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-30%',
  },
  loginShape: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '-10%',
  },
  loginLogo: {
    width: '20%',
    height: '20%',
    position: 'absolute',
    top: '10%',
  },
  loginText: {
    position: 'absolute',
    top: '33%',
    color: '#fff',
    fontSize: 18,
  },
});
