import React from 'react';
import { Text, TextInput, View } from 'react-native';

const UselessTextInput = () => {
  const [value, onChangeText] = React.useState('Useless Placeholder');

  return (
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => onChangeText(text)}
      value={value}
    />
  );
}
export default function CommentScreen() {
  return (
    <View style={{ backgroundColor:'#bad4da', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
     <View style={{height:50}}>
       <Text>comment</Text>
     </View>
     <View style={{height:50}}>
       <Text>comment</Text>
     </View><View style={{height:50}}>
       <Text>comment</Text>
     </View><View style={{height:50}}>
       <Text>comment</Text>
     </View><View style={{height:50}}>
       <Text>comment</Text>
     </View><View style={{height:50}}>
       <Text>comment</Text>
     </View>


    </View>
  );
}