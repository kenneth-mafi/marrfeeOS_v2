def get_system_apps():
    return [
            {
                "id": "marrfeeBrowser",
                "appName": "Marrfee Browser",
                "path": "/marrfeeBrowser",
                "appLogo": "/static/icons/marrfee-logo.png",
                "color": "whitesmoke",
                "allowedDevices": ["desktop", "laptop", "tablet", "mobile"],
                "isInstalled": 1,
                "isSystemApp": 1, 
                "description": "A lightweight built-in browser for navigating apps and web content inside MarrfeeOS.",
                "category": "System",
                "type": "Core Application",
                "size": "Built-in",
                "keywords": [],

            },
            {
                "id": "marrfeeAppStore",
                "appName": "App Store",
                "path": "/marrfeeAppStore",
                "appLogo": "/static/icons/app.png", 
                "color": "#5c70e0",
                "allowedDevices": ["mobile"],
                "isInstalled": 1,
                "isSystemApp": 1,  
                "description": "Browse, download, and manage apps available for MarrfeeOS.",
                "category": "System",
                "type": "Core Application",
                "size": "Built-in",
                "keywords": [],

            },

    ]