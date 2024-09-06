import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { db } from "./utils/GuitarsDB";
import { useState } from "react";
import { useEffect } from "react";

function App() {

  // todo despues de aqui y antes de return se le conoce como Statements (sentencias, instrucciones, pasos, etc)
  // Reglas de los Hooks
  // se recomienda colocar en esta parte superior para tener un orden, ya que se puede dispara el numero de Hooks creados.
  // No se deben colocar dentro de condicionales, tampoco despues de un return


  // El state de un componente es asincrono

  const [auth, setAuth] = useState(false);

  const [data, setData] = useState(db);

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  /**
   * Se ejecuta automaticamente cuando el componente esta lista, es un buen lugar para colocar codigo
   * para consultar una API o LocalStorage
   */
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]); // si se deja vacio el arreglo solo se ejecuta una sola vez


  function addToCart(item) {

    const itemExist = cart.findIndex(guitar => guitar.id === item.id);

    if (itemExist >= 0) { // existe en el carrito
      if(cart[itemExist].quantity >= MAX_ITEMS) return;
      const updateCart = [...cart]; // copia del state
      updateCart[itemExist].quantity++;
      setCart(updateCart);
    } else {

      item.quantity = 1;
      setCart([...cart, item]);
      //setCart( prevCart => [...prevCart, item] );

    }

  }

  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map( item => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }

      return item;
    });

    setCart(updatedCart);

  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map( item => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }

      return item;
    });

    setCart(updatedCart);

  }

  function clearCart() {
    setCart([]);
  }


  return (
    // Aqui se pueden agregar Expressions (es algo que produce un valor: ternarios, Array Method que genere un nuevo metodo)
    <>
      <Header
        cart = { cart }
        removeToCart = { removeFromCart }
        increaseQuantity = { increaseQuantity }
        decreaseQuantity = { decreaseQuantity }
        clearCart = { clearCart } 
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {
            //Inicio de un expression para recorrer el arreglo de bd
            data.map((guitar) => {
              // tiene que estar el return para que se muestre en la UI
              return (
                <Guitar
                  key={guitar.id}
                  guitar={guitar}
                  addToCart={addToCart}
                />
              )
            })
          }

        </div>

      </main>



      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>

  )

}

export default App;
