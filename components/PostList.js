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
        Link,
        Id
      } = this.props.ALTarticle;
      
      return (
        
        <TouchableNativeFeedback
        // onPress={() => {alert("clicked")}}
        useForeground
        onPress={() => {Linking.openURL(Link)}} 
        >
          <View>
          <Text style={{flexShrink: 1, margin: 5, fontStyle: 'normal', color: 'black', fontSize: 14}}>
          {Bias}: {Title}
          </Text>
          </View>
          </TouchableNativeFeedback>

      );
    }

  }


const styles = {
  noteStyle: {margin: 5, fontStyle: 'italic', color: '#b2bec3', fontSize: 12},
  featuredTitleStyle: {marginHorizontal: 5, textShadowColor: '#00000f', textShadowOffset: { width: 3, height: 3 }, textShadowRadius: 3}
};

