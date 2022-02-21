import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  menuCardView: {
    width: '50%',
    alignItems: 'center',
  },
  title: {
    fontSize: 56,
    color: '#fff',
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: 'purple',
    borderWidth: 0,
    borderRadius: 4,
    width: 120,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardText: {
    textAlign: 'center',
    fontSize: 24,
  },

  icon: {
    fontSize: 70,
  },

  row: {
    marginBottom: 140,
    display: 'flex',
    flexDirection: 'row',
  },
  imageContainer: {
    width: 76,
    height: 76,
  },
});
