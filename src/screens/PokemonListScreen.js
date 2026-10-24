import { useState, useEffect } from 'react';
import {View,Text,FlatList,ActivityIndicator,Button,StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchPokemonList } from '../api/pokeapi';
import PokemonCard from '../components/PokemonCard';

const PAGE_SIZE = 20;
const ERROR_MESSAGE =
  'No se pudo cargar la lista. Revisa tu conexión e inténtalo de nuevo.';

export default function PokemonListScreen() {

  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  //async/await with loading and error handling
  async function loadPokemon() {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      // The next offset equals the number of Pokémon already loaded
      const page = await fetchPokemonList(PAGE_SIZE, pokemon.length);
      setPokemon((current) => [...current, ...page]);

      // A short page means there is nothing left to load
      if (page.length < PAGE_SIZE) {
        setHasMore(false);
      }
    } catch (err) {
      setError(ERROR_MESSAGE);
    } finally {
      setLoading(false);
    }
  }

  //useEffect dependency array (empty: runs only once, on mount)
  useEffect(() => {
    loadPokemon();
  }, []);

  //Do not request more pages while an error is waiting for a retry
  function handleEndReached() {
    if (error) return;
    loadPokemon();
  }

  function renderFooter() {
    if (loading) {
      return <ActivityIndicator style={styles.footer} size="small" />;
    }
    if (error) {
      return (
        <View style={styles.footer}>
          <Text style={styles.message}>{error}</Text>
          <Button title="Reintentar" onPress={loadPokemon} />
        </View>
      );
    }
    return null;
  }

  const isEmpty = pokemon.length === 0;

  return (
    
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>PokéDex Explorer</Text>

      {/*UI states (loading, error, success) */}
      {isEmpty && !error && (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={styles.message}>Cargando Pokémon...</Text>
        </View>
      )}

      {isEmpty && error && (
        <View style={styles.center}>
          <Text style={styles.message}>{error}</Text>
          <Button title="Reintentar" onPress={loadPokemon} />
        </View>
      )}

      {!isEmpty && (
        <FlatList
          data={pokemon}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          renderItem={({ item }) => (
            <PokemonCard id={item.id} name={item.name} />
          )}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 12,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  message: {
    marginVertical: 12,
    textAlign: 'center',
  },
  list: {
    paddingHorizontal: 6,
  },
  footer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
});