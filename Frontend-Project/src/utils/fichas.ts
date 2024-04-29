interface Ficha {
  A: {
    coords: number[][];
    color: string;
  };
  B: {
    coords: number[][];
    color: string;
  };
  C: {
    coords: number[][];
    color: string;
  };
  D: {
    coords: number[][];
    color: string;
  };
  E: {
    coords: number[][];
    color: string;
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
};

const fichaB = {
  coords: [
    [-1, 0],
    [-2, 0],
    [0, 1],
    [0, 0],
  ],
  color: "violet",
};

const fichaC = {
  coords: [
    [0, 0],
    [-1, 0],
    [-2, 0],
    [-3, 0],
  ],
  color: "green",
};

const fichaD = {
  coords: [
    [0, 0],
    [-1, 0],
    [0, 1],
    [-1, 1],
  ],
  color: "yellow",
};

const fichaE = {
  coords: [
    [0, 0],
    [1, 0],
    [0, 1],
    [-1, 1],
  ],
  color: "orange",
};

const Ficha: Ficha = {
  A: fichaA,
  B: fichaB,
  C: fichaC,
  D: fichaD,
  E: fichaE,
};

export default Ficha;
