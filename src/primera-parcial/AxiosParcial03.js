// src/primera-parcial/AxiosParcial03.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const AxiosParcial03 = () => {
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Función para obtener los comentarios de la API
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/comments')
      .then(response => {
        setComments(response.data);
        setFilteredComments(response.data);  // Inicialmente mostrar todos
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  // Función para filtrar los comentarios por "email"
  const filterComments = (text) => {
    setSearch(text);
    if (text) {
      const newData = comments.filter((item) => {
        const itemData = item.email ? item.email.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredComments(newData);
    } else {
      setFilteredComments(comments);
    }
  };

  // Mostrar un indicador de carga mientras se obtienen los comentarios
  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Comentarios</Text>

      {/* Campo de búsqueda */}
      <TextInput
        style={styles.searchInput}
        value={search}
        placeholder="Buscar por correo"
        placeholderTextColor="#888"
        onChangeText={(text) => filterComments(text)}
      />

      {/* Mostrar lista de comentarios filtrados */}
      <FlatList
        data={filteredComments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    color: '#333',
  },
  itemContainer: {
    padding: 10,
    backgroundColor: '#e0e7ef',
    marginBottom: 10,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 18,
    color: '#007bff',
  },
});

export default AxiosParcial03;
