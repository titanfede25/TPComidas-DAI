import { useEffect, useState } from "react";
import { View, Image, Text} from "react-native";
import { getDish } from "../../services/omdbService";
import { ListComponentStyle } from "./styles";
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity,ScrollView, StyleSheet } from "react-native";
import { useContextState } from "../../../ContextState.js";
import Info from './Info';

const Child = ({route, navigation}) => {
    const { json } = route.params;
    const [dish, setDish] = useState([]);
    const { contextState, setContextState } = useContextState();

    useEffect(() => {
        getDish(json).then((response) => {
            setDish(response);
        }).catch((error) => {
            console.log(error);
        });
    }, [])
    
    return (
        <View key={dish.id}>
            <TouchableOpacity onPress={()=>{navigation.goBack();}}><Text>volver</Text></TouchableOpacity>
            <Image style={ListComponentStyle.Image} source={{uri: dish.image}}/>
            <Text>Nombre: {dish.title}</Text>
            <Text>Precio: USD{dish.pricePerServing}</Text>
            <Text>Tiempo en preparación: {dish.readyInMinutes} minutos</Text>
            <Text>Vegano: {vegan(dish.vegan)}</Text>
            <Text>HealthScore: {dish.healthScore}</Text>
            <TouchableOpacity onPress={()=>{
                if(IsOnMenu(dish, contextState.platos)){
                    navigation.goBack();
                }
                else{
                    if(dish.vegan){
                        if(contextState.cantPlatosVeganos < 2){
                            setContextState({ type: "SET_CANTPLATOSVEGANOSPLUS" }); 
                            setContextState({ newValue: dish.pricePerServing, type: "SET_PRECIOTOTALPLUS" }); 
                            setContextState({type: "SET_CANTPLATOSPLUS" }); 
                            setContextState({ newValue: dish, type: "SET_PLATOSPLUS" }); 
                            setContextState({ newValue: dish.healthScore, type: "SET_HEALTHSCOREPLUS" }); 
                            navigation.goBack();
                        }
                        else{
                            navigation.goBack();
                        }
                    }
                    else{
                        if (contextState.cantPlatosNoVeganos < 2){
                            setContextState({ type: "SET_CANTPLATOSNOVEGANOSPLUS" }); 
                            setContextState({ newValue: dish.pricePerServing, type: "SET_PRECIOTOTALPLUS" }); 
                            setContextState({type: "SET_CANTPLATOSPLUS" }); 
                            setContextState({ newValue: dish, type: "SET_PLATOSPLUS" }); 
                            setContextState({ newValue: dish.healthScore, type: "SET_HEALTHSCOREPLUS" }); 
                            navigation.goBack();
                        }
                        else{
                            navigation.goBack();
                        }
                    }
                } 
                }}>
                <Text>Agregar</Text>
            </TouchableOpacity>
            <Info></Info>
        </View>
    )
}

const vegan = (vegan) => {
    if(vegan === true){
        return(<Text>Sí</Text>)
    }
    else{
        return(<Text>No</Text>)
    }
}

const IsOnMenu = (dish, platos) => {
    let x = 0;
    platos.map((plato)=>{
        if(plato.title === dish.title){
            x++;
        }
    })
    return x>0;
}


export default Child;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#012245',
    },
    
  });
