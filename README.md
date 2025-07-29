# Clothing-eccom

API Endpoints
----
User Signup
URL: POST /api/auth/signup
Request Body:

json
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
{
  "name": "New Name",
  "email": "new@email.com"
}

----

Add Address
URL: POST /api/user/address
Headers:

Authorization: Bearer your_jwt_token_here
Request Body (JSON):

json
{
  "street": "your_street",
  "city": "your_city",
  "state": "your_state",
  "zip": "your_zip"
}

----

Get Addresses
URL: GET /api/user/address
Headers:

Authorization: Bearer your_jwt_token_here

----

Update Address
URL: PUT /api/user/address/:address_id
Headers:

Authorization: Bearer your_jwt_token_here
Request Body (JSON):

json
{
  "street": "updated_street",
  "city": "updated_city",
  "state": "updated_state",
  "zip": "updated_zip"
}

----
Delete Address
URL: DELETE /api/user/address/:address_id
Headers:

Authorization: Bearer your_jwt_token_here

----

Get all products
URL:GET /api/products

----

Get product by ID
URL:GET /api/product/:id	

----

