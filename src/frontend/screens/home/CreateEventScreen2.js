import React, { Component } from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
// import AnimatedMultistep from "react-native-animated-multistep";
import AnimatedMultistep from "~/components/Stepper";

import BasicInfo from "~/components/form/BasicInfo";
import Detail from "~/components/form/Detail";
import Preview from "~/components/form/Preview";


const steps = [
  { name: "Basic Info", component: BasicInfo },
  { name: "Detail", component: Detail },
  { name: "Preview", component: Preview },
];

/* Define your class */
export default class App extends Component {

  onNext = () => {
    console.log("Next");
  };

  onBack = () => {
    console.log("Back");
  };

  onFinish = finalState => {
    console.log(finalState);
  };

  /* render MultiStep */
  render() {
    return (
      <View style={{ flex: 1 }}>
        <AnimatedMultistep
          steps={steps}
          onFinish={this.onFinish}
          onBack={this.onBack}
          onNext={this.onNext}
          comeInOnNext="fadeInRight"
          OutOnNext="fadeOutLeft"
          comeInOnBack="fadeInLeft"
          OutOnBack="fadeOutRight"
        />
      </View>
    );
  }
}