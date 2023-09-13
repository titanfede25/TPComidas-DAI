import { useEffect, useState } from "react";
import { View, Image, Text} from "react-native";
import { getDish } from "../../services/omdbService";
import { ListComponentStyle } from "./styles";
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity,ScrollView, StyleSheet } from "react-native";
import { useContextState } from "../../../ContextState.js";
import Info from './Info';

const LogIn = ({navigation}) => {

    
    return (
        <View key={dish.id}>
            <Text>Hola</Text>
        </View>
    )
}

export default LogIn;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#012245',
    },
    
  });
