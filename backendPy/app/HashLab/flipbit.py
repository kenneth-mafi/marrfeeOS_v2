
def flip_bit(bits):
    bits = str(bits)
    return "".join("1" if char == "0" else "0" for char in bits)
