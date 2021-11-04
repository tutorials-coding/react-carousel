import './App.css'
import { Carousel } from './carousel/Carousel'

export default function App() {
  return (
    <Carousel>
      <div className="item item-1">Item 1</div>
      <div className="item item-2">Item 2</div>
      <div className="item item-3">Item 3</div>
    </Carousel>
  )
}
