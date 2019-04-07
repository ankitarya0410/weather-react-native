import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './src/home';
import DetailsScreen from './src/details';

const MainNavigator = createStackNavigator({
    Home: { screen: HomeScreen },
    Details: { screen: DetailsScreen }
});

const App = createAppContainer(MainNavigator);

export default App;