import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import PizzaItem from './pages/PizzaItem';
import './scss/app.scss'


function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/pizza/:id' element={<PizzaItem />} />
        </Routes>
      </div>
    </div>

  );
}

export default App;
