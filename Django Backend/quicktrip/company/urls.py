from django.contrib import admin
from django.urls import path
from company import views
from .views import *
urlpatterns = [
    path('',  views.loginPage,name='login'),
    path('City/',views.getCity),    
    path('Package/', views.getCompanydata),
    path('Places/', views.getPlaces),
    path('Tours/', views.getTours),
    path('register/',views.register),
    path('login/', views.loginPage,name='login'),
    path('logout/', views.logoutPage,name='logout'),
    path('api/login', LoginAPI.as_view(), name='LoginAPI'),
     path('api/register', RegisterAPI.as_view(), name='RegisterAPI'),
    # path('api/employee/<int:id>', EmployeeAPI.as_view(), name='EmployeeAPI'),
]
