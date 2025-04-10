import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BackButton from '../components/BackButton';
import { AuthScreenNavigationProp } from '../types/navigationTypes';

// Sample data representing history entries
const historyData = [
  { id: '1', title: 'ZAPP Tesla Model Y', date: '06/02/2025', time: '14:13', amount: '11,70€' },
  { id: '2', title: 'ZAPP Tesla Model Y', date: '03/02/2025', time: '09:34', amount: '32,90€' },
  { id: '3', title: 'Mercedes Benz EQE', date: '01/02/2025', time: '18:45', amount: '3,20€' },
];

const History = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>(); // Use the navigation hook

  // Function to render each item in the FlatList
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.iconContainer}>
        <Icon name="car" size={20} style={styles.icon} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}, {item.time}</Text>
      </View>
      <Text style={styles.amount}>{item.amount}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <BackButton
          size={24}
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate('Home'); // Fallback to home screen
            }
          }}
        />
        <Text style={styles.header}>History</Text>
      </View>
      <FlatList
        data={historyData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
    // marginTop: 30,
    // position: 'relative',

  },
  header: {
    fontSize: 28,
    fontFamily: 'Arial, Helvetica, sans-serif',
    marginLeft: 70,
    marginTop: 70,

  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',

  },
  iconContainer: {
    backgroundColor: '#ddd',
    borderRadius: 20,
    padding: 8,
    marginRight: 12,
  },
  icon: {
    color: '#333',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  date: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  amount: {
    fontSize: 16,
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
});

export default History;
