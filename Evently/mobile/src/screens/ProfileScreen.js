import { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({ created: 0, joined: 0 });

  useFocusEffect(
    useCallback(() => {
      api.get('/auth/me').then((r) => setStats(r.data.stats)).catch(() => {});
    }, [])
  );

  return (
    <View style={s.container}>
      <Text style={s.title}>Profile</Text>
      <View style={s.row}>
        <View style={s.avatar}><Text style={{ fontSize: 40 }}>🙂</Text></View>
        <View>
          <Text style={s.name}>{user?.name}</Text>
          <Text style={s.job}>{user?.job}</Text>
          <Text style={s.loc}>📍 {user?.location}</Text>
        </View>
      </View>

      <View style={s.stats}>
        <View style={s.stat}><Text style={s.num}>{stats.created}</Text><Text style={s.lbl}>Create Event</Text></View>
        <View style={s.stat}><Text style={s.num}>{stats.joined}</Text><Text style={s.lbl}>Join Event</Text></View>
      </View>

      <TouchableOpacity style={s.btn} onPress={logout}>
        <Text style={s.btnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 24, paddingTop: 56 },
  title: { color: '#fff', fontSize: 24, fontWeight: '700', marginBottom: 24 },
  row: { flexDirection: 'row', gap: 16, alignItems: 'center' },
  avatar: { width: 84, height: 84, borderRadius: 20, backgroundColor: '#E8E4FA', alignItems: 'center', justifyContent: 'center' },
  name: { color: '#fff', fontSize: 20, fontWeight: '700' },
  job: { color: colors.muted, marginTop: 2 },
  loc: { color: colors.primary, marginTop: 4 },
  stats: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 32, backgroundColor: colors.card, padding: 20, borderRadius: 16 },
  stat: { alignItems: 'center' },
  num: { color: '#fff', fontSize: 22, fontWeight: '700' },
  lbl: { color: colors.muted, marginTop: 4, fontSize: 12 },
  btn: { backgroundColor: colors.danger, padding: 16, borderRadius: 14, alignItems: 'center', marginTop: 40 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});