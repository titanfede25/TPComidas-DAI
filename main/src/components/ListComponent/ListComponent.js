import { useEffect, useState } from "react";
import { View, Image, Text} from "react-native";
import { getDishes } from "../../services/omdbService";
import { ListComponentStyle } from "./styles";
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity,ScrollView, StyleSheet } from "react-native";
/*no se ve */

const ListComponent = ({navigation}) => {
    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        getDishes().then((response) => {
            setDishes(response);
            console.log(response)
        }).catch((error) => {
            console.log(error);
        });
    }, [])


    return (
        <View style={ListComponentStyle.container} >
            {dishes.map((dish)=>{
                return(
                    <View key={dish.id}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('Child',{json: dish.id})}}>
                            <Image style={ListComponentStyle.Image} source={{uri: dish.image}}/>
                            <Text>Nombre: {dish.title}</Text>
                            <Text>Precio: {aDish.pricePerServing}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity><Text>Eliminar</Text></TouchableOpacity>
                    </View>
                )
            })
        }
        </ View >
    )
}

export default ListComponent;
/*
<Text>¿Vegano? {response.vegan}</Text>
<Text>HealthScore: {response.healthScore}</Text>*/
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#012245',
    },
    
  });