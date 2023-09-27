import { useEffect, useState } from "react";
import { View, Image, Text} from "react-native";
import { getDish } from "../../services/omdbService";
import { ListComponentStyle } from "./styles";
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
            <Text style={styles.NombrePlato}>{dish.title}</Text>
            <br></br>
            <Image style={ListComponentStyle.Image} source={{uri: dish.image}}/>
            

            <View style={styles.ViewcitaEnLinea}>
            <Text style={styles.Titulo}>Precio:</Text><Text style={styles.Precio}> USD{dish.pricePerServing}</Text>
            </View>

            <Text style={styles.Titulo}>Tiempo en preparación: {dish.readyInMinutes} minutos</Text>

            <View style={styles.ViewcitaEnLinea}>
            <Text style={styles.Vegano}>Vegano:</Text><Text style= {styles.Titulo}> {vegan(dish.vegan)}</Text>
            </View>

            <View style={styles.ViewcitaEnLinea}>
            <Text style={styles.HealthScore}>HealthScore:</Text><Text style={styles.Titulo}> {dish.healthScore}</Text>
            </View>


            <View style={styles.ContenedorBoton}>
            <TouchableOpacity style={styles.button} onPress={()=>{
                if(IsOnMenu(dish, contextState.platos)){
                    navigation.navigate('ListComponent');
                }
                else{
                    if(dish.vegan){
                        if(contextState.cantPlatosVeganos < 2){
                            setContextState({ type: "SET_CANTPLATOSVEGANOSPLUS" }); 
                            setContextState({ newValue: dish.pricePerServing, type: "SET_PRECIOTOTALPLUS" }); 
                            setContextState({type: "SET_CANTPLATOSPLUS" }); 
                            setContextState({ newValue: dish, type: "SET_PLATOSPLUS" }); 
                            setContextState({ newValue: dish.healthScore, type: "SET_HEALTHSCOREPLUS" }); 
                            navigation.navigate('ListComponent');
                        }
                        else{
                            navigation.navigate('ListComponent');
                        }
                    }
                    else{
                        if (contextState.cantPlatosNoVeganos < 2){
                            setContextState({ type: "SET_CANTPLATOSNOVEGANOSPLUS" }); 
                            setContextState({ newValue: dish.pricePerServing, type: "SET_PRECIOTOTALPLUS" }); 
                            setContextState({type: "SET_CANTPLATOSPLUS" }); 
                            setContextState({ newValue: dish, type: "SET_PLATOSPLUS" }); 
                            setContextState({ newValue: dish.healthScore, type: "SET_HEALTHSCOREPLUS" }); 
                            navigation.navigate('ListComponent');
                        }
                        else{
                            navigation.navigate('ListComponent');
                        }
                    }
                } 
                }}>
                <Text style={styles.buttonText}>Agregar</Text>
            </TouchableOpacity>
            </View>
            <br></br>
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
      backgroundColor:'#fff0db',
    },
    Titulo:{
        fontWeight: 'bold',
        fontSize: 20, 
    },
    Precio:{
        color: '#6fa042',
        fontSize: 20,
      },
      Vegano:{
        color: '#6fa042',
        fontWeight: 'bold',
        fontSize: 20,
      },
      ViewcitaEnLinea:{
        flexDirection: "row",
      },
      HealthScore: {
        color: '#a0d150',
        fontWeight: 'bold',
        fontSize: 20, 
      },
      NombrePlato:{
        fontWeight: 'bold',
        fontSize: 20, 
        textAlign: 'center',
      },
      button: {
        backgroundColor: '#6fa042',
        padding: 10,
        borderRadius: 5,
        width: '5%',
        
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      ContenedorBoton: {
        alignItems: 'center',
      }
  });
