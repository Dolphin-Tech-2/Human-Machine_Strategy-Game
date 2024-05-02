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
  color: "aquamarine",
  rotaciones: 4,
};

const fichaB = {
  coords: [
    [-1, 0],
    [-2, 0],
    [0, 1],
    [0, 0],
  ],
  color: "violet",
  rotaciones: 4,
};

const fichaC = {
  coords: [
    [0, 0],
    [-1, 0],
    [-2, 0],
    [-3, 0],
  ],
  color: "green",
  rotaciones: 2,
};

const fichaD = {
  coords: [
    [0, 0],
    [-1, 0],
    [0, 1],
    [-1, 1],
  ],
  color: "yellow",
  rotaciones: 1,
};

const fichaE = {
  coords: [
    [0, 0],
    [1, 0],
    [0, 1],
    [-1, 1],
  ],
  color: "orange",
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
