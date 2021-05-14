import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import WeatherInfo from "./components/WeatherInfo";
import UnitsPicker from "./components/UnitsPicker";
import { colors } from "./utils";
import ReloadIcon from "./components/ReloadIcon";
import WeatherDetails from "./components/WeatherDetails";
import { WEATHER_API_KEY } from "react-native-dotenv";

const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?";

export default function App() {
  const [errorMessage, setErrorMessage] = useState();
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState("metric");
  useEffect(() => {
    load();
  }, [unitsSystem]);
  async function load() {
    setCurrentWeather(null);
    setErrorMessage(null);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMessage("Access to location is needed to run the app");
        return;
      }
      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;
      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`;

      const response = await fetch(weatherUrl);
      const data = await response.json();
      // console.log(data);

      if (response.ok) {
        setCurrentWeather(data);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    console.log(currentWeather);
    // console.log(`'error, ', ${errorMessage}`);
  }
  if (currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <UnitsPicker
            unitsSystem={unitsSystem}
            setUnitsSystem={setUnitsSystem}
          />
          <ReloadIcon load={load} />
          <WeatherInfo currentWeather={currentWeather} />
        </View>
        <WeatherDetails
          currentWeather={currentWeather}
          unitsSystem={unitsSystem}
        />
      </View>
    );
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <ReloadIcon load={load} />
        <Text>{errorMessage}</Text>
        <Text>Error</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  main: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
