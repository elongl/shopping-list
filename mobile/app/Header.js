import React, { Component } from 'react'
import * as Animatable from 'react-native-animatable'
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native'

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }
  componentWillReceiveProps() {
    this.refs.itemsDisplay.pulse()
  }

  render() {
    const { addNewItem, clearAllItems, itemsCount } = this.props
    return (
      <Animatable.View style={{ paddingTop: 50 }} animation="fadeInDown">
        <TextInput
          placeholder="What Would You Like To Buy ?"
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
          style={styles.textInput}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button
            title="Add Item"
            onPress={() => {
              this.state.text != ''
                ? addNewItem(this.state.text)
                : Alert.alert('Enter Groceries')
              this.setState({
                text: ''
              })
            }}
          />
          <Animatable.Text ref="itemsDisplay" style={styles.bouncer}>
            Items: {itemsCount}
          </Animatable.Text>
          <Button title="Mark All" onPress={() => clearAllItems()} />
        </View>
      </Animatable.View>
    )
  }
}
const styles = StyleSheet.create({
  bouncer: {
    width: 100,
    backgroundColor: '#333',
    borderRadius: 3,
    padding: 5,
    fontSize: 14,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 1)'
  },
  textInput: {
    backgroundColor: '#ededed',
    height: 60,
    textAlign: 'center',
    marginBottom: 10
  }
})
