from . import db
import json
class App( db.Model ):
    __tablename__ = "apps"

    # Primary key (TEXT in SQLite)
    id = db.Column(db.String, primary_key=True)

    # Required fields
    appName = db.Column(db.String, nullable=False)
    path = db.Column(db.String, nullable=False)
    color = db.Column(db.String, nullable=False)
    appLogo = db.Column(db.String, nullable=False)
    size = db.Column(db.String, nullable=False)

    # Optional text fields
    storeName = db.Column(db.String)
    description = db.Column(db.String)
    category = db.Column(db.String)
    type = db.Column(db.String)

    # JSON stored as TEXT (SQLite has no native JSON type)
    allowedDevices = db.Column(db.Text, nullable=False)   # JSON string
    keywords = db.Column(db.Text)         # JSON string

    # Booleans stored as INTEGER (SQLite convention)
    isSystemApp = db.Column(db.Integer, default=0)
    isInstalled = db.Column(db.Integer, default=0)

    def to_dict(self):
        """
        Convert DB row → JSON-safe dict for frontend
        """
        def safe_json_load(s):
            if not s:
                return None
            try:
                return json.loads(s)
            except Exception:
                return s  # fallback if somehow not JSON
            
        return {
            "id": self.id,
            "appName": self.appName,
            "storeName": self.storeName,
            "path": self.path,
            "color": self.color,
            "appLogo": self.appLogo,
            "description": self.description,
            "category": self.category,
            "allowedDevices": safe_json_load(self.allowedDevices),
            "type": self.type,
            "isSystemApp": bool(self.isSystemApp),
            "isInstalled": bool(self.isInstalled),
            "size": self.size,
            "keywords": safe_json_load(self.keywords),
        }
