import React from 'react';
import { View, Linking, TouchableNativeFeedback } from 'react-native';
import { Text, Button, Card, Divider } from 'react-native-elements';
import moment from 'moment';

export function render_FlatList_header () {
 
  var header_View = (

  <View style={styles2.header_footer_style}>

    <Text> FlatList Header </Text>

  </View>

  );

  return header_View ;

};

const styles2 = {

  header_footer_style:{
 
    width: '100%', 
    height: 44, 
    backgroundColor: '#4CAF50', 
    alignItems: 'center', 
    justifyContent: 'center'
   
  }
};
