import React from 'react';
import { View, Text, StyleSheet, Platform} from 'react-native';
import Colors from '../constants/colors';
import TitleText from '../components/TitleText';

const Header = (props)=>{
    return(
        <View style={{...styles.headerBase,...Platform.select({ios: styles.headerOnIOS, android: styles.headerOnAndroid})}}>
            <TitleText style={styles.title}>{props.title}</TitleText>
        </View>
    );
};

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        alignItems: 'center',
        justifyContent: 'center'
       
    },
    headerOnIOS:{
        backgroundColor: 'purple',
        borderBottomColor:  '#ccc',
        borderBottomWidth: 1 
    },
    headerOnAndroid: {
        backgroundColor: Colors.primary ,
        borderBottomColor:  'transparent',
        borderBottomWidth: 0
    },
    title: {
        color: Platform.OS === 'ios'? Colors.primary : 'white'
    }

});
export default Header;