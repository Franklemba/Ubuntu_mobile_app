import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const demoChats = [
    {
      id: 1,
      name: 'John Doe',
      unreadMessages: 3,
    },
    {
      id: 2,
      name: 'Jane Smith',
      unreadMessages: 0,
    },
    {
      id: 3,
      name: 'Mike Johnson',
      unreadMessages: 1,
    },
    {
      id: 4,
      name: 'Emily Brown',
      unreadMessages: 2,
    },
  ];




const ChatScreen = () => {
  const [chats, setChats] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch chat list from backend
    // axios.get('http://localhost:5000/chats')
    //   .then(response => {
    //     setChats(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching chats:', error);
    //   });
    setChats(demoChats);

  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.chatItem} 
      onPress={() => navigation.navigate('ChatDetail', { chatId: item.id })}>
       
      <Text style={styles.chatName}>{item.name}</Text>
      {item.unreadMessages > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{item.unreadMessages}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  chatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  chatName: {
    fontSize: 18,
  },
  unreadBadge: {
    backgroundColor: 'red',
    borderRadius: 15,
    padding: 5,
    minWidth: 30,
    alignItems: 'center',
  },
  unreadText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChatScreen;
