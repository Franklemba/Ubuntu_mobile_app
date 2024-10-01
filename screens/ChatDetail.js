import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import axios from 'axios';
import { useAuth } from "../AuthContext";
import { useNavigation } from '@react-navigation/native';
import io from 'socket.io-client';
import * as timeago from 'timeago.js';

const socket = io("https://ubuntuserver-7wbg.onrender.com/");

const ChatDetail = ({ route }) => {
  const { chatId, item } = route.params;
  const { userDetails } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef(null);

  useEffect(() => {
    axios.get(`https://ubuntuserver-7wbg.onrender.com/consultation/getMessages/${chatId}/${userDetails._id}`)
      .then(response => {
        setMessages(response.data.messages);
        socket.emit('joinSocket', chatId);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
    
    socket.on('incomingMessage', (incomingMessage) => {
      setMessages(prevMessages => [...prevMessages, incomingMessage]);
      scrollToBottom();
    });

    return () => {
      socket.off('incomingMessage');
      socket.emit('leaveSocket', chatId);
    };
  }, [chatId]);

  const handleSend = () => {
    if (newMessage.trim() === '') return;

    const messageData = {
      chatId,
      message: {
        id: messages.length + 1 + userDetails.accountType,
        userId: userDetails._id,
        text: newMessage,
        sender: userDetails.accountType,
        timestamp: new Date().toISOString(),
      }
    };

    socket.emit('sendMessage', messageData);
    setNewMessage('');
  };

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

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
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0} // Adjust this value as needed
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={item => item?.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.messageList}
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  messageList: {
    paddingHorizontal: 10,
    paddingBottom: 10,
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
    backgroundColor: '#fff',
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