def decimal_to_hex(quotient):

    hex_digits = "0123456789ABCDEF"
    hexadecimal_string = ""

    if quotient == 0:
        print("0")
        return "0"
    

    while quotient > 0:
        remainder = int(quotient) % 16
        quotient = int(quotient) // 16

        hex_digit = hex_digits[remainder]

        hexadecimal_string = hex_digit + hexadecimal_string

    return hexadecimal_string