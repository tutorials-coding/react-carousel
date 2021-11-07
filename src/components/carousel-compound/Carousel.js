import { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Page } from './Page'
import { CarouselContext } from './carousel-context'
import './Carousel.css'

export const Carousel = ({ children }) => {
  const [offset, setOffset] = useState(0)
  const [width, setWidth] = useState(450)

  const handleLeftArrowClick = () => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset + width
      return Math.min(newOffset, 0)
    })
  }
  const handleRightArrowClick = () => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset - width
      const maxOffset = -(width * (children.length - 1))
      return Math.max(newOffset, maxOffset)
    })
  }

  return (
    <CarouselContext.Provider value={{ width }}>
      <div className="main-container">
        <FaChevronLeft className="arrow" onClick={handleLeftArrowClick} />
        <div className="window">
          <div
            className="all-pages-container"
            style={{
              transform: `translateX(${offset}px)`,
            }}
          >
            {children}
          </div>
        </div>
        <FaChevronRight className="arrow" onClick={handleRightArrowClick} />
      </div>
    </CarouselContext.Provider>
  )
}

Carousel.Page = Page
