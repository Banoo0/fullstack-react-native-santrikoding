import { useState, useCallback } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../api';
import EventCard from '../components/EventCard';
import { colors, categories } from '../theme';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Semua');

  const load = useCallback(async () => {
    try {
      const { data } = await api.get('/events', {
        params: { search, category: category === 'Semua' ? undefined : category },
      });
      setEvents(data);
    } catch (e) {
      console.log(e.message);
    }
  }, [search, category]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.hello}>Halo, {user?.name} 👋</Text>
        <Text style={s.title}>Find the{'\n'}trending events</Text>
      </View>

      <TextInput
        style={s.search}
        placeholder="Search events"
        placeholderTextColor={colors.muted}
        value={search}
        onChangeText={setSearch}
      />

      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(c) => c}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 8, marginBottom: 14 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setCategory(item)}
              style={[s.chip, category === item && s.chipActive]}
            >
              <Text style={{ color: category === item ? '#fff' : colors.muted }}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={events}
        keyExtractor={(e) => e._id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        ListEmptyComponent={<Text style={s.empty}>Belum ada event</Text>}
        renderItem={({ item }) => (
          <EventCard event={item} onPress={() => navigation.navigate('EventDetail', { id: item._id })} />
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { backgroundColor: colors.primary, padding: 24, paddingTop: 56, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  hello: { color: '#DAD3FF', marginBottom: 8 },
  title: { color: '#fff', fontSize: 26, fontWeight: '700' },
  search: {
    backgroundColor: colors.card, color: '#fff', margin: 20, padding: 14, borderRadius: 14,
  },
  chip: { backgroundColor: colors.card, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  chipActive: { backgroundColor: colors.primary },
  empty: { color: colors.muted, textAlign: 'center', marginTop: 40 },
});