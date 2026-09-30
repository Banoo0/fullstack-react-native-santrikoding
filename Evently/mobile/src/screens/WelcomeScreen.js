import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={s.container}>
      <View style={s.circleOrange} />
      <View style={s.circleBlue} />
      <View style={{ padding: 28 }}>
        <Text style={s.title}>Find event &{'\n'}Schedule Planning</Text>
        <Text style={s.desc}>
          Temukan event seru di sekitarmu, buat acaramu sendiri, dan ajak teman-temanmu bergabung.
        </Text>
        <TouchableOpacity style={s.btn} onPress={() => navigation.navigate('Login')}>
          <Text style={s.btnText}>Get Started →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, justifyContent: 'flex-end', overflow: 'hidden' },
  circleOrange: {
    position: 'absolute', top: -80, right: -80, width: 300, height: 300,
    borderRadius: 150, backgroundColor: '#F0A82F',
  },
  circleBlue: {
    position: 'absolute', bottom: -120, left: -100, width: 300, height: 300,
    borderRadius: 150, backgroundColor: '#3FC1E8',
  },
  title: { color: colors.text, fontSize: 32, fontWeight: '700' },
  desc: { color: colors.muted, marginTop: 12, lineHeight: 20 },
  btn: {
    marginTop: 24, backgroundColor: colors.primary, padding: 16,
    borderRadius: 14, alignItems: 'center', marginBottom: 20,
  },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});