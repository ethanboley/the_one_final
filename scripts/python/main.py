import js

def analyze_file(file_content, filename):
    js.console.log(f"Python received file: {filename}")
    js.console.log(f"Content snippet: {file_content[:100]}...")
    analysis_result = f"Analysis of '{filename}' completed in Python. Content length: {len(file_content)} chars."
    js.document.getElementById('python-output').innerHTML = f"<h3>Analysis Result:</h3><p>{analysis_result}</p>"
    return analysis_result

print("Hello from PyScript! Python environment ready.")
