const accessKey = "YOUR_API_KEY"; // unsplash access key

async function getCityImage(cityName) {
    const unsplashAPI = `https://api.unsplash.com/photos/random?query=${cityName}&client_id=${accessKey}`;
  
    try {
      const response = await fetch(unsplashAPI);
      const data = await response.json();
  
      if (data.urls && data.urls.regular) {
        return data.urls.regular;  // Correctly accessing the URL
      } else {
        throw new Error('No image found for this location.');
      }
    } catch (error) {
      throw new Error('Error fetching image: ' + error.message);
    }
  }
  

export async function displayCityImage(cityName) {
  try {
    const imageURL = await getCityImage(cityName);

    // Display the image in an HTML element
    const imageElement = document.getElementById('search-weather-background');
    imageElement.style.backgroundImage = `url(${imageURL})`;
    imageElement.style.backgroundSize = "cover";
  } catch (error) {
    console.error(error);
    alert('Unable to fetch an image for this location.');
  }
}
