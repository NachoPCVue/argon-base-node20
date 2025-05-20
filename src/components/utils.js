// Firebase imports removed to fix build errors

/**
 * Format a date using the specified format
 * @param {string|number|Date} datestring - The date to format
 * @param {string} dateFormat - The format to use (e.g., 'DD-MM-YYYY')
 * @returns {string} The formatted date string
 */
export function formatDate(datestring, dateFormat) {
  if (datestring == null || datestring === '') return '';
  const moment = require('moment');
  return moment(datestring).format(dateFormat);
}

/**
 * Download a file from a URL
 * @param {string} url - The URL of the file to download
 * @param {string} filename - The name to save the file as
 */
export function downloadFileFromURL(url, filename) {
  console.log('downloadFileFromURL', url, filename);
  
  // Create a temporary anchor element
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  
  // Append to the document
  document.body.appendChild(link);
  
  // Trigger the download
  link.click();
  
  // Clean up
  document.body.removeChild(link);
}

// Upload function removed to fix build errors
