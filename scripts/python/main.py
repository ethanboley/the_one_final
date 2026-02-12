
import asyncio
import json
from pyscript import document, window
from js import console
from pyodide.ffi import create_proxy
from pyodide.http import pyfetch

# Configuration
API_KEY = "AIzaSyBm0your8tzfTxmPbT2AMv2_VodZgwkRFo"
# Using the confirmed available alias from your 'list_models' output
MODEL_NAME = "gemini-flash-latest" 
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL_NAME}:generateContent?key={API_KEY}"

async def analyze_file(file_content, file_name):
    """Analyzes file content using Gemini REST API."""
    output_div = document.getElementById("output")
    
    # 1MB truncation for stability
    if len(file_content) > 1000000:
        output_div.innerHTML += f"<p style='color: orange;'><strong>Note: {file_name} truncated to 1MB.</strong></p>"
        file_content = file_content[:1000000]

    output_div.innerHTML += f"<p><strong>Analyzing: {file_name}...</strong></p>"
    
    payload = {
        "contents": [{"parts": [{"text": f"Please provide a concise summary and key insights for the following file content: {file_name}\n\n{file_content}"}]}]
    }
    
    try:
        response = await pyfetch(
            url=GEMINI_URL,
            method="POST",
            headers={"Content-Type": "application/json"},
            body=json.dumps(payload)
        )
        
        if response.status == 200:
            data = await response.json()
            ai_text = data['candidates'][0]['content']['parts'][0]['text']
            output_div.innerHTML += f'<div class="analysis-result"><h3>{file_name}</h3><p>{ai_text}</p></div>'
            console.log(f"Successfully analyzed {file_name}")
        else:
            error_data = await response.string()
            console.error(f"API Error: {response.status} - {error_data}")
            output_div.innerHTML += f"<p style='color: red;'>API Error ({response.status})</p>"
    except Exception as e:
        console.error(f"Error: {str(e)}")
        output_div.innerHTML += f"<p style='color: red;'>Error: {str(e)}</p>"

# Initialization
def init():
    console.log("Python Initializing...")
    # Export function to window
    window.analyze_file = create_proxy(analyze_file)
    
    # Show the UI and hide the loader
    loader = document.getElementById("loading-overlay")
    drop_zone = document.getElementById("drop-zone")
    if loader: loader.classList.add("hidden")
    if drop_zone: drop_zone.classList.remove("hidden")
    console.log("Python Ready!")

# Run init
init()
