from .coords import Ficha_dict

class GameClass:

    @staticmethod
    def _rotate_90(coords):
        return [[-y, x] for x, y in coords]
    
    @staticmethod
    def colocar_pieza(pieza, T, i, j, modo):
        temp = GameClass.probar_pieza(pieza, T, i, j, modo)
        if temp[0]:
            for [a,b] in temp[1]:
                T[i+a][j+b] = 1
            return True
        else:
            return False
            

    @staticmethod
    def probar_pieza(pieza, T, i, j, modo):
        newCoords = Ficha_dict[pieza].coords
        if modo >= Ficha_dict[pieza].rotaciones:
            return False
        for _ in range(modo):
            newCoords = GameClass._rotate_90(newCoords)
        min_col = j+min(coord[1] for coord in newCoords)
        min_row = i+min(coord[0] for coord in newCoords)
        max_col = j+max(coord[1] for coord in newCoords)
        max_row = i+max(coord[0] for coord in newCoords)

        if min_col < 0 or min_row < 0 or max_col >= len(T[0]) or max_row >= len(T):
            return [False, newCoords]
        else:
            try:
                for a,b in newCoords:
                    if T[i+a][j+b] != 0:
                        return [False, newCoords]
                return [True, newCoords]
            except IndexError:
                return [False, newCoords]

    @staticmethod
    def verificar_victoria(T, pieza, modo=0):
        PIEZA_TO_METHOD = ['A', 'B', 'C', 'D', 'E']
        if pieza in PIEZA_TO_METHOD:
            for i in range(len(T)):
                for j in range(len(T[i])):
                    if GameClass.probar_pieza(pieza=pieza, T=T, i=i, j=j, modo=modo)[0]:
                        return False
        return True