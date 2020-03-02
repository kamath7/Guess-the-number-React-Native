import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Alert, ScrollView, FlatList, Dimensions} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import BodyText from '../components/BodyText';
import DefaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';
import {ScreenOrientation} from 'expo';

const generateRandom = (min,max, exclude)=>{
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNumber = Math.floor(Math.random() * (max-min))+min;

    if(randomNumber === exclude){
        return generateRandom(min,max,exclude);
    }else{
        return randomNumber;
    }
};
//

// const renderListItem = (value,numOfRound)=> (
//     <View key={value} style={styles.listItem}>
//         <BodyText>#{numOfRound}</BodyText>
//         <BodyText>{value}</BodyText>
//     </View>
// );
const renderListItem = (listLength, itemData)=> (
    <View  style={styles.listItem}>
        <BodyText>#{listLength-itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
);
const GameScreen = props =>{
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    const initialGuess = generateRandom(1,100,props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    // const [pastGuesses, setPastGuesses]  =useState([initialGuess]);
    const [pastGuesses, setPastGuesses]  =useState([initialGuess.toString()]);
    const [availableDeviceWidth, setavailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setavailableDeviceHeight] = useState(Dimensions.get('window').height);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const {userChoice, onGameOver}  = props;

    useEffect(()=>{
        const updateLayout = ()=>{
            setavailableDeviceWidth(Dimensions.get('window').width);
            setavailableDeviceHeight(Dimensions.get('window').height);

        }
        Dimensions.addEventListener('change',updateLayout);

        return ()=>{
            Dimensions.removeEventListener('change',updateLayout);
        }
    });

    useEffect(() => {
        if(currentGuess === userChoice){
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = (direction)=>{
        if((direction === 'lower' && currentGuess < props.userChoice)||(direction === 'higher' && currentGuess >props.userChoice)){
            Alert.alert('Don\'t lie!','This is wrong',[{text: 'Sorry!', style: 'Cancel'}]);
            return;
        }
        if(direction === 'lower'){
            currentHigh.current = currentGuess;
        }else if(direction === 'higher'){
            currentLow.current = currentGuess+1;
        }
        const nextNumber = generateRandom(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        // setRounds(rounds=> rounds+1);
        // setPastGuesses(curPastGuesses => [nextNumber,...curPastGuesses])
        setPastGuesses(curPastGuesses => [nextNumber.toString(),...curPastGuesses])
    };

    let listContainerStyle = styles.listContainer;
    if(availableDeviceWidth < 350){
        listContainerStyle = styles.listContainerBig;
    }

    if(availableDeviceHeight < 500){
        return (
            <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's guess</Text>
            <View style={styles.controls}>
                <MainButton onPress={nextGuessHandler.bind(this,"lower")}><Ionicons name="md-remove" size={24} color="white"/></MainButton>

                <NumberContainer>{currentGuess}</NumberContainer>
            
                <MainButton onPress={nextGuessHandler.bind(this,"higher")}><Ionicons name="md-add" size={24} color="white"/></MainButton>
            </View>
            <View style={listContainerStyle}>


            <FlatList 
                    keyExtractor={(item) => item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list}
            />

{ /*           <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess,index)=> renderListItem(guess,pastGuesses.length - index))}
                </ScrollView>*/}
            </View>
        </View>
        )
    }
    return(
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this,"lower")}><Ionicons name="md-remove" size={24} color="white"/></MainButton>
                <MainButton onPress={nextGuessHandler.bind(this,"higher")}><Ionicons name="md-add" size={24} color="white"/></MainButton>
            </Card>
            <View style={listContainerStyle}>


            <FlatList 
                    keyExtractor={(item) => item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list}
            />

{ /*           <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess,index)=> renderListItem(guess,pastGuesses.length - index))}
                </ScrollView>*/}
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20: 5,
        width: 400,
        maxWidth: '90%'
    },
    listItem:{
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },
    listContainer:{
        width: '60%',
        flex: 1 ,// added to make it scrollable on Android
        
    },listContainerBig:{
        flex :1,
        width : '60%'
    },
    list:{
        flexGrow:1,
        // alignItems: 'center',
        justifyContent: 'flex-end'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        alignItems: 'center'
    }
});

export default GameScreen;

//Third party libraries for adding style
/* 

    React-Native-Paper


*/