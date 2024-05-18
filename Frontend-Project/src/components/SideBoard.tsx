import Pieza1 from "../assets/Pieza1.png";
import Pieza2 from "../assets/Pieza2.png";
import Pieza3 from "../assets/Pieza3.png";
import Pieza4 from "../assets/Pieza4.png";
import Pieza5 from "../assets/Pieza5.png";

interface SideBoardProps {
  setFicha: (ficha: "A" | "B" | "C" | "D" | "E") => void;
  setIsClickeable: (valor: boolean) => void;
}
let piecesClicked: string[] = [];
const SideBoard = ({ setFicha, setIsClickeable }: SideBoardProps) => {
  const onHandleImageClick = (
    e: React.MouseEvent,
    pieza: "A" | "B" | "C" | "D" | "E"
  ) => {
    console.log(pieza);

    if (!piecesClicked.includes(pieza)) {
      piecesClicked.push(pieza);
      setFicha(pieza);
      setIsClickeable(true);
    }
    if (piecesClicked.length === 5) {
      piecesClicked = [];
    }

    //console.log(piecesClicked);
  };
  return (
    <div className="flex flex-col gap-3">
      <h2 className="bg-blue-side/50 text-xl text-gris border-2 font-bold border-gris/20 rounded-full py-4 px-4">
        SELECCIONAR FICHA
      </h2>
      <div className="bg-blue-side/50 flex flex-col border-2 border-gris/20 rounded-3xl place-items-center gap-4 p-4">
        <img
          className="h-20 cursor-pointer hover:scale-125 transition-transform duration-200 ease-in-out"
          src={Pieza1}
          onClick={(e) => onHandleImageClick(e, "A")}
        />
        <img
          className="h-20 cursor-pointer hover:scale-125 transition-transform duration-200 ease-in-out"
          src={Pieza2}
          onClick={(e) => onHandleImageClick(e, "B")}
        />

        <img
          className="h-20 cursor-pointer hover:scale-125 transition-transform duration-200 ease-in-out"
          src={Pieza3}
          onClick={(e) => onHandleImageClick(e, "C")}
        />

        <img
          className="h-20 cursor-pointer hover:scale-125 transition-transform duration-200 ease-in-out"
          src={Pieza4}
          onClick={(e) => onHandleImageClick(e, "D")}
        />
        <img
          className="h-20 cursor-pointer hover:scale-125 transition-transform duration-200 ease-in-out"
          src={Pieza5}
          onClick={(e) => onHandleImageClick(e, "E")}
        />
      </div>
    </div>
  );
};

export default SideBoard;
