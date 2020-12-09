import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';


const screenWidth = Math.round(Dimensions.get('window').width)

const categoryBase = {
  alignItems:'center',
  width: screenWidth*0.3,
  height: 30,
  marginHorizontal:screenWidth*0.3/4, 
  marginVertical: 10,
  borderRadius: 5,
  overflow: 'hidden',
  padding: 5,
  textAlign:'center',
};


const styles = StyleSheet.create({
  selectedCategory: {
    ...categoryBase,
    backgroundColor: "#1c7085",
  },

  notSelectedCategory: {
    ...categoryBase,
    backgroundColor: "white",
  },
});

function helper(category, toggle, currentTime, setCurrentTime) {
  if (currentTime === '') {
    console.log("nothing click yet")
    toggle(category);
    setCurrentTime(category)
  } else {
    if (category === currentTime) {
      console.log("you are clicking the clicked time")
      toggle(category)
      setCurrentTime('')
    } else {
      console.log("you are clicking different time")
      toggle(category)
      toggle(currentTime)
      setCurrentTime(category)
    }
  }
}

const Time = ({ category, toggle, isSelected, currentTime, setCurrentTime }) => {
  return (
    <TouchableOpacity style={isSelected ? styles.selectedCategory : styles.notSelectedCategory}
      onPress = {() => {helper(category, toggle,  currentTime, setCurrentTime)}}
    >
      <Text style={{ fontSize: 16, fontWeight: '500', fontFamily:'Avenir-Light'}}>{category}</Text>

    </TouchableOpacity>
  )
}



export default Time