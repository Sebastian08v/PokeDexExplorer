import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PokemonListScreen from '../screens/PokemonListScreen';
import PokemonDetailScreen from '../screens/PokemonDetailScreen';

// stack navigator (screens are pushed on top of each other)
const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      {/* The default header is hidden: each screen draws its own title */}
      <Stack.Navigator
        initialRouteName="List"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="List" component={PokemonListScreen} />
        <Stack.Screen name="Detail" component={PokemonDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}