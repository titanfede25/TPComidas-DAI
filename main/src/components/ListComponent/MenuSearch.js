import { useEffect, useState } from "react";
import { View, Image, Text, TextInput} from "react-native";
import { getDishByTitle } from "../../services/omdbService";
import { TouchableOpacity,ScrollView, StyleSheet } from "react-native";
import { useContextState } from "../../../ContextState.js";

const MenuSearch = ({navigation}) => {
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
            <View style={styles.ViewcitaEnLinea}>
            <TextInput style={styles.TextInput}
                placeholder="Ingresa aqui el plato que quieras buscar"
                onChangeText={(text) => setDish(text)}
                value={dish}
            />
            <TouchableOpacity style={styles.button} onPress={search}>
                <Text style={styles.buttonText}>Buscar</Text>
            </TouchableOpacity>
            </View>
            <Text style={styles.Warning}>{warning}</Text>
            <br></br>
        </ View >
    )
}
export default MenuSearch;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#fff0db',
    },
    button: {
        backgroundColor: '#6fa042',
        padding: 10,
        width: '5%',
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      TextInput:{
        width: '95%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',

      },
      ViewcitaEnLinea:{
        flexDirection: "row",
      },
      Warning:{
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'crimson',
      }
  });