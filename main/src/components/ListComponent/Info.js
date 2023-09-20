import { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacityBase} from "react-native";
import { getDishes } from "../../services/omdbService";
import { ListComponentStyle } from "./styles";
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity,ScrollView, StyleSheet } from "react-native";
import { useContextState } from "../../../ContextState.js";

const Info = () => {
    const { contextState, setContextState } = useContextState();

    return (
        <View style={ListComponentStyle.container} >
        <Text>.</Text>
        <Text>.</Text>
        <Text>.</Text>
        <Text>Precio total: {contextState?.precioTotal.toFixed(2)}</Text>
        <Text>Cantidad de platos: {contextState?.cantPlatos}</Text>
        <Text>Cantidad de platos veganos (máximo 2): {contextState?.cantPlatosVeganos}</Text>
        <Text>Cantidad de platos no veganos (máximo 2): {contextState?.cantPlatosNoVeganos}</Text>
        <Text>HealthScore promedio: {contextState?.healthScore}</Text>
        <Text>.</Text>
        <Text>Platos seleccionados</Text>
        {contextState?.platos.map((dish)=>{
          return(<Text>{dish.title}. {vegan(dish.vegan)} <TouchableOpacity onPress={()=>{
            setContextState({ newValue: dish.pricePerServing, type: "SET_PRECIOTOTALMINUS" }); 
            setContextState({type: "SET_CANTPLATOSMINUS" }); 
            setContextState({ newValue: dish, type: "SET_PLATOSMINUS" }); 
            if (dish.vegan){
              setContextState({ type: "SET_CANTPLATOSVEGANOSMINUS" }); 
            }
            else{
              setContextState({ type: "SET_CANTPLATOSNOVEGANOSMINUS" }); 
            }
            setContextState({ newValue: dish.healthScore, type: "SET_HEALTHSCOREMINUS" }); 
          }}>Eliminar</TouchableOpacity></Text>)         
        })}
        </ View >
    )
}

export default Info;
const vegan = (vegan) => {
  if(vegan === true){
      return(<Text>Vegano.</Text>)
  }
  else{
      return(<Text>No vegano.</Text>)
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#fff0db',
    },
    
  });