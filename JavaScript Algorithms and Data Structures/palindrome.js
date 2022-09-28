function palindrome(str) {
    str = str.toLowerCase()
    str = str.replaceAll(/[^A-Za-z0-9]/g, "")
    for (let i = 0; i < str.length/2; i++) {
      if (str[i]!=str[str.length-i-1]){
        return false;
      }
    }
  
  
    return true;
  }
  
  console.log(palindrome("E y     e"));