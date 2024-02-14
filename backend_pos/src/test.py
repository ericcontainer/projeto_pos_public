from firebase_admin import auth, initialize_app, db, credentials, firestore
print('Incializando Firebase...')
cred = credentials.Certificate("firebase.json")
default_app = initialize_app(cred)
print(default_app.name)    # "[DEFAULT]"
db = firestore.client()
import pdb
pdb.set_trace()
