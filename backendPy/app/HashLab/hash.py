import salt as s
import txt2num as tn
import ieee
import rfc
import flipbit as fb
import hexa as hx

def hash(string, salt=""):
    if not string.strip():
        return
    
    string = str(string).lower()

    if not str(salt).strip():
        salt = s.get_salt()

    mix = string + str(salt)

    mix_lst = rfc.encode_rfc( [ tn.txt2num(char) for char in list(mix) ], 7 )

    bin_mix = [ [ abs( int( ieee.iee_to_dec( fb.flip_bit( ieee.dec_to_ieee( float( num[0] ), 32 ) ) ) ) ) ] for num in mix_lst ]
    
    hex_trans = [ [ hx.decimal_to_hex( num[0] ).lower() ] for num in bin_mix ]

    chopped_arr = [ h[0][:2] for h in hex_trans ]

    norm = rfc.encode_rfc( [ [c] if not tn.num2txt(c) else [ tn.num2txt(c) ] for c in chopped_arr ], 9)

    result = "".join( [ n[0] for n in norm ] )[::-1][:80]
    return result