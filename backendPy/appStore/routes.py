# from appStore import create_app_store_app
# from .utils import parse_row, stringify_for_db
# from .db import get_connection
# from flask import jsonify, request
# import json

# app = create_app_store_app()

# @app.get("/health")
# def health():
#     return {"ok": True}

# @app.get("/apps/get-all-apps")
# def get_apps():
#     conn = get_connection()
#     try:
#         cursor = conn.cursor()
#         cursor.execute("SELECT * FROM appStore")
#         rows = cursor.fetchall()

#         # Convert sqlite3.Row → dict
#         apps = [ parse_row(row) for row in rows]

#         return jsonify({ "success": True, "apps": apps }), 200
#     finally:
#         conn.close()


# @app.post("/apps/launch-app")
# def launch_app():
#     data = request.get_json(silent=True)

#     if not data:
#         return jsonify({"success": False, "error": "JSON body is required"}), 400

#     required_fields = ["id", "appName", "path", "color", "appLogo", "size", "allowedDevices", "developers"]
#     missing = [f for f in required_fields if f not in data]
#     if missing:
#         return jsonify({"success": False, "error": "Missing required fields", "missing": missing}), 400

#     parsed = stringify_for_db(data)

#     # Ensure optional fields exist so .get() is safe (also controls defaults)
#     params = (
#         parsed["id"],
#         parsed["appName"],
#         parsed["path"],
#         parsed["color"],
#         parsed["appLogo"],
#         parsed["size"],
#         parsed["developers"],
#         parsed.get("storeName"),
#         parsed.get("description"),
#         parsed.get("category"),
#         parsed.get("type"),
#         parsed.get("heroImage"),
#         parsed["allowedDevices"],
#         parsed.get("keywords", "[]"),
#         parsed.get("screenshots", "[]"),
#         int(bool(parsed.get("isSystemApp", 0))),
#         int(bool(parsed.get("isInstalled", 0))),
#     )

#     stmt = """
#         INSERT OR IGNORE INTO appStore (
#             id, appName, path, color, appLogo, size, developers,
#             storeName, description, category, type, heroImage,
#             allowedDevices, keywords, screenshots,
#             isSystemApp, isInstalled, updatedAt
#         )
#         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
#     """

#     conn = get_connection()
#     try:
#         cur = conn.cursor()
#         cur.execute(stmt, params)
#         conn.commit()

#         # If rowcount == 1 => inserted, if 0 => ignored (already exists)
#         if cur.rowcount == 0:
#             return jsonify({"success": True, "message": "App already exists (ignored)"}), 200

#         return jsonify({"success": True, "message": f'{data["appName"]} added to appStore ✅'}), 201
#     finally:
#         conn.close()