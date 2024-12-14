# MovieRecommendationSystem
This is a movie recommendation system
Getting Started
Follow these instructions to set up the project on your local machine for development and testing purposes.

Prerequisites
Before you begin, make sure you have the following installed:

Python 3.8 or higher
Node.js 14 or higher
npm (usually comes with Node.js)
pip (Python package installer)
Installation
1. Clone the Repository
bash
Copy code
git clone https://github.com/yourusername/MovieRecommendationSystem.git
cd MovieRecommendationSystem
2. Setup Backend
Navigate to the Backend Folder:

bash
Copy code
cd movie-recommendation-app
Create and Activate a Virtual Environment:

Windows:
bash
Copy code
python -m venv venv
venv\Scripts\activate
macOS and Linux:
bash
Copy code
python3 -m venv venv
source venv/bin/activate
Install Dependencies:

bash
Copy code
pip install -r requirements.txt
Start the Backend Server:

bash
Copy code
python app.py
This will start the backend server on http://localhost:5000.

3. Setup Frontend
Navigate to the Frontend Folder:

bash
Copy code
cd ../movie-recommendation-ui
Install Node Modules:

bash
Copy code
npm install
Start the React Development Server:

bash
Copy code
npm start
This command will start the frontend development server and open http://localhost:3000 in your default web browser.

Usage
Once both servers are running, navigate to http://localhost:3000 to start using the application.
You can explore movies by genres, and interact with the system to get personalized movie recommendations.
Shutting Down
To stop the backend or frontend servers, go to the respective terminal window and press Ctrl+C.

Contributing
Contributions are welcome! Please feel free to submit pull requests to the project.