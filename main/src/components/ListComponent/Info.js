import { View, Image, Text, TouchableOpacityBase} from "react-native";
import { ListComponentStyle } from "./styles";
import { TouchableOpacity,ScrollView, StyleSheet } from "react-native";
import { useContextState } from "../../../ContextState.js";

const Info = () => {
    const { contextState, setContextState } = useContextState();

    return (
        <View style={ListComponentStyle.container} >
        
        <Text style={styles.TituloFooter}>Precio total: <Text style= {styles.Precio}>{contextState?.precioTotal.toFixed(2)}</Text></Text>
        <Text style={styles.TituloFooter}>Cantidad de platos: {contextState?.cantPlatos}</Text>

        <View style={styles.ViewcitaEnLinea}>
        <Text style={styles.TituloFooter}>Cantidad de platos</Text><Text style={styles.Vegano}> veganos</Text><Text style={styles.TituloFooterConSubrayado}>(máximo 2)</Text><Text style={styles.TituloFooter}>: {contextState?.cantPlatosVeganos}</Text>
        </View>
        
        <View style={styles.ViewcitaEnLinea}>
        <Text style={styles.TituloFooter}>Cantidad de platos</Text><Text style={styles.NoVegano}> no veganos </Text><Text style={styles.TituloFooterConSubrayado}>(máximo 2)</Text><Text style={styles.TituloFooter}>: {contextState?.cantPlatosNoVeganos}</Text>
        </View>

        <View style={styles.ViewcitaEnLinea}>
        <Text style={styles.HealthScore}>HealthScore </Text><Text style={styles.TituloFooter}>promedio: {contextState?.healthScore}</Text>
        </View>
        <br></br>
        <Text style={styles.TituloFooter}>Platos seleccionados: </Text>
        <br></br>
        {contextState?.platos.map((dish)=>{
          return(<Text style={styles.TituloFooter} key={dish.id}>{dish.title}. {vegan(dish.vegan)}<Text style={styles.TituloFooter}>Precio:</Text><Text style={styles.Precio}> ${dish.pricePerServing}</Text> <TouchableOpacity style={styles.Eliminar} onPress={()=>{
            setContextState({ newValue: dish.pricePerServing, type: "SET_PRECIOTOTALMINUS" }); 
            setContextState({type: "SET_CANTPLATOSMINUS" }); 
            setContextState({ newValue: dish.title, type: "SET_PLATOSMINUS" }); 
            if (dish.vegan){
              setContextState({ type: "SET_CANTPLATOSVEGANOSMINUS" }); 
            }
            else{
              setContextState({ type: "SET_CANTPLATOSNOVEGANOSMINUS" }); 
            }
            setContextState({ newValue: dish.healthScore, type: "SET_HEALTHSCOREMINUS" }); 
          }}><Text>Eliminar</Text></TouchableOpacity></Text>)  
                 
        })}
        </ View >
    )
}

export default Info;
const vegan = (vegan) => {
  if(vegan === true){
      return(<Text style={styles.Vegano}>Vegano.</Text>)
  }
  else{
      return(<Text style={styles.NoVegano}>No vegano.</Text>)
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff0db',
  },
  TituloFooter:{
    fontWeight: 'bold',
    fontSize: '92%',  
},
TituloFooterConSubrayado:{
  fontWeight: 'bold',
  fontSize: '92%',
  textDecorationLine: "underline",
},
Precio:{
  color: '#6fa042',
},
Vegano:{
  color: '#6fa042',
  fontWeight: 'bold',
  fontSize: '92%',
},
NoVegano:{
  color: '#85461e',
  fontWeight: 'bold',
  fontSize: '92%',
},
ViewcitaEnLinea:{
  flexDirection: "row",
},
HealthScore: {
  color: '#a0d150',
  fontWeight: 'bold',
  fontSize: '92%', 
},
Eliminar:{
  color:'crimson'
}
  
});