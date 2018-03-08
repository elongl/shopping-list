import React from 'react'
import Row from './Row'
import { StyleSheet, View, FlatList } from 'react-native'

export default props =>
  <View style={styles.container}>
    <FlatList
      showsVerticalScrollIndicator={false}
      data={props.data}
      renderItem={({ item }) =>
        <Row deleteItem={key => props.deleteItem(key)} text={item.key} />}
    />
  </View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center'
  }
})
