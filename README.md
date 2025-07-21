# Clothing-eccom

API Endpoints
----
User Signup
URL: POST /api/auth/signup
Request Body:

json
Copy code
{
  "name": "Your Name",
  "email": "your@email.com",
  "password": "yourpassword"
}

----
User Login
URL: POST /api/auth/login
Request Body:

json
Copy code
{
  "email": "your@email.com",
  "password": "yourpassword"
}

----
Get User 
URL: GET /api/user/profile
Headers:

Key:    Authorization
Value:  Bearer your_jwt_token_here

----
Edit User Profile
URL: PUT /api/user/profile
Headers:

Key:    Authorization  
Value:  Bearer your_jwt_token_here

Request Body: (You can update either field or both)

json
Copy code
{
  "name": "New Name",
  "email": "new@email.com"
}

----
