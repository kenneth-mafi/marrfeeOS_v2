def float_to_bin(num, precision):
    split_num = str(num).split('.')
    frac_len = len(split_num[1])

    decimal_part =  abs(int(num))
    fractional_part = abs(num) - decimal_part
    fractional_part = round(fractional_part, frac_len)
    dec_num_to_binary = bin(decimal_part).replace('0b', '')
    frac_num_to_binary = ''

    if fractional_part == 0:
        split_frac_part = str(fractional_part).split('.')
        return dec_num_to_binary + ('.' + split_frac_part[1])
    else:
        while fractional_part > 0 and (len(frac_num_to_binary ) + len(dec_num_to_binary)) < precision:
            fractional_part *= 2
            bit = int(fractional_part)
            if bit == 1:
                fractional_part -= bit
                frac_num_to_binary += '1'
            else:
                frac_num_to_binary += '0'
        return dec_num_to_binary + ('.' + frac_num_to_binary)
    


def format_ieee(num, sign, bits, exponent):
    if bits == 32:
        exponent_bits = 8
        exponent_bias = 127
        mantissa_precision = 23
    elif bits == 64:
        exponent_bits = 11
        exponent_bias = 1023
        mantissa_precision = 52

    split_result = str(num).split('.')
    mantissa = split_result[1]
    if float(num) != 0:
        exponent = exponent + exponent_bias
    final_format = f"{int(sign)}{bin(exponent).replace('0b', '').zfill(exponent_bits)}{mantissa.ljust(mantissa_precision, '0')}"
    return final_format


def move_decimal(section, old_index, exponent, is_neg_exp):
    new_index = section.index('1') + 1
    new_decimal = list(section)
    new_decimal.insert(new_index, '.')
    if not is_neg_exp:
        exponent += (old_index - new_index)
    else:
        exponent += ((old_index - new_index) - 1)
    return new_decimal, exponent



def extract_exponent(num):
    split_num = str(num).split('e')
    number = split_num[0]
    exponent = split_num[1]
    return number, exponent


def dec_to_ieee(num: float, bits: int):
    if 'e' in str(num):
        num, exponent = extract_exponent(num)
    else:
        exponent = 0
    num = float(num)
    exponent = int(exponent)
    sign = False
    if '-' in str(num):
        sign = True
    if bits == 32:
        precision = 23
    elif bits == 64:
        precision = 52
    binary_num = float_to_bin(num, precision)
    old_index = str(binary_num).index('.')
    split_num = str(binary_num).split('.')
    
    if len(split_num[0])  >= 1 and '1' in split_num[0]:
        is_neg_exp = False
        new_decimal, exponent = move_decimal(split_num[0], old_index, exponent, is_neg_exp)
        result = f"{''.join(new_decimal)}{split_num[1]}"
        final_format = format_ieee(result, sign, bits, exponent)
        return final_format
    
    elif len(split_num[0]) >= 1 and '1' not in split_num[0]:
        is_neg_exp = True
        if len(split_num[1]) >= 1 and '1' in split_num[1]:
            new_decimal, exponent = move_decimal(split_num[1], old_index, exponent, is_neg_exp)
            result = f"{''.join(new_decimal)}"
            final_format = format_ieee(result, sign, bits, exponent)
            return final_format
        
        elif '1' not in split_num[1]:
            result = str(binary_num)
            final_format = format_ieee(result, sign, bits, exponent)
            
            return final_format
        

def bin_fraction_to_decimal(bstr):
    if '.' not in bstr:
        return int(bstr, 2)

    int_part, frac_part = bstr.split('.')
    value = int(int_part, 2)

    for i, bit in enumerate(frac_part, start=1):
        value += int(bit) * (2 ** -i)

    return value


def iee_to_dec(num):
    exp_bit_len = 8 if len(num) == 32 else 11
    exp_bias = 127 if exp_bit_len == 8 else 1023

    sign = -1 if num[0] == '1' else 1
    exponent_bits = num[1:1+exp_bit_len]
    mantissa_bits = num[1+exp_bit_len:]

    exponent = int(exponent_bits, 2) - exp_bias

    mantissa = "1." + mantissa_bits

    mantissa_list = list(mantissa)
    dot = mantissa_list.index('.')
    new_pos = dot + exponent
    mantissa_list.pop(dot)
    mantissa_list.insert(new_pos, '.')
    mantissa = ''.join(mantissa_list)

    return sign * bin_fraction_to_decimal(mantissa)
