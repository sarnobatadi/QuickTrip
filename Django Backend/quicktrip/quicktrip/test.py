import pyrebase

firebaseConfig = {
  "apiKey": "AIzaSyDzbpKC4WoSoSvOXBamXRx3e0s7GCCzx2A",
  "authDomain": "mp-3-fa0d3.firebaseapp.com",
  "projectId": "mp-3-fa0d3",
  "storageBucket": "mp-3-fa0d3.appspot.com",
  "messagingSenderId": "581800805989",
  "appId": "1:581800805989:web:0a1d7a92666779c72d288c",
   "databaseURL": "https://mp-3-fa0d3-default-rtdb.firebaseio.com",
}

firebase = pyrebase.initialize_app(firebaseConfig)

db = firebase.database()
users = db.child("package").get()
print(users.val()) 
# result = db.collection('package').document('MohRw4hs5eEUiJnPCD5k').get()
# print(cred)

# # result.to_dict()
# print("SOMETHING")
# print(db)
# print(result._data())