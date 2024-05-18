from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .GameClass import GameClass

# Create your views here.
@api_view(['POST'])
def colocar_pieza_A(request):    
    data = request.data
    
    modo = data['modo']
    i = data['i']
    j = data['j']
    T = data['T']

    colocado = GameClass.colocar_pieza("A", T, i, j, modo)

    return Response(data= {'data': data, 'colocado': colocado}, status= status.HTTP_200_OK)
    
@api_view(['POST']) 
def colocar_pieza_B(request):
    data = request.data
    
    modo = data['modo']
    i = data['i']
    j = data['j']
    T = data['T']

    colocado = GameClass.colocar_pieza("B", T, i, j, modo)

    return Response(data= {'data': data, 'colocado': colocado}, status= status.HTTP_200_OK)
    
@api_view(['POST']) 
def colocar_pieza_C(request):
    data = request.data
    
    modo = data['modo']
    i = data['i']
    j = data['j']
    T = data['T']

    colocado = GameClass.colocar_pieza("C", T, i, j, modo)
    
    return Response(data= {'data': data, 'colocado': colocado}, status= status.HTTP_200_OK)
    
@api_view(['POST']) 
def colocar_pieza_D(request):
    data = request.data
    
    i = data['i']
    j = data['j']
    T = data['T']

    colocado = GameClass.colocar_pieza("D", T, i, j, 0)
    
    return Response(data= {'data': data, 'colocado': colocado}, status= status.HTTP_200_OK)
    
@api_view(['POST']) 
def colocar_pieza_E(request):
    data = request.data
    
    modo = data['modo']
    i = data['i']
    j = data['j']
    T = data['T']

    colocado = GameClass.colocar_pieza("E", T, i, j, modo)

    return Response(data= {'data': data, 'colocado': colocado}, status= status.HTTP_200_OK)
    
@api_view(['POST'])
def victoria(request):
    data = request.data

    T = data['T']
    pieza = data['pieza']

    victoria = GameClass.verificar_victoria(T, pieza)
    
    return Response(data= {'victoria': victoria}, status= status.HTTP_200_OK)

@api_view(['POST'])
def jugar_turno(request):
    data = request.data
    print(f"Datos recibidos: {data}")  # Registro de datos

    try:
        T = data['T']
        piezas_disponibles = data['piezas_disponibles']
        profundidad = data.get('profundidad', 3)  # Default depth is 3

        _, mejor_movimiento = GameClass.minmax(T, profundidad, True, piezas_disponibles)
        
        if mejor_movimiento:
            pieza, i, j, modo = mejor_movimiento
            GameClass.colocar_pieza(pieza, T, i, j, modo)
            return Response(data={'mejor_movimiento': mejor_movimiento, 'tablero': T}, status=status.HTTP_200_OK)
        else:
            return Response(data={'mensaje': 'No se encontró un movimiento válido'}, status=status.HTTP_400_BAD_REQUEST)
    except KeyError as e:
        return Response(data={'error': f'Falta el campo {str(e)} en la petición'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def jugar_aleatorio(request):
    data = request.data
    print(f"Datos recibidos: {data}")
    try:
        T = data['T']
        piezas_disponibles = data['piezas_disponibles']

        mejor_movimiento = GameClass.aleatorio(T, piezas_disponibles)
        
        if mejor_movimiento:
            pieza, i, j, modo = mejor_movimiento
            GameClass.colocar_pieza(pieza, T, i, j, modo)
            return Response(data={'mejor_movimiento': mejor_movimiento, 'tablero': T}, status=status.HTTP_200_OK)
        else:
            return Response(data={'mensaje': 'No se encontró un movimiento válido'}, status=status.HTTP_400_BAD_REQUEST)
    except KeyError as e:
        return Response(data={'error': f'Falta el campo {str(e)} en la petición'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)