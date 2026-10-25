import { View, Text, StyleSheet } from 'react-native';

// The maximum possible base stat, used to compute the bar width
const MAX_STAT = 255;

// lookup table (API stat name -> Spanish label)
const STAT_LABELS = {
  hp: 'PS',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'Ataque esp.',
  'special-defense': 'Defensa esp.',
  speed: 'Velocidad',
};

export default function StatBar({ name, value }) {
  const label = STAT_LABELS[name] || name;

  // proportional width (value out of the maximum, as a percentage)
  const widthPercent = (value / MAX_STAT) * 100;

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${widthPercent}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  label: {
    width: 110,
  },
  value: {
    width: 36,
    textAlign: 'right',
    fontWeight: 'bold',
    marginRight: 8,
  },
  track: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#dddddd',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: '#4caf50',
  },
});