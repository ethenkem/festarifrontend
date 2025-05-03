
/**
 * Utility to remove the branding tag from the page
 * Call this function on app initialization to ensure the tag is removed
 */
export function removeBrandingTag() {
  // This function searches for the branding tag and removes it
  const removeTag = () => {
    // Find all elements that might contain the branding
    const possibleTags = document.querySelectorAll('a[href*="lovable"]');
    const possibleDivs = document.querySelectorAll('div[class*="lovable"]');
    
    // Remove any elements that match lovable branding
    [...possibleTags, ...possibleDivs].forEach(element => {
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });
    
    // Also look for specific styles related to the branding
    const styles = document.querySelectorAll('style');
    styles.forEach(style => {
      if (style.textContent && style.textContent.includes('lovable')) {
        style.textContent = style.textContent.replace(/\.lovable[^{]*\{[^}]*\}/g, '');
      }
    });
  };

  // Run immediately
  removeTag();
  
  // Also run after the page is fully loaded
  window.addEventListener('load', removeTag);
  
  // And run after any dynamic content might be added
  setTimeout(removeTag, 1000);
  setTimeout(removeTag, 3000);
}
