
/*
    NOTAS CALCULADORA
    - Rempalzar ( -- ) con +
    - splice(start, countStart, insert)

    JERARQUIA
    > Parentesis, 
    > Exponentes y Raices, 
    > Multiplicaciones, divisiones, 
    > Adiciones, substraciones
*/

export default class Logica {
  
  // EXPR_1 = /(?<=[-+/*^])|(?=[-+/*^])/g;
  // EXPR_2 = new RegExp("--", "g");
  // EXPR_3 = new RegExp("-\\+|\\+-", "g")
  // EXPR_4 = new RegExp("\\+\\+", "g")

  // the pussy js dont like look behind
  //EXPR_1 = new RegExp('(?<=[-+/*^])|(?=>[-+/*^])', 'g')
  EXPR_2 =  /--/g
  EXPR_3 =  /-\+|\+-/g
  EXPR_4 = /\+\+/g
  EXPR_5 = /\s/g

  JERARQUIA = ['r','^','*', '/', '+', '-']

  constructor(){
    this.historial = [];
  }

  initCalculate(operation){
      let i = 0;
      let lastLength = operation.length;
      operation = operation.replace(this.EXPR_2, '+')
                          .replace(this.EXPR_3, '-')
                          .replace(this.EXPR_4, '+')
                          .replace(this.EXPR_5, '')

      operation = this.arrSplit(operation);
      console.log(operation)
      while(i < this.JERARQUIA.length){
          if(operation[0] == '-'){
              operation.splice(0,2,-operation[1])
          }
          //Calculacodar
          operation = this.calculate(operation, this.JERARQUIA[i], this.JERARQUIA[i+1]);
          if(operation.length == 1){
              //En Caso de que sea un numero solitario
              if(this.historial.length < 1){
                this.historial.push({
                  operation: operation,
                  reduction: operation,
                  result: operation,
                })
              }
              this.historial[this.historial.length - 1].result = operation
              break;
          }
          //console.log(i, operation)
          if(operation.length == lastLength){
              i+=2;
          }
          if(operation.length !== lastLength){

              if(this.historial.length > 1)
                this.historial[this.historial.length - 1].result = operation
              this.lastIndex += 1;
              lastLength = operation.length;
          }
      }

      return operation[0];
  }

  calculate(arr, op, op2){
      for (let i = 0; i < arr.length; i++) {
          if(arr[i] == op){
            this.arrSplice(arr, i, op)
            break;
          }
          else if(arr[i] === op2){

            this.arrSplice(arr, i, op2)
            break;
          }
      }
      return arr;
  }

  arrSplice(arr, i, op){
      this.historial.push({operation: arr.join(' ')});
      if(arr[i+1] == '-')
          arr.splice(i - 1, 4, this.operation(Number(arr[i-1]), Number(-arr[i+2]), op))
      else 
          arr.splice(i - 1, 3, this.operation(Number(arr[i-1]), Number(arr[i+1]), op))
  }

  operation(num, num2, op){
      this.historial[this.historial.length - 1].reduction = num + op + num2;
      switch(op){
          case '^': return Math.pow(num, num2);
          case '*': return num * num2;
          case '/': return num / num2;
          case '+': return num + num2;
          case '-': return num - num2;
      }
      return "Syntax Error";
  }

  arrSplit(operation){
    let arr = []
    let tempArr = operation.split('')
    let number = ''
    let i = 0;

    if(tempArr[0] == '-')
      i--

    for(let digit of tempArr){
      if(digit >= 0 || digit == '.'){
        arr[i] = number += digit;
      } else {
        arr.push(digit)
        i+= 2
        number = ''
      }
    }
    return arr;
  }
}

