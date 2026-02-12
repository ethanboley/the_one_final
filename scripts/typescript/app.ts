
declare global {
    interface Window {
        analyze_file: (content: string, name: string) => Promise<void>;
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

/**
 * Handles the file drop event.
 *
 * @param files The files that were dropped.
 */
async function handleFiles(files: FileList | null) {
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

        try {
            const fileContent = await readFileAsText(file);
            
            // Call the globally exported Python function
            if (typeof window.analyze_file === 'function') {
                window.analyze_file(fileContent, file.name);
            } else {
                console.error("Python analyze_file function not found on window.");
                const errP = document.createElement('p');
                errP.style.color = 'red';
                errP.textContent = "Error: Python analysis engine is still initializing. Please wait a few seconds.";
                fileList.appendChild(errP);
            }
        } catch (error) {
            console.error(`Error reading ${file.name}:`, error);
        }
    }
}

/**
 * Helper to read file as text using Promises
 */
function readFileAsText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = (e) => reject(e.target?.error);
        reader.readAsText(file);
    });
}

export {};
