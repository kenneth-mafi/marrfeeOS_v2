
def encode_rfc(arrays, n):
    if n <= 1 or len(arrays) <= n:
        return arrays
    
    rails = [[] for _ in range(n)]
    v = 0
    direction = 1  

    for array in arrays:
        rails[v].append(array)
        if v == 0:
            direction = 1
        elif v == n - 1:
            direction = -1
        v += direction
    
    arr = []
    for i in range(len(rails)):
        for j in range(len(rails[i])):
            arr.append(rails[i][j])
    return arr

