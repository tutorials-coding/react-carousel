import { useEffect, useRef, useState, Children, cloneElement } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Page from './Page'
import { CarouselContext } from './carousel-context'
import './Carousel.css'

const TRANSITION_DURATION = 300

export const Carousel = ({ children, infinite }) => {
  const [offset, setOffset] = useState(0)
  const [width, setWidth] = useState(450)
  const [pages, setPages] = useState([])
  const [clonesCount, setClonesCount] = useState({ head: 0, tail: 0 })
  const [transitionDuration, setTransitionDuration] = useState(300)

  const windowElRef = useRef()

  useEffect(() => {
    if (infinite) {
      setPages([
        cloneElement(children[Children.count(children) - 1]), // head: 1
        ...children,
        cloneElement(children[0]), // tail: 1
      ])
      setClonesCount({ head: 1, tail: 1 })
      return
    }
    setPages(children)
  }, [children, infinite])

  useEffect(() => {
    const resizeHandler = () => {
      const windowElWidth = windowElRef.current.offsetWidth
      console.log('resized', windowElWidth)
      setWidth(windowElWidth)
      setOffset(-(clonesCount.head * width)) // to prevent wrong offset
    }

    resizeHandler()
    window.addEventListener('resize', resizeHandler)

    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [clonesCount, width])

  useEffect(() => {
    if (transitionDuration === 0) {
      setTimeout(() => {
        setTransitionDuration(TRANSITION_DURATION)
      }, TRANSITION_DURATION)
    }
  }, [transitionDuration])

  useEffect(() => {
    if (!infinite) return

    // с элемента 0 (clone) -> к предпоследнему (реальный)
    if (offset === 0) {
      setTimeout(() => {
        setTransitionDuration(0)
        setOffset(-(width * (pages.length - 1 - clonesCount.tail)))
      }, TRANSITION_DURATION)
      return
    }
    // с элемента n (clone) -> к элементу 1 (реальный)
    if (offset === -(width * (pages.length - 1))) {
      setTimeout(() => {
        setTransitionDuration(0)
        setOffset(-(clonesCount.head * width))
      }, TRANSITION_DURATION)
      return
    }
  }, [offset, infinite, pages, clonesCount, width])

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
              transitionDuration: `${transitionDuration}ms`,
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
