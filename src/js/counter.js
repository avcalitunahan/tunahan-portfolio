const lambdaUrl = config.lambdaUrl;

async function updateVisitorCount() {

    const counterElement = document.getElementById('visitor-counter');
    const footerCounterElement = document.getElementById('visitor-counter-footer');

    if (!counterElement) return;
    if (!footerCounterElement) return;

    // Check if the visit count is already saved in the session
    const cachedVisits = sessionStorage.getItem('visitCount');

    if (cachedVisits) {
        // If data exists, show it directly without calling API
        counterElement.innerText = cachedVisits;
        footerCounterElement.innerText = cachedVisits;
        counterElement.style.opacity = 1;
        footerCounterElement.style.opacity = 1;
        
        // Stop here, do not run the rest of the code
        return;
    }

    try {
        // Send a request to the API
        const response = await fetch(lambdaUrl);

        if (!response.ok) {
            throw new Error(`HTTP error Status: ${response.status}`);
        }

        // Get JSON data
        const data = await response.json();

        if (data.visits !== undefined) {
            // Update the UI
            counterElement.innerText = data.visits;
            footerCounterElement.innerText = data.visits;
            counterElement.style.opacity = 1;
            footerCounterElement.style.opacity = 1;

            // Save the data to session storage
            sessionStorage.setItem('visitCount', data.visits);

        } else {
            counterElement.innerText = "N/A";
            console.error("The data format is incorrect:", data);
        }

    } catch (error) {
        console.error("Counter Error:", error);
        counterElement.innerText = "0";
        if(footerCounterElement) footerCounterElement.innerText = "0";
    }
}

document.addEventListener("DOMContentLoaded", updateVisitorCount);