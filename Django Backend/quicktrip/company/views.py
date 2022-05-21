from django.shortcuts import render,redirect
from django.contrib.auth import login,logout,authenticate
import firebase_admin
import pyrebase
from firebase_admin import credentials
from firebase_admin import firestore
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
import json
from firebase_admin import auth

compName = ''
login = {}

firebaseConfig = {
  'apiKey': "AIzaSyDzbpKC4WoSoSvOXBamXRx3e0s7GCCzx2A",
  'authDomain': "mp-3-fa0d3.firebaseapp.com",
  'databaseURL': "https://mp-3-fa0d3-default-rtdb.firebaseio.com",
  'projectId': "mp-3-fa0d3",
  'storageBucket': "mp-3-fa0d3.appspot.com",
  'messagingSenderId': "581800805989",
  'appId': "1:581800805989:web:0a1d7a92666779c72d288c"
}


firebase = pyrebase.initialize_app(firebaseConfig)
authn = firebase.auth()

cred = credentials.Certificate("serviceAccountKey.json")

firebase_admin.initialize_app(cred)

db = firestore.client()

class LoginAPI(APIView):
    def get(self, request):
        try:
            
            return Response("HELLO")
        except:
            return Response({"status": "500 Some Error Occurred"})

    def post(self, request):
        try:
            email = request.data['email']
            password = request.data['password']
            login = authn.sign_in_with_email_and_password(email, password)
            return Response(login)
        except:
            return Response({"status": "500 Some Error Occurred"})

class RegisterAPI(APIView):
    def get(self, request):
        try:
            
            return Response("HELLO")
        except:
            return Response({"status": "500 Some Error Occurred"})

    def post(self, request):
        try:
            email = request.data['email']
            password = request.data['password']
            name = request.data['name']
            data = {
                'email':email,
                'password':password
            }
            user = auth.create_user(email=email, password=password, display_name=name)
            # user = auth.create_user_with_email_and_password(email, password)
            # db.collection(u'company').document().set(data)
            # login = auth.sign_in_with_email_and_password(email, password)
            # login['displayName'] = name
            return Response(user)
        except:
            return Response({"status": "500 Some Error Occurred"})



def home(request):
    return render(request,'Login/landingPage.html')


def register(request):
    
    if request.method=="POST":
        email=request.POST.get('email')
        password=request.POST.get('password')
        contact = request.POST.get('contact')
        companyName = request.POST.get('companyname')
        desc = request.POST.get('description')
        data = {
            'email':email,
            'companyName':companyName,
            'description': desc,
            'mobileNo':contact
        }
        user = authn.create_user_with_email_and_password(email, password)
        db.collection(u'company').document().set(data)
        login = authn.sign_in_with_email_and_password(email, password)
        return redirect('/Package')
        print(login)


    return render(request,'registration/register.html')


def loginPage(request):
    global login
    if request.method=="POST":
        username=request.POST.get('username')
        password=request.POST.get('password')
        # user=authenticate(request,username=username,password=password)
        login = authn.sign_in_with_email_and_password(username, password)
        if login['idToken']:
            print("SUCCESSFUL")
            return redirect('/Package')
        else:
            return redirect('/login')
    
    return render(request,'registration/login.html')

def logoutPage(request):
    logout(request)
    return redirect('/login')



def getTours(request):
    
    result = db.collection('PackagesBooking')

    docs = result.stream()
    placesData = []
    for doc in docs:
        ob = doc.to_dict()
        placesData.append(ob)
    
    print(placesData)
    data = {
    'FormData':placesData,

    }
    return render(request,'Forms/form_tours.html',data)
    # if request.method == 'POST':
        
    #     location = request.POST.get('name')
    #     price = request.POST.get('city')
    #     description = request.POST.get('description')
    #     imgLink = request.POST.get('imglink')
    #     pickpoint = request.POST.get('point')
    #     data ={
    #     'name': location, 
    #     'address': description,
    #     'city':price,
    #     'image':imgLink,
    #     'pickpoint':pickpoint
    #     }
        
    #     db.collection(u'touristPlaces').document().set(data)
    



def getPlaces(request):
    if request.method == 'POST':
        
        location = request.POST.get('name')
        price = request.POST.get('city')
        description = request.POST.get('description')
        imgLink = request.POST.get('imglink')
        data ={
        'name': location, 
        'location': description,
        'city':price,
        'image':imgLink,
        
        }
        
        db.collection(u'touristPlaces').document().set(data)
    
    result = db.collection('touristPlaces')

    docs = result.stream()
    placesData = []
    for doc in docs:
        ob = doc.to_dict()
        placesData.append(ob)

    result = db.collection('cities')
    docs = result.stream()
    cityData = []
    for doc in docs:
        ob = doc.to_dict()
        cityData.append(ob)

    
    data = {
    'FormData':placesData,
    'cityData': cityData
   

    }
    return render(request,'Forms/form_places.html',data)



def getCity(request):
    if request.method == 'POST':
        
       
        cityname = request.POST.get('city')
        data ={
       'cityname':cityname
        }
        
        db.collection(u'cities').document().set(data)
    


    result = db.collection('cities')
    docs = result.stream()
    cityData = []
    for doc in docs:
        ob = doc.to_dict()
        cityData.append(ob)

    
    data = {
    'FormData':cityData,

    }
    return render(request,'Forms/form_cities.html',data)
   
   



def getCompanydata(request):
    
    global compName
    useremail = login['email']

    if request.method == 'POST':
        result = db.collection('company')
        docs = result.stream()
        for doc in docs:
            ob = doc.to_dict()
            if(ob['email'] == useremail):
                compName = ob['companyName']
        location = request.POST.get('location')
        price = request.POST.get('price')
        description = request.POST.get('description')
        packageName = request.POST.get('packageName')
        imgLink = request.POST.get('imglink')
        duration = request.POST.get('duration')
        time = request.POST.get('time')
        pickupPoint = request.POST.get('pickup')
        data ={
        'email':useremail,
        'companyName':compName,
        'packageName': packageName, 
        'location': location, 
        'description': description,
        'price':price,
        'imglink':imgLink,
        'duration':duration,
        'time':time,
        'pickupPoint':pickupPoint
        }
        
        db.collection(u'package').document().set(data)
    
    result = db.collection('company')
    docs = result.stream()
    for doc in docs:
        ob = doc.to_dict()
        if(ob['email'] == useremail):
            compName = ob['companyName']

        
    # print(compName)
    result = db.collection('package')
    # print(cred)
    docs = result.stream()
    packageData = []
    for doc in docs:
        ob = doc.to_dict()
        if(ob['email'] == useremail):
            packageData.append(ob)

    
    data = {
    'FormData':packageData,
    'CompanyName': compName

    }
    return render(request,'Forms/form_package.html',data)
   
