// Variables para rastrear la fila y columna pintadas
let paintedRowIndex = null;
let paintedColIndex = null;

// Selecciona todos los botones en la tabla
const buttons = document.querySelectorAll('.numberButton');

// Agrega un evento de clic a cada botón
buttons.forEach(button => {
    button.addEventListener('click', function () {
        const table = button.closest('table'); // Encuentra la tabla
        const rows = table.querySelectorAll('tr'); // Selecciona todas las filas
        
        // Obtiene la posición del botón dentro de su fila/columna
        const cellIndex = [...button.parentNode.parentNode.cells].indexOf(button.parentNode);
        const rowIndex = [...rows].indexOf(button.closest('tr'));
        
        const row = rows[rowIndex]; // Fila actual

        //Vuelve a la normalidad todos los bordes
        rows.forEach(row => {
            row.querySelectorAll('td, th').forEach(cell => {
                cell.style.border = '';
            });
        });

        // Verifica si hay otros botones en la fila
        const hasOtherButtonsInRow = [...row.querySelectorAll('button')].filter(btn => btn !== button).length > 0;

        // Verifica si hay otros botones en la columna
        const hasOtherButtonsInColumn = Array.from(rows).some(row => {
            const cell = row.cells[cellIndex];
            return cell && cell.querySelector('button') && cell.querySelector('button') !== button;
        });

        
        // Colorea la fila si no tiene otros botones
        if (!hasOtherButtonsInRow) {
            rows.forEach((r, index) => {
                if (index !== rowIndex) {
                    r.querySelectorAll('td, th').forEach(cell => {
                        if (cell.cellIndex !== paintedColIndex) {
                            cell.style.backgroundColor = '';
                            cell.style.color = '';
                        }
                    });
                }
            });

            // Colorea la fila del botón presionado
            row.querySelectorAll('td, th').forEach(cell => {
                cell.style.backgroundColor = '#007198';
                cell.style.color = 'white';
            });
            paintedRowIndex = rowIndex; // Guarda el número de fila pintada
        }
        
        // Colorea la columna si no tiene otros botones
        if (!hasOtherButtonsInColumn) {
            // Limpia las columnas excepto la fila pintada

            rows.forEach((r, index) => {
                if (index !== paintedRowIndex) {
                    r.querySelectorAll('td, th').forEach(cell => {
                        cell.style.backgroundColor = '';
                        cell.style.color = '';
                    });
                }
            });

            rows.forEach(row => {
                const cell = row.cells[cellIndex];
                if (cell) {
                    cell.style.backgroundColor = "#007198";
                    cell.style.color = 'white';
                }
            });

            paintedColIndex = cellIndex; // Guarda el número de columna pintada
        }

        // Resalta la intersección con un color distinto
        const intersectionCell = rows[paintedRowIndex].cells[paintedColIndex];
        if (intersectionCell) {
            intersectionCell.style.border = '6px solid white';
        }
        

        // Imprime las variables para verificar
        console.log(`Fila pintada: ${paintedRowIndex}, Columna pintada: ${paintedColIndex}`);
    });
});
