import { useEffect, useState } from "react";
import { View, Image, Text} from "react-native";
import { getDishes } from "../../services/omdbService";
import { ListComponentStyle } from "./styles";
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity,ScrollView, StyleSheet } from "react-native";
import { useContextState } from "../../../ContextState.js";

const Info = () => {
    const { contextState, setContextState } = useContextState();
    useEffect(() => {
     console.log(contextState)
    }, [])

    return (
        <View style={ListComponentStyle.container} >
        <Text>Precio total: {contextState?.precioTotal}</Text>
        </ View >
    )
}

export default Info;
/*
<Text>¿Vegano? {response.vegan}</Text>
<Text>HealthScore: {response.healthScore}</Text>*/
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#012245',
    },
    
  });