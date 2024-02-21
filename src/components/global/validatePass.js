import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Colors} from './Colors';

export default function Validate({validated = false, label = ''}) {
  return (
    <View style={[styles.ph(15), styles.fdrow, styles.center, styles.mb(6)]}>
      {!validated ? (
        <View style={styles.badge} />
      ) : (
        <FontAwesome name="check" style={styles.icon} color={'green'} />
      )}
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    width: 6,
    height: 6,
    backgroundColor: '#d9d9d9',
    borderRadius: 180,
    marginRight: 12,
  },
  label: {
    color: Colors.text,
    fontSize: 14,
    color: '#000',
  },
  icon: {
    marginRight: 6,
  },
  fdrow: {
    flexDirection: 'row',
  },
  center: {
    alignItems: 'center',
  },
  ph: size => ({
    paddingHorizontal: size,
  }),
  mr: size => ({
    marginRight: size,
  }),
  mv: size => ({
    marginVertical: size,
  }),
  pv: size => ({
    paddingVertical: size,
  }),
  pt: size => ({
    paddingTop: size,
  }),
  pb: size => ({
    paddingBottom: size,
  }),
  mb: size => ({
    marginBottom: size,
  }),
  mt: size => ({
    marginTop: size,
  }),
  ml: size => ({
    marginLeft: size,
  }),
});
