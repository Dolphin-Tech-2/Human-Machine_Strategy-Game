class GameClass:

    @staticmethod
    def colocar_pieza_A(T, i, j, modo):
        if GameClass.probar_pieza_A(T, i, j, modo):
            if modo in [0, 2]:
                k = 1
                l = 0
            else:
                k = 0
                l = 1

            if modo in [0, 1]: 
                m = 1
            else: 
                m = -1

            T[i][j] = 1
            T[i+k][j+l] = 1
            T[i-k][j-l] = 1
            T[i + m*l][j + m*k] = 1
            return True
        else:
            return False
        
    @staticmethod
    def colocar_pieza_B(T, i, j, modo):
        if GameClass.probar_pieza_B(T, i, j, modo):
            if modo in [0, 2, 4, 6, 8]:
                k = 1
                l = 0
            else:
                k = 0
                l = 1

            if modo in [0, 1, 4, 5]: 
                m = 1
            else: 
                m = -1

            if modo in [0, 1, 2, 3]: 
                n = 1
            else: 
                n = -1

            T[i][j] = 1
            T[i - k*m][j - l*m] = 1
            T[i - 2*k*m][j - 2*l*m] = 1
            T[i + m*l*n][j + m*k*n] = 1
            return True
        else:
            return False

    @staticmethod
    def colocar_pieza_C(T, i, j, modo):
        if modo == 0: 
            k = 1
            l = 0
        else:
            k = 0
            l = 1

        if GameClass.probar_pieza_C(T, i, j, modo):
            T[i][j] = 1
            T[i-k][j-l] = 1
            T[i - 2*k][j - 2*l] = 1
            T[i - 3*k][j - 3*l] = 1
            return True
        else:
            return False
        
    @staticmethod
    def colocar_pieza_D(T, i, j):
        if GameClass.probar_pieza_D(T, i, j):
            T[i][j] = 1
            T[i-1][j] = 1
            T[i][j+1] = 1
            T[i-1][j+1] = 1
            return True
        else:
            return False
    
    @staticmethod
    def colocar_pieza_E(T, i, j, modo):
        if GameClass.probar_pieza_E(T, i, j, modo):
            if modo in [0, 2]:
                k = 1
                l = 0
            else:
                k = 0
                l = 1

            if modo in [0, 1]:
                m = 1
            else: 
                m = -1

            T[i][j] = 1
            T[i+k][j+l] = 1
            T[i - l*m][j + m*k] = 1
            T[i-k - l*m][j+k * m-l] = 1
            return True
        else:
            return False

    @staticmethod
    def probar_pieza_A(T, i, j, modo):
        if modo in [0, 2]:
            k = 1
            l = 0
        else:
            k = 0
            l = 1
        try:
            if modo in [0, 1]: 
                m = 1
            else: 
                m = -1

            if i-k >= 0 and T[i][j] == 0 and T[i+k][j+l] == 0 and T[i-k][j-l] == 0 and T[i + m*l][j + m*k] == 0: 
                return True
            else: 
                return False
        except IndexError:
            return False   

    @staticmethod
    def probar_pieza_B(T, i, j, modo):
        if modo in [0, 2, 4, 6, 8]:
            k = 1
            l = 0
        else:
            k = 0
            l = 1

        if modo in [0, 1, 4, 5]: 
            m = 1
        else: 
            m = -1

        if modo in [0, 1, 2, 3]: 
            n = 1
        else: 
            n = -1
        try:
            if i - k*m >= 0 and i - 2*k*m >= 0 and T[i][j] == 0 and T[i - k*m][j - l*m] == 0 and T[i - 2*k*m][j - 2*l*m] == 0 and T[i + m*l*n][j + m*k*n] == 0: 
                return True
            else: 
                return False
        except IndexError:
            return False

    @staticmethod
    def probar_pieza_C(T, i, j, modo):
        if modo == 0: 
            k = 1
            l = 0
        else:
            k = 0
            l = 1
        try:
            if i-k >= 0 and i-2*k >= 0 and i-3*k >= 0 and T[i][j] == 0 and T[i-k][j-l] == 0 and T[i - 2*k][j - 2*l] == 0 and T[i - 3*k][j - 3*l] == 0:
                return True
            else: 
                return False
        except IndexError:
            return False

    @staticmethod
    def probar_pieza_D(T, i, j, modo):
        try:
            if i-1 >= 0 and T[i][j] == 0 and T[i][j+1] == 0 and T[i-1][j] == 0 and T[i-1][j+1] == 0: 
                return True
            else: 
                return False
        except IndexError:
            return False

    @staticmethod
    def probar_pieza_E(T, i, j, modo):
        if modo in [0, 2]:
            k = 1
            l = 0
        else:
            k = 0
            l = 1
        
        if modo in [0, 1]:
            m = 1
        else: 
            m = -1
        try:
            if i-k >= 0 and T[i][j] == 0 and T[i+k][j+l] == 0 and T[i - l*m][j + m*k] == 0 and T[i-k - l*m][j+k * m-l] == 0: 
                return True
            return False
        except IndexError:
            return False
    
    

    @staticmethod
    def verificar_victoria(T, pieza):
        PIEZA_TO_METHOD = {
            'A': GameClass.probar_pieza_A,
            'B': GameClass.probar_pieza_B,
            'C': GameClass.probar_pieza_C,
            'D': GameClass.probar_pieza_D,
            'E': GameClass.probar_pieza_E,
        }
        if pieza in PIEZA_TO_METHOD:
            for i in range(len(T)):
                for j in range(len(T[i])):
                    if PIEZA_TO_METHOD[pieza](T, i, j, 0):
                        return False
        return True