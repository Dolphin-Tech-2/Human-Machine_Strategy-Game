from .coords import Ficha_dict
import random

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
    def verificar_victoria(T, pieza):
        PIEZA_TO_METHOD = ['A', 'B', 'C', 'D', 'E']
        if pieza in PIEZA_TO_METHOD:
            for i in range(len(T)):
                for j in range(len(T[i])):
                    for modo in range(Ficha_dict[pieza].rotaciones):
                        if GameClass.probar_pieza(pieza=pieza, T=T, i=i, j=j, modo=modo)[0]:
                            return False
        return True


    @staticmethod
    def evaluar_tablero(T):
        puntuacion = 0
        altura_total = sum(sum(1 for cell in row if cell != 0) for row in T)
        lineas_completas = sum(1 for row in T if all(cell != 0 for cell in row))
        huecos = sum(sum(1 for cell in row if cell == 0) for row in T if any(cell != 0 for cell in row))
        
        puntuacion -= altura_total
        puntuacion += lineas_completas * 10
        puntuacion -= huecos * 5
        
        return puntuacion

    @staticmethod
    def generar_movimientos_posibles(T, pieza):
        movimientos = []
        for modo in range(Ficha_dict[pieza].rotaciones):
            for i in range(len(T)):
                for j in range(len(T[0])):
                    if GameClass.probar_pieza(pieza, T, i, j, modo)[0]:
                        movimientos.append((pieza, i, j, modo))
        return movimientos

    @staticmethod
    def minmax(T, profundidad, maximizando, piezas_disponibles, alpha=float('-inf'), beta=float('inf')):
        if profundidad == 0 or all(GameClass.verificar_victoria(T, pieza) for pieza in piezas_disponibles):
            return GameClass.evaluar_tablero(T), None

        mejor_movimiento = None

        if maximizando:
            max_eval = float('-inf')
            for pieza_actual in piezas_disponibles:
                movimientos_posibles = GameClass.generar_movimientos_posibles(T, pieza_actual)
                for movimiento in movimientos_posibles:
                    tablero_copia = [fila[:] for fila in T]
                    pieza, i, j, modo = movimiento
                    GameClass.colocar_pieza(pieza, tablero_copia, i, j, modo)
                    eval, _ = GameClass.minmax(tablero_copia, profundidad - 1, False, piezas_disponibles, alpha, beta)
                    if eval > max_eval:
                        max_eval = eval
                        mejor_movimiento = (pieza, i, j, modo)
                    alpha = max(alpha, eval)
                    if beta <= alpha:
                        break
            return max_eval, mejor_movimiento
        else:
            min_eval = float('inf')
            for pieza_actual in piezas_disponibles:
                movimientos_posibles = GameClass.generar_movimientos_posibles(T, pieza_actual)
                for movimiento in movimientos_posibles:
                    tablero_copia = [fila[:] for fila in T]
                    pieza, i, j, modo = movimiento
                    GameClass.colocar_pieza(pieza, tablero_copia, i, j, modo)
                    eval, _ = GameClass.minmax(tablero_copia, profundidad - 1, True, piezas_disponibles, alpha, beta)
                    if eval < min_eval:
                        min_eval = eval
                        mejor_movimiento = (pieza, i, j, modo)
                    beta = min(beta, eval)
                    if beta <= alpha:
                        break
            return min_eval, mejor_movimiento

    @staticmethod
    def aleatorio(T, piezas_disponibles):
        movimientos_posibles = []
        for pieza in piezas_disponibles:
            movimientos_posibles += GameClass.generar_movimientos_posibles(T, pieza)
        
        if not movimientos_posibles:
            return None
        else:
            movimiento = random.choice(movimientos_posibles)
            pieza, i, j, modo = movimiento
            GameClass.colocar_pieza(pieza, T, i, j, modo)
        return movimiento

    @staticmethod
    def greedy_best_first(T, piezas_disponibles):
        mejor_movimiento = None
        mejor_puntuacion = float('-inf')

        for pieza_actual in piezas_disponibles:
            movimientos_posibles = GameClass.generar_movimientos_posibles(T, pieza_actual)
            for movimiento in movimientos_posibles:
                tablero_copia = [fila[:] for fila in T]
                pieza, i, j, modo = movimiento
                GameClass.colocar_pieza(pieza, tablero_copia, i, j, modo)
                puntuacion = GameClass.evaluar_tablero(tablero_copia)
                if puntuacion > mejor_puntuacion:
                    mejor_puntuacion = puntuacion
                    mejor_movimiento = (pieza, i, j, modo)
        
        return mejor_puntuacion, mejor_movimiento

