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

    console.log(piecesClicked);
  };
  return (
    <>
      <div className="w-40 h-100 flex flex-col border-2 border-sky-500 place-items-center gap-5 pt-2 pb-2">
        <img
          className="size-28 cursor-pointer"
          src={Pieza1}
          onClick={(e) => onHandleImageClick(e, "E")}
        />
        <img
          className="w-14 h-28 cursor-pointer"
          src={Pieza2}
          onClick={(e) => onHandleImageClick(e, "C")}
        />
        <img
          className="size-28 cursor-pointer"
          src={Pieza3}
          onClick={(e) => onHandleImageClick(e, "A")}
        />
        <img
          className="size-28 cursor-pointer"
          src={Pieza4}
          onClick={(e) => onHandleImageClick(e, "B")}
        />
        <img
          className="size-28 cursor-pointer"
          src={Pieza5}
          onClick={(e) => onHandleImageClick(e, "D")}
        />
      </div>
    </>
  );
};

export default SideBoard;
