import { useState, useEffect } from 'react';
import {View,Text,Image,ScrollView,ActivityIndicator,Button,StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchPokemonDetail } from '../api/pokeapi';
import StatBar from '../components/StatBar';
import TypeBadge from '../components/TypeBadge';

const ERROR_MESSAGE =
  'No se pudo cargar la ficha. Revisa tu conexión e inténtalo de nuevo.';

// Capitalize the first letter of the name
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function PokemonDetailScreen({ navigation, route }) {
  // The name or id sent by the previous screen
  const { query } = route.params;

  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  // async/await with loading, error and not-found handling
  async function loadPokemon() {
    setLoading(true);
    setError(null);
    setNotFound(false);

    try {
      const data = await fetchPokemonDetail(query);
      setPokemon(data);
    } catch (err) {
      // A 404 means the name or number does not exist
      if (err.status === 404) {
        setNotFound(true);
      } else {
        setError(ERROR_MESSAGE);
      }
    } finally {
      setLoading(false);
    }
  }

  // useEffect dependency array (runs on mount and only when query changes)
  useEffect(() => {
    loadPokemon();
  }, [query]);

  function renderContent() {
    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={styles.message}>Cargando Pokémon...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.center}>
          <Text style={styles.message}>{error}</Text>
          <Button title="Reintentar" onPress={loadPokemon} />
        </View>
      );
    }

    if (notFound) {
      return (
        <View style={styles.center}>
          <Text style={styles.message}>
            No se encontró ningún Pokémon con el nombre o número "{query}".
          </Text>
        </View>
      );
    }

    // height comes in decimeters and weight in hectograms, so divide by 10
    const imageUrl = pokemon.sprites.other['official-artwork'].front_default;

    return (
      <ScrollView contentContainerStyle={styles.details}>
        {/* remote Image needs explicit width and height */}
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <Text style={styles.number}>
          #{String(pokemon.id).padStart(3, '0')}
        </Text>
        <Text style={styles.name}>{capitalize(pokemon.name)}</Text>

        <View style={styles.types}>
          {pokemon.types.map((item) => (
            <TypeBadge key={item.slot} type={item.type.name} />
          ))}
        </View>

        <Text style={styles.measure}>Altura: {pokemon.height / 10} m</Text>
        <Text style={styles.measure}>Peso: {pokemon.weight / 10} kg</Text>

        <Text style={styles.sectionTitle}>Estadísticas base</Text>
        <View style={styles.stats}>
          {pokemon.stats.map((item) => (
            <StatBar
              key={item.stat.name}
              name={item.stat.name}
              value={item.base_stat}
            />
          ))}
        </View>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>{renderContent()}</View>

      {/* Always visible, in every state */}
      <View style={styles.footer}>
        <Button
          title="Volver a la lista"
          onPress={() => navigation.navigate('List')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  content: {
    flex: 1,
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
  details: {
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 220,
    height: 220,
  },
  number: {
    marginTop: 8,
    fontSize: 14,
    color: '#888888',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  types: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  measure: {
    fontSize: 16,
    marginVertical: 2,
  },
  sectionTitle: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  stats: {
    alignSelf: 'stretch',
  },
  footer: {
    padding: 12,
  },
});