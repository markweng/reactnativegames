
import {StackNavigator} from 'react-navigation';
import HomeScreen from "./screen/HomeScreen";

const App = StackNavigator({
    HomeScreen: {screen: HomeScreen}
});

export default {
    Enter: App
}