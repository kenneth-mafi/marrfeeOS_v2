import random
import re

def get_salt():
    pattern = re.compile(r'^[A-Za-z0-9!@#$&?]$')
    salt = ""
    while len(salt) < 64:
        ran_int = random.randint(0, 200)
        char = chr(ran_int)
        if not bool(pattern.match(char)):
            continue
        else:
            salt = char + salt
    return salt
