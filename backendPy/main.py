import os

from app import create_app
from app import db
from app.seed import plant_system_apps
from app.models import ensure_app_columns

app = create_app()

with app.app_context():
    db.create_all()
    ensure_app_columns({
        "developers": "TEXT NOT NULL DEFAULT 'Unknown'",
        "createdAt": "TEXT NOT NULL DEFAULT ''",
        "updatedAt": "TEXT NOT NULL DEFAULT ''",
        "storeName": "TEXT",
        "description": "TEXT",
        "category": "TEXT",
        "type": "TEXT",
        "heroImage": "TEXT",
        "allowedDevices": "TEXT",
        "keywords": "TEXT",
        "screenshots": "TEXT",
        "isSystemApp": "INTEGER DEFAULT 0",
        "isInstalled": "INTEGER DEFAULT 0"
    })
    plant_system_apps()

if __name__ == "__main__":
    port = int(os.getenv("PORT", "8000"))
    print(f"Backend running on port {port}")
    app.run(port=port)
