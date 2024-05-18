import { useEffect, useState } from "react";
import Tablero from "./components/Tablero";
import { postEstadoMeta } from "./api/rules.api";
import SideBoard from "./components/SideBoard";

function App() {
  const [turnoMain, setTurnoMain] = useState<"JUGADOR" | "MÁQUINA">("JUGADOR");
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
        alert(
          `Ganó el jugador ${
            turnoMain == "JUGADOR" ? "MÁQUINA" : "JUGADOR"
          } - ${lastFicha}`
        );
      }
    };
    fetchData();
  }, [currentTablero]);
  const [isClickeable, setIsClickeable] = useState(true);
  return (
    <>
      <div className="bg-background bg-[radial-gradient(ellipse_80%80%_at_50%-20%,rgba(120,119,198,0.2),rgba(255,255,255,0))] min-h-screen flex justify-center items-center gap-8">
        <div className="flex font-roboto flex-col text-gris font-bold justify-center items-center gap-5">
          <h1 className="bg-block-turn border-2 border-gris py-2 px-10 rounded-xl text-center text-2xl">
            TURNO: {turnoMain}
          </h1>
          <div className="flex gap-8 items-center">
            <div>
              <label htmlFor="numCuadros">TABLERO (n x n): </label>
              <input
                type="number"
                id="numCuadros"
                name="numCuadros"
                className="bg-block-turn border-2 border-gris text-sm outline-none rounded-lg w-20 p-2.5"
                value={numCuadros}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex gap-2">
              <h2 className="border-2 border-border-botton-red bg-botton-red/30 text-border-botton-red p-2.5 rounded-lg">
                PUNTAJE JUGADOR
              </h2>
              <h2 className="border-2 border-border-botton-green bg-botton-green/30 text-border-botton-green p-2.5 rounded-lg">
                PUNTAJE MAQUINA
              </h2>
            </div>
          </div>
          <div className="flex justify-center gap-10">
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
        <div className="flex flex-col gap-3">
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
