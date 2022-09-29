function checkCashRegister(price, cash, cid) {
  let aws = {
    "status": '',
    "change": []
  };

  let changeDue = (cash - price) * 100;
  const floor = (elem) => Math.floor(elem)

  let avalChange = [[10000, 0], [2000, 0], [1000, 0], [500, 0], [100, 0], [25, 0], [10, 0], [5, 0], [1, 0]];

  let avalChangeTotal = 0
  for (let i in cid) {
    avalChange[cid.length-1-i][1] += cid[i][1]*100/avalChange[cid.length-1-i][0];
    avalChangeTotal += cid[i][1]*100;
  }

  for (let i in cid) {
    if(changeDue <= 0) {
      break;
    }
    let aux = floor(changeDue/avalChange[i][0]);
    console.log(changeDue)

    if (aux > avalChange[i][1]) {

      let change = avalChange[i][0] * avalChange[i][1];
      avalChangeTotal -= change;
      changeDue -= change;
      if (avalChange[i][1] != 0) {
        aws.change.push([cid[avalChange.length-1-i][0], change/100]);
      }

    } else {

      let change = avalChange[i][0] * aux;
      avalChangeTotal -= change;
      changeDue -= change;

      if (aux > 0) {
        aws.change.push([cid[avalChange.length-1-i][0], change/100]);
      }
    }
  }
  console.log()
  if (changeDue > 0) {
    aws.change = [];
    aws.status = "INSUFFICIENT_FUNDS";
  } else if (avalChangeTotal == 0) {
    aws.status = "CLOSED";
    aws.change = cid
  } else {
    aws.status = "OPEN";
  }
  console.log(aws)
  return aws;

}
checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])