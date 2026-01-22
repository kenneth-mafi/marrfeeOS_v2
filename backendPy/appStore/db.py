# import sqlite3
# from dotenv import load_dotenv
# import os 

# load_dotenv()

# DB_PATH = os.getenv("MARRFEE_OS_SQLITE_DB_URL")

# if not DB_PATH:
#     raise RuntimeError("MARRFEE_OS_SQLITE_DB_URL is not set in .env")

# def get_connection():
#     conn = sqlite3.connect(DB_PATH)
#     conn.row_factory = sqlite3.Row

#     # IMPORTANT: enable foreign keys for THIS connection
#     conn.execute("PRAGMA foreign_keys = ON;")

#     return conn

# def init_sql_db():
#     conn = get_connection()

#     # robust schema path (relative to this file)
#     schema_path = os.path.join(os.path.dirname(__file__), "schema.sql")
#     seed_path = os.path.join(os.path.dirname(__file__), "seed.sql")
#     with open(schema_path, "r", encoding="utf-8") as f:
#         conn.executescript(f.read())
#     with open(seed_path, 'r', encoding="utf-8") as f:
#         conn.executescript(f.read())
#     conn.commit()
#     conn.close()