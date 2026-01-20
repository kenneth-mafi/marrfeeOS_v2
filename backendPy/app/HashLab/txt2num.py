import re

def txt2num(string):
    new_strings = list(str(string).lower())
    return [ord(char) for char in new_strings]

def num2txt(num):
    pattern = re.compile(r'^[A-Za-z0-9!@#$&?]$')
    try:
        num = int(num)
        if bool(pattern.match(chr(num))):
            return chr(num)
        else:
            return False
    except ValueError:
        return False

