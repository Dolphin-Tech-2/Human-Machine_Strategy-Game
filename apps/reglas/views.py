from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.
@api_view(['POST'])
def colocar_pieza_A(request):    
    data = request.data
    
    modo = data['modo']
    i = data['i']
    j = data['j']
    T = data['T']

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
    
    if probar_pieza_A(T, i, j, modo):
        T[i][j] = 1
        T[i+k][j+l] = 1
        T[i-k][j-l] = 1
        T[i + m*l][j + m*k] = 1
        return Response(data= {'data': data, 'logico': True}, status= status.HTTP_200_OK)        
    else: 
        return Response(data= {'data': data, 'logico': False}, status= status.HTTP_200_OK)
    
@api_view(['POST']) 
def colocar_pieza_B(request):
    data = request.data
    
    modo = data['modo']
    i = data['i']
    j = data['j']
    T = data['T']

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

    if probar_pieza_B(T, i, j, modo):
        T[i][j] = 1
        T[i - k * m][j - l*m] = 1
        T[i - 2 * k*m][j - 2*l*m] = 1
        T[i + m*l*n][j + m*k*n] = 1
        return Response(data= {'data': data, 'logico': True}, status= status.HTTP_200_OK)        
    else: 
        return Response(data= {'data': data, 'logico': False}, status= status.HTTP_200_OK)
    
@api_view(['POST']) 
def colocar_pieza_C(request):
    data = request.data
    
    modo = data['modo']
    i = data['i']
    j = data['j']
    T = data['T']

    if modo == 0: 
        k = 1
        l = 0
    else:
        k = 0
        l = 1
    if probar_pieza_C(T, i, j, modo):
        T[i][j] = 1
        T[i-k][j-l] = 1
        T[i - 2*k][j - 2*l] = 1
        T[i - 3*k][j - 3*l] = 1
        return Response(data= {'data': data, 'logico': True}, status= status.HTTP_200_OK)        
    else: 
        return Response(data= {'data': data, 'logico': False}, status= status.HTTP_200_OK)
    
@api_view(['POST']) 
def colocar_pieza_D(request):
    data = request.data
    
    modo = data['modo']
    i = data['i']
    j = data['j']
    T = data['T']

    if probar_pieza_D(T, i, j, modo):
        T[i][j] = 1
        T[i-1][j] = 1
        T[i][j+1] = 1
        T[i-1][j+1] = 1
        return Response(data= {'data': data, 'logico': True}, status= status.HTTP_200_OK)        
    else: 
        return Response(data= {'data': data, 'logico': False}, status= status.HTTP_200_OK)
    
@api_view(['POST']) 
def colocar_pieza_E(request):
    data = request.data
    
    modo = data['modo']
    i = data['i']
    j = data['j']
    T = data['T']

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

    if probar_pieza_E(T, i, j, modo):
        T[i][j] = 1
        T[i+k][j+l] = 1
        T[i - l*m][j + m*k] = 1
        T[i-k - l*m][j+k * m-l] = 1 
        return Response(data= {'data': data, 'logico': True}, status= status.HTTP_200_OK)
    else:
        return Response(data= {'data': data, 'logico': False}, status= status.HTTP_200_OK)
    
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

        if T[i][j] == 0 and T[i+k][j+l] == 0 and T[i-k][j-l] == 0 and T[i+m*l][j + m*k] == 0: 
            return True
        else: 
            return False
    except IndexError:
        return False   
       
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
        if T[i][j] == 0 and T[i - k*m][j - l*m] == 0 and T[i - 2*k*m][j - 2*l*m] == 0 and T[i + m*l*n][j + m*k*n] == 0: 
            return True
        else: 
            return False
    except IndexError:
        return False

def probar_pieza_C(T, i, j, modo):
    if modo == 0: 
        k = 1
        l = 0
    else:
        k = 0
        l = 1
    try:
        if T[i][j] == 0 and T[i-k][j-l] == 0 and T[i - 2*k][j - 2*l] == 0 and T[i - 3*k][j - 3*l] == 0:
            return True
        else: 
            return False
    except IndexError:
        return False

def probar_pieza_D(T, i, j, modo):
    try:
        if T[i][j] == 0 and T[i-1][j] == 0 and T[i][j-1] == 0 and T[i-1][j+1] == 0: 
            return True
        else: 
            return False
    except IndexError:
        return False
    
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
        if T[i][j] == 0 and T[i+k][j+l] == 0 and T[i - l*m][j + m*k] == 0 and T[i-k - l*m][j+k * m-l] == 0: 
            return True
        return False
    except IndexError:
        return False