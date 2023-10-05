export function getCurrentTime() {
    const now = new Date();
  
    // Get the hours, minutes, and seconds
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
  
    // Construct the time string in HH:MM:SS format
    const currentTime = `${hours}:${minutes}:${seconds}`;
    
    return currentTime;
}

export function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}