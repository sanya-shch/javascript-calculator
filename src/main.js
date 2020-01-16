import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

import './style.css';

const App = () => {

    const [allInput, setAllInput] = useState("");
    const [currentInput, setCurrentInput] = useState("0");
    const [isPoint, setIsPoint] = useState(false);
    const [isEquals, setIsEquals] = useState(false);

    useEffect(() => {
        console.log(currentInput)
    }, [currentInput]);

    const numeralClickHandler = (num) => {
        isequals();

        if(currentInput === "+" || currentInput === "-" || currentInput === "*" || currentInput === "/") {
            setAllInput((prev) => prev + " " + currentInput);
            setCurrentInput(num)
        } else if(currentInput === "0") {
            setCurrentInput(num)
        } else {
            setCurrentInput((prev) => prev + num)
        }
    };

    const pointClickHandler = () => {
        isequals();

        if(!isPoint) {
            setCurrentInput((prev) => prev + ".");
            setIsPoint(true)
        }
    };

    const clearClickHandler = () => {
        setAllInput("");
        setCurrentInput("0");
        setIsPoint(false);
        setIsEquals(false);
    };

    const delClickHandler = () => {
        isequals();

        if(currentInput.slice(-1) === ".") {
            setCurrentInput((prev) => prev.slice(0, -1));
            setIsPoint(false)
        } else {
            setCurrentInput((prev) => {
                if(prev.length === 1) {
                    return "0"
                } else {
                    return prev.slice(0, -1)
                }
            })
        }
    };

    const plusMinusClickHandler = () => {
        isequals();

        setCurrentInput((prev) => {
            if(prev.slice(0, 1) === "-") {
                return prev.slice(1)
            } else {
                return "-" + prev
            }
        })
    };

    const operationClickHandler = (opr) => {
        isequals();

        if(currentInput === "+" || currentInput === "-" || currentInput === "*" || currentInput === "/") {
            setCurrentInput(opr);
        } else {
            setAllInput((prev) => prev + " " + currentInput);
            setCurrentInput(opr);
        }
    };

    const equalsClickHandler = () => {
        const arr = allInput.split(" ");

        if(arr.length >= 3) {
            setAllInput((prev) => prev + " " + currentInput);

            let c = allInput.trimLeft() +  " " + currentInput;

            c = Math.round(count(c.split(" "))[0] *10000) / 10000;

            setCurrentInput("" + c);
            setIsEquals(true)
        }
    };

    const count = (arr) => {
        if(arr.indexOf("*") !== -1 && arr.indexOf("/") !== -1) {
            if(arr.indexOf("*") < arr.indexOf("/")) {
                const index = arr.indexOf("*");
                return count( [...arr.slice(0, index-1), arr[index-1]*1 * arr[index+1], ...arr.slice(index+2)])
            } else {
                const index = arr.indexOf("/");
                return count( [...arr.slice(0, index-1), arr[index-1]*1 / arr[index+1], ...arr.slice(index+2)])
            }
        } else if(arr.indexOf("*") !== -1) {
            const index = arr.indexOf("*");
            return count( [...arr.slice(0, index-1), arr[index-1]*1 * arr[index+1], ...arr.slice(index+2)])
        } else if(arr.indexOf("/") !== -1) {
            const index = arr.indexOf("/");
            return count( [...arr.slice(0, index-1), arr[index-1]*1 / arr[index+1], ...arr.slice(index+2)])
        } else if(arr.indexOf("+") !== -1) {
            const index = arr.indexOf("+");
            return count( [...arr.slice(0, index-1), arr[index-1]*1 + arr[index+1]*1, ...arr.slice(index+2)])
        } else if(arr.indexOf("-") !== -1) {
            const index = arr.indexOf("-");
            return count( [...arr.slice(0, index-1), arr[index-1]*1 - arr[index+1], ...arr.slice(index+2)])
        } else {
            return arr
        }
    };

    const isequals = () => {
        if(isEquals) {
            setAllInput("");
            setIsEquals(false)
        }
    };

    return (
        <div id="calculator">

            <div id="all-input">{allInput}</div>
            <div id="current-input">{currentInput}</div>

            <div id="clear" className="button" onClick={() => clearClickHandler()}>C</div>
            <div id="del" className="button" onClick={() => delClickHandler()}>{'<-'}</div>
            <div id="plus-minus" className="button" onClick={() => plusMinusClickHandler()}>±</div>

            <div  id="zero" className="button" onClick={() => numeralClickHandler("0")}>0</div>
            <div id="one" className="button" onClick={() => numeralClickHandler("1")}>1</div>
            <div id="two" className="button" onClick={() => numeralClickHandler("2")}>2</div>
            <div id="three" className="button" onClick={() => numeralClickHandler("3")}>3</div>
            <div id="four" className="button" onClick={() => numeralClickHandler("4")}>4</div>
            <div id="five" className="button" onClick={() => numeralClickHandler("5")}>5</div>
            <div id="six" className="button" onClick={() => numeralClickHandler("6")}>6</div>
            <div id="seven" className="button" onClick={() => numeralClickHandler("7")}>7</div>
            <div id="eight" className="button" onClick={() => numeralClickHandler("8")}>8</div>
            <div id="nine" className="button" onClick={() => numeralClickHandler("9")}>9</div>

            <div id="decimal" className="button" onClick={() => pointClickHandler()}>.</div>

            <div id="add" className="button" onClick={() => operationClickHandler("+")}>+</div>
            <div id="subtract" className="button" onClick={() => operationClickHandler("-")}>-</div>
            <div id="multiply" className="button" onClick={() => operationClickHandler("*")}>*</div>
            <div id="divide" className="button" onClick={() => operationClickHandler("/")}>/</div>

            <div id="equals" className="button" onClick={() => equalsClickHandler()}>=</div>

        </div>
    )
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);