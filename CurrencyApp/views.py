from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import requests
from . models import *





@csrf_exempt
def currency_page(request):
    return render(request, 'Currency_Page.html')



@csrf_exempt
def test_api(request):
    x = request.data['firstName']
    print(x)
    reaponse_data = {'test': 'test for api'}
    return Response(reaponse_data, status=status.HTTP_200_OK)

@csrf_exempt
@api_view(['POST'])
def currency_converter(request):
    EnterCurrency = request.data['enter_currency']
    SelectFromCurrency = request.data['selectFromCurrency']
    SelectToCurrency = request.data['selectToCurrency']
    data = apiData()
    Currency_code = data['rates']
    Convert_currency = (Currency_code[SelectToCurrency]/Currency_code[SelectFromCurrency] * float(EnterCurrency))
    print(Convert_currency)

    reaponse_data ={'enter_currency': EnterCurrency, 'convert_currency': Convert_currency,
                    'selectFromCurrency': SelectFromCurrency, 'selectToCurrency': SelectToCurrency}
    return Response(reaponse_data, status=status.HTTP_200_OK)



def apiData():
    api_data = requests.get('http://data.fixer.io/api/latest?access_key=40eac7a32ba84e0369830d99248246b7')
    data= api_data.json()
    return data

