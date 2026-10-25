import { Text, Image, StyleSheet, Pressable } from 'react-native';

// Base URL as a constant to avoid repeating it
const SPRITE_BASE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

// Capitalize the first letter of the name
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function PokemonCard({ id, name, onPress }) {
  const imageUrl = `${SPRITE_BASE_URL}/${id}.png`;

  return (
    <Pressable style={styles.card} onPress={onPress}>
      {/* remote Image needs explicit width and height */}
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.number}>#{String(id).padStart(3, '0')}</Text>
      <Text style={styles.name}>{capitalize(name)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 2,
  },
  image: {
    width: 120,
    height: 120,
  },
  number: {
    marginTop: 8,
    fontSize: 12,
    color: '#888888',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});