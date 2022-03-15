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
      onPress={() => Linking.openURL(Link)}
    >
      <Card
        featuredTitle={Title}
        featuredTitleStyle={{marginHorizontal: 5, textShadowColor: '#00000f', textShadowOffset: { width: 3, height: 3 }, textShadowRadius: 3}}
      >
        <Divider style={{ backgroundColor: '#dfe6e9' }} />
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <Text style={{margin: 5, fontStyle: 'underline', color: 'black', fontSize: 14}}>{Bias} {"\n"}</Text> 
          <Text style={{margin: 5, fontStyle: 'italic', color: 'black', fontSize: 14}}>{Title}</Text> 
            
        </View>
      </Card>
    </TouchableNativeFeedback>
   
    );
  }

}

const styles = {
  noteStyle: {margin: 5, fontStyle: 'italic', color: '#b2bec3', fontSize: 12},
  featuredTitleStyle: {marginHorizontal: 5, textShadowColor: '#00000f', textShadowOffset: { width: 3, height: 3 }, textShadowRadius: 3}
};

