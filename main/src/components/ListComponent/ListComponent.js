import React, { useEffect, useState } from "react";
import { View, Image, Text } from "react-native";
import { getDishes } from "../../services/omdbService";
import { ListComponentStyle } from "./styles";
import { TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import Info from './Info';
import MenuSearch from './MenuSearch';


const ListComponent = ({ navigation }) => {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDishes().then((response) => {
            setDishes(response);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
        });
    }, [])


    return (
        <View style={ListComponentStyle.container}>
            <MenuSearch navigation={navigation}></MenuSearch>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            ) : (
                <>
                    {dishes.map((dish) => {
                        return (
                            <View key={dish.id} style={styles.container}>
                                <Text style={ListComponentStyle.Dish}>{dish.title}</Text>
                                <br></br>
                                <TouchableOpacity onPress={() => { navigation.navigate('Child', { json: dish.id }) }}>
                                    <Image style={ListComponentStyle.Image} source={{ uri: dish.image }} />
                                    
                                </TouchableOpacity>
                                <br></br>
                                
                                <br></br><br></br>


                            </View>
                        )
                    })}
                </>
            )}
        <Info></Info>
        </ View >
    )
}

export default ListComponent;
/*
<Text>¿Vegano? {response.vegan}</Text>
<Text>HealthScore: {response.healthScore}</Text>*/
const styles = StyleSheet.create({
    container: {
        
        backgroundColor: '#fff0db',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#fff0db',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    Titulo:{
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 50,
        textDecorationLine: "underline",
    },
    PrecioTotal:{
        fontWeight: 'bold',
        textDecorationLine: "underline",
        fontSize: 10,  
    }
});



