import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Gunakan 10.0.2.2 jika menggunakan emulator Android (localhost)
const API_URL = 'http://10.0.2.2:3000/api/posts';

function HomeScreen() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching Data dari REST API
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((json) => {
        if(json.success) setPosts(json.data);
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.center} />;
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.content}>{item.content}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>Belum ada data artikel.</Text>}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Daftar Artikel' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { 
    padding: 16, 
    marginBottom: 12, 
    backgroundColor: '#fff', 
    borderRadius: 8,
    elevation: 2 
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  content: { fontSize: 14, color: '#666' }
});