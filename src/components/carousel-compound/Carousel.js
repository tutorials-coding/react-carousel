import { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Page } from './Page'
import './Carousel.css'

const PAGE_WIDTH = 450

export const Carousel = ({ children }) => {
  const [offset, setOffset] = useState(0)

  const handleLeftArrowClick = () => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset + PAGE_WIDTH
      return Math.min(newOffset, 0)
    })
  }
  const handleRightArrowClick = () => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset - PAGE_WIDTH
      const maxOffset = -(PAGE_WIDTH * (children.length - 1))
      return Math.max(newOffset, maxOffset)
    })
  }

  return (
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
  )
}

Carousel.Page = Page
