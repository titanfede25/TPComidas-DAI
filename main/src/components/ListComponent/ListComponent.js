import { useEffect, useState } from "react";
import { View, Image, Text} from "react-native";
import { getDishes, getDish } from "../../services/omdbService";
import { ListComponentStyle } from "./styles";
/*no se ve */

const ListComponent = () => {
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
            {dishes?.map((dish)=>{ 
                return(
                    <View key={dish.id} /*/onclick=()*/>
                        <Image style={ListComponentStyle.Image} source={{uri: dish.image}}/>
                        <Text>Nombre: {dish.title}</Text>
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