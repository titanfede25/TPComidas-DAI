import { useEffect, useState } from "react";
import { View, Image, Text, TextInput} from "react-native";
import { getDishByTitle } from "../../services/omdbService";
import { TouchableOpacity,ScrollView, StyleSheet } from "react-native";
import { useContextState } from "../../../ContextState.js";

const MenuSearch = () => {
    const [dish, setDish] = useState('');
    const [warning, setWarning] = useState('');

    const search = async() => {
        if(dish.length < 3){
            setWarning("Completa con más caracteres")
        }
        else{
            navigation.navigate('SearchResult', { json: dish })
        }
      };

    return (
        <View>
            <TextInput
                placeholder="Ingresa aqui el plato que quieras buscar"
                onChangeText={(text) => setDish(text)}
                value={dish}
            />
            <TouchableOpacity onPress={search}>
                <Text>Buscar</Text>
            </TouchableOpacity>
            <Text>{warning}</Text>
        </ View >
    )
}
export default MenuSearch;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#fff0db',
    },
    
  });