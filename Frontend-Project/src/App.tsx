import { useEffect, useState } from "react";
import Tablero from "./components/Tablero";
import { postEstadoMeta } from "./api/rules.api";
import SideBoard from "./components/SideBoard";
import DifficultySideBoard from "./components/DifficultySideBoard";

function App() {
  const [turnoMain, setTurnoMain] = useState<"JUGADOR" | "MÁQUINA">("JUGADOR");
  const [fichaMain, setFichaMain] = useState<"A" | "B" | "C" | "D" | "E">("A");
  const [numCuadros, setNumCuadros] = useState(8);
  const [currentTablero, setCurrentTablero] = useState<Array<Array<number>>>(
    Array(numCuadros).fill(Array(numCuadros).fill(0))
  );
  const [lastFicha, setLastFicha] = useState<"A" | "B" | "C" | "D" | "E">("A");
  const [rotationNumber, setRotationNumber] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    "Fácil"
  );

  const [puntajeJugador, setPuntajeJugador] = useState(0);
  const [puntajeMaquina, setPuntajeMaquina] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNumCuadros(parseInt(value));
  };

  const addPuntaje = (puntaje: number, turno: "JUGADOR" | "MÁQUINA") => {
    if (turno === "JUGADOR") {
      setPuntajeJugador(puntajeJugador + puntaje);
    } else {
      setPuntajeMaquina(puntajeMaquina + puntaje);
    }
  }
  const resetPuntajes = () => {
    setPuntajeJugador(0);
    setPuntajeMaquina(0);
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await postEstadoMeta({
        T: currentTablero,
        piezas_disponibles: fichasSelected.length === 0 ? ["A", "B", "C", "D", "E"] : fichasSelected,
        modo: rotationNumber,
      });
      if (response.victoria) {
        alert(
          `No hay más movimientos. ${
            puntajeJugador > puntajeMaquina ? "Ganaste" : 
            puntajeJugador == puntajeMaquina ? "Empate" : "Perdiste"
          }`
        );
      }
    };
    fetchData();
  }, [currentTablero]);
  const [isClickeable, setIsClickeable] = useState(true);
  const [fichasSelected, setFichasSelected] = useState([
    "A",
    "B",
    "C",
    "D",
    "E",
  ]);
  return (
    <>
      <div className="bg-background bg-[radial-gradient(ellipse_80%80%_at_50%-20%,rgba(120,119,198,0.2),rgba(255,255,255,0))] min-h-screen flex justify-center items-center gap-8">
        <DifficultySideBoard
        resetPuntajes={resetPuntajes}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
        />
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
              <h2 className="border-2 border-border-botton-red bg-botton-red/30 text-border-botton-red p-2.5 rounded-full">
                Humano: {puntajeJugador}
              </h2>
              <h2 className="border-2 border-border-botton-green bg-botton-green/30 text-border-botton-green p-2.5 rounded-full">
                Maquina: {puntajeMaquina}
              </h2>
            </div>
          </div>
          <div className="flex justify-center gap-10">
            <Tablero
              addPuntaje={addPuntaje}
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
              fichasSelected={fichasSelected}
              setFichasSelected={setFichasSelected}
              selectedDifficulty={selectedDifficulty}
            />
          </div>
        </div>
        <SideBoard
          setFicha={setFichaMain}
          setIsClickeable={setIsClickeable}
          fichasSelected={fichasSelected}
          setFichasSelected={setFichasSelected}
        />
      </div>
    </>
  );
}

export default App;
