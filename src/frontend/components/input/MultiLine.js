import React, { Component } from "react";
import { Input } from 'react-native-elements';
import PropTypes from "prop-types";
import Fumi from './Fumi';

export default class MultiLine extends Component {
  static propTypes = {
    maxLines: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || ""
    };
  }

  onChangeText = text => {
    const { maxLines, onChangeText } = this.props;
    const lines = text.split("\n");

    if (lines.length <= (maxLines || 1)) {
      onChangeText(text);
      this.setState({ value: text });
    }
 };

 render() {
   const { onChangeText, multiline, value, style, ...other } = this.props;
   return (
     <Fumi
       {...other}
       multiline={true}
       style={style}
       value={this.state.value}
       onChangeText={this.onChangeText}

       // label={label}
       // iconClass={iconClass}
       // iconName={iconName}
       iconColor={'#f95a25'}
       iconSize={20}
       iconWidth={40}
       inputPadding={16}
     />
   );
 }
}