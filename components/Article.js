import React from 'react';
import { View, Linking, TouchableNativeFeedback } from 'react-native';
import { Text, Button, Card, Divider } from 'react-native-elements';
import moment from 'moment';

export default class Article extends React.Component {
  render() {
    const {
      Name,
      Bias,
      Title,
      Link
    } = this.props.article;
    
    return (
      
      <TouchableNativeFeedback
      useForeground
      onPress={() => {Linking.openURL(Link)}} 
    >
        <View>
          <Text style={{flexShrink: 1, margin: 5, fontStyle: 'normal', color: 'black', fontSize: 14}}>{Bias} </Text> 
          <Text style={{flexShrink: 1, margin: 5, fontStyle: 'italic', color: 'black', fontSize: 14}}>{Title} </Text> 
        </View>
    </TouchableNativeFeedback>
   
    );
  }

}



