module.exports = function convert2Base64(num) {
  const base64 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 0, 1, 2, 3, 4, 5 ,6, 7, 8, 9, '+', '-']
  
  let result = []
  if (num === 0) return 'A'
  while (num) {
    const remainder = num % 64
    result.unshift(base64[remainder]) 
    num = parseInt(num / 64)
  }
  
  return result.join('')
}