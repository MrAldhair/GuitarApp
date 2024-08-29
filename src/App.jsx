import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { db } from "./utils/GuitarsDB";
import { useState } from "react";

function App() {

  // Reglas de los Hooks
  // se recomienda colocar en esta parte superior para tener un orden, ya que se puede dispara el numero de Hooks creados.
  // No se deben colocar dentro de condicionales, tampoco despues de un return
  const [ auth, setAuth ] = useState(true);

  console.log(auth);

  return (

    <>
      <Header />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          <Guitar />
          <Guitar />
          <Guitar />
          <Guitar />
          <Guitar />
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
