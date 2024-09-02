import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useAuth } from "../AuthContext";
import { useNavigation } from '@react-navigation/native';
import io from 'socket.io-client';
import * as timeago from 'timeago.js';

// Initialize the socket connection
const socket = io('http://localhost:5000');


const ChatDetail = ({ route }) => {
  const { chatId, item } = route.params;
  const { userDetails } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
 const flatListRef = useRef(null);

  useEffect(() => {
    // Fetch chat messages from backend and join the chat room via socket
    axios.get(`http://localhost:5000/consultation/getMessages/${chatId}`)
      .then(response => {
        setMessages(response.data.messages);
        socket.emit('joinSocket', chatId);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
    
    // Listen for incoming messages
    socket.on('incomingMessage', (incomingMessage) => {
      setMessages(prevMessages => [...prevMessages, incomingMessage]);
      scrollToBottom();
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.off('incomingMessage');
      socket.emit('leaveSocket', chatId); // Assuming you have a handler for leaving the room
    };
  }, [chatId]);

  const handleSend = () => {
    if (newMessage.trim() === '') return;

    const messageData = {
      chatId,
      message: {
        id: messages.length +1+userDetails.accountType,
        userId: userDetails._id,
        text: newMessage,
        sender: userDetails.accountType,
        timestamp: new Date().toISOString(), // Add a timestamp
      }
    };

    // Emit the message through Socket.IO
    socket.emit('sendMessage', messageData);
    
    // Update local state with the new message
   setNewMessage('');

  };

  const scrollToBottom = () => {
    if (flatListRef.current){
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };
  scrollToBottom();

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.message,
        item.userId !== userDetails._id ? styles.recipientMessage : styles.senderMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.timestamp}>{timeago.format(item.timestamp)}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
      ref={flatListRef}
        data={messages}
        keyExtractor={item => item?.id.toString()}
        renderItem={renderItem}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message"
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  message: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  recipientMessage: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,
  },
  senderMessage: {
    backgroundColor: '#dcf8c6',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  }
});

export default ChatDetail;
