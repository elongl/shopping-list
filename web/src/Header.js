import React, { Component } from 'react'
import './Header.css'

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  addNewItem = () => {
    this.props.addNewItem(this.state.text)
    this.setState({ text: '' })
    this.itemInput.focus()
  }

  render() {
    return (
      <div className="App-header">
        <input
          type="text"
          ref={ref => (this.itemInput = ref)}
          placeholder="What Would You Like To Buy?"
          className="itemInput"
          value={this.state.text}
          onChange={text => this.setState({ text: text.target.value })}
          onKeyUp={event => {
            if (event.keyCode === 13) this.addNewItem()
          }}
        />
        <div style={{ paddingTop: 10 }}>
          <input
            className="button"
            type="button"
            value="Add New Item"
            onClick={this.addNewItem}
          />
          <h2>
            Items: {this.props.itemsCount}
          </h2>
          <input
            className="button"
            type="button"
            value="Remove All Items"
            onClick={this.props.clearAllItems}
          />
        </div>
      </div>
    )
  }
}
