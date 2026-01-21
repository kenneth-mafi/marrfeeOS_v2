import os

from app import create_app
from app import db
from app.seed import plant_system_apps
from app.models import ensure_app_columns

app = create_app()

with app.app_context():
    db.create_all()
    # ensure_app_columns({
    #     "screenshots": "TEXT",
    #     "heroImage": "TEXT",
    # })
    plant_system_apps()

if __name__ == "__main__":
    port = int(os.getenv("PORT", "8000"))
    print(f"Backend running on port {port}")
    app.run(port=port)
