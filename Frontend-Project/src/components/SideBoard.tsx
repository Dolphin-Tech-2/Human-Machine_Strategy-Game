import Pieza1 from "../assets/Pieza1.png";
import Pieza2 from "../assets/Pieza2.png";
import Pieza3 from "../assets/Pieza3.png";
import Pieza4 from "../assets/Pieza4.png";
import Pieza5 from "../assets/Pieza5.png";

interface SideBoardProps {
  setFicha: (ficha: "A" | "B" | "C" | "D" | "E") => void;
  setIsClickeable: (valor: boolean) => void;
  fichasSelected: string[];
  setFichasSelected: (fichas: string[]) => void;
}
const SideBoard = ({
  setFicha,
  setIsClickeable,
  fichasSelected,
  setFichasSelected,
}: SideBoardProps) => {
  const onHandleImageClick = (pieza: "A" | "B" | "C" | "D" | "E") => {
    console.log(pieza);
    if (fichasSelected.length === 0) {
      setFichasSelected(["A", "B", "C", "D", "E"]);
    }
    console.log("Fichas dentro del sideBoard", fichasSelected);
    if (fichasSelected.includes(pieza)) {
      setFicha(pieza);
      setIsClickeable(true);
    }

    console.log(fichasSelected);
  };
  return (
    <div className="flex flex-col gap-3">
      <h2 className="bg-blue-side/50 text-xl text-gris border-2 font-bold border-gris/20 rounded-full py-4 px-4">
        SELECCIONAR FICHA
      </h2>
      <div className="bg-blue-side/50 flex flex-col border-2 border-gris/20 rounded-3xl place-items-center gap-4 p-4">
        <img
          className={`h-20 rounded-xl cursor-pointer hover:scale-125 hover:bg-botton-red/40 transition-transform duration-200 ease-in-out ${
            fichasSelected.includes("A") ? "opacity-100" : "opacity-20"
          }`}
          src={Pieza1}
          onClick={() => onHandleImageClick("A")}
        />
        <img
          className={`h-20 rounded-xl cursor-pointer hover:scale-125 hover:bg-botton-red/40 transition-transform duration-200 ease-in-out ${
            fichasSelected.includes("B") ? "opacity-100" : "opacity-20"
          }`}
          src={Pieza2}
          onClick={() => onHandleImageClick("B")}
        />

        <img
          className={`h-20 rounded-xl cursor-pointer hover:scale-125 hover:bg-botton-red/40 transition-transform duration-200 ease-in-out ${
            fichasSelected.includes("C") ? "opacity-100" : "opacity-20"
          }`}
          src={Pieza3}
          onClick={() => onHandleImageClick("C")}
        />

        <img
          className={`h-20 rounded-xl cursor-pointer hover:scale-125 hover:bg-botton-red/40 transition-transform duration-200 ease-in-out ${
            fichasSelected.includes("D") ? "opacity-100" : "opacity-20"
          }`}
          src={Pieza4}
          onClick={() => onHandleImageClick("D")}
        />
        <img
          className={`h-20 rounded-xl cursor-pointer hover:scale-125 hover:bg-botton-red/40 transition-transform duration-200 ease-in-out ${
            fichasSelected.includes("E") ? "opacity-100" : "opacity-20"
          }`}
          src={Pieza5}
          onClick={() => onHandleImageClick("E")}
        />
      </div>
    </div>
  );
};

export default SideBoard;
