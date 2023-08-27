// Inside the renderMarkdownLinks function
async function renderMarkdownLinks() {
  const response = await fetch('links.md');
  const markdownText = await response.text();
  const linksContainer = document.getElementById('links-container');

  const lines = markdownText.split('\n');
  for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('-')) {
          const parts = trimmedLine.substring(1).trim().split('|');
          const displayName = parts[0].trim();
          const linkText = parts[1].trim();
          const linkBox = document.createElement('div');
          linkBox.classList.add('link-box');

          const linkElement = document.createElement('a');
          linkElement.textContent = displayName;
          linkElement.href = linkText;

          // Add mouseover event listener to show link information
          linkElement.addEventListener('mouseover', () => {
              showTooltip(linkBox, displayName, linkText);
          });

          // Add mouseout event listener to hide link information
          linkElement.addEventListener('mouseout', hideTooltip);

          linkBox.appendChild(linkElement);
          linksContainer.appendChild(linkBox);
      }
  }
}

// Function to show tooltip
function showTooltip(linkBox, displayName, linkText) {
  const tooltip = document.createElement('div');
  tooltip.classList.add('tooltip');
  tooltip.textContent = `${displayName}: ${linkText}`;
  linkBox.appendChild(tooltip);
}

// Function to hide tooltip
function hideTooltip(event) {
  const linkBox = event.target.parentElement;
  const tooltip = linkBox.querySelector('.tooltip');
  if (tooltip) {
      tooltip.remove();
  }
}

// Call the function when the page loads
window.onload = renderMarkdownLinks;
