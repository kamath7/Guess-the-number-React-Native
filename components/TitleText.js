import React from 'react';
import {Text,StyleSheet} from 'react-native';

const TitleText = (props)=>{
    return(
      <Text style={{...styles.title,...props.style}}>{props.children}</Text>
    )
};

const styles = StyleSheet.create({
    title:{
        fontFamily: 'open-sans-bold'
    }
});

export default TitleText;

/*

    color: 'black',
        fontSize: 18,
        fontFamily: 'open-sans-bold'

*/