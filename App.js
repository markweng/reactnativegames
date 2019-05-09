import {StackNavigator} from 'react-navigation';
import index from "./games/index";
import Lajifenlei from "./games/lajifenlei/App"
import Housailei from "./games/housailei/App"

const App = StackNavigator({
  Index: {screen: index},
  Lajifenlei: {screen: Lajifenlei.Enter},
  Housailei: {screen: Housailei.Enter}
});

export default {
    Enter: App
}
