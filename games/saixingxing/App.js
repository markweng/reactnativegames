//导入stack导航组件
import {StackNavigator} from 'react-navigation';
import HomeScreen from "./screen/HomeScreen";
import GameGuide from "./screen/GameGuide";
import SelectLevelScreen from "./screen/SelectLevelScreen";
import GameScreen from "./screen/GameScreen";
import SelectShapeLevelScreen from "./screen/SelectShapeLevelScreen";
import ShapeGameScreen from "./screen/ShapeGameScreen";
//导航注册
const App = StackNavigator({
    HomeScreen: {screen: HomeScreen},
    GameGuide: {screen: GameGuide},
    SelectLevelScreen: {screen: SelectLevelScreen},
    SelectShapeLevelScreen: {screen: SelectShapeLevelScreen},
    GameScreen: {screen: GameScreen},
    ShapeGameScreen: {screen: ShapeGameScreen}
});

export default {
    Enter: App
}
