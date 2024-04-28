import React, { useState, useEffect, useRef } from "react";
import Fichas from "../utils/fichas.ts";

export default function Tablero() {
  const [numCuadros, setNumCuadros] = useState(8);
  const [currentSquare, setCurrentSquare] = useState<
    { row: number; col: number }[]
  >([]);
  const [lastSquare, setLastSquare] = useState<{ row: number; col: number }>({
    row: 0,
    col: 0,
  });
  const [fichaSelected, setFichaSelected] = useState<
    "A" | "B" | "C" | "D" | "E"
  >("A");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tableroHover = useRef<Array<Array<number>>>(
    Array(numCuadros).fill(Array(numCuadros).fill(0))
  );
  const tableroClicked = useRef<Array<Array<number>>>(
    Array(numCuadros).fill(Array(numCuadros).fill(0))
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (context) {
      const canvasSize = Math.min(window.innerWidth, window.innerHeight) - 20;
      const squareSize = canvasSize / numCuadros;

      if (canvas !== null) {
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
      if (tableroHover.current !== null || tableroHover.current !== undefined) {
        for (let i = 0; i < numCuadros; i++) {
          for (let j = 0; j < numCuadros; j++) {
            if (tableroHover.current[i][j] === 1) {
              context.fillStyle = "red"; // Color del cuadrado hover
              context.fillRect(
                j * squareSize,
                i * squareSize,
                squareSize,
                squareSize
              );
            }
          }
        }
      }

      // Dibujar el cuadrado marcado permanentemente
      if (tableroClicked !== null || tableroClicked !== undefined) {
        for (let i = 0; i < numCuadros; i++) {
          for (let j = 0; j < numCuadros; j++) {
            if (tableroClicked.current[i][j] === 1) {
              context.fillStyle = "blue"; // Color del cuadrado marcado
              context.fillRect(
                j * squareSize,
                i * squareSize,
                squareSize,
                squareSize
              );
            }
          }
        }
      }
    }
  }, [numCuadros, currentSquare, lastSquare]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNumCuadros(parseInt(value));
    tableroHover.current = Array(parseInt(value));
    tableroHover.current.fill(Array(parseInt(value)).fill(0));
    tableroClicked.current = Array(parseInt(value));
    tableroClicked.current.fill(Array(parseInt(value)).fill(0));
  };

  const verifyBorder = (row: number, col: number) => {
    let status = true;
    Fichas[fichaSelected].forEach((ficha) => {
      if (
        !(
          row + ficha[0] >= 0 &&
          row + ficha[0] < numCuadros &&
          col + ficha[1] >= 0 &&
          col + ficha[1] < numCuadros
        )
      ) {
        status = false;
        return;
      }
    });
    return status;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const rect = canvas?.getBoundingClientRect();
    const x = e.clientX - rect!.left;
    const y = e.clientY - rect!.top;
    const squareSize = canvas!.width / numCuadros;
    const col = Math.floor(x / squareSize);
    const row = Math.floor(y / squareSize);

    setCurrentSquare([{ row, col }]);
    if (verifyBorder(row, col)) {
      tableroHover.current = Array(numCuadros)
        .fill(0)
        .map(() => Array(numCuadros).fill(0));
      Fichas[fichaSelected].forEach((ficha) => {
        tableroHover.current[row + ficha[0]][col + ficha[1]] = 1;
      });
    }
  };

  const handleSquareClick = () => {
    if (tableroHover.current !== null && tableroClicked.current !== null) {
      tableroClicked.current = JSON.parse(
        JSON.stringify(tableroClicked.current)
      );
      setLastSquare(currentSquare[currentSquare.length - 1]);
      for (let i = 0; i < numCuadros; i++) {
        for (let j = 0; j < numCuadros; j++) {
          // Solo asignar si tableroHover.current[i][j] es 1
          if (tableroHover.current[i][j] === 1) {
            tableroClicked.current[i][j] = 1;
          }
        }
      }
    }
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
          handleSquareClick();
        }}
      ></canvas>
    </div>
  );
}
