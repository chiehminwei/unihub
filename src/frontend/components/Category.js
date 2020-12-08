import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';

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

const Category = ({ category, toggle, isSelected }) => {
  console.log(category)
  return (
    <TouchableOpacity style={isSelected ? styles.selectedCategory : styles.notSelectedCategory}
      onPress = {() => toggle(category)}
    >
    
      <Text style={{ fontSize: 16, fontWeight: '500', fontFamily:'Avenir-Light'}}>{category}</Text>

    </TouchableOpacity>
  )
}



export default Category