import { View, Text, StyleSheet } from 'react-native';

// lookup table (API type name -> Spanish label and color)
const TYPE_INFO = {
  normal: { label: 'Normal', color: '#A8A77A' },
  fire: { label: 'Fuego', color: '#EE8130' },
  water: { label: 'Agua', color: '#6390F0' },
  electric: { label: 'Eléctrico', color: '#F7D02C' },
  grass: { label: 'Planta', color: '#7AC74C' },
  ice: { label: 'Hielo', color: '#96D9D6' },
  fighting: { label: 'Lucha', color: '#C22E28' },
  poison: { label: 'Veneno', color: '#A33EA1' },
  ground: { label: 'Tierra', color: '#E2BF65' },
  flying: { label: 'Volador', color: '#A98FF3' },
  psychic: { label: 'Psíquico', color: '#F95587' },
  bug: { label: 'Bicho', color: '#A6B91A' },
  rock: { label: 'Roca', color: '#B6A136' },
  ghost: { label: 'Fantasma', color: '#735797' },
  dragon: { label: 'Dragón', color: '#6F35FC' },
  dark: { label: 'Siniestro', color: '#705746' },
  steel: { label: 'Acero', color: '#B7B7CE' },
  fairy: { label: 'Hada', color: '#D685AD' },
};

// Fallback for types missing from the table (for example "stellar" or "unknown")
const DEFAULT_COLOR = '#888888';

export default function TypeBadge({ type }) {
  const info = TYPE_INFO[type];
  const label = info ? info.label : type;
  const color = info ? info.color : DEFAULT_COLOR;

  return (
    // Dynamic style (the background color depends on the type)
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
    borderRadius: 12,
  },
  label: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});