import React from 'react';
import { View, Linking, TouchableNativeFeedback } from 'react-native';
import { Text, Button, Card, Divider } from 'react-native-elements';
import moment from 'moment';
import App from '../../App';

export default class MyList extends React.Component {
  render() {
    const {
      id,
      Link,
      Headline
    } = this.props.headline;

    //var handleToUpdate = this.props.handleToUpdate;
    
    return (
      

      <TouchableNativeFeedback
      // onPress={() => {alert("clicked")}}
      useForeground
      onPress={() => {this.props.handle(Headline)}  } //{Linking.openURL(Link)}} 
      >
      <View>
      <Text style={{flexShrink: 1, margin: 5, fontStyle: 'normal', color: 'black', fontSize: 14}} >
      {Headline} 
      </Text>
      </View>
      </TouchableNativeFeedback>


   
    );
  }

}

//<Text style={{flexShrink: 1, margin: 5, fontStyle: 'normal', color: 'black', fontSize: 14}}>{Headline} </Text>

