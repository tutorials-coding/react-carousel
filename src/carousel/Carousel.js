import { useEffect, useState, Children, cloneElement } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import './Carousel.css'

const PAGE_WIDTH = 450

export const Carousel = ({ children }) => {
  const [items, setItems] = useState([])

  const handleLeftArrowClick = () => {
    console.log('handleLeftArrowClick')
  }
  const handleRightArrowClick = () => {
    console.log('handleLeftArrowClick')
  }

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
      <FaChevronLeft className="arrow" onClick={handleLeftArrowClick} />
      <div className="window">
        <div className="all-items-container">{items}</div>
      </div>
      <FaChevronRight className="arrow" onClick={handleRightArrowClick} />
    </div>
  )
}
