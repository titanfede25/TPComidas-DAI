import { useEffect, useState } from "react";
import { SafeAreaView, FlatList, ActivityIndicator } from "react-native";
import { getDishes } from "../../services/omdbService";
import { ListComponentStyle } from "./styles";
import ListChild from './ListChild';

const ListComponent = () => {
    const [loading, setLoading] = useState(false);
    const [dishes, setDishes] = useState([]);
    const [pressed, setPressed] = useState({});

    const renderItem = ({ item, index }) => (
        <ListChild item={item} index={index} pressed={pressed} setPressed={setPressed} />
    );

    useEffect(() => {
        setLoading(true)
        getDishes().then((response) => {
            setLoading(false);
            setDishes(response);
            console.log(response)
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        });
        return;
    }, [])


    return (< SafeAreaView style={ListComponentStyle.container} >
        {loading && <ActivityIndicator size="large" color="#00ff00" />}
        <FlatList
            data={dishes}
            renderItem={renderItem}
            keyExtractor={item => item.Title}
        />
    </SafeAreaView >)
}

export default ListComponent;