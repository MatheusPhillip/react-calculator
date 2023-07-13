import React, {Component} from "react";
import './Calculator.css';
import Button from "../components/Button";
import Display from "../components/Display";
import { clear } from "@testing-library/user-event/dist/clear";

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    currentIndexValue: 0
}


export default class Calculator extends Component {

    state = {...initialState}

    constructor(props){
        super(props);
        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
    }

    clearMemory(){
        this.setState({...initialState})
    }

    calculateOperation(operator){
        const currentOperation = this.state.operation
        const values = [...this.state.values]
        switch(currentOperation){
            case '+':
                values[0] = values[0] + values[1]
                break;
            case '-':
                values[0] = values[0] - values[1]
                break;
            case '*':
                values[0] = values[0] * values[1]
                break;
            case '/':
                values[0] = values[0] / values[1]
                break;
            default:
                values[0] = this.state.values[0];
        }
        values[1] = 0
        return values
    }

    setOperation(operator){
        if(this.state.currentIndexValue === 0){
            this.setState({operation: operator, currentIndexValue:1, clearDisplay: true})
        }
        else{
            const finishOperation = operator === '='
            const values = this.calculateOperation(operator)

            this.setState({
                displayValue: values[0],
                operation: finishOperation ? null : operator,
                currentIndexValue: finishOperation ? 0 : 1,
                clearDisplay: !finishOperation,
                values
            })
        }
    }

    addDigit(element){
        if(element === '.' && this.state.displayValue.includes('.')){
            return
        }
        let currentValue
        let displayValue
        let clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay
        
        if(element === '.' && clearDisplay){
            clearDisplay = false
        }
        
        currentValue = clearDisplay ? '' :this.state.displayValue
        displayValue = currentValue + element
        this.setState({displayValue, clearDisplay: false})

        if(element !== '.'){
            const arrayIndex = this.state.currentIndexValue
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[arrayIndex] = newValue
            this.setState({values})
        }
    }

    render(){
        return (
            <div className="calculator">
                <Display value={this.state.displayValue}></Display>
                <Button label="AC" click={this.clearMemory} triple/>
                <Button label='/' click={this.setOperation} operation/>
                <Button label='7' click={this.addDigit}/>
                <Button label='8' click={this.addDigit}/>
                <Button label='9' click={this.addDigit}/>
                <Button label='*' click={this.setOperation} operation/>
                <Button label='4' click={this.addDigit}/>
                <Button label='5' click={this.addDigit}/>
                <Button label='6' click={this.addDigit}/>
                <Button label='-' click={this.setOperation} operation/>
                <Button label='1' click={this.addDigit}/>
                <Button label='2' click={this.addDigit}/>
                <Button label='3' click={this.addDigit}/>
                <Button label='+' click={this.setOperation} operation/>
                <Button label='0' click={this.addDigit} double/>
                <Button label='.' click={this.addDigit}/>
                <Button label='=' click={this.setOperation} operation/>
            </div>
        )
    }
}