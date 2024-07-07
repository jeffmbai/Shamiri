from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from pymongo import MongoClient
from passlib.hash import pbkdf2_sha256 as sha256

app = Flask(__name__)

# MongoDB setup
client = MongoClient('mongodb+srv://mbaijeff:Xcial519@cluster0.vonlu34.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client['Shamiri']
users_collection = db['users']

# JWT setup
app.config['JWT_SECRET_KEY'] = '5ee788cedeea596d0fe42dc211fa8b20b1c83dbe' 
jwt = JWTManager(app)

@app.route('/')
def hello():
    return "Welcome to Shamiri Flask API!"

@app.route('/register', methods=['POST'])
def register():
    new_user = request.json
    if users_collection.find_one({'username': new_user['username']}):
        return jsonify({'message': 'Username already exists'}), 409
    
    if users_collection.find_one({'email': new_user['email']}):
        return jsonify({'message': 'email already exists'}), 409
    
    new_user['password'] = sha256.hash(new_user['password'])
    users_collection.insert_one(new_user)
    return jsonify({'message': 'User registered successfully'}), 201

# @app.route('/login', methods=['POST'])
# def login():
#     login_details = request.json
#     user = users_collection.find_one({'username': login_details['username']})
    
#     if user and sha256.verify(login_details['password'], user['password']):
#         access_token = create_access_token(identity=user['username'])
#         return jsonify({'access_token': access_token}), 200
    
#     return jsonify({'message': 'Invalid username or password'}), 401

# @app.route('/profile', methods=['GET'])
# @jwt_required()
# def profile():
#     current_user = get_jwt_identity()
#     user = users_collection.find_one({'username': current_user}, {'_id': 0, 'password': 0})
#     if not user:
#         return jsonify({'message': 'User not found'}), 404
#     return jsonify(user), 200

if __name__ == '__main__':
    app.run(debug=True)
