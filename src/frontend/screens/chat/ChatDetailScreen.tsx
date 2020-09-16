import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat';
import { withFirebaseHOC } from '../../../firebase/config/Firebase';
import { description } from 'core-js/fn/symbol/match';

const user =
{
  userName: 'Yufan Wang',
  numGroups: 10,
  numFriends: 10,
  userID: 'Uu123',
  major: 'Mechanical Enginnering',
  uri: 'https://picsum.photos/700',
  description: 'Cool Guy',
  classyear: 2020
}



function ChatDetailScreen({ navigation, firebase }) {
  const [messages, setMessages] = useState([]);
// props undefined / not working 
const {userName,
      numGroups,
      numFriends,
      userID,
      major,
      uri,
      description,
      classyear } = user

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: userID, 
          name: userName, 
          avatar: uri ,
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
      <GiftedChat
        renderUsernameOnMessage={true}
        showUserAvatar={true}
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
  )
}



export default withFirebaseHOC(ChatDetailScreen);
