import './App.css'
import Carousel from './components/carousel-base'
import CarouselCompound from './components/carousel-compound'

export default function App() {
  return (
    <div className="app__main-container">
      <Carousel>
        <div className="item item-1">Item 1</div>
        <div className="item item-2">Item 2</div>
        <div className="item item-3">Item 3</div>
      </Carousel>
      <CarouselCompound>
        <CarouselCompound.Page>
          <div className="item item-1">Item 1</div>
        </CarouselCompound.Page>
        <CarouselCompound.Page>
          <div className="item item-2">Item 2</div>
        </CarouselCompound.Page>
        <CarouselCompound.Page>
          <div className="item item-3">Item 3</div>
        </CarouselCompound.Page>
      </CarouselCompound>
    </div>
  )
}
