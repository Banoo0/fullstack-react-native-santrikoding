import { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../api';
import EventCard from '../components/EventCard';
import { colors } from '../theme';

export default function TicketsScreen({ navigation }) {
  const [tickets, setTickets] = useState([]);

  useFocusEffect(
    useCallback(() => {
      api.get('/events/tickets/me').then((r) => setTickets(r.data)).catch(() => {});
    }, [])
  );

  return (
    <View style={s.container}>
      <Text style={s.title}>My Tickets</Text>
      <FlatList
        data={tickets}
        keyExtractor={(e) => e._id}
        ListEmptyComponent={<Text style={s.empty}>Kamu belum join event apa pun</Text>}
        renderItem={({ item }) => (
          <EventCard event={item} onPress={() => navigation.navigate('EventDetail', { id: item._id })} />
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 20, paddingTop: 56 },
  title: { color: '#fff', fontSize: 24, fontWeight: '700', marginBottom: 20 },
  empty: { color: colors.muted, textAlign: 'center', marginTop: 40 },
});