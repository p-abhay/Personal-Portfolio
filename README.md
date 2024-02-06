
# Personal Portfolio - Web App

Personal Portfolio app made using MEAN(MONGODB + EXPRESS + ANGULAR + NODE) + Firebase Authentication + EmailJs.


## Home Page

My name and brief Info about myself and a Let's Start Button.
## About Page

Section to display about myself,skills,experience and testimonials.

Experience: Logged In user cand perform CRUD on experience data.
## Resume Page

Resume Embedded using Google Drive and download button for downloading it.
## Projects

For showcasing projects and logged in user can perform CRUD on project data.
## Contact Page

Contact form where loggedIn user can fill the form and send message to the owner.

Using EmailJs this form is being send as an email to the owners email id.
## Deployment Link

[Personal-Portfolio](https://abhay-personal-portfolio.netlify.app/)




## Installation

1. Create a firebase account and create a new project for web app and enable authentication for this project here you will find the SDK setup.

2. Create a MongoDb Account and create a new database as well as collections inside database as well configure the networking to access MongoDb Cloud from anywhere.

3. Clone the repo or download and then follow these steps:

Open personal-portfolio folder this is frontend and run the following commands on the terminal in the root directory
```bash
  npm install 
  ng serve -o
```
Now open the backend folder and again in the root directory run the following commands:

```bash
  npm install 
  node src/server.js
```
But the application would be missing the .env file so create a .env file in the root directory of backend and then paste the following content:

```
PORT="YOUR_VALUE"
MONGO_URI="YOUR_VALUE"
FIREBASE_PROJECT_ID="YOUR_VALUE"
FIREBASE_PRIVATE_KEY="YOUR_VALUE"
FIREBASE_CLIENT_EMAIL="YOUR_VALUE"
```

Remember to replace the ```"YOUR_VALUE"``` with your specified value.
## Documentation

[Documentation](https://abhay-personal-portfolio-documentation.onrender.com/overview.html)

