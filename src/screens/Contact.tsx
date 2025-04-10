import React from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '../components/BackButton';
import { MainNavigationProp } from '../types/navigationTypes';

const Contact = () => {
  const navigation = useNavigation<MainNavigationProp>();

  // Function to handle tab bar navigation
  const handleTabPress = (screen: 'Home' | 'History' | 'Account') => {
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
                navigation.navigate('App', { screen: 'Home' });
              }
            }}
          />
          <Text style={styles.header}>Contact us</Text>
        </View>

        {/* Heading Input */}
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Title of your message..."
          placeholderTextColor="#666"
        />

        {/* Description Text Area */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Write your message here..."
          placeholderTextColor="#666"
          multiline
          numberOfLines={6}
        />

        {/* Submit Button */}
        <Pressable style={styles.submitButton} onPress={() => {}}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </Pressable>
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 60,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  header: {
    fontSize: 28,
    fontFamily: 'Arial, Helvetica, sans-serif',
    marginLeft: 70,
    marginTop: 70,
    color: '#333',

  },
  label: {

    fontSize: 16,
    fontFamily: 'Arial, Helvetica, sans-serif',
    color: '#007F5F',
    marginBottom: 8,
    paddingTop: 30,
    paddingLeft: 40,


  },
  input: {

    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    fontFamily: 'Arial, Helvetica, sans-serif',
    marginBottom: 10,
    color: '#333',
    width: '80%',
    alignSelf: 'center',
  },
  textArea: {
    height: 200,
    textAlignVertical: 'top',
    width: '80%',
  },
  submitButton: {
    backgroundColor: '#007F5F',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
    width: '40%',
    alignSelf: 'center'
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Arrtial, Helvetica, sans-serif',
  },

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

export default Contact;
