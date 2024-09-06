// src/primera-parcial/PropsParcial02.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PropsParcial02 = ({ route }) => {
  const { nombre, estado } = route.params;
  const estadoTexto = estado ? 'ACTIVO' : 'INACTIVO';

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Mi nombre es: {nombre}, actualmente estoy {estadoTexto} en el 8vo semestre.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333', // Color de texto oscuro
  },
});

export default PropsParcial02;
