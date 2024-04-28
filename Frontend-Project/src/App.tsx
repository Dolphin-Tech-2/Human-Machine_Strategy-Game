import { useEffect, useState } from "react";
import Tablero from "./components/Tablero";

function App() {
  const [turnoMain, setTurnoMain] = useState<"X" | "Y">("X");
  const [fichaMain, setFichaMain] = useState<"A" | "B" | "C" | "D" | "E">("C");
  const [numCuadros, setNumCuadros] = useState(8);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNumCuadros(parseInt(value));
  };

  useEffect(() => {
    // Cambiar aleatoriamente la ficha
    const fichas: ("A" | "B" | "C" | "D" | "E")[] = ["A", "B", "C", "D", "E"];
    const randomFicha: "A" | "B" | "C" | "D" | "E" =
      fichas[Math.floor(Math.random() * fichas.length)];
    setFichaMain(randomFicha);
  }, [turnoMain]);
  return (
    <div className="bg-slate-400 min-h-screen">
      <h1>Turno de {turnoMain}</h1>
      <input
        type="number"
        id="numCuadros"
        name="numCuadros"
        value={numCuadros}
        onChange={handleInputChange}
      />
      <div className="flex flex-row justify-around">
        <Tablero
          turno={turnoMain}
          ficha={fichaMain}
          setTurno={setTurnoMain}
          jugador="X"
          numCuadros={numCuadros}
        />
        <Tablero
          turno={turnoMain}
          ficha={fichaMain}
          setTurno={setTurnoMain}
          jugador="Y"
          numCuadros={numCuadros}
        />
      </div>
    </div>
  );
}

export default App;
