# ChatGPT Code Snippet Download 🛠️

This JavaScript script enhances code snippet functionality on a ChatGPT-generated website when executed in Chrome Developer Tools. It adds a "Create File" button to code snippet containers, allowing users to download the code with an appropriate file extension based on the detected programming language.

## Features

- Dynamically adds "Create File" buttons to code snippet containers.
- Detects programming language from the container's content.
- Supports JavaScript, HTML, CSS, Python, and defaults to `.txt` for unrecognized languages.
- Utilizes modern browser APIs (`showSaveFilePicker`) for saving files where available, with a fallback for other browsers.

## Screenshots

![Screenshot 1](pic1.png)
![Screenshot 2](pic2.png)

## How to Use in Chrome Developer Tools

### Prerequisites
- Google Chrome browser with Developer Tools.
- Access to a ChatGPT-generated website where code snippets are displayed.

### Integration Steps
1. **Access Chrome Developer Tools**:
   - Open the ChatGPT-generated webpage in Google Chrome.
   - Right-click on the webpage, select "Inspect" to open Developer Tools.

2. **Execute the Script**:
   - Go to the "Console" tab in Developer Tools.
   - Copy and paste the JavaScript code (`script.js`) into the console.
   - Press Enter to execute the script.

3. **Script Execution**:
   - The script will automatically:
     - Add "Create File" buttons to existing code snippet containers.
     - Monitor and add buttons to new containers dynamically (every 3 seconds).
     - Enable downloading of code snippets with the correct file extension when the "Create File" button is clicked.

### Notes
- Ensure your webpage's structure and styling are compatible with the script's selectors for proper functionality.
- The script uses `MutationObserver` to detect and handle new code snippet containers added to the page dynamically.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
