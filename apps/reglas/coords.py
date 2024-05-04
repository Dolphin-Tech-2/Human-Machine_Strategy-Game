class Ficha:
    def __init__(self, coords, rotaciones):
        self.coords = coords
        self.rotaciones = rotaciones

fichaA = Ficha(
    coords=[[-1, 0], [0, 1], [1, 0], [0, 0]],
    rotaciones=4
)

fichaB = Ficha(
    coords=[[-1, 0], [-2, 0], [0, 1], [0, 0]],
    rotaciones=4
)

fichaC = Ficha(
    coords=[[0, 0], [-1, 0], [-2, 0], [-3, 0]],
    rotaciones=2
)

fichaD = Ficha(
    coords=[[0, 0], [-1, 0], [0, 1], [-1, 1]],
    rotaciones=1
)

fichaE = Ficha(
    coords=[[0, 0], [1, 0], [0, 1], [-1, 1]],
    rotaciones=2
)

Ficha_dict = {
    'A': fichaA,
    'B': fichaB,
    'C': fichaC,
    'D': fichaD,
    'E': fichaE,
}