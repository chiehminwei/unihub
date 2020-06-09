import React, { Component } from "react";
import AnimatedMultistep from "react-native-animated-multistep";
import StepOne from "./images";
import StepTwo from "./description";
import StepThree from "./map";
import StepFour from "./preview";


const allSteps = [
  { name: "step 1", component: Step1 },
  { name: "step 2", component: Step2 },
  { name: "step 3", component: Step3 },
  { name: "step 4", component: Step4 }
];

export default class PostItem extends Component {

  onNext = () => {
    console.log("Next");
  };


  onBack = () => {
    console.log("Back");
  };


  finish = finalState => {
    console.log(finalState);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AnimatedMultistep
          steps={allSteps}
          onFinish={this.finish}
          onBack={this.onBack}
          onNext={this.onNext}
          comeInOnNext="bounceInUp"
          OutOnNext="bounceOutDown"
          comeInOnBack="bounceInDown"
          OutOnBack="bounceOutUp"
        />
      </View>
    );
  }
}