import { useEffect, useRef, useState, Children, cloneElement } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Page from './Page'
import { CarouselContext } from './carousel-context'
import './Carousel.css'

export const Carousel = ({ children, infinite }) => {
  const [offset, setOffset] = useState(0)
  const [width, setWidth] = useState(450)
  const [pages, setPages] = useState([])

  const windowElRef = useRef()

  useEffect(() => {
    if (infinite) {
      setPages([
        cloneElement(children[Children.count(children) - 1]),
        ...children,
        cloneElement(children[0]),
      ])
      return
    }
    setPages(children)
  }, [children, infinite])

  useEffect(() => {
    const resizeHandler = () => {
      const windowElWidth = windowElRef.current.offsetWidth
      console.log('resized', windowElWidth)
      setWidth(windowElWidth)
      setOffset(0) // to prevent wrong offset
    }

    resizeHandler()
    window.addEventListener('resize', resizeHandler)

    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  const handleLeftArrowClick = () => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset + width
      return Math.min(newOffset, 0)
    })
  }
  const handleRightArrowClick = () => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset - width
      const maxOffset = -(width * (pages.length - 1))
      return Math.max(newOffset, maxOffset)
    })
  }

  return (
    <CarouselContext.Provider value={{ width }}>
      <div className="main-container">
        <FaChevronLeft className="arrow" onClick={handleLeftArrowClick} />
        <div className="window" ref={windowElRef}>
          <div
            className="all-pages-container"
            style={{
              transform: `translateX(${offset}px)`,
            }}
          >
            {pages}
          </div>
        </div>
        <FaChevronRight className="arrow" onClick={handleRightArrowClick} />
      </div>
    </CarouselContext.Provider>
  )
}

Carousel.Page = Page
