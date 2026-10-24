// App.js
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PokemonListScreen from './src/screens/PokemonListScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <PokemonListScreen />
    </SafeAreaProvider>
  );
}