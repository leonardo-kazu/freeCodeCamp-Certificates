function telephoneCheck(str) {
    let regEx1 = /^(1\s?)?\d{3}([-\s]?)\d{3}\2\d{4}$/;
    let regEx2 = /^(1\s?)?\(\d{3}\)\s?\d{3}[-\s]?\d{4}$/;

      if (regEx1.test(str)) {
          return true;
      } else {
        if (regEx2.test(str)) {
          return true;
        } else {
          return false;
        }
      }
  }


  telephoneCheck("555-555-5555");