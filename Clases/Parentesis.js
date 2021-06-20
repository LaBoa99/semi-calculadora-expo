import DataManager from './DataManager';

export default class Parentesis {
    //Fields
    constructor (operation){
        this.operation = operation;
        this.listNodes =  [];
        this.dataManager = this.getAllIndex(this.operation, this.listNodes);
    }
    
    getAllIndex(operation, listNodes){
        const digits = this.operation.split('');
        let posible;
        for(let i = 0; i < digits.length; i++){
            if(operation[i] == '(' || operation[i] == ')'){
                posible = this.recoger(posible, listNodes, digits[i], i)
                if(operation[i] == '('){
                    listNodes.push(posible)
                }
            }
        }
        return new DataManager(operation, listNodes);
    }

    recoger(node, list, data, position){
        if(data == '('){
            node = new Node(position, data);
        } else {
            for(let i = list.length - 1; i >= 0; i--){
                if(!list[i].close){
                    list[i].close = position
                    break;
                }
            }
        }
        return node;
    }


}

class Node {
    constructor(position, parentesis){
        this.close = null;
        this.down = [];
        this.up = null;
        this.position = position;
        this.parentesis = parentesis;
    }
}