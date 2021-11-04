import { useEffect, useState, Children, cloneElement } from 'react'
import './Carousel.css'

export const Carousel = ({ children }) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    setItems(
      Children.map(children, (child) => {
        return cloneElement(child, {
          style: { minWidth: '450px', maxWidth: '450px', height: '100%' },
        })
      })
    )
  }, [])

  return (
    <div className="main-container">
      <div className="window">
        <div className="all-items-container">{items}</div>
      </div>
    </div>
  )
}
