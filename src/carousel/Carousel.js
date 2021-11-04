import { useEffect, useState, Children, cloneElement } from 'react'
import './Carousel.css'

const PAGE_WIDTH = 450

export const Carousel = ({ children }) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    setItems(
      Children.map(children, (child) => {
        return cloneElement(child, {
          style: {
            minWidth: `${PAGE_WIDTH}px`,
            maxWidth: `${PAGE_WIDTH}px`,
            height: '100%',
          },
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
