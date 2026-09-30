import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import api from '../api';
import Field from '../components/Field';
import { colors } from '../theme';

export default function CreateEventScreen({ navigation }) {
  const [form, setForm] = useState({
    title: '', category: 'Party', date: '', time: '', location: '', description: '',
  });
  const set = (k) => (v) => setForm({ ...form, [k]: v });

  const submit = async () => {
    try {
      await api.post('/events', form);
      Alert.alert('Berhasil', 'Event berhasil dibuat');
      setForm({ title: '', category: 'Party', date: '', time: '', location: '', description: '' });
      navigation.navigate('Home');
    } catch (e) {
      Alert.alert('Gagal', e.response?.data?.message || 'Tidak bisa terhubung ke server');
    }
  };

  return (
    <ScrollView style={s.container} contentContainerStyle={{ padding: 24, paddingTop: 56 }}>
      <Text style={s.title}>Create Event</Text>
      <Field label="Event title" value={form.title} onChangeText={set('title')} />
      <Field label="Category (Music/Food/Tech/Party/Sport/Art)" value={form.category} onChangeText={set('category')} />
      <Field label="Date (YYYY-MM-DD)" placeholder="2026-10-20" value={form.date} onChangeText={set('date')} />
      <Field label="Time (HH:mm)" placeholder="19:00" value={form.time} onChangeText={set('time')} />
      <Field label="Location" value={form.location} onChangeText={set('location')} />
      <Field label="Description" value={form.description} onChangeText={set('description')} multiline numberOfLines={4} />
      <TouchableOpacity style={s.btn} onPress={submit}>
        <Text style={s.btnText}>Create Event</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  title: { color: '#fff', fontSize: 24, fontWeight: '700', marginBottom: 20 },
  btn: { backgroundColor: colors.primary, padding: 16, borderRadius: 14, alignItems: 'center', marginTop: 8 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});