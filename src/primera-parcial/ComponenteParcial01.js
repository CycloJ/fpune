// src/primera-parcial/ComponenteParcial01.js

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Importar la imagen local
import logo from '../assets/images/logo.png'; // Ajusta la ruta según la ubicación de tu archivo de imagen

const ComponenteParcial01 = () => {
  const [nombre, setNombre] = useState('');
  const navigation = useNavigation();

  const data = [
    { id: '1', title: 'PropsParcial02', screen: 'PropsParcial02' },
    { id: '2', title: 'AxiosParcial03', screen: 'AxiosParcial03' },
    { id: '3', title: 'AsyncStorageParcial04', screen: 'AsyncStorageParcial04' }
  ];

  const handleNavigate = (screen) => {
    navigation.navigate(screen, { nombre, estado: false });
  };

  return (
    <View style={styles.container}>
      {/* Título centrado */}
      <Text style={styles.title}>Examen Primera Parcial</Text>

      {/* Imagen local en el Card */}
      <View style={styles.card}>
        <Image
          source={logo} // Usando la imagen local importada
          style={styles.image}
        />
      </View>

      {/* Input para nombre */}
      <TextInput
        style={styles.input}
        placeholder="Ingresar nombre"
        placeholderTextColor="#888" // Color del placeholder
        value={nombre}
        onChangeText={setNombre}
      />

      {/* Listado de navegación */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Button 
            title={item.title} 
            onPress={() => handleNavigate(item.screen)} 
            color="#333" // Color del texto del botón
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white', // Fondo blanco para toda la pantalla
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333', // Color de texto oscuro para el título
  },
  card: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  image: {
    height: 100,
    width: 100,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    color: '#333', // Color de texto oscuro para el input
  },
});

export default ComponenteParcial01;
