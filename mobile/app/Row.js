import React, { Component } from 'react'
import * as Animatable from 'react-native-animatable'
import { StyleSheet, Text, TouchableHighlight } from 'react-native'

export default props => {
  let rowRef
  return (
    <Animatable.View
      ref={row => (rowRef = row)}
      animation="bounceIn"
      style={styles.container}
    >
      <TouchableHighlight
        onPress={() => {
          rowRef.fadeOut(300)
          setTimeout(() => props.deleteItem(props.text), 200)
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          {props.text}
        </Text>
      </TouchableHighlight>
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    fontSize: 20,
    color: 'white'
  }
})
