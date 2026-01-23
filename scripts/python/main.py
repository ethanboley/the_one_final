


from pyscript import document
from pyodide.ffi import create_proxy

def analyze_file(file_content, file_name):
    """
    Analyzes the content of a file.

    Args:
        file_content (str): The content of the file.
        file_name (str): The name of the file.
    """
    print(f"File: {file_name}")
    print(f"Content: {file_content[:100]}...")

    # Example of interacting with the DOM
    output_div = document.getElementById("output")
    output_div.innerHTML += f"<p>Analyzed: {file_name}</p>"


