from flask import Blueprint, request, jsonify
from datetime import datetime
from .models import App
from . import db
import json
from sqlalchemy.exc import SQLAlchemyError

api = Blueprint("api", __name__)

# ======================
# GETTERS
# ======================

@api.get("/health")
def health():
    return jsonify({ "success": True, "status": "ok" })

@api.get("/apps/get-all-apps")
def get_apps():
    apps = App.query.all()
    return jsonify({ "success": True, "apps": [ app.to_dict() for app in apps ] })

# ======================
# SETTERS
# ======================

@api.post("/apps/launch-app")
def launch_app():
    data = request.get_json( silent=True )

    # 1️⃣ Basic payload check
    if not data:
        return jsonify({ "success": False, "error": "JSON body is required"}), 400

    # 2️⃣ Required fields for an app to exist
    required_fields = ["id","appName","path","color","appLogo","size","allowedDevices","developers"]

    # 3️⃣ Check missing fields
    missing = [ field for field in required_fields if field not in data ]

    if missing:
        return jsonify({ "success": False, "error": "Missing required fields", "missing": missing }), 400

    # Convert arrays/dicts to JSON strings for DB storage
    allowed_devices = data.get("allowedDevices")
    if allowed_devices is not None and not isinstance(allowed_devices, str):
        allowed_devices = json.dumps(allowed_devices)

    keywords = data.get("keywords")
    if keywords is not None and not isinstance(keywords, str):
        keywords = json.dumps(keywords)

    screenshots = data.get("screenshots")
    if screenshots is not None and not isinstance(screenshots, str):
        screenshots = json.dumps(screenshots)

    # Optional: prevent duplicate ID
    existing = App.query.get(data["id"])
    if existing:
        return jsonify({ "success": False, "error": "App with this id already exists", "id": data["id"]}), 409


    # 4️⃣ Create App object
    app = App(
                id=data["id"],
                appName=data["appName"],
                storeName=data.get("storeName"),
                path=data["path"],
                color=data["color"],
                appLogo=data["appLogo"],
                description=data.get("description"),
                category=data.get("category"),
                allowedDevices=allowed_devices,  # JSON string
                type=data.get("type"),
                isSystemApp=int(data.get("isSystemApp", 0)),
                isInstalled=int(data.get("isInstalled", 0)),
                size=data.get("size"),
                keywords=keywords,               # JSON string
                screenshots=screenshots,         # JSON string
                heroImage=data.get("heroImage"),
                developers=data["developers"]
            )

    # 5️⃣ Persist to database
    db.session.add(app)
    db.session.commit()

    return jsonify({"success": True, "app": app.to_dict()}), 201
    

@api.post("/apps/install-app")
def install_app():
    data = request.get_json( silent=True )

    # 1️⃣ Basic payload check
    if not data:
        return jsonify({ "success": False, "error": "JSON body is required"}), 400

    # 2️⃣ Required fields for an app to exist
    required_fields = [ "id" ]

    # 3️⃣ Check missing fields
    missing = [ field for field in required_fields if field not in data ]

    if missing:
        return jsonify({ "success": False, "error": "Missing required fields", "missing": missing }), 400

    app_id = data["id"]

    # 4️⃣ Find app
    app = db.session.get(App, app_id)  # SQLAlchemy 2.x style
    if not app:
        return jsonify({"success": False, "error": "App with this id does not exist", "id": app_id}), 404

    # 5️⃣ If already installed 
    if getattr(app, "isInstalled", 0) == 1:
        return jsonify({"success": True, "message": f"{app.appName} is already installed ✅"}), 200

    # 6️⃣ Update
    try:
        app.isInstalled = 1
        db.session.commit()

    except SQLAlchemyError:
        db.session.rollback()
        return jsonify({"success": False, "error": "Database error"}), 500

    return jsonify({"success": True, "message": f"{app.appName} has been installed ✅"}), 200
