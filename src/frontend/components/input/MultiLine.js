import React, { Component } from "react";
import { StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';
import PropTypes from "prop-types";
import Fumi from './Fumi';
import ParsedText from 'react-native-parsed-text';


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
    <View>
      <ParsedText
        style={styles.text}
        parse={
          [
            {type: 'url',                       style: styles.url},
            {type: 'phone',                     style: styles.phone},
            {type: 'email',                     style: styles.email},
            {pattern: /(^|\s)(#[a-z\d-]+)/g,    style: styles.hashTag},
          ]
        }
        childrenProps={{allowFontScaling: false}}
      >
        {this.state.value}
       </ParsedText>
       { true && <Fumi
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
       /> }
     </View>
   );
 }
}

const styles = StyleSheet.create({
  url: {
    color: '#1DA1F2',
  },
  phone: {
    color: '#1DA1F2',
  },
  email: {
    color: '#1DA1F2',
  },
  hashTag: {
    color: '#1DA1F2',
  },
});