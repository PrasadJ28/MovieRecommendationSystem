from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
import pandas as pd
import pickle
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)  # Adjust CORS for production as necessary

# Load the model
model_path = 'my_model.keras'  # Update the path as needed
model = tf.keras.models.load_model(model_path)

# Load the encoders
with open('user_encoder.pkl', 'rb') as f:  # Update the path as needed
    user_encoder = pickle.load(f)

with open('item_encoder.pkl', 'rb') as f:  # Update the path as needed
    item_encoder = pickle.load(f)

# Load movie details
movies_details = pd.read_csv('movies.csv').set_index('movieId').to_dict('index')  # Update path and index column as needed

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json(force=True)
    user_id = data.get('user_id')
    if user_id is None:
        return jsonify({"error": "user_id is missing"}), 400

    num_recommendations = data.get('num_recommendations', 5)  # Default to 5 if not provided

    try:
        user_idx = user_encoder.transform([user_id])[0]
        movie_idxs = np.array(range(len(item_encoder.classes_)))
        user_array = np.array([user_idx] * len(movie_idxs))

        predictions = model.predict([user_array, movie_idxs])
        top_indices = np.argsort(predictions.flatten())[-num_recommendations:][::-1]
        top_movie_ids = item_encoder.inverse_transform(top_indices)

        recommended_movies = [movies_details.get(movie_id) for movie_id in top_movie_ids if movie_id in movies_details]

        return jsonify(recommended_movie_details=recommended_movies)
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        return jsonify(error=str(e)), 500

if __name__ == '__main__':
    app.run(debug=True)
