import os
tablero = [[0 for _ in range(16)] for _ in range(16)]
piezas = {'A': [0, 3, 2, 1],
'B': [0, 5, 2, 7, 4, 1, 6, 3],
'C': [0, 1],
'D': [0],
'E': [0, 1, 2, 3]}


def printMatrix(arreglo):
    for fila in arreglo:
        for elemento in fila:
            print(elemento, end=" ")
        print()
        
        

def pruebaEspacios(arreglo):
    cantidad = 0
    for fila in arreglo:
        for elemento in fila:
            if elemento == 0: cantidad+=1
    if cantidad >= 4: return True
    else: return False
    
class Pieza:
    def probarPiezaA(T, i, j, modo):
        if modo in [0, 2]:
            k = 1
            l = 0
        else:
            k = 0
            l = 1
        try:
            if modo in [0, 1]: m = 1
            else: m = -1
            if (T[i][j] == 0 and T[i+k][j+l] == 0 and T[i-k][j-l] == 0 and T[i+m*l][ j+ m * k] == 0): return True
            else: return False
        except IndexError:
            return False 
             
    def probarPiezaB(T, i, j, modo):
        if modo in [0, 2, 4, 6, 8]:
            k = 1
            l = 0
        else:
            k = 0
            l = 1
        if modo in [0, 1, 4, 5]: m = 1
        else: m = -1
        if modo in [0, 1, 2, 3]: n = 1
        else: n = -1
        try:
            if (T[i][j] == 0 and T[i-k*m][j-l*m] == 0 and T[i-2*k*m][j-2*l*m] == 0 and T[i+m*l*n][j+m*k*n] == 0): return True
            else: return False
        except IndexError:
            return False
        
    def probarPiezaC(T, i, j, modo):
        if modo == 0: 
            k = 1
            l = 0
        else:
            k = 0
            l = 1
        try:
            if (T[i][j] == 0 and T[i-k][j-l] == 0 and T[i-2*k][j-2*l] == 0 and T[i-3*k][j-3*l] == 0): return True
            else: return False
        except IndexError:
            return False

    def probarPiezaD(T, i, j, modo):
        try:
            if (T[i][j] == 0 and T[i-1][j] == 0 and T[i][j-1] == 0 and T[i-1][j+1] == 0): return True
            else: return False
        except IndexError:
            return False
        
    def probarPiezaE(T, i, j, modo):
        if modo in [0,2]:
            k = 1
            l = 0
        else:
            k = 0
            l = 1
        if modo in [0, 1]: m = 1
        else: m = -1
        try:
            if(T[i][j] == 0 and T[i+k][j+l] == 0 and T[i-l*m][j+m*k] == 0 and T[i-k-l*m][j+k*m-l] == 0): return True
            return False
        except IndexError:
            return False
    
    def probarPiezas(pieza, T, i, j, modo):
        if pieza == 'A': return Pieza.probarPiezaA(T, i, j, modo)
        if pieza == 'B': return Pieza.probarPiezaB(T, i, j, modo)
        if pieza == 'C': return Pieza.probarPiezaC(T, i, j, modo)
        if pieza == 'D': return Pieza.probarPiezaD(T, i, j, modo)
        if pieza == 'E': return Pieza.probarPiezaE(T, i, j, modo)

    def colocarPiezaA(T, i, j, modo):
        if modo in [0, 2]:
            k = 1
            l = 0
        else:
            k = 0
            l = 1
        if modo in [0, 1]: m = 1
        else: m = -1
        
        if Pieza.probarPiezaA(T, i, j, modo):
            T[i][j] = 1
            T[i+k][j+l] = 1
            T[i-k][j-l] = 1
            T[i+m*l][j+m*k] = 1
            return True
        else: return False

    def colocarPiezaB(T, i, j, modo):
        if modo in [0, 2, 4, 6, 8]:
            k = 1
            l = 0
        else:
            k = 0
            l = 1
        if modo in [0, 1, 4, 5]: m = 1
        else: m = -1
        if modo in [0, 1, 2, 3]: n = 1
        else: n = -1
        if Pieza.probarPiezaB(T, i, j, modo):
            T[i][j] = 1
            T[i-k*m][j-l*m] = 1
            T[i-2*k*m][j-2*l*m] = 1
            T[i+m*l*n][j+m*k*n] = 1
            return True
        else: return False

    def colocarPiezaC(T, i, j, modo):
        if modo == 0: 
            k=1
            l=0
        else:
            k=0
            l=1
        if Pieza.probarPiezaC(T, i, j, modo):
            T[i][j] = 1
            T[i-k][j-l] = 1
            T[i-2*k][j-2*l] = 1
            T[i-3*k][j-3*l] = 1
            return True
        else: return False

    def colocarPiezaD(T, i, j, modo):
        if Pieza.probarPiezaD(T, i, j, modo):
            T[i][j] = 1
            T[i-1][j] = 1
            T[i][j+1] = 1
            T[i-1][j+1] = 1
            return True
        else: return False

    def colocarPiezaE(T, i, j, modo):
        if modo in [0, 2]:
            k = 1
            l = 0
        else:
            k = 0
            l = 1
        if modo in [0, 1]: m = 1
        else: m = -1
        if Pieza.probarPiezaE(T, i, j, modo):
            T[i][j] = 1
            T[i+k][j+l] = 1
            T[i-l*m][j+m*k] = 1
            T[i-k-l*m][j+k*m-l] = 1 

# Frontend
def elegirPieza (pieza, T, turno, inf, sup):
    if pieza == 'A': lim= max(piezas['A'])
    if pieza == 'B': lim= max(piezas['B'])
    if pieza == 'C': lim= max(piezas['C'])
    if pieza == 'D': lim= max(piezas['D'])
    if pieza == 'E': lim= max(piezas['E'])
    print(lim)
    print(inf)
    print(sup)
    modo = int(input("Ingrese la rotacion de la ficha [0-]: "))
    while modo not in range(lim+1):
        modo = int(input("Ingrese una rotacion correctaa [0-]: "))
    i = int(input("Ingrese la coordenada i de la ficha: "))
    print(i)
    while i<= inf and i>= sup:
        i = int(input("Ingrese una coordenada i correcta: "))
        print(i)
    j = int(input("Ingrese la coordenada j de la ficha: "))
    if pieza == 'A': Pieza.colocarPiezaA(T, i, j, 0)
    if pieza == 'B': Pieza.colocarPiezaB(T, i, j, 0)
    if pieza == 'C': Pieza.colocarPiezaC(T, i, j, 0)
    if pieza == 'D': Pieza.colocarPiezaD(T, i, j, 0)
    if pieza == 'E': Pieza.colocarPiezaE(T, i, j, 0)



def comprobarPerdedor(inf, sup, T):
    if not pruebaEspacios(T):
        return True
    for i in range(inf, sup):
        for j in range(inf, sup):
            if T[i][j] == 0:
                if Pieza.probarPiezaA(T, i, j, 0): return False
                if Pieza.probarPiezaB(T, i, j, 0): return False
                if Pieza.probarPiezaC(T, i, j, 0): return False
                if Pieza.probarPiezaD(T, i, j, 0): return False
                if Pieza.probarPiezaE(T, i, j, 0): return False
    return True


turnoAnterior = False
ganador = False
turno = 0
while ganador == False:
    os.system('cls')
    if turno%2== 0: 
        print("Turno del jugador 1")
        inf = 0
        sup = int(len(tablero)/2 - 1)
    else:
        print("Turno del jugador 2")
        inf = int(len(tablero)/2)
        sup = int(len(tablero) - 1)
    printMatrix(tablero)

    pieza = input("ingrese la pieza a colocar (A,B,C,D,E): ")
    while pieza not in piezas:
        pieza = input("ingrese una pieza correcta (A,B,C,D,E): ")
    elegirPieza(pieza, tablero, turno, inf, sup)
    if turno%2!=0:
        if turnoAnterior and not comprobarPerdedor(inf, sup, tablero):
            print("Empate")
            ganador = True
        if not turnoAnterior and  comprobarPerdedor(inf, sup, tablero):
            print("Jugador 2 gana")
            ganador = True
        if turnoAnterior and not comprobarPerdedor(inf, sup, tablero):
            print("Jugador 1 gana")
            ganador = True
    turnoAnterior= not comprobarPerdedor(inf, sup, tablero)
    turno +=1
