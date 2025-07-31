# Clothing-eccom

API Endpoints
----
User Signup
URL: POST /auth/signup
Request Body:

json
{
  "name": "Your Name",
  "email": "your@email.com",
  "password": "yourpassword"
}

----
User Login
URL: POST /auth/login
Request Body:

json
{
  "email": "your@email.com",
  "password": "yourpassword"
}

----
Get User 
URL: GET /user/profile
Headers:

Key:    Authorization
Value:  Bearer your_jwt_token_here

----
Edit User Profile

URL: PUT /user/profile
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
URL: POST /address
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
URL: GET /address
Headers:

Authorization: Bearer your_jwt_token_here

----

Update Address
URL: PUT /address/:address_id
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
URL: DELETE /address/:address_id
Headers:

Authorization: Bearer your_jwt_token_here

----

Get all products
URL:GET /products

----

Get product by ID
URL:GET /products/:product_id	

----

Add to Cart
URL: POST /cart/add
Headers:
Authorization: Bearer your_jwt_token_here
Body:
{
  "variant_id": 1,
  "quantity": 2
}

----

View Cart
URL: GET /cart
Headers:
Authorization: Bearer your_jwt_token_here

----

Update Quantity
URL: PUT /cart/:cart_id
Headers:
Authorization: Bearer your_jwt_token_here
Body:
{
  "quantity": 5
}

----

Remove Item
URL: DELETE /cart/:cart_id
Headers:
Authorization: Bearer your_jwt_token_here

----