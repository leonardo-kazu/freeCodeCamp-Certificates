function convertToRoman(num) {
    num = Array.from(num.toString(), Number)
    const str = [];
    const first = num[num.length - 1];
    const second = num[num.length - 2];
    const third = num[num.length - 3];
    const fourth = num[num.length - 4];
    console.log(third)

    if (first < 4) {
      str.unshift("I".repeat(first));
    } else if (first === 4) {
      str.unshift("IV");
    } else if (first < 9) {
      str.unshift("I".repeat(first - 5))
      str.unshift("V");
    } else if (first === 9) {
      str.unshift("IX")
    }

    if (second < 4) {
      str.unshift("X".repeat(second));
    } else if (second === 4) {
      str.unshift("XL");
    } else if (second < 9) {
      str.unshift("X".repeat(second - 5))
      str.unshift("L");
    } else if (second === 9) {
      str.unshift("XC")
    }

    if (third < 4) {
      str.unshift("C".repeat(third));
    } else if (third === 4) {
      str.unshift("CD");
    } else if (third < 9) {
      str.unshift("C".repeat(third - 5))
      str.unshift("D");
    } else if (third === 9) {
      str.unshift("CM")
    }

    if (fourth < 4) {
      str.unshift("M".repeat(fourth));
    }


    return str.join().replaceAll(",", "");
  }

  convertToRoman(16);