import React, { useState, useEffect, useRef } from "react";
import "./App.scss";

const noop = () => {};

function App() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const timer = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(
      (exp) => {
        evaluate(exp);
      },
      500,
      expression
    );
  }, [expression]);

  const append = (op: string) => {
    if (expression.length >= 30) return noop;

    return () => {
      setExpression((exp) => exp + op);
    };
  };

  const expressionFontSize = () => {
    if (expression.length <= 10) {
      return "40px";
    } else if (expression.length <= 20) {
      return 40 - (expression.length - 10) * 1.5 + "px";
    } else if (expression.length <= 30) {
      return 25 - (expression.length - 20) + "px";
    } else {
      return "15px";
    }
  };

  const clear = () => {
    setExpression("");
    setResult("");
  };
  const backspace = () => {
    setExpression((exp) => exp.slice(0, -1));
  };
  const evaluate = (expression: string) => {
    const exp = expression
      .replace(/×/gi, "*")
      .replace(/÷/gi, "/")
      .replace(/%/gi, "*0.01");
    try {
      // eslint-disable-next-line
      const ifexp = eval(exp);
      setResult(ifexp.toString());
    } catch {}
  };
  const equal = () => {
    if (result) setExpression(result);
    setResult("");
  };

  return (
    <div className="calculator">
      <div className="calculator__header">
        <div className="expression" style={{ fontSize: expressionFontSize() }}>
          {expression}
        </div>
        <div className="result">{result}</div>
      </div>
      <div className="calculator__body">
        <button className="button--ac" onClick={clear}>
          AC
        </button>
        <button className="button--backspace" onClick={backspace}>
          &#9003;
        </button>
        <button className="button--divide" onClick={append("÷")}>
          ÷
        </button>
        <button className="button--times" onClick={append("×")}>
          ×
        </button>
        <button className="button--minus" onClick={append("-")}>
          -
        </button>
        <button className="button--plus" onClick={append("+")}>
          +
        </button>
        <button className="button--dot" onClick={append(".")}>
          .
        </button>
        <button className="button--equal" onClick={equal}>
          =
        </button>
        <button className="button--percent" onClick={append("%")}>
          %
        </button>
        <button className="button--number--0" onClick={append("0")}>
          0
        </button>
        <button className="button--number--1" onClick={append("1")}>
          1
        </button>
        <button className="button--number--2" onClick={append("2")}>
          2
        </button>
        <button className="button--number--3" onClick={append("3")}>
          3
        </button>
        <button className="button--number--4" onClick={append("4")}>
          4
        </button>
        <button className="button--number--5" onClick={append("5")}>
          5
        </button>
        <button className="button--number--6" onClick={append("6")}>
          6
        </button>
        <button className="button--number--7" onClick={append("7")}>
          7
        </button>
        <button className="button--number--8" onClick={append("8")}>
          8
        </button>
        <button className="button--number--9" onClick={append("9")}>
          9
        </button>
      </div>
    </div>
  );
}

export default App;
