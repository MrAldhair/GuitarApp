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
  const [ auth, setAuth ] = useState(false);

  const [ data, setData ] = useState(db);

  const [cart, setCart] =  useState([]);

  //console.log(auth)
  /**
   * Se ejecuta automaticamente cuando el componente esta lista, es un buen lugar para colocar codigo
   * para consultar una API o LocalStorage
   */
  useEffect(() => {
    //console.log("El componente esta listo")
    //console.log("Componente listo, pasando por Auth")
  }, [auth]); // si se deja vacio el arreglo solo se ejecuta una sola vez

  //console.log(data);

  function addToCart (item) {
    
    setCart([...cart, item])
    console.log(cart)

  }

  return (
  // Aqui se pueden agregar Expressions (es algo que produce un valor: ternarios, Array Method que genere un nuevo metodo)
    <>
       {
        // ejemplo de expression
        auth === true ? console.log('verdadero') : console.log('mentira')
       }   
      <Header />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {
            //Inicio de un expression para recorrer el arreglo de bd
            data.map((guitar) => {
              // tiene que estar el return para que se muestre en la UI
              return (
                <Guitar
                  key = { guitar.id }
                  guitar = { guitar }
                  addToCart = { addToCart }
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
