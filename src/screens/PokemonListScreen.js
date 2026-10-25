import { useState, useEffect } from 'react';
import {View,Text,FlatList,ActivityIndicator,Button,StyleSheet, TextInput} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchPokemonList } from '../api/pokeapi';
import PokemonCard from '../components/PokemonCard';

const PAGE_SIZE = 20;
const ERROR_MESSAGE =
  'No se pudo cargar la lista. Revisa tu conexión e inténtalo de nuevo.';

export default function PokemonListScreen({navigation}) {

  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [searchText, setSearchText] = useState('');

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

  //Open the detail screen with whatever the user typed (name or number)
  function handleSearch() {
    const query = searchText.trim();
    if (query === '') return;
    navigation.navigate('Detail', { query });
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

        {/*Search Bar*/}
        <View style={styles.searchRow}>
          <TextInput
            style={styles.input}
            placeholder="Busca por nombre o número..."
            value={searchText}
            onChangeText={setSearchText}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Button title="Buscar" onPress={handleSearch} />
        </View>

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
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <PokemonCard
              id={item.id}
              name={item.name}
              onPress={() => navigation.navigate('Detail', { query: item.id })}
            />
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
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
});