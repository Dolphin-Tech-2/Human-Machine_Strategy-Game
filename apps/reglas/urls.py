from django.urls import path
from . import views

urlpatterns = [
    path('colocar_pieza_a/', views.colocar_pieza_A, name= 'colocar_pieza_A'),
    path('colocar_pieza_b/', views.colocar_pieza_B, name= 'colocar_pieza_B'),
    path('colocar_pieza_c/', views.colocar_pieza_C, name= 'colocar_pieza_C'),
    path('colocar_pieza_d/', views.colocar_pieza_D, name= 'colocar_pieza_D'),
    path('colocar_pieza_e/', views.colocar_pieza_E, name= 'colocar_pieza_E'),
    path('estado_meta/', views.victoria, name= 'victoria'),
    path('jugar_turno/', views.jugar_turno, name='jugar_turno'),
]