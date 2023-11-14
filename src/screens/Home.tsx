import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { HomeArt } from '../assets/ICONS';
import { useCameraPermission } from 'react-native-vision-camera';

type Props = {};

const Home = (props: any) => {

    const {hasPermission, requestPermission} = useCameraPermission();
    console.log(props.route.params);
    
    const onPress = () => {
        if(hasPermission){
            props.navigation.navigate('Scanner')
        }else{
            requestPermission()
        }
    }

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <HomeArt /> 
      </View>
      <View style={{flex: 1, padding:16, justifyContent: 'space-around', alignItems: 'center'}}>
        <TouchableOpacity style={styles.btnContainer}onPress={onPress} >
          <Text style={{color:"#fff", fontWeight:"bold", fontSize:16}}>Scan Now</Text>
        </TouchableOpacity>
        <View style={{padding:12, borderWidth:2,width:"100%", height:200 ,borderRadius:16, borderColor:"#FF725E"}}>
            <Text style={{color:"#2a2a2a" , borderBottomWidth:1 , borderColor:"#2a2a2a" , paddingVertical:8,marginBottom:8, borderStyle:"dashed" , fontWeight:"500" }}>Scanned Details</Text>
            <Text style={{color:"#2a2a2a" }}>
                {props.route.params && props.route.params.codes && JSON.stringify(props.route.params.codes)}
            </Text>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  btnContainer: {
    paddingHorizontal: 40,
    paddingVertical: 12,
    backgroundColor: '#FF725E',
    borderRadius: 8
  },
});
