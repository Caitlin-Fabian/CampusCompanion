import * as Font from "expo-font";
 
export default useFonts = async () =>
  await Font.loadAsync({
    'Baloo-Regular': require('./assets/fonts/Baloo-Regular.ttf'),
  });