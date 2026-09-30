import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, emoji } from '../theme';

export default function EventCard({ event, onPress }) {
  return (
    <TouchableOpacity style={s.card} onPress={onPress}>
      <View style={s.thumb}>
        <Text style={{ fontSize: 30 }}>{emoji[event.category] || '🎉'}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={s.title}>{event.title}</Text>
        <Text style={s.meta}>
          {event.date} • {event.time}
        </Text>
        <Text style={s.loc}>📍 {event.location}</Text>
      </View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    gap: 12,
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 14,
    backgroundColor: '#C9C6F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { color: colors.text, fontSize: 16, fontWeight: '700' },
  meta: { color: colors.muted, fontSize: 12, marginTop: 4 },
  loc: { color: colors.primary, fontSize: 12, marginTop: 2 },
});