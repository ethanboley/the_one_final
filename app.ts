declare global {
    interface Window {
        pyscript: any; // Or a more specific type if available
    }
}

const dropZone = document.getElementById('drop-zone') as HTMLDivElement;
const fileInput = document.getElementById('file-input') as HTMLInputElement;
const fileList = document.getElementById('file-list') as HTMLDivElement;

if (dropZone && fileInput && fileList) {
    // Open file dialog when drop zone is clicked
    dropZone.addEventListener('click', () => {
        fileInput.click();
    });

    // Handle file selection from dialog
    fileInput.addEventListener('change', () => {
        handleFiles(fileInput.files);
    });

    // Drag and drop event listeners
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        const files = e.dataTransfer?.files;
        if (files) {
            handleFiles(files);
        }
    });
}

function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) {
        return;
    }
    
    fileList.innerHTML = '<h4>Dropped Files:</h4>';
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(`File added: ${file.name}, Size: ${file.size}`);
        const p = document.createElement('p');
        p.textContent = `${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
        fileList.appendChild(p);

        const reader = new FileReader();
        reader.onload = (e) => {
            const fileContent = e.target?.result as string;
            // Ensure pyscript is loaded before attempting to call Python functions
            if (window.pyscript && window.pyscript.interpreter) {
                window.pyscript.interpreter.globals.get('analyze_file')(fileContent, file.name);
            } else {
                console.error("PyScript interpreter not ready.");
            }
        };
        reader.onerror = (e) => {
            console.error("Error reading file:", e.target?.error);
        };
        reader.readAsText(file); // Read file content as text
    }
}
