// background.js

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'downloadFile') {
      const { content, filename } = message.payload;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);

      browser.downloads.download({
        url: url,
        filename: filename,
        saveAs: true
      }).then(id => {
        if (id) {
          sendResponse({ success: true });
        } else {
          // The download was cancelled by the user
          sendResponse({ cancelled: true });
        }
      }).catch(error => {
        console.error('Error downloading file:', error);
        if (error.message.includes('canceled')) {
          sendResponse({ cancelled: true });
        } else {
          sendResponse({ success: false });
        }
      });

      return true; // Indicates that the response is sent asynchronously
    }
  });