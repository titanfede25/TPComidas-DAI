import React, { useEffect, useState } from "react";
import { View, Image, Text } from "react-native";
import { getDishByTitle } from "../../services/omdbService";
import { ListComponentStyle } from "./styles";
import { TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useContextState } from "../../../ContextState.js";
import Info from './Info';


const SearchResult = ({ route, navigation }) => {
    const { json } = route.params;
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDishByTitle(json).then((response) => {
            setDishes(response);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
        });
    }, [])


    return (
        <View style={ListComponentStyle.container}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            ) : (
                <>
                    {dishes.map((dish) => {
                        return (
                            <View key={dish.id}>
                                <TouchableOpacity onPress={() => { navigation.navigate('Child', { json: dish.id }) }}>
                                    <Image style={ListComponentStyle.Image} source={{ uri: dish.image }} />
                                    <Text>Nombre: {dish.title}</Text>
                                </TouchableOpacity>

                            </View>
                        )
                    })}
                    <Info></Info>
                </>
            )}
        </ View >
    )
}

export default SearchResult;
/*
<Text>¿Vegano? {response.vegan}</Text>
<Text>HealthScore: {response.healthScore}</Text>*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
});

