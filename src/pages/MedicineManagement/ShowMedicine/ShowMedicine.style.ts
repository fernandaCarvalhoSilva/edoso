import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: 30,
    borderWidth: 0,
    borderRadius: 6,
    width: 150,
    height: 140,
    justifyContent: 'space-between',
  },
  iconContainer: {
    backgroundColor: 'gray',
    borderWidth: 0,
    borderRadius: 6,
    width: 150,
    height: 140,
    marginTop: 30,
    justifyContent: 'center',
  },
  iconMeds: {
    fontSize: 90,
  },
  textView: {
    marginTop: 20,
    alignItems: 'flex-start',
  },
  childTextView: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 30,
    marginBottom: 20,
  },
  label: {
    fontSize: 30,
    marginBottom: 20,
    color: 'purple',
  },
});
