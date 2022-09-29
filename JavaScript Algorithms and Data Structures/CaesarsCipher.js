function rot13(str) {
    let plainText = "NOPQRSTUVWXYZABCDEFGHIJKLM";
    let key = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let aws = '';
    for (let i in str) {
      if (str[i].match(/[A-Z]/)) {
        let char = plainText.indexOf(str[i]);
        aws += key[char];
      } else {
        aws += str[i];
      }

    }
    return aws;
  }

  rot13("SERR PBQR PNZC");