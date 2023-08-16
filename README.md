# Game of Thrones Fan Zone - Angular Project 

This is my project for the June 2023 Angular course in SoftUni. 

I have used SoftUni's practice server for the back-end and Angular for the front-end. 

The main purpose of the application is to allow users to view details about their favourite episodes of the show. 

## The following features are available: 

- Login using valid credentials
- Register
- View the list of all episodes
- View the details about each episode
- Edit/Delete a given episode (if you are the one who created the episode)
- Like an episode (if you are logged in and you are not the owner of the episode)
- Quiz (answer questions about the show)
- Search for a particular episode
- View your personal profile, where you can see all the episodes that you have added

  ## Demo accounts

  The following three demo accounts are available:

- Email: peter@abv.bg
- Password: 123456

- Email: george@abv.bg
- Password: 123456

- Email: admin@abv.bg
- Password: 123456

  ## Deployment

In order to run the application locally on your device, follow the next steps: 

- while in the main directory of the project open a new terminal and run "cd GOT", then run "npm install" and finally "ng serve" - this will initiate the Angular app on localhost:4200/
- after that open a new terminal and run "cd server", then "node server.js" - this will start the server on localhost:3030/
