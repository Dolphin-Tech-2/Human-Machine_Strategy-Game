import React, { useState, useEffect, useRef, useCallback } from "react";
import Fichas from "../utils/fichas.ts";
import {
  postColocarPieza,
  postGenerarJugadaAleatorio,
  postGenerarJugadaGreedy,
  postGenerarJugadaMinMax,
} from "../api/rules.api.ts";

interface TableroProps {
  turno: "JUGADOR" | "MÁQUINA";
  fichaSelected: "A" | "B" | "C" | "D" | "E";
  setTurno: (turno: "JUGADOR" | "MÁQUINA") => void;
  numCuadros: number;
  setTablero: (tablero: Array<Array<number>>) => void;
  setFichaPadre: (ficha: "A" | "B" | "C" | "D" | "E") => void;
  setFicha: (ficha: "A" | "B" | "C" | "D" | "E") => void;
  isClickeable: boolean;
  setIsClickeable: (valor: boolean) => void;
  rotationNumber: 0 | 1 | 2 | 3 | 4;
  setRotationNumber: (valor: 0 | 1 | 2 | 3 | 4) => void;
  fichasSelected: string[];
  setFichasSelected: (fichas: string[]) => void;
  selectedDifficulty: string | null;
  addPuntaje: (puntaje: number, turno: "JUGADOR" | "MÁQUINA") => void;
}

export default function Tablero({
  turno,
  fichaSelected,
  setTurno,
  numCuadros = 8,
  setTablero,
  setFichaPadre,
  setFicha,
  isClickeable,
  setIsClickeable,
  rotationNumber,
  setRotationNumber,
  fichasSelected,
  setFichasSelected,
  selectedDifficulty,
  addPuntaje,
}: TableroProps) {
  const [currentSquare, setCurrentSquare] = useState<
    { row: number; col: number }[]
  >([]);

  const [lastSquare, setLastSquare] = useState<{ row: number; col: number }>({
    row: 0,
    col: 0,
  });

  const rotationStatus = useRef<0 | 1 | 2 | 3 | 4>(0);
  const originalCoords = useRef(Fichas[fichaSelected].coords);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const tableroHover = useRef<Array<Array<number>>>(
    Array(numCuadros).fill(Array(numCuadros).fill(0))
  );

  const tableroClicked = useRef<Array<Array<string>>>(
    Array(numCuadros).fill(Array(numCuadros).fill(""))
  );
  const rotatePiece = useCallback(() => {
    const numRotations = Fichas[fichaSelected].rotaciones;
    const rotationAngle =
      rotationStatus.current === numRotations - 1
        ? 90 * (5 - numRotations)
        : 90;

    // Rotamos la pieza
    const rotatedCoords = rotateCoordinates(
      Fichas[fichaSelected].coords,
      rotationAngle
    );
    Fichas[fichaSelected].coords = rotatedCoords;

    // Incrementamos rotationStatus y lo mantenemos dentro del rango [0, numRotations)
    rotationStatus.current = ((rotationStatus.current + 1) % numRotations) as
      | 0
      | 1
      | 2
      | 3
      | 4;

    setRotationNumber(rotationStatus.current);
  }, [fichaSelected]);

  useEffect(() => {
    rotationStatus.current = 0;
    setRotationNumber(0);
    originalCoords.current = Fichas[fichaSelected].coords;
  }, [fichaSelected]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === " ") {
        rotatePiece();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [rotatePiece]);

  useEffect(() => {
    tableroHover.current = Array(numCuadros);
    tableroHover.current.fill(Array(numCuadros).fill(0));
    tableroClicked.current = Array(numCuadros);
    tableroClicked.current.fill(Array(numCuadros).fill(""));
    setFichasSelected(["A", "B", "C", "D", "E"]);
    setFicha("A");
    setFichaPadre("A");
    setCurrentSquare([]);
    setIsClickeable(true);
    setTurno("JUGADOR");
  }, [numCuadros, selectedDifficulty]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (context) {
      const canvasSize = Math.min(
        window.innerWidth,
        (window.innerHeight / 4) * 3
      );
      const squareSize = canvasSize / numCuadros;

      if (canvas !== null) {
        canvas.width = canvasSize;
        canvas.height = canvasSize;
      }

      context.fillStyle = "#7a787a1f";
      context.fillRect(0, 0, canvasSize, canvasSize);

      // Dibujar líneas verticales
      for (let i = 0; i <= numCuadros; i++) {
        context.beginPath();
        context.moveTo(i * squareSize, 0);
        context.lineTo(i * squareSize, canvasSize);
        context.lineWidth = 2;
        context.strokeStyle = "#a29e9f";
        context.stroke();
      }

      // Dibujar líneas horizontales
      for (let i = 0; i <= numCuadros; i++) {
        context.beginPath();
        context.moveTo(0, i * squareSize);
        context.lineTo(canvasSize, i * squareSize);
        context.lineWidth = 2;
        context.strokeStyle = "#a29e9f";
        context.stroke();
      }

      // Dibujar el cuadrado sobre el que pasa el mouse
      if (
        (tableroHover.current !== null || tableroHover.current !== undefined) &&
        isClickeable === true
      ) {
        for (let i = 0; i < numCuadros; i++) {
          for (let j = 0; j < numCuadros; j++) {
            if (tableroHover.current[i][j] === 1) {
              context.fillStyle = "#ae6861"; // Color del cuadrado hover
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
            if (tableroClicked.current[i][j] !== "") {
              context.fillStyle = tableroClicked.current[i][j]; // Color del cuadrado marcado
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

  const verifyBorder = (row: number, col: number) => {
    let status = true;
    Fichas[fichaSelected].coords.forEach((ficha) => {
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
      Fichas[fichaSelected].coords.forEach((ficha) => {
        tableroHover.current[row + ficha[0]][col + ficha[1]] = 1;
      });
    }
  };

  const handleSquareClick = async () => {
    const tableroBinario = convertToBinary(tableroClicked.current);
    const response = await postColocarPieza(
      {
        T: tableroBinario,
        i: currentSquare[currentSquare.length - 1].row,
        j: currentSquare[currentSquare.length - 1].col,
        modo: rotationNumber,
      },
      fichaSelected
    );
    console.log(response);

    if (
      tableroHover.current !== null &&
      tableroClicked.current !== null &&
      isClickeable === true
    ) {
      let oldTablero = convertToBinary(tableroClicked.current);
      tableroClicked.current = JSON.parse(
        JSON.stringify(tableroClicked.current)
      );


      setLastSquare(currentSquare[currentSquare.length - 1]);
      if (response.colocado) {
        for (let i = 0; i < numCuadros; i++) {
          for (let j = 0; j < numCuadros; j++) {
            if (tableroHover.current[i][j] === 1) {
              tableroClicked.current[i][j] = Fichas[fichaSelected].color;
            }
          }
        }
        setIsClickeable(false);
        // Calculando puntaje
        let newTablero = convertToBinary(tableroClicked.current);
        let completedRows = getCompletedRows(oldTablero, newTablero);
        addPuntaje(completedRows, "JUGADOR");

        let fichasDisponibles = fichasSelected;
        if (fichasDisponibles.length === 0) {
          setFichasSelected(["A", "B", "C", "D", "E"]);
          fichasDisponibles = ["A", "B", "C", "D", "E"];
        }
        fichasDisponibles = fichasDisponibles.filter(
          (ficha) => ficha !== fichaSelected
        );
        if (fichasDisponibles.length === 0) {
          setFichasSelected(["A", "B", "C", "D", "E"]);
          fichasDisponibles = ["A", "B", "C", "D", "E"];
        }
        setFichasSelected(fichasDisponibles);
        console.log("fichas disponibles", fichasDisponibles);

        console.log("parametro", fichasDisponibles);
        setTurno(turno == "JUGADOR" ? "MÁQUINA" : "JUGADOR");
        console.log(selectedDifficulty);

        oldTablero = convertToBinary(tableroClicked.current);

        setTurno("MÁQUINA");
        switch (selectedDifficulty) {
          case "Fácil":
            try {
              const responsePieza = await postGenerarJugadaAleatorio({
                T: convertToBinary(tableroClicked.current),
                piezas_disponibles: fichasDisponibles,
              });
              console.log(responsePieza);
              fichasDisponibles = fichasDisponibles.filter(
                (ficha) => ficha !== responsePieza.mejor_movimiento[0]
              );
              console.log("fichas disponibles MAQUINA", fichasDisponibles);
              setFichasSelected(fichasDisponibles);
              if (
                responsePieza.tablero !== null &&
                selectedDifficulty === "Fácil"
              ) {
                for (let i = 0; i < numCuadros; i++) {
                  for (let j = 0; j < numCuadros; j++) {
                    if (
                      responsePieza.tablero[i][j] === 1 &&
                      tableroClicked.current[i][j] === ""
                    ) {
                      tableroClicked.current[i][j] =
                        Fichas[
                          responsePieza
                            .mejor_movimiento[0] as keyof typeof Fichas
                        ].color;
                    }
                  }
                }
              }
            } catch (e) {
              console.log(e);
            }
            break;
          case "Intermedio":
            try {
              const responsePieza = await postGenerarJugadaGreedy({
                T: convertToBinary(tableroClicked.current),
                piezas_disponibles: fichasDisponibles,
              });
              console.log(responsePieza);
              fichasDisponibles = fichasDisponibles.filter(
                (ficha) => ficha !== responsePieza.mejor_movimiento[0]
              );
              console.log("fichas disponibles MAQUINA", fichasDisponibles);
              setFichasSelected(fichasDisponibles);
              if (
                responsePieza.tablero !== null &&
                selectedDifficulty === "Intermedio"
              ) {
                for (let i = 0; i < numCuadros; i++) {
                  for (let j = 0; j < numCuadros; j++) {
                    if (
                      responsePieza.tablero[i][j] === 1 &&
                      tableroClicked.current[i][j] === ""
                    ) {
                      tableroClicked.current[i][j] =
                        Fichas[
                          responsePieza
                            .mejor_movimiento[0] as keyof typeof Fichas
                        ].color;
                    }
                  }
                }
              }
            } catch (e) {
              console.log(e);
            }
            break;
          case "Difícil":
            try {
              const responsePieza = await postGenerarJugadaMinMax({
                T: convertToBinary(tableroClicked.current),
                piezas_disponibles: fichasDisponibles,
              });
              console.log(responsePieza);
              fichasDisponibles = fichasDisponibles.filter(
                (ficha) => ficha !== responsePieza.mejor_movimiento[0]
              );
              console.log("fichas disponibles MAQUINA", fichasDisponibles);
              setFichasSelected(fichasDisponibles);
              if (
                responsePieza.tablero !== null &&
                selectedDifficulty === "Difícil"
              ) {
                for (let i = 0; i < numCuadros; i++) {
                  for (let j = 0; j < numCuadros; j++) {
                    if (
                      responsePieza.tablero[i][j] === 1 &&
                      tableroClicked.current[i][j] === ""
                    ) {
                      tableroClicked.current[i][j] =
                        Fichas[
                          responsePieza
                            .mejor_movimiento[0] as keyof typeof Fichas
                        ].color;
                    }
                  }
                }
              }
            } catch (e) {
              console.log(e);
            }
            break;
        }
        setTurno("JUGADOR");
        newTablero = convertToBinary(tableroClicked.current);
        completedRows = getCompletedRows(oldTablero, newTablero);
        addPuntaje(completedRows, "MÁQUINA");
      } else {
        alert("Movimiento inválido");
      }
      Fichas[fichaSelected].coords = originalCoords.current;
      rotationStatus.current = 0;
      setRotationNumber(0);
    }
    console.log(isClickeable);
    setTablero(convertToBinary(tableroClicked.current));
    setFichaPadre(fichaSelected);
  };

  function getCompletedRows(
    oldTablero: Array<Array<number>>,
    newTablero: Array<Array<number>>
  ): number {
    let completedRows = 0;

    // Helper function to check if a row is complete
    const isRowComplete = (row: Array<number>): boolean => {
      return row.every((cell) => cell !== 0);
    };

    for (let i = 0; i < oldTablero.length; i++) {
      if (!isRowComplete(oldTablero[i]) && isRowComplete(newTablero[i])) {
        completedRows++;
      }
    }

    return completedRows;
  }

  function convertToBinary(
    tablero: Array<Array<string>>
  ): Array<Array<number>> {
    return tablero.map((row) => row.map((cell) => (cell === "" ? 0 : 1)));
  }

  function rotateCoordinates(coords: number[][], angle: number) {
    const rotations = (angle / 90) % 4;

    for (let i = 0; i < rotations; i++) {
      coords = coords.map(([x, y]) => [-y, x]);
    }
    return coords;
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="bg-black border border-gris"
        onMouseMove={handleMouseMove}
        onClick={() => {
          handleSquareClick();
        }}
      ></canvas>
    </div>
  );
}
