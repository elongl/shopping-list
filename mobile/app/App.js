import React, { Component } from 'react'
import * as firebase from 'firebase'
import Header from './Header'
import List from './List'
import { View, Alert, ActivityIndicator } from 'react-native'

const config = {
  apiKey: 'AIzaSyCIqgfyi5FwJ7yCmwLgr2iDx6Nrk60D9Bg',
  authDomain: 'shopping-list-8746a.firebaseapp.com',
  databaseURL: 'https://shopping-list-8746a.firebaseio.com',
  projectId: 'shopping-list-8746a',
  storageBucket: 'shopping-list-8746a.appspot.com',
  messagingSenderId: '1018767723905'
}

firebase.initializeApp(config)

export default class App extends Component {
  constructor() {
    super()
    this.rootRef = firebase.database().ref()
    this.itemsRef = this.rootRef.child('items')
    this.state = {
      data: [],
      dataLoaded: false
    }
  }

  deleteItem(key) {
    this.itemsRef.once('value', snap => {
      snap.forEach(childSnap => {
        var childKey = childSnap.key
        var childData = childSnap.val().key
        if (childData === key) this.itemsRef.child(childKey).remove()
      })
    })
  }

  addNewItem(key) {
    let found = false
    for (let item of this.state.data)
      if (item.key.toLowerCase() === key.toLowerCase()) {
        Alert.alert('Already In List')
        found = true
        break
      }
    if (!found)
      this.itemsRef.push({
        key: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()
      })
  }

  clearAllItems() {
    this.itemsRef.remove()
  }

  componentDidMount() {
    this.itemsRef.once('value', snap => this.setState({ dataLoaded: true }))

    this.itemsRef.on('child_added', snap => {
      this.setState({
        data: [...this.state.data, { key: snap.val().key }]
      })
    })
    this.itemsRef.on('child_removed', snap => {
      let help = this.state.data.filter(x => x.key != snap.val().key)
      this.setState({
        data: help
      })
    })
    this.rootRef.on('child_removed', snap => {
      this.setState({
        data: []
      })
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          itemsCount={this.state.data.length}
          addNewItem={key => this.addNewItem(key)}
          clearAllItems={() => this.clearAllItems()}
        />

        {this.state.dataLoaded ? (
          <List
            data={this.state.data}
            deleteItem={key => this.deleteItem(key)}
          />
        ) : (
          <ActivityIndicator
            style={{ flex: 1, paddingBottom: 100 }}
            size="large"
          />
        )}
      </View>
    )
  }
}
