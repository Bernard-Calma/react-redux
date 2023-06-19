import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import CartContainer from './components/CartContainer';
import Navbar from './components/Navbar';
import { useEffect } from 'react';
import { calculateTotals } from './features/cart/cartSlice';
import Modal from './components/Modal';


const App = () => {
  const {cartItems} = useSelector(store => store.cart)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems])
  return(
    <main>
      <Modal />
      <Navbar />
      <CartContainer />
    </main>
  )
}

export default App;
