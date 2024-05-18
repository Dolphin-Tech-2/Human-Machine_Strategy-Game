import { useEffect, useState } from "react";
import Tablero from "./components/Tablero";
import { postEstadoMeta } from "./api/rules.api";
import SideBoard from "./components/SideBoard";

function App() {
  const [turnoMain, setTurnoMain] = useState<"X" | "Y">("X");
  const [fichaMain, setFichaMain] = useState<"A" | "B" | "C" | "D" | "E">("A");
  const [numCuadros, setNumCuadros] = useState(8);
  const [currentTablero, setCurrentTablero] = useState<Array<Array<number>>>(
    Array(numCuadros).fill(Array(numCuadros).fill(0))
  );
  const [lastFicha, setLastFicha] = useState<"A" | "B" | "C" | "D" | "E">("A");
  const [rotationNumber, setRotationNumber] = useState<0 | 1 | 2 | 3 | 4>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNumCuadros(parseInt(value));
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await postEstadoMeta({
        T: currentTablero,
        pieza: lastFicha,
        modo: rotationNumber,
      });
      if (response.victoria) {
        alert(`Ganó el jugador ${turnoMain == "X" ? "Y" : "X"} - ${lastFicha}`);
      }
    };
    fetchData();
  }, [currentTablero]);
  const [isClickeable, setIsClickeable] = useState(true);
  return (
    <>
      <div className="bg-gray-800 min-h-screen flex flex-row justify-center items-center gap-5">
        <div className="flex flex-col justify-center items-center gap-5">
          <h1 className="text-center">Turno de {turnoMain}</h1>
          <input
            type="number"
            id="numCuadros"
            name="numCuadros"
            className="text-center w-40"
            value={numCuadros}
            onChange={handleInputChange}
          />
          <div className="flex flex-row justify-around gap-4">
            <Tablero
              turno={turnoMain}
              fichaSelected={fichaMain}
              setTurno={setTurnoMain}
              numCuadros={numCuadros}
              setTablero={setCurrentTablero}
              setFichaPadre={setLastFicha}
              setFicha={setFichaMain}
              isClickeable={isClickeable}
              setIsClickeable={setIsClickeable}
              rotationNumber={rotationNumber}
              setRotationNumber={setRotationNumber}
            />
          </div>
        </div>
        <div className="pt-20">
          <SideBoard
            setFicha={setFichaMain}
            setIsClickeable={setIsClickeable}
          />
        </div>
      </div>
    </>
  );
}

export default App;
