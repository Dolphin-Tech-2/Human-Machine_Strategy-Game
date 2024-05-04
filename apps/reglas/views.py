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

    colocado = GameClass.colocar_pieza_A(T, i, j, modo)

    return Response(data= {'data': data, 'colocado': colocado}, status= status.HTTP_200_OK)
    
@api_view(['POST']) 
def colocar_pieza_B(request):
    data = request.data
    
    modo = data['modo']
    i = data['i']
    j = data['j']
    T = data['T']

    colocado = GameClass.colocar_pieza_B(T, i, j, modo)

    return Response(data= {'data': data, 'colocado': colocado}, status= status.HTTP_200_OK)
    
@api_view(['POST']) 
def colocar_pieza_C(request):
    data = request.data
    
    modo = data['modo']
    i = data['i']
    j = data['j']
    T = data['T']

    colocado = GameClass.colocar_pieza_C(T, i, j, modo)
    
    return Response(data= {'data': data, 'colocado': colocado}, status= status.HTTP_200_OK)
    
@api_view(['POST']) 
def colocar_pieza_D(request):
    data = request.data
    
    i = data['i']
    j = data['j']
    T = data['T']

    colocado = GameClass.colocar_pieza_D(T, i, j)
    
    return Response(data= {'data': data, 'colocado': colocado}, status= status.HTTP_200_OK)
    
@api_view(['POST']) 
def colocar_pieza_E(request):
    data = request.data
    
    modo = data['modo']
    i = data['i']
    j = data['j']
    T = data['T']

    colocado = GameClass.colocar_pieza_E(T, i, j, modo)

    return Response(data= {'data': data, 'colocado': colocado}, status= status.HTTP_200_OK)
    
@api_view(['POST'])
def victoria(request):
    data = request.data

    T = data['T']
    pieza = data['pieza']

    victoria = GameClass.verificar_victoria(T, pieza)
    
    return Response(data= {'victoria': victoria}, status= status.HTTP_200_OK)