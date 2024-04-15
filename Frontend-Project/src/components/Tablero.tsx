import React, { useState, useEffect, useRef } from "react";

export default function Tablero() {
  const [numCuadros, setNumCuadros] = useState(8);
  const [hoveredSquare, setHoveredSquare] = useState<{ row: number; col: number } | null>(null);
  const [listMarkedSquare, setListMarkedSquare] = useState<{ row: number; col: number }[] | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (context) {
      const canvasSize = Math.min(window.innerWidth, window.innerHeight) - 20;
      const squareSize = canvasSize / numCuadros;

      if (canvas !== null){
        canvas.width = canvasSize;
        canvas.height = canvasSize;
      }

      context.fillStyle = "white";
      context.fillRect(0, 0, canvasSize, canvasSize);

      // Dibujar líneas verticales
      for (let i = 0; i <= numCuadros; i++) {
        context.beginPath();
        context.moveTo(i * squareSize, 0);
        context.lineTo(i * squareSize, canvasSize);
        context.lineWidth = 2;
        context.strokeStyle = "black";
        context.stroke();
      }

      // Dibujar líneas horizontales
      for (let i = 0; i <= numCuadros; i++) {
        context.beginPath();
        context.moveTo(0, i * squareSize);
        context.lineTo(canvasSize, i * squareSize);
        context.lineWidth = 2;
        context.strokeStyle = "black";
        context.stroke();
      }

      // Dibujar el cuadrado sobre el que pasa el mouse
      if (hoveredSquare !== null) {
        const { row, col } = hoveredSquare;
        context.fillStyle = "blue"; // Cambiar color al pasar el mouse
        context.fillRect(col * squareSize, row * squareSize, squareSize, squareSize);
      }

      // Dibujar el cuadrado marcado permanentemente
      if (listMarkedSquare !== null) {
        listMarkedSquare.forEach((square) => {
          const { row, col } = square;
          context.fillStyle = "green"; // Color del cuadrado marcado
          context.fillRect(col * squareSize, row * squareSize, squareSize, squareSize);
        });
      }
    }
  }, [numCuadros, hoveredSquare, listMarkedSquare]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNumCuadros(parseInt(value));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const rect = canvas?.getBoundingClientRect();
    const x = e.clientX - rect!.left;
    const y = e.clientY - rect!.top;
    const squareSize = canvas!.width / numCuadros;
    const col = Math.floor(x / squareSize);
    const row = Math.floor(y / squareSize);
    setHoveredSquare({ row, col });
  };

  const handleSquareClick = (row: number, col: number) => {
    setListMarkedSquare([...listMarkedSquare || [], { row, col }]);
  };

  return (
    <div>
      <label htmlFor="numCuadros">Cuadrados por fila/columna:</label>
      <input
        type="number"
        id="numCuadros"
        name="numCuadros"
        value={numCuadros}
        onChange={handleInputChange}
      />

      <canvas
        ref={canvasRef}
        className="bg-black border border-black"
        onMouseMove={handleMouseMove}
        onClick={() => {
          if (hoveredSquare) {
            handleSquareClick(hoveredSquare.row, hoveredSquare.col);
          }
        }}
      ></canvas>
    </div>
  );
}
