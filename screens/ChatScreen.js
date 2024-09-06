import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from "../AuthContext";

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
  const { userDetails } = useAuth();
  useEffect(() => {
    // Fetch chat list from backend
    axios.get(`http://localhost:5000/consultation/get/${userDetails._id}`)
      .then(response => {
        console.log(response.data.consultations)
        setChats(response.data.consultations);
      })
      .catch(error => {
        console.error('Error fetching chats:', error);
      });
    // setChats(demoChats);

  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.chatItem} 
      onPress={() => navigation.navigate('ChatDetail', { chatId: item._id,item })}>
      <View style={{flexDirection:'column'}}>
      {
        userDetails.accountType=='patient'?
        <View >
       <Text style={styles.chatName}>Doctor Name: {item.doctorName}</Text>
       </View>:
       <View>
       <Text style={styles.chatName}>Patient Name: {item.patientName}</Text>
       </View> 
      }
       <View>
       <Text style={styles.chatName}>Consultation Reason: {item.consultationReason}</Text>
       </View>
      </View>
     
      {item.doctorName==''||item.doctorName==undefined? (
        <View style={styles.unreadBadge}>
          
        </View>
      ):<View style={styles.readBadge}>

      </View>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={item => item._id.toString()}
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
    minWidth: 25,
    minHeight:25,
    alignItems: 'center'
  },readBadge: {
    backgroundColor: 'lime',
    borderRadius: 15,
    padding: 5,
    minWidth: 25,
    minHeight:25,
    alignItems: 'center'
  },
  unreadText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChatScreen;
