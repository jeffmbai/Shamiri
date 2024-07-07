
# Create a virtual environment
python -m venv venv

# Activate the virtual environment
source venv/bin/activate

# Install required dependencies
pip install Flask
pip install Flask-JWT-Extended
pip install Flask-Bcrypt
pip install Flask-PyMongo
pip install pymongo
pip install python-dotenv


# Routes
/Register : Register users
/login: login users

## Response Codes
200: OK
201: Created
204: No Content
400: Bad Request
401: Unauthorized
404: Not Found
500: Internal Server Error

