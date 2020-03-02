import React , {useState, useEffect}from 'react';
import {View, Text, StyleSheet, Button,Image, Dimensions, ScrollView} from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';
const GameOverScreen = props =>{
    const [availableDeviceWidth, setavailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setavailableDeviceHeight] = useState(Dimensions.get('window').height);

    useEffect(()=>{
        const updatedLayout = ()=>{
            setButtonWidth(Dimensions.get('window').width/3);
        }
        Dimensions.addEventListener('change',updatedLayout);
        return ()=>{
            Dimensions.removeEventListener('change',updatedLayout);
        };
    });
    return(
        <ScrollView>
        
        <View style={styles.screen}>
        <TitleText >Game is Over!</TitleText>
        <View style={{...styles.imageContainer,...{
            width: availableDeviceWidth * 0.7,
            height: availableDeviceHeight * 0.7,
            borderRadius: (availableDeviceWidth * 0.7)/2,
            marginVertical: availableDeviceHeight / 30
        }}}>
            <Image 
                fadeDuration={1000}
                source={require('../assets/success.png')} 
                // source={{uri: 'https://images.daznservices.com/di/library/GOAL/12/82/cristiano-ronaldo-juventus_1ufmgizju3mg21qriswp845aum.jpg?t=-1805783624&quality=100'}}
                style={styles.image}
                resizeMode="cover"/>
        </View>
        <View style={{...styles.resultContainer, ...{
            marginVertical: availableDeviceHeight / 60
        }}}>
            <BodyText style={{...styles.resultText,...{
                fontSize: availableDeviceHeight < 400 ? 16 :20
            }}}>Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text></BodyText>
        </View>
        <MainButton onPress={props.onRestart}>New Game</MainButton>  
    </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    imageContainer:{
        width: Dimensions.get('window').width * 0.7 ,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7/2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height/20
    },
    resultContainer:{
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height/60
    },
    resultText:{
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16: 20
    },
    image:{
        width: '100%',
        height: '100%'
    },
    highlight:{
        color: Colors.primary,
        fontFamily: 'open-sans-bold'    }
});

export default GameOverScreen;