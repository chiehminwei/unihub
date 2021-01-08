import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    width: '90%',
    height: 24,
    position: 'relative',
    alignSelf: 'center',
  },
  inputWrapper: {
    position: 'absolute',
    top: 0,
    height: 24,
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
  },
  input: {
    height: 24,
    fontSize: 18,
    width: '100%',
  },
  mention: {
    color: '#1DA1F2'
  }
});

const Multiline = (props) => {
  const [content, setContent] = useState('');
  const [formattedContent, setFormattedContent] = useState('');
  const [tags, setTags] = useState([]);

  const handleChangeText = (inputText) => {
    const retLines = inputText.split("\n");
    const formattedText = [];
    const numLines = retLines.length;
    const newTags = [];
    retLines.forEach((retLine, lineIndex) => {
      const words = retLine.split(" ");
      const contentLength = words.length;
      var format = /[ !#@$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\n]/;
      words.forEach((word,index) => {
        if (
          (word.startsWith("@") && !format.test(word.substr(1))) ||
          (word.startsWith("#") && !format.test(word.substr(1)))
        ) {
          const mention = (
            <Text key={index} style={styles.mention}>
              {word}
            </Text>
          );
          newTags.push(word);
          if (index !== contentLength - 1) formattedText.push(mention, " ");
          else formattedText.push(mention);
        } else {
          if (index !== contentLength - 1) return formattedText.push(word, " ");
          else return formattedText.push(word);
        }
      });
      if (lineIndex !== numLines - 1) formattedText.push('\n');
    });

    setContent(inputText);// still update your raw text, this will probably go to your api
    setFormattedContent(formattedText);
    setTags(newTags);

    props.setDescription(inputText);
    props.setTags(newTags);
  };

  const getTags = () => tags;
  const getText = () => content;


  return (
    //--------render------------
    <View style={{ margin: 15}}>
    <TextInput
      style={[styles.input,
            {
              paddingTop: 8,
              paddingBottom: 8,
              paddingHorizontal:8,
              height: props.height,
              backgroundColor:'#f1f7f8',
              
            }   
          ]}
      {...props}
      multiline={true}
      onChangeText={handleChangeText}
     >
      <Text>{formattedContent}</Text>
    </TextInput>
    </View>
  )
}

export default Multiline;