############## MAIN BACKEND ##############
## First one
from flask import Flask, request, render_template, redirect, url_for, jsonify, session
import pandas as pd
import pickle
# import os
# import time

# Initialize the Flask app
app = Flask(__name__)
app.config['DEBUG'] = True
# app.secret_key = os.urandom(24) 

# Load the trained model and scaler
model = pickle.load(open('./model/rf_model_manual.pkl', 'rb'))
scaler = pickle.load(open('./model/scaler.pkl', 'rb'))

@app.route("/")
def index():

    return render_template('index.html')


@app.route("/predict", methods=['POST'])
def predict():
    if 'file_upload' not in request.files:
        return jsonify(error="No file part"), 400

    my_file = request.files['file_upload']

    if my_file.filename == '':
        return jsonify(error="No selected file"), 400

    if my_file and my_file.filename.endswith('.csv'):
        # Read the uploaded CSV file
        df = pd.read_csv(my_file)

        # Ensuring the DataFrame contains the necessary columns
        required_columns = ['flow_duration', 'ICMP', 'Tot sum',
                            'Header_Length', 'Tot size', 'syn_count', 'IAT', 'ack_flag_number', 'HTTPS', 'Number', 'Duration',
                            'rst_count', 'syn_flag_number', 'psh_flag_number', 'TCP',
                            'urg_count', 'Protocol Type', 'UDP', 'HTTP',
                            'ack_count', 'fin_count', 'Rate', 'Srate', 'rst_flag_number',
                            'DNS']
        missing_columns = [col for col in required_columns if col not in df.columns]

        if not missing_columns:
            df_features = df[scaler.get_feature_names_out()]
            X_test_scaled = scaler.transform(df_features)       

            # Predict and get probabilities
            predictions = model.predict(X_test_scaled)
            prediction_proba = model.predict_proba(X_test_scaled)

            # Convert predictions to DataFrame and merge with original DataFrame
            df['Prediction'] = predictions
            df['Prediction Probability'] = prediction_proba[:, 0]

            # Store the DataFrame in a session or global variable (as an example)
            global prediction_df
            prediction_df = df

            #Converting dataframe to dictionary
            prediction_dict = prediction_df.to_dict()
            
            # return jsonify(prediction_df)
            # time.sleep(3)
            return jsonify({'prediction': prediction_dict})
        else:
            missing_columns_str = ', '.join(missing_columns)
            return redirect(url_for('index', message=f'Missing columns: {missing_columns_str}'))
    else:
        return jsonify(error="Invalid file type"), 400

@app.route('/pred')
def pred():
    # Pass the DataFrame to the results page
    global prediction_df
    # time.sleep(1)
    return render_template('prediction.html', tables=[prediction_df.to_html(classes='data', header="true")])

if __name__ == '__main__':
    app.run()