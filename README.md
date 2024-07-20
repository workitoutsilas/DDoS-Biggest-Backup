# DDoS ATTACK DETECTION USING ML IN AN IoT ENVIRONMENT

This project implements a web application to classify traffic flows into DDoS and normal traffic patterns. Network administrators can upload traffic capture files (.csv) for predictions. The application leverages a machine learning model to make predictions and display the results.

Key Features:

- DDoS Traffic Classification: Identify potential DDoS attacks by analyzing traffic patterns.
- Web Interface: User-friendly interface for uploading traffic capture files in a specified format.
- Machine Learning Integration: Integrates a trained model for traffic classification into normal or malicious(DDoS).
- Visualizations: Presents prediction results in an easy-to-understand format (using specific charts/ probabilities)

# DDoS-Web-App

This project is a web application designed to monitor and manage potential DDoS attacks. The application includes a dashboard for viewing relevant information and configuring settings.

## Project Structure

- `Flask/` - Parent folder which contains the project files.
- `model/` - Random Forest and Support Vector Classifiers and the scaler used for model training.
- `static/` - Contains static files such as CSS, JavaScript, and images.
- `templates/` - Contains HTML templates for the project.
- `VirtlEnv/` - Python virtual environment.
- `app.py` - Flask app - Backend.

## Prerequisites

Ensure you have the following installed:

- Python 3.x
- pip (Python package installer)
- virtualenv (for creating a virtual environment)

## Setup Instructions

1. **Clone the repository**:

- git clone https://github.com/yourusername/DDOS-Web-App.git
- cd DDOS-Flask

2. **Create and activate a virtual environment**

- python -m venv VirtEnv
- source VirtEnv\Scripts\activate

3. **Install dependencies**:
   pip install -r requirements.txt

4. **Run the development server**:
   python3 app.py
