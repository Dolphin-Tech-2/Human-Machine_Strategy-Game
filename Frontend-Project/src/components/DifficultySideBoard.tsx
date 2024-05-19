interface DifficultySideBoardProps {
  setSelectedDifficulty: (difficulty: string) => void;
  selectedDifficulty: string | null;
}
export default function DifficultySideBoard({
  setSelectedDifficulty,
  selectedDifficulty,
}: DifficultySideBoardProps) {
  const handleButtonClick = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
  };

  const buttonClass = (difficulty: string) =>
    `rounded-full py-2 px-4 w-full text-center font-medium cursor-pointer transition-colors ${
      selectedDifficulty === difficulty
        ? difficulty === "Fácil"
          ? "border-2 border-green-500"
          : difficulty === "Intermedio"
          ? "border-2 border-yellow-500"
          : "border-2 border-red-500"
        : "border-transparent"
    }`;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="bg-blue-side/50 text-xl text-gris border-2 font-bold border-gris/20 rounded-full py-3 px-5 shadow-md">
        SELECCIONAR DIFICULTAD
      </h2>
      <div className="bg-blue-side/30 flex flex-col border-2 border-gris/20 rounded-3xl items-center gap-3 p-6 shadow-lg">
        <button
          className={`${buttonClass(
            "Fácil"
          )} bg-green-700/50 text-green-500 hover:bg-green-700/90`}
          onClick={() => handleButtonClick("Fácil")}
        >
          Fácil - Aleatorio
        </button>
        <button
          className={`${buttonClass(
            "Intermedio"
          )} bg-yellow-700/30 text-yellow-500 hover:bg-yellow-700/90`}
          onClick={() => handleButtonClick("Intermedio")}
        >
          Intermedio - Primero el mejor
        </button>
        <button
          className={`${buttonClass(
            "Difícil"
          )} bg-red-700/30 text-red-500 hover:bg-red-700/90`}
          onClick={() => handleButtonClick("Difícil")}
        >
          Difícil - MinMax
        </button>
      </div>
    </div>
  );
}
