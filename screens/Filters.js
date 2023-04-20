import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Pressable,
    

} from 'react-native';
import  Ionicons  from "@expo/vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';



const Filters = () => {

    const navigation = useNavigation();

    
  

  return (
    <SafeAreaView style={style.mainArea}>
        <View style={style.containerMain}>
            <Text style={style.texto}>
               These preferences help us show you suggestions by determining who you see and who sees you.
            </Text>
        </View>

        <View style={style.filters}>
            <View style={style.containerIcon}>
                <Ionicons name="navigate-circle-outline" size={32} color={'#1d1d1d'} />
            </View>
               
               <View style={style.containerSelector}>
                  <Text>
                    Distance
                  </Text>
                  <Text>
                    Aca abre el modal y sale el mapa
                  </Text>
               </View>
        </View>
        <View style={style.filters}>
            <View style={style.containerIcon}>
                <Ionicons name="grid-outline" size={32} color={'#1d1d1d'} />
            </View>
               
               <View style={style.containerSelector}>
                  <Text>
                    Genre
                  </Text>
                  <Text>
                    selector genero
                  </Text>
               </View>
        </View>
        <View style={style.filters}>
            <View style={style.containerIcon}>
                <Ionicons name="happy-outline" size={32} color={'#1d1d1d'} />
            </View>
               
               <View style={style.containerSelector}>
                  <Text>
                    Age range
                  </Text>
                  <Text>
                    Aca input doble para edad
                  </Text>
               </View>
        </View>
        <View style={style.filters}>
            <View style={style.containerIcon}>
                <Ionicons name="heart-outline" size={32} color={'#1d1d1d'} />
            </View>
               
               <View style={style.containerSelector}>
                  <Text>
                    Preference
                  </Text>
                  <Text>
                    selector con preferencias
                  </Text>
               </View>
        </View>
       
        
        <Pressable style={style.btn}
           onPress={()=>{ navigation.navigate('Home')}}
        >
            <Text style={style.textBtn}> 
                Apply preferences
            </Text>
        </Pressable>
        

    </SafeAreaView>
  )
}


const style = StyleSheet.create({
    mainArea:{
        flex:1,
       backgroundColor:'#ffffff'
    },
    texto:{
       fontSize:20,
       color:'#1d1d1d',
       textAlign:'center',
       marginTop:20
    },
    filters:{
        width:'100%',
        flexDirection:'row',
        height:70,
        justifyContent:'space-around',
        marginTop:40,
        paddingHorizontal:30
        
    },
    containerSelector:{
        display:'flex',
        width:'80%',
        height:50,
        

    },
    containerIcon:{
        width:'20%',
        
    },
    btn:{
       backgroundColor:'#1d1d1d',
       width:200,
       marginHorizontal:100,
       height:40,
       marginTop:50,
       borderRadius:10,
       
       
       
    },
    textBtn:{
   color:'#fff',
    fontSize:20,
    textAlign:'center',
    marginTop:5
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
      },
      buttonPressed: {
        backgroundColor: 'lightblue',
      },
      buttonText: {
        color: 'white',
      },

    
})

export default Filters
