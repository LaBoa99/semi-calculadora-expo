//Clases para los parentesis
import Logica from './Logica';
import Parentesis from './Parentesis';

const LOGICA = new Logica();

export default class DataManager{

    constructor(operation, head, linkedList = null) {
        this.head = head;
        this.operation = operation;
        this.linkedList = this.sortNodeList();
    }

    init(){
      LOGICA.historial = []
      if(!this.verify(this.head)){
        return ['Syntax Error', null]
      }
      return [this.solve(this.operation, this.head, this.linkedList), LOGICA.historial]
    }

    solve(operation, head, linkedList){
        
        //Parentesis 
        if(head.length >= 1){
            const branch = linkedList[0];
            operation = this.solveBranch(branch, operation);
            let update = this.updatePositions(operation)
            return this.solve(update.operation, update.head, update.linkedList)
        }
        return LOGICA.initCalculate(operation);
    }

    solveBranch(branch, operation){
        const current = this.findLower(branch)
        operation = this.solveOperation(operation, current.position, current.close)
        return this.updateSymbol(operation);
    }

    updateSymbol(operation){
        const index = operation.indexOf('X');
        operation = operation.split('')
        const resultSymbol = operation[index + 1];
        const leftSymbol = operation[index - 1];
        let symbol = '*';

        switch(leftSymbol){
          case '-': case '+':
            symbol = resultSymbol !== '-' ? '+' : '-';
            break;
          case '/': case '*':
            symbol = ''
            break;
        }

        operation[index] = symbol
        return operation.reduce((a, b) => a + b)
    }

    updatePositions(operation){
        let parents = new Parentesis(operation);
        let update = {
            head: parents.dataManager.head,
            operation: parents.dataManager.operation,
            linkedList: parents.dataManager.linkedList
        }
        return update;
    }

    solveOperation(string, start, end){
        const head = string.substring(0, start);
        const replace = LOGICA.initCalculate(string.substring(start + 1, end));
        const tail  = string.substring(end + 1, string.length);
 
        //Elimina la parte que se va a remplazar
        string.substring(start, end + 1);
        return head.length >= 1 ? head + 'X' + replace + tail : head + replace + tail;
    }
    
    sortNodeList(){
        let temp = []
        let lastNode = this.head[0]
        let lastParent = null;
        for(let i = 0; i < this.head.length ; i++){
            if(this.head[i].close < lastNode.close){
                lastParent = lastNode;
                this.head[i].up = lastParent;
                lastNode = this.head[i];
            } 
            if (lastParent && this.head[i].close <= lastParent.close){
                this.head[i].up = lastParent;
                lastNode = this.head[i];
                lastParent.down.push(lastNode);
                let a = this.findUpper(lastNode);
                if(a !== temp[temp.length - 1]){
                    temp.push(a)
                }
            } else {
                lastParent = this.head[i]
                lastNode = lastParent
                temp.push(this.findUpper(lastParent));
            }
        }
        return temp;
    }

    verify(listNodes){
      for(let a of listNodes){
        if(a.close == null){
          return false
        }
      }
      return true
    }

    findUpper(node){
        let last = node;
        if(last){
            while(last.up){
                last = last.up;
            }
        }
        return node;
    }

    findLower(node){
        let last = node;
        if(last.down.length){
            while(last.down.length){
                last = last.down[0]
            }
        }
        return last;
        //if(node !== null && node.down.length >= 1)
            //return this.findLower(node.down[0])
       // return node
    }

}