# Tech Blog

## Description

Tech Blog is a Content Management System (CMS)-style web application that allows developers to publish their blog posts and engage in discussions by commenting on other developers' posts. This project is built from scratch and deployed to Heroku, following the MVC (Model-View-Controller) architectural pattern. The tech stack includes Handlebars.js for templating, Sequelize as the ORM, and the express-session npm package for user authentication.

## Features

- Create a CMS-style blog site from the ground up.
- Follow the MVC architectural pattern.
- Use Handlebars.js as the templating language for rendering views.
- Utilize Sequelize as the ORM to interact with a MySQL database.
- Implement user authentication using express-session.
- Allow users to create, read, update, and delete their blog posts.
- Enable users to comment on existing blog posts.

## Getting Started

To run this application locally, follow these steps:

1. Clone the repository from [GitHub](https://github.com/your-username/your-repo).

2. Install the required dependencies using the following command:


3. Create a MySQL database and configure the database connection in the `.env` file. Replace the placeholders with your own database credentials:

DB_NAME=your_database_name
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_PORT=3306

4. Run the database schema and seed the initial data

5. Start the application using: npm start

## Screenshots
<img width="1876" alt="Screenshot 2023-10-13 at 1 25 18 AM" src="https://github.com/vikramadityad/tech_blog/assets/28673859/b60d9ec7-791c-44cb-be21-b8cd2b141a35">
<img width="1872" alt="Screenshot 2023-10-13 at 1 24 11 AM" src="https://github.com/vikramadityad/tech_blog/assets/28673859/bb4ba834-114c-4a17-962a-d5f2b69da580">
<img width="1894" alt="Screenshot 2023-10-13 at 1 24 41 AM" src="https://github.com/vikramadityad/tech_blog/assets/28673859/5d8c224a-73c7-48d8-992e-3fb090ff8431">
<img width="1895" alt="Screenshot 2023-10-13 at 1 24 24 AM" src="https://github.com/vikramadityad/tech_blog/assets/28673859/f2f47e22-24ed-4f75-9f91-ecd8a755306a">
<img width="1888" alt="Screenshot 2023-10-13 at 1 25 03 AM" src="https://github.com/vikramadityad/tech_blog/assets/28673859/d6b2fc30-a8ba-4127-923b-4eb968538b1a">


## Usage

When you visit the site for the first time, you'll be presented with the homepage, which may include existing blog posts.
You can navigate to the homepage, the dashboard, and log in or sign up.
Sign up by creating a username and password.
After signing up, you'll be logged into the site.
You can create new blog posts, comment on existing blog posts, and manage your posts.
User sessions are automatically managed.
You'll be logged out if you're idle for too long.

## Technologies Used

Node.js
Express.js
Sequelize (MySQL)
Handlebars.js
Express-Session
bcrypt

## License
This project is licensed under the MIT License.
