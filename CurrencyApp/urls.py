from django.contrib import admin
from django.urls import path, include

from . import views

urlpatterns = [

    path('', views.currency_page, name='currency_page'),
    path('currency_converter_api', views.currency_converter, name='currency_converter'),
    path('test_api', views.test_api, name='test_api'),

]