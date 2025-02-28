import React, { useState } from "react";
import { Form, Button, Table, Dropdown, DropdownButton } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Spreadsheet.css";

const Spreadsheet = () => {
  const [data, setData] = useState([
    ["", "", "","",""],
    ["", "", "","",""],
    ["", "", "","",""],
    ["", "", "","",""],
    ["", "", "","",""],
    ["", "", "","",""],
    ["", "", "","",""],
    ["", "", "","",""],
    ["", "", "","",""],
    ["", "", "","",""],
    ["", "", "","",""],
    ["", "", "","",""],
  ]);

  const [cellStyles, setCellStyles] = useState({});
  const [selectedCell, setSelectedCell] = useState(null);

  const handleInputChange = (rowIndex, colIndex, value) => {
    const newData = [...data];
    newData[rowIndex][colIndex] = value;
    setData(newData);
    setSelectedCell([rowIndex, colIndex]);
  };

  const handleBlur = (rowIndex, colIndex) => {
    const value = data[rowIndex][colIndex];
    if (typeof value === "string" && value.startsWith("=")) {
      const result = evaluateFormula(value, data);
      const newData = [...data];
      newData[rowIndex][colIndex] = result;
      setData(newData);
    }
  };

  
  const toggleStyleToCell = (styleProperty, value) => {
    if (!selectedCell) return;
    const [row, col] = selectedCell;

    setCellStyles((prevStyles) => {
      const newStyles = { ...prevStyles };
      const currentStyle = prevStyles[`${row}-${col}`] || {};
      let toggleValue;
      if (styleProperty === "fontWeight" || styleProperty === "fontStyle") {
        
        toggleValue = currentStyle[styleProperty] === value ? "normal" : value;
      } else {
        
        toggleValue = currentStyle[styleProperty] === value ? "none" : value;
      }
      newStyles[`${row}-${col}`] = {
        ...currentStyle,
        [styleProperty]: toggleValue,
      };
      return newStyles;
    });
  };


  const applyStyleToCell = (styleProperty, value) => {
    if (!selectedCell) return;
    const [row, col] = selectedCell;

    setCellStyles((prevStyles) => ({
      ...prevStyles,
      [`${row}-${col}`]: {
        ...(prevStyles[`${row}-${col}`] || {}),
        [styleProperty]: value,
      },
    }));
  };

  
  const evaluateFormula = (formula, currentData) => {
    try {
      if (!formula.startsWith("=")) return formula;
      const expression = formula.substring(1).toUpperCase().trim();

      if (expression.startsWith("SUM(")) {
        return sumFunction(expression, currentData);
      } else if (expression.startsWith("MAX(")) {
        return maxFunction(expression, currentData);
      } else if (expression.startsWith("MIN(")) {
        return minFunction(expression, currentData);
      } else if (expression.startsWith("AVG(")) {
        return avgFunction(expression, currentData);
      } else if (expression.startsWith("COUNT(")) {
        return countFunction(expression, currentData);
      } else {
        return formula; 
      }
    } catch (error) {
      return "Error!";
    }
  };

  const extractValues = (expression, currentData) => {
    const match = expression.match(/\(([^)]+)\)/);
    if (match) {
      return match[1].split(",").map((item) => {
        item = item.trim();
        return parseFloat(item) || 0;
      });
    }
    return [];
  };

  const trimCell = () => {
    if (!selectedCell) return;
    const [row, col] = selectedCell;
    const trimmedValue = data[row][col].trim();
    handleInputChange(row, col, trimmedValue);
  };

  const convertToUpper = () => {
    if (!selectedCell) return;
    const [row, col] = selectedCell;
    const upperValue = data[row][col].toUpperCase();
    handleInputChange(row, col, upperValue);
  };

  const convertToLower = () => {
    if (!selectedCell) return;
    const [row, col] = selectedCell;
    const lowerValue = data[row][col].toLowerCase();
    handleInputChange(row, col, lowerValue);
  };

  const sumFunction = (expression, currentData) => {
    const numbers = extractValues(expression, currentData);
    return numbers.length
      ? numbers.reduce((acc, num) => acc + num, 0)
      : "Invalid SUM!";
  };

  const maxFunction = (expression, currentData) => {
    const numbers = extractValues(expression, currentData);
    return numbers.length ? Math.max(...numbers) : "Invalid MAX!";
  };

  const minFunction = (expression, currentData) => {
    const numbers = extractValues(expression, currentData);
    return numbers.length ? Math.min(...numbers) : "Invalid MIN!";
  };

  const avgFunction = (expression, currentData) => {
    const numbers = extractValues(expression, currentData);
    return numbers.length
      ? numbers.reduce((acc, num) => acc + num, 0) / numbers.length
      : "Invalid AVG!";
  };

  const countFunction = (expression, currentData) => {
    const numbers = extractValues(expression, currentData);
    return numbers.length;
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center">Spreadsheets</h3>

      <div className="toolbar">
        
        <Button
          variant="outline-dark"
          onClick={() => toggleStyleToCell("fontWeight", "bold")}
        >
          B
        </Button>
        <Button
          variant="outline-dark"
          onClick={() => toggleStyleToCell("fontStyle", "italic")}
        >
          I
        </Button>
        <Button
          variant="outline-dark"
          onClick={() => toggleStyleToCell("textDecoration", "underline")}
        >
          U
        </Button>

        
        <DropdownButton id="dropdown-basic-button" title="Font Size">
          {[10, 12, 14, 16, 18, 20, 24, 28].map((size) => (
            <Dropdown.Item
              key={size}
              onClick={() => applyStyleToCell("fontSize", `${size}px`)}
            >
              {size}px
            </Dropdown.Item>
          ))}
        </DropdownButton>


        <div className="color-picker">
          <label>Font Color</label>
          <input
            type="color"
            onChange={(e) => applyStyleToCell("color", e.target.value)}
          />
        </div>

        
        <div className="color-picker">
          <label>Cell Color</label>
          <input
            type="color"
            onChange={(e) =>
              applyStyleToCell("backgroundColor", e.target.value)
            }
          />
        </div>


        <Button
          variant="outline-dark"
          onClick={() => applyStyleToCell("textAlign", "left")}
        >
          Left
        </Button>
        <Button
          variant="outline-dark"
          onClick={() => applyStyleToCell("textAlign", "center")}
        >
          Center
        </Button>
        <Button
          variant="outline-dark"
          onClick={() => applyStyleToCell("textAlign", "right")}
        >
          Right
        </Button>

        
        <DropdownButton id="dropdown-basic-button" title="Data Quality">
          <Dropdown.Item onClick={trimCell}>Trim</Dropdown.Item>
          <Dropdown.Item onClick={convertToUpper}>UPPER</Dropdown.Item>
          <Dropdown.Item onClick={convertToLower}>LOWER</Dropdown.Item>
        </DropdownButton>
      </div>

      <div className="spreadsheet-container">
        <Table bordered className="spreadsheet-table">
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => {
                  const cellKey = `${rowIndex}-${colIndex}`;
                  return (
                    <td key={colIndex} className="spreadsheet-cell">
                      <Form.Control
                        className="spreadsheet-input"
                        type="text"
                        value={cell}
                        style={cellStyles[cellKey] || {}}
                        onChange={(e) =>
                          handleInputChange(rowIndex, colIndex, e.target.value)
                        }
                        onBlur={() => handleBlur(rowIndex, colIndex)}
                        onFocus={() => setSelectedCell([rowIndex, colIndex])}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Spreadsheet;
