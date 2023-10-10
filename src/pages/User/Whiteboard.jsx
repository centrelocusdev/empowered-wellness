import React, { useState } from 'react'
import './Board.css' // You can create a CSS file for styling

const Board = () => {
  const [items, setItems] = useState([])

  const handleAddImage = () => {
    setItems([...items, { type: 'image', content: null }])
  }

  const handleAddText = () => {
    setItems([...items, { type: 'text', content: '' }])
  }

  const handleContentChange = (index, content) => {
    const updatedItems = [...items]
    updatedItems[index].content = content
    setItems(updatedItems)
  }

  const handleImageUpload = (index, file) => {
    const updatedItems = [...items]
    updatedItems[index].content = file
    setItems(updatedItems)
  }
       console.log()
  return (
    <div className="board">
      <div className="controls">
        <button onClick={handleAddImage}>Add Image</button>
        <button onClick={handleAddText}>Add Text</button>
      </div>
      <div className="items">
        {items.map((item, index) => (
          <div key={index} className={`item ${item.type}`}>
            {item.type === 'image' && (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(index, e.target.files[0])}
                />
                {item.content && (
                  <img src={URL.createObjectURL(item.content)} alt="Uploaded" />
                )}
              </div>
            )}
            {item.type === 'text' && (
              <textarea
                placeholder="Text content"
                value={item.content}
                onChange={(e) => handleContentChange(index, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Board
