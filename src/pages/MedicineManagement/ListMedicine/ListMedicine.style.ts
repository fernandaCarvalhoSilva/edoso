import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  btn: {
    color: '#000',
    padding: 20,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'purple',
    borderRadius: 10,
  },
  btnText: {
    fontSize: 22,
    textAlign: 'center',
    marginRight: 10,
    color: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  icon: {
    backgroundColor: 'transparent',
    borderRadius: 16,
    borderColor: '#000',
  },
  titleList: {
    fontSize: 30,
    textAlign: 'center',
    paddingVertical: 20,
  },
  list: {
    backgroundColor: 'transparent',
    paddingHorizontal: 24,
    paddingVertical: 24,
    fontSize: 26,
    borderColor: 'red',
  },
  imageContainer: {
    width: '100%',
    height:100,
  },
  iconContainer: {
    backgroundColor: 'gray',
    borderWidth: 0,
    borderRadius: 6,
  },
  iconMeds: {
    fontSize: 90,
  },
  listMedicinesView: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    borderRadius:5,
    textAlign: 'center'
  },
  fontSize: {
    fontSize: 30,
    flexWrap: 'wrap',
    width: '100%',
    textAlign: 'center'
  },
});
