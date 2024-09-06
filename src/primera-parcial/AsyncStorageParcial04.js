// src/primera-parcial/AsyncStorageParcial04.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorageParcial04 = () => {
  const [codigo, setCodigo] = useState('');
  const [materia, setMateria] = useState('');
  const [calificacion, setCalificacion] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    cargarDatos();
  }, []);

  // Función para cargar datos desde AsyncStorage
  const cargarDatos = async () => {
    try {
      const datosGuardados = await AsyncStorage.getItem('datos');
      if (datosGuardados) {
        setData(JSON.parse(datosGuardados));
      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  };

  // Función para guardar datos en AsyncStorage
  const guardarDatos = async () => {
    const nuevoDato = { id: Date.now().toString(), codigo, materia, calificacion };
    const datosActualizados = [...data, nuevoDato];
    setData(datosActualizados);
    await AsyncStorage.setItem('datos', JSON.stringify(datosActualizados));
    limpiarCampos();
  };

  // Función para limpiar los campos de entrada
  const limpiarCampos = () => {
    setCodigo('');
    setMateria('');
    setCalificacion('');
  };

  return (
    <View style={styles.container}>
      {/* Inputs para ingresar datos */}
      <TextInput
        style={styles.input}
        placeholder="Código"
        value={codigo}
        onChangeText={setCodigo}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Materia"
        value={materia}
        onChangeText={setMateria}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Calificación"
        value={calificacion}
        onChangeText={setCalificacion}
        placeholderTextColor="#888"
      />
      <Button title="Agregar" onPress={guardarDatos} />

      {/* Mostrar datos en lista */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>
              Código: {item.codigo} | Materia: {item.materia} | Calificación: {item.calificacion}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    color: '#333', // Color de texto oscuro
  },
  listItem: {
    marginBottom: 10,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
  listItemText: {
    color: '#333', // Color de texto oscuro
  },
});

export default AsyncStorageParcial04;
