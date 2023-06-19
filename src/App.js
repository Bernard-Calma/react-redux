import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import CartContainer from './components/CartContainer';
import Navbar from './components/Navbar';
import { useEffect } from 'react';
import { calculateTotals, getCartItems } from './features/cart/cartSlice';
import Modal from './components/Modal';


const App = () => {
  const {cartItems, isLoading} = useSelector(store => store.cart)
  const {isOpen} = useSelector(store => store.modal)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems])

  useEffect(()=>{
    dispatch(getCartItems())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if(isLoading)
    return(<div className='loading'>
      <h1>Loading...</h1>
    </div>)
  else
    return(
      <main>
        {isOpen && <Modal />}
        <Navbar />
        <CartContainer />
      </main>
    )
}

export default App;
