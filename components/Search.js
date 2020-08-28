import React, { Component } from "react";
import {  SearchBar } from "react-native-elements";
class Search extends React.Component {
  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <SearchBar
        placeholder="Search Here..."
        onChangeText={this.updateSearch}
        round
        containerStyle = {{ padding:0,backgroundColor:'#F3F3F3',  borderBottomColor: 'transparent', borderTopColor: 'transparent',borderRadius:'20',alignItems:'center', justifyContent:'center' }}
        inputContainerStyle ={{ backgroundColor:'white',alignItems:'center', justifyContent:'center', borderRadius:'20',Height: 12, minHeight: 10}}
        value={search}
      />
    );
  }
}
export default Search;