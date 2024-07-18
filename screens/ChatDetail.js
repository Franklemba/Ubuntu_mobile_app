import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';


const demoMessages = {
    1: [
      { id: 1, text: 'Hi John, how are you?', sender: 'recipient' },
      { id: 2, text: 'I am good, thanks! How about you?', sender: 'sender' },
      { id: 3, text: 'Doing great, just busy with work.', sender: 'recipient' },
    ],
    2: [
      { id: 1, text: 'Hello Jane, are we still on for the meeting?', sender: 'recipient' },
      { id: 2, text: 'Yes, see you at 3 PM.', sender: 'sender' },
    ],
    3: [
      { id: 1, text: 'Hey Mike, did you finish the report?', sender: 'recipient' },
      { id: 2, text: 'Not yet, I will send it by tomorrow.', sender: 'sender' },
    ],
    4: [
      { id: 1, text: 'Hi Emily, can we reschedule our appointment?', sender: 'recipient' },
      { id: 2, text: 'Sure, how about next Monday?', sender: 'sender' },
    ],
  };

const ChatDetail = ({ route }) => {
  const { chatId } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch chat messages from backend
    // axios.get(`http://localhost:5000/chats/${chatId}`)
    //   .then(response => {
    //     setMessages(response.data.messages);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching messages:', error);
    //   });

      setMessages(demoMessages[chatId] || []);

  }, [chatId]);

  const handleSend = () => {
    // Send new message to backend
    // axios.post(`http://localhost:5000/chats/${chatId}/messages`, { message: newMessage })
    //   .then(response => {
    //     setMessages([...messages, response.data]);
    //     setNewMessage('');
    //   })
    //   .catch(error => {
    //     console.error('Error sending message:', error);
    //   });

    const newMessageObject = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'sender',
      };

    setMessages([...messages, newMessageObject]);
    setNewMessage('');
  };


  const renderItem = ({ item }) => (
    <View
      style={[
        styles.message,
        item.sender === 'sender' ? styles.senderMessage : styles.recipientMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id.toString()}
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
  senderMessage: {
    backgroundColor: '#dcf8c6',
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,
  },
  recipientMessage: {
    backgroundColor: '#ffffff',
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
});

export default ChatDetail;
