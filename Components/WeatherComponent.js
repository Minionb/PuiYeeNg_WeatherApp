import React from "react";
import { View , Text , StyleSheet, Image} from "react-native";
export default function WeatherComponent (props) {
    const temp = props ? props.temp : 0;
    const condition = props ? props.condition : "";
    const icon =  props ? props.icon : "";
    const feellike = props ? props.feellike : "";
    const description = props ? props.description : "";

    return (
        <View style={styles.weathercontainer}>
          
          <View style={styles.locationcontainer}></View>
          <View>
          <Text style={styles.text}>Temperature: {temp}</Text>
            <Text style={styles.text}>Condition: {condition}</Text>
            <Image style={{ width:100, height:100 }}
                    source={{uri:`https://openweathermap.org/img/wn/${icon}@2x.png`}}
                />
            <Text style={styles.text}>Feel Like: {feellike}</Text>
            <Text style={styles.text}>Description: {description}</Text>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    weathercontainer: {
        backgroundColor: "lightblue",
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    locationcontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 40
    }
})