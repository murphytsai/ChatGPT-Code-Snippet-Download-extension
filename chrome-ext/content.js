// content.js

function debugLog(message) {
  console.log(`[${new Date().toISOString()}] ${message}`);
}

function addCreateFileButton(container) {
  if (container.querySelector('#update-vscode-btn')) {
    debugLog('Create File button already exists in this container');
    return;
  }

  debugLog('Adding Create File button to container');

  const createFileBtn = document.createElement('button');
  createFileBtn.textContent = 'Create File';
  createFileBtn.id = 'update-vscode-btn';
  createFileBtn.style.cssText = `
    padding: 2px 10px;
    border: none;
    border-radius: 20px;
    color: #fff;
    background-color: #28a745;
    font-weight: 300;
    margin-right: 10px;
  `;

  createFileBtn.addEventListener('click', () => handleCreateFile(container));

  const actionsDiv = container.querySelector('.flex.items-center');
  if (actionsDiv) {
    actionsDiv.insertBefore(createFileBtn, actionsDiv.firstChild);
    debugLog('Create File button added successfully');
  } else {
    debugLog('Actions div not found in container');
  }
}

async function handleCreateFile(container) {
  debugLog('Create File button clicked');

  // Find the code content
  const codeElement = container.nextElementSibling;
  if (!codeElement || !codeElement.textContent) {
    debugLog('Code content not found');
    return;
  }

  const codeContent = codeElement.textContent;
  debugLog(`Code content length: ${codeContent.length} characters`);

  const languageSpan = container.querySelector('span');
  const language = languageSpan ? languageSpan.textContent.trim().toLowerCase() : '';
  debugLog(`Detected language: ${language}`);

  let extension = '.txt';
  switch (language) {
    case 'javascript':
      extension = '.js';
      break;
    case 'html':
      extension = '.html';
      break;
    case 'css':
      extension = '.css';
      break;
    case 'python':
      extension = '.py';
      break;
    case 'java':
      extension = '.java';
      break;
    case 'c#':
      extension = '.cs';
      break;
    case 'c++':
      extension = '.cpp';
      break;
    case 'ruby':
      extension = '.rb';
      break;
    case 'go':
      extension = '.go';
      break;
    case 'swift':
      extension = '.swift';
      break;
    case 'sql':
      extension = '.sql';
      break;
    case 'json':
      extension = '.json';
      break;
    default:
      extension = '.txt';
      break;
  }

  // Create a more descriptive filename
  const defaultFilename = `code_snippet_${language}${extension}`;

  // Create a Blob with the code content
  const blob = new Blob([codeContent], { type: 'text/plain' });

  try {
    // Try to use the showSaveFilePicker API
    if ('showSaveFilePicker' in window) {
      const handle = await window.showSaveFilePicker({
        suggestedName: defaultFilename,
        types: [{
          description: 'Text Files',
          accept: {'text/plain': [extension]}
        }],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      debugLog('File saved using showSaveFilePicker API');
    } else {
      // Fallback for browsers that don't support showSaveFilePicker
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = defaultFilename;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      debugLog('File download initiated using fallback method');
    }
  } catch (err) {
    // Check if the error is due to the user cancelling the save dialog
    if (err.name === 'AbortError') {
      debugLog('User cancelled the save dialog');
      // Don't show an error message for this case
    } else {
      console.error('Error saving file:', err);
      alert('There was an error saving the file. Please try again.');
    }
  }
}

function addButtonsToExistingContainers() {
  debugLog('Checking for existing containers');
  const containers = document.querySelectorAll('.flex.items-center.relative.text-token-text-secondary.bg-token-main-surface-secondary.px-4.py-2.text-xs.font-sans.justify-between.rounded-t-md');
  debugLog(`Found ${containers.length} containers`);
  containers.forEach((container, index) => {
    debugLog(`Processing container ${index + 1}`);
    addCreateFileButton(container);
  });
}

const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const containers = node.querySelectorAll('.flex.items-center.relative.text-token-text-secondary.bg-token-main-surface-secondary.px-4.py-2.text-xs.font-sans.justify-between.rounded-t-md');
          containers.forEach((container, index) => {
            debugLog(`New container ${index + 1} added`);
            addCreateFileButton(container);
          });
        }
      });
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });
debugLog('MutationObserver started');

setInterval(addButtonsToExistingContainers, 3000);

addButtonsToExistingContainers();

debugLog('Script initialized');

