import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '../components/BackButton';
import { MainNavigationProp } from '../types/navigationTypes'; // Updated import

// Sample data representing history entries (same as in history.tsx)
const historyData = [
  { id: '1', title: 'ZAPP Tesla Model Y', date: '06/02/2025', time: '14:13', amount: '11,70€' },
  { id: '2', title: 'ZAPP Tesla Model Y', date: '03/02/2025', time: '09:34', amount: '32,90€' },
  { id: '3', title: 'Mercedes Benz EQE', date: '01/02/2025', time: '18:45', amount: '3,20€' },
];

// Data for expandable sections based on AppNavigationParamList
const helpSections = [
  { id: '1', title: 'About Zapp', route: 'About' },
  { id: '2', title: 'App and Usage', route: 'Usage' },
  { id: '3', title: 'Account', route: 'Account' },
  { id: '4', title: 'Payments and pricing', route: 'Payments' },
];

const Help = () => {
  const navigation = useNavigation<MainNavigationProp>(); // Updated typing

  // Function to render each history item in the FlatList
  const renderHistoryItem = ({ item }) => (
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

  // Function to render each expandable section
  const renderSectionItem = ({ item }) => (
    <Pressable
      style={styles.sectionItem}
      onPress={() => {
        if (item.route === 'Account') {
          navigation.navigate('App', { screen: 'Account' });
        } else {
          navigation.navigate('AppStack', { screen: item.route });
        }
      }}
    >
      <Text style={styles.sectionTitle}>{item.title}</Text>
      <Icon name="chevron-right" size={16} style={styles.chevronIcon} />
    </Pressable>
  );

  // Function to handle tab bar navigation
  const handleTabPress = (screen: 'Home' | 'Account' | 'History') => {
    navigation.navigate('App', { screen });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Main content area */}
      <View style={styles.contentContainer}>
        {/* Header with BackButton */}
        <View style={styles.headerContainer}>
          <BackButton
            size={24}
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate('App', { screen: 'Home' }); // Updated to navigate to Home within App
              }
            }}
          />
          <Text style={styles.header}>Help</Text>
        </View>

        {/* Contact Us Button */}
        <Pressable
          style={styles.contactButton}
          onPress={() => navigation.navigate('AppStack', { screen: 'Contact' })}
        >
          <View style={styles.contactIconContainer}>
            <Icon name="comment" size={20} style={styles.contactIcon} />
          </View>
          <Text style={styles.contactText}>Contact us</Text>
        </Pressable>

        {/* Recent Drives Section */}
        <Text style={styles.subHeader}>Need help with your latest drives?</Text>
        <FlatList
          data={historyData}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          style={styles.historyList}
        />

        {/* Expandable Sections */}
        <Text style={styles.otherHeader}>Others</Text>
        <FlatList
          data={helpSections}
          renderItem={renderSectionItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      {/* Custom Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <Pressable style={styles.tabItem} onPress={() => handleTabPress('Home')}>
          <Ionicons name="home-outline" size={24} color="#f9fcfa" />
          <Text style={styles.tabText}>Home</Text>
        </Pressable>
        <Pressable style={styles.tabItem} onPress={() => handleTabPress('Account')}>
          <Ionicons name="person-outline" size={24} color="#f9fcfa" />
          <Text style={styles.tabText}>Account</Text>
        </Pressable>
        <Pressable style={styles.tabItem} onPress={() => handleTabPress('History')}>
          <Ionicons name="time-outline" size={24} color="#1af3cf" />
          <Text style={[styles.tabText, { color: '#1af3cf' }]}>History</Text>
        </Pressable>

      </View>
    </SafeAreaView>
  );
};

// Styles for the component
const { height } = Dimensions.get('window'); // Get screen height for dynamic sizing

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,

  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,


  },
  header: {
    fontSize: 28,
    fontFamily: 'Arial, Helvetica, sans-serif',
    marginLeft: 70,
    marginTop: 70,
    padding:'auto',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 15,
  },
  contactIconContainer: {
    backgroundColor: '#ddd',
    borderRadius: 20,
    padding: 8,
    marginRight: 12,

  },
  contactIcon: {
    color: '#333',
  },
  contactText: {
    fontSize: 18,
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  subHeader: {
    fontSize: 16,
    fontFamily: 'Arial, Helvetica, sans-serif',
    color: '#666',
    marginBottom: 8,
  },
  historyList: {
    marginBottom: 15,
    maxHeight: height * 0.25,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
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
    fontSize: 16,
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  date: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  amount: {
    fontSize: 14,
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  otherHeader: {
    fontSize: 16,
    fontFamily: 'Arial, Helvetica, sans-serif',
    color: '#666',
    marginTop: 8,
    marginBottom: 8,
  },
  sectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  chevronIcon: {
    color: '#666',
  },
  // Styles for the custom tab bar
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#093331',
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabText: {
    color: '#f9fcfa',
    fontSize: 12,
    fontFamily: 'Arial, Helvetica, sans-serif',
    marginTop: 4,
  },
});

export default Help;
