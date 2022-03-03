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
  deleteButton: {
    backgroundColor: 'rgba(181, 0, 14, 0.7)',
    height: 50,
    width: 250,
    borderRadius: 6,
    marginTop: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
  deleteButtonText: {
    paddingRight: 10,
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
  deleteButtonView: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customModalView: {
    width: '100%',
    alignItems: 'center',
    marginTop: 100,
    height: '35%',
    position: 'absolute',
  },
});
