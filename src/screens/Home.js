import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Colors} from '../components/global/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import api from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AIcon from 'react-native-vector-icons/AntDesign';

const HomeScreen = props => {
  const {navigation} = props;
  const [lotteryModal, setLotteryModal] = useState(false);
  const [lotteryType, setLotteryType] = useState(0);
  const windowWidth = Dimensions.get('window').width;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={{marginRight: 5}}>
          <Ionicons name="menu-outline" size={30} color={'#000'} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={lotteryModal}
        onRequestClose={() => {
          setLotteryModal(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {lotteryType == 1 ? (
              <Image
                resizeMode="contain"
                style={{width: windowWidth * 0.8, height: windowWidth * 0.8}}
                source={require('../assets/lottery/winner.png')}
              />
            ) : lotteryType == 3 ? (
              <Image
                resizeMode="contain"
                style={{width: windowWidth * 0.8, height: windowWidth * 0.8}}
                source={require('../assets/lottery/start.png')}
              />
            ) : (
              <Image
                resizeMode="contain"
                style={{width: windowWidth * 0.8, height: windowWidth * 0.8}}
                source={require('../assets/lottery/not_winner.png')}
              />
            )}
            <TouchableOpacity
              onPress={() => setLotteryModal(false)}
              style={styles.closeModal}>
              <AIcon name="close" style={styles.closeBtn} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.profileContainer}
        onPress={() => navigation.navigate('UserProfileStack')}>
        <View style={styles.leftText}>
          <Text style={styles.leftText1}>Хувийн мэдээлэл</Text>
          <Text style={styles.leftText2}>Ажилтны хувийн мэдээлэл</Text>
        </View>
        <View style={styles.rightImage}>
          <Image
            resizeMode="stretch"
            style={{width: 60, height: 60}}
            source={require('../assets/images/00.png')}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonContainer, {backgroundColor: '#6abdef'}]}
        onPress={() => navigation.navigate('TimeSheetStack')}>
        <View style={styles.leftText}>
          <Text style={styles.leftText1}>Цагийн мэдээ</Text>
          <Text style={styles.leftText2}>Ажилтны ирцийн мэдээлэл</Text>
        </View>
        <View style={styles.rightImage}>
          <Image
            resizeMode="stretch"
            style={{width: 60, height: 60}}
            source={require('../assets/images/01.png')}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonContainer, {backgroundColor: '#4090c4'}]}
        onPress={() => navigation.navigate('SalaryStack')}>
        <View style={styles.leftText}>
          <Text style={styles.leftText1}>Цалингийн мэдээ</Text>
          <Text style={styles.leftText2}>
            Цалингийн болон саятан сангийн мэдээлэл
          </Text>
        </View>
        <View style={styles.rightImage}>
          <Image
            resizeMode="stretch"
            style={{width: 60, height: 60}}
            source={require('../assets/images/02.png')}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonContainer, {backgroundColor: '#1660ab'}]}
        onPress={() => navigation.navigate('PhoneStack')}>
        <View style={styles.leftText}>
          <Text style={styles.leftText1}>Утасны жагсаалт</Text>
          <Text style={styles.leftText2}>Сар бүрийн шинэчлэгдсэн жагсаалт</Text>
        </View>
        <View style={styles.rightImage}>
          <Image
            resizeMode="stretch"
            style={{width: 60, height: 60}}
            source={require('../assets/images/03.png')}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonContainer, {backgroundColor: '#1b3a59'}]}
        onPress={() => navigation.navigate('TimeSheetStack')}>
        <View style={styles.leftText}>
          <Text style={styles.leftText1}>Номин календар</Text>
          <Text style={styles.leftText2}>Үйл явдал мэдээлэл</Text>
        </View>
        <View style={styles.rightImage}>
          <Image
            resizeMode="stretch"
            style={{width: 60, height: 60}}
            source={require('../assets/images/04.png')}
          />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default HomeScreen;

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
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
    marginTop: 5,
    marginHorizontal: 5,
  },
  buttonText: {color: '#fff'},
  container: {flex: 1, backgroundColor: '#fff'},
  forgotTextContainer: {
    marginVertical: 5,
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  inputContainer: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    height: 50,
    marginTop: 10,
  },
  input: {flex: 1, backgroundColor: '#fff'},
  logo: {height: 60},
  leftText: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '80%',
    paddingLeft: 10,
  },
  leftText1: {color: 'white', fontSize: 22},
  leftText2: {color: 'white', fontSize: 12, fontWeight: '100'},
  profileContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#1660AB',
    borderRadius: 5,
    marginTop: 5,
    marginHorizontal: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtn: {
    color: '#fff',
    fontSize: 30,
  },
  closeModal: {
    position: 'absolute',
    right: 0,
  },
});
