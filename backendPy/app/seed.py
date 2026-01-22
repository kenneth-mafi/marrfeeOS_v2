import json
from .models import App
from . import db
from .system_apps import get_system_apps

def plant_system_apps():
    defaults = get_system_apps()

    for item in defaults:
        # If it already exists, skip
        if App.query.get(item["id"]):
            continue

        allowed_devices = item.get("allowedDevices")
        if allowed_devices is not None and not isinstance(allowed_devices, str):
            allowed_devices = json.dumps(allowed_devices)

        keywords = item.get("keywords")
        if keywords is not None and not isinstance(keywords, str):
            keywords = json.dumps(keywords)

        screenshots = item.get("screenshots")
        if screenshots is not None and not isinstance(screenshots, str):
            screenshots = json.dumps(screenshots)

        app = App(
            id=item["id"],
            appName=item["appName"],
            storeName=item.get("storeName"),
            path=item["path"],
            color=item["color"],
            appLogo=item["appLogo"],
            description=item.get("description"),
            category=item.get("category"),
            allowedDevices=allowed_devices,
            type=item.get("type"),
            isSystemApp=int(bool(item.get("isSystemApp", 0))),
            isInstalled=int(bool(item.get("isInstalled", 0))),
            size=item["size"],
            keywords=keywords,
            screenshots=screenshots,
            heroImage=item.get("heroImage"),
            developers=item.get("developers", "Unknown"),
        )

        db.session.add(app)

    db.session.commit()
