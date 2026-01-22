# from flask import Flask
# from .db import init_sql_db
# from flask_cors import CORS

# def create_app_store_app():
#     app = Flask(__name__, static_folder="../static", static_url_path="/static")
#     init_sql_db()

#     CORS(app, origins=[
#         "http://localhost:5173",  # Vite
#         "http://localhost:3000",  # CRA
#     ])

#     return app