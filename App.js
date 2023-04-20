import { Provider } from "react-redux";
import Navigation from "./navigation/Navigation";
import generateStore from "./redux/store";
import { useFonts } from "expo-font";

export default function App() {
  const store = generateStore();
  let [fontsLoaded] = useFonts({
    quicksand_bold: require("./assets/fonts/Quicksand-Bold.ttf"),
    montserrat_bold: require("./assets/fonts/Montserrat-Bold.ttf"),
    quicksand_regular: require("./assets/fonts/Quicksand-Regular.ttf"),
    quicksand_light: require("./assets/fonts/Quicksand-Light.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
