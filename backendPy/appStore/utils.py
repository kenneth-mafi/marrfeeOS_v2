# import json

# JSON_FIELDS = {"allowedDevices", "keywords", "screenshots"}

# def parse_row(row):
#     d = dict(row)
#     for field in JSON_FIELDS:
#         d[field] = json.loads(d[field]) if d[field] else []
#     return d

# def stringify_for_db(d: dict) -> dict:
#     out = dict(d)
#     for field in JSON_FIELDS:
#         if field in out:
#             out[field] = json.dumps(out[field] or [])
#     return out