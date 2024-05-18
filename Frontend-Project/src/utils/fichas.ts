interface Ficha {
  A: {
    coords: number[][];
    color: string;
    rotaciones: number;
  };
  B: {
    coords: number[][];
    color: string;
    rotaciones: number;
  };
  C: {
    coords: number[][];
    color: string;
    rotaciones: number;
  };
  D: {
    coords: number[][];
    color: string;
    rotaciones: number;
  };
  E: {
    coords: number[][];
    color: string;
    rotaciones: number;
  };
}

const fichaA = {
  coords: [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, 0],
  ],
  color: "#e4908c",
  rotaciones: 4,
};

const fichaB = {
  coords: [
    [-1, 0],
    [-2, 0],
    [0, 1],
    [0, 0],
  ],
  color: "#325f4d",
  rotaciones: 4,
};

const fichaC = {
  coords: [
    [0, 0],
    [-1, 0],
    [-2, 0],
    [-3, 0],
  ],
  color: "#346ea1",
  rotaciones: 2,
};

const fichaD = {
  coords: [
    [0, 0],
    [-1, 0],
    [0, 1],
    [-1, 1],
  ],
  color: "#5d4219",
  rotaciones: 1,
};

const fichaE = {
  coords: [
    [0, 0],
    [1, 0],
    [0, 1],
    [-1, 1],
  ],
  color: "#bdc4ca",
  rotaciones: 2,
};

const Ficha: Ficha = {
  A: fichaA,
  B: fichaB,
  C: fichaC,
  D: fichaD,
  E: fichaE,
};

export default Ficha;
