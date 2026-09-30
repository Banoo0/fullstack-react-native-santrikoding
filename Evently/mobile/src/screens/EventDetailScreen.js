import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, StyleSheet } from 'react-native';
import api from '../api';
import { colors, emoji } from '../theme';
import { useAuth } from '../context/AuthContext';

export default function EventDetailScreen({ route, navigation }) {
  const { user } = useAuth();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    api.get(`/events/${route.params.id}`).then((r) => setEvent(r.data)).catch(() => {});
  }, [route.params.id]);

  if (!event) return <View style={s.container} />;

  const joined = event.attendees.includes(user.id);

  const toggleJoin = async () => {
    try {
      const { data } = await api.post(`/events/${event._id}/join`);
      setEvent({ ...event, attendees: data.attendees });
    } catch (e) {
      Alert.alert('Error', e.response?.data?.message || 'Gagal');
    }
  };

  return (
    <ScrollView style={s.container}>
      <View style={s.hero}>
        <Text style={{ fontSize: 90 }}>{emoji[event.category] || '🎉'}</Text>
      </View>
      <View style={s.body}>
        <Text style={s.title}>{event.title}</Text>
        <Text style={s.meta}>📅 {event.date}   ⏰ {event.time}</Text>
        <Text style={s.loc}>📍 {event.location}</Text>
        <Text style={s.meta}>👥 {event.attendees.length} peserta • oleh {event.creator?.name}</Text>
        <Text style={s.section}>Description</Text>
        <Text style={s.desc}>{event.description || 'Tidak ada deskripsi.'}</Text>

        <TouchableOpacity style={[s.btn, joined && { backgroundColor: colors.danger }]} onPress={toggleJoin}>
          <Text style={s.btnText}>{joined ? 'Batal Join' : 'Join Event'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={s.back}>← Kembali</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  hero: { height: 260, backgroundColor: '#C9C6F5', alignItems: 'center', justifyContent: 'center' },
  body: { padding: 24 },
  title: { color: '#fff', fontSize: 26, fontWeight: '700' },
  meta: { color: colors.muted, marginTop: 8 },
  loc: { color: colors.primary, marginTop: 8 },
  section: { color: '#fff', fontWeight: '700', fontSize: 16, marginTop: 20 },
  desc: { color: colors.muted, marginTop: 8, lineHeight: 20 },
  btn: { backgroundColor: colors.primary, padding: 16, borderRadius: 14, alignItems: 'center', marginTop: 24 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  back: { color: colors.muted, textAlign: 'center', marginTop: 16 },
});