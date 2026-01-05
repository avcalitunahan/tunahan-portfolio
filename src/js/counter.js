
const lambdaUrl =  config.lambdaUrl;

async function updateVisitorCount(){

    const counterElement = document.getElementById('visitor-counter');
    const footerCounterElement = document.getElementById('visitor-counter-footer');

    if (!counterElement) return;
    if (!footerCounterElement) return ;

    try {
        // Send a request to  Lambda
        const response = await fetch(lambdaUrl);

        if(!response.ok) {
            throw new Error(`HTTP error Status: ${response.status}`);

        }

        // Get JSON data
        const data = await response.json()

        if (data.visits !== undefined) {
            counterElement.innerText = data.visits;
            footerCounterElement.innerText = data.visits;
            counterElement.style.opacity = 1;
            footerCounterElement.style.opacity = 1;

        } else {
            counterElement.innerText = "N/A";
            console.error("The data format is incorrect:", data)
        }

    } catch (error) {
        console.error("Counter Error:", error)
        counterElement.innerText = "0"
    }
}

document.addEventListener("DOMContentLoaded", updateVisitorCount)