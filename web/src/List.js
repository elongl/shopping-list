import React from 'react'
import './List.css'

export default props => {
  const data = props.data
  const listItems = data.map(item =>
    <li key={item.id}>
      <input
        className="button listButton"
        type="button"
        value={item.key}
        onClick={() => props.deleteItem(item.key)}
      />
    </li>
  )

  return (
    <div>
      {listItems}
    </div>
  )
}
