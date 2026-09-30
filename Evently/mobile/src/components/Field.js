import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function Field({ label, ...props }) {
  return (
    <View style={{ marginBottom: 14 }}>
      {label && <Text style={s.label}>{label}</Text>}
      <TextInput placeholderTextColor={colors.muted} style={s.input} {...props} />
    </View>
  );
}

const s = StyleSheet.create({
  label: { color: colors.muted, marginBottom: 6, fontSize: 13 },
  input: {
    backgroundColor: colors.card,
    color: colors.text,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
});