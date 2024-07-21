import { StyleSheet, View } from 'react-native';
import { useEffect , useState} from 'react';
import * as Location from 'expo-location';
import WeatherComponent from './Components/WeatherComponent';
import LocationComponent from './Components/LocationComponent';
// npx expo install expo-location
export default function App() {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [name, setName] = useState("");
  const [temp, setTemp] = useState(0);
  const [icon, setIcon] = useState("");
  const [condition, setCondition] = useState("");
  const [feellike, setFeellike] = useState("");
  const [description, setDescription] = useState("");


  const fetchWeather = async(lat, lon) => { 
    await fetch("Your API Key").
      then((response) => response.json()).
      then((json) => {
        console.log(json);
        setName(json.name);
        setTemp(json.main.temp);
        setCondition(json.weather[0].main);
        setIcon(json.weather[0].icon);
        setFeellike(json.main.feels_like);
        setDescription(json.weather[0].description);
       })
      .catch((error) => {     
      })
  }
  const gettingGeoLocation = async () => {
    // step 0 ask for user permission
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
     // step 1 get lat, log
    await Location.watchPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
      distanceInterval: 10,
      timeInterval: 1000
    }, (location) => {
      setLat(location.coords.latitude);
      setLon(location.coords.longitude);
       // step 2 send openweathermap api request with log and lat
      fetchWeather(location.coords.latitude, location.coords.longitude);
    });
  }

  useEffect(() => { 
    gettingGeoLocation();
  }, []);

  return (
    <View style={styles.container}>
       <WeatherComponent temp={ temp} condition={condition} icon={icon} feellike={feellike} description={description}></WeatherComponent>
      <LocationComponent lat={ lat } lon={ lon } name={name}></LocationComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
