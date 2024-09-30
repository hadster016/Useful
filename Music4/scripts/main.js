const salesTaxRate = .075;
incMsg = "This site is under construction and will be fully functional soon.";
function product(item, description, price, imgsrc) {
    this.item = item;
    this.description = description;
    this.price = price;
    this.imgsrc = imgsrc;
}

async function printCharacterGrid(docUrl) {
    // Retrieve the document content
    const response = await fetch(docUrl);
    const text = await response.text();


    // Parse the document content

    // Create a temporary HTML element to parse the content
    const tempElement = document.createElement('div');
    tempElement.innerHTML = text;

    // Find the table element within the temporary element

    var table = tempElement.querySelector('table');

    // Make an array from the table
    if (table) {
        const rows = table.querySelectorAll('tr');
        var data = [];
        for (const row of rows) {
            const cells = row.querySelectorAll('td, th');
            const rowData = [];
            for (const cell of cells) {
                rowData.push(cell.textContent.trim());
            }
            data.push(rowData);
        }
       /* alert(data);*/
        
    } else {
        console.error('No table found in the document.');
        return null;
    }

    /* alert(data);*/
    //Remove the text title row;
    data.shift();

    function getMaxValues(tableElement, column1Index, column2Index) {
        let maxColumn1Value = Number.MIN_SAFE_INTEGER;
        let maxColumn2Value = Number.MIN_SAFE_INTEGER;

        // Iterate over each row in the table
        for (let i = 0; i < tableElement.rows.length; i++) {
            const row = tableElement.rows[i];
            const cell1Value = parseInt(row.cells[column1Index].textContent);
            const cell2Value = parseInt(row.cells[column2Index].textContent);

            if (cell1Value > maxColumn1Value) {
                maxColumn1Value = cell1Value;
            }
            if (cell2Value > maxColumn2Value) {
                maxColumn2Value = cell2Value;
            }
        }
        return {
            maxColumn1Value: maxColumn1Value,
            maxColumn2Value: maxColumn2Value
        };
    }

    // Assuming you have a reference to the table element
    const tableElement = table;

    // Get the maximum values from rows 0 and 2
    //Easier fo rme to get the max values from the table than it is from the array data.
    const maxValues = getMaxValues(tableElement, 0, 2);
    //alert(maxValues["maxColumn1Value"]);

    // Determine the grid dimensions
    const maxX = maxValues["maxColumn1Value"];
    const maxY = maxValues["maxColumn2Value"];

    // Create a 2D grid of spaces
    var grid = Array(maxY + 1).fill().map(() => Array(maxX + 1).fill(' '));
    
    for (i = data.length - 1; i >= 0; i--) {
        const char = data[i][1];
        const x = parseInt(data[i][0]);
        const y = parseInt(data[i][2]);
        grid[y][x] = char;
    }
    // as normally row 0 is at the top, we need the max row at the top, otherwise the image will be upside down.
    grid.reverse();

    // Print the grid
    //document.getElementById('output').innerHTML = grid;
    for (const row of grid) {
        document.getElementById('output').innerHTML += "<br />" + row.join();
    }
}


'https://docs.google.com/document/d/e/2PACX-1vSHesOf9hv2sPOntssYrEdubmMQm8lwjfwv6NPjjmIRYs_FOYXtqrYgjh85jBUebK9swPXh_a5TJ5Kl/pub'
//const docUrl = 'https://docs.google.com/document/d/e/2PACX-1vRMx5YQlZNa3ra8dYYxmv-QIQ3YJe8tbI3kqcuC7lQiZm-CSEznKfN_HYNSpoXcZIV3Y_O3YoUB1ecq/pub'; 
//printCharacterGrid(docUrl);