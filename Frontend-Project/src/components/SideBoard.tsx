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
  const onHandleImageClick = (
    e: React.MouseEvent,
    pieza: "A" | "B" | "C" | "D" | "E"
  ) => {
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
    <>
      <h2 className="bg-blue-side/50 text-xl text-gris border-2 font-bold border-gris rounded-md py-4 px-4">
        SELECCIONAR FICHA
      </h2>
      <div className="bg-blue-side/50 flex flex-col border-2 border-gris rounded-md place-items-center gap-5 py-2 px-4 pb-10">
        <img
          className="size-28 cursor-pointer"
          src={Pieza1}
          onClick={(e) => onHandleImageClick(e, "A")}
        />
        <img
          className="size-28 cursor-pointer"
          src={Pieza2}
          onClick={(e) => onHandleImageClick(e, "B")}
        />

        <img
          className="w-14 h-28 cursor-pointer"
          src={Pieza3}
          onClick={(e) => onHandleImageClick(e, "C")}
        />

        <img
          className="size-28 cursor-pointer"
          src={Pieza4}
          onClick={(e) => onHandleImageClick(e, "D")}
        />
        <img
          className="size-28 cursor-pointer"
          src={Pieza5}
          onClick={(e) => onHandleImageClick(e, "E")}
        />
      </div>
    </>
  );
};

export default SideBoard;
