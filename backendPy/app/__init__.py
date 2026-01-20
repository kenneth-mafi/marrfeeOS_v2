from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__, static_folder="../static", static_url_path="/static")

    # Load config (includes DATABASE_URL)
    app.config.from_object("app.config.Config")

    # Initialize SQLAlchemy with Flask app
    db.init_app(app)

    # Allow frontend (React) to talk to backend
    CORS(app, origins=[
        "http://localhost:5173",  # Vite
        "http://localhost:4000",  # CRA
    ])

    # Import routes AFTER app & db exist
    from .routes import api
    app.register_blueprint(api, url_prefix="/api")

    return app
