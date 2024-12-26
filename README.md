Blog App (MERN Stack)
A full-stack Blog Application built with the MERN stack (MongoDB, Express.js, React, Node.js). This app allows users to create, read, update, and delete blog posts, manage comments, and have user authentication for secure access.

Features
Create Blog Posts: Users can create and publish blog posts with titles, content, and tags.
Read Blog Posts: View a list of all blog posts, sorted by the latest or by category.
Update Blog Posts: Edit existing blog posts.
Delete Blog Posts: Remove blog posts from the system.
Comments: Users can add comments to blog posts.
User Authentication: Secure sign up, login, and access control.
Categories & Tags: Organize posts by categories and tags for better navigation.
Tech Stack
Frontend: React.js
Backend: Node.js with Express.js
Database: MongoDB (with Mongoose for schema modeling)
Authentication: JWT (JSON Web Tokens)
State Management: React useState, useEffect
Installation
Prerequisites
Ensure you have the following installed:

Node.js (version >= 14.x)
MongoDB (or use a cloud service like MongoDB Atlas)
npm (Node Package Manager)
Clone the Repository
Clone the repository to your local machine:

bash
Copy code
git clone https://github.com/Sojha09/blog-app.git
Navigate into the project directory:

bash
Copy code
cd mern-blog-app
Backend Setup
Navigate to the backend folder:

bash
Copy code
cd backend
Install the backend dependencies:

bash
Copy code
npm install
Create a .env file in the backend directory for environment variables:

env
Copy code
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
Start the backend server:

bash
Copy code
npm start
The backend should now be running on http://localhost:5000.

Frontend Setup
Navigate to the frontend folder:

bash
Copy code
cd frontend
Install the frontend dependencies:

bash
Copy code
npm install
Start the frontend development server:

bash
Copy code
npm start
The frontend should now be running on http://localhost:3000.

Usage
Open your browser and go to http://localhost:3000.
Sign up or log in to your account.
Add, edit, or delete blog posts.
View posts by category and tag.
Comment on blog posts to interact with the content.

Latest Operations and Features
CRUD Operations:
Create Blog Posts:

Add new posts with a title, content, and optional categories/tags.
Read Blog Posts:

View a list of all blog posts.
Filter by category or tags for better organization.
Display posts sorted by date, popularity, etc.
Update Blog Posts:

Edit the content, title, or tags of existing blog posts.
Delete Blog Posts:

Remove blog posts from the system.
Comments:

Add, edit, or delete comments on blog posts.
Categories & Tags:

Organize blog posts into categories (e.g., Tech, Lifestyle, Education).
Add tags for better post discovery.
Authentication and Authorization:
Sign Up: Users can register by providing their email, password, and username.
Login: Users can log in with their credentials and receive a JWT token for secure access to protected routes.
Protected Routes: Only authenticated users can create, edit, or delete blog posts.
Categories & Tags:
Blog posts can be categorized (e.g., Tech, Life) and tagged for easier searching and navigation.
Contributing
Feel free to fork this repository, create a pull request, and contribute with improvements, bug fixes, or new features. Contributions are always welcome!
