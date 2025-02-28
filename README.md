Spreadsheets

A simple spreadsheet application built with React and React Bootstrap. This project demonstrates basic spreadsheet functionalities such as cell editing, text formatting, data quality actions, and formula evaluation (SUM, MAX, MIN, etc.).



Features
Cell Editing: Enter text, numbers, or formulas (e.g., =SUM(1,2,3)).
Formatting: Toggle bold, italic, and underline; adjust font size; change text and cell background colors; align text (left, center, right).
Data Quality: Trim whitespace, convert text to uppercase or lowercase.
Formula Evaluation: SUM, MAX, MIN, AVG, COUNT.
Installation
Clone the repository:

bash
Copy
git clone https://github.com/ashishmukka209/your-repo.git
cd your-repo


Install dependencies:

npm install

Start the development server:

npm start

Open in your browser:

By default, the app will be running at http://localhost:3000.

Usage
Editing Cells: Click on any cell to edit its content.
Applying Styles:
Click the B, I, or U buttons to toggle bold, italic, or underline on the selected cell.
Choose a font size from the Font Size dropdown.
Use the color pickers for Font Color or Cell Color.
Click Left, Center, or Right to align the cell’s text.
Data Quality:
Trim removes leading/trailing spaces.
UPPER converts the cell’s content to uppercase.
LOWER converts the cell’s content to lowercase.
Formulas:
Type =SUM(1,2,3) to get the sum.
Other supported formulas: =MAX(...), =MIN(...), =AVG(...), =COUNT(...).
