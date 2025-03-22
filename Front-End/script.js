document.getElementById("checkButton").addEventListener("click", function () {
    let url = document.getElementById("urlInput").value.trim();
    let resultContainer = document.getElementById("resultContainer");
    let resultText = document.getElementById("resultText");
    let confidenceScore = document.getElementById("confidenceScore");
    let loading = document.getElementById("loading");

    if (url === "") {
        resultText.innerHTML = "⚠️ Please enter a valid URL!";
        resultContainer.style.display = "block";
        resultContainer.className = "result-container phishing";
        confidenceScore.innerHTML = "";
        return;
    }

    // Show loading message
    resultContainer.style.display = "none";
    loading.style.display = "block";

    // Send request to Flask backend
    fetch("http://127.0.0.1:5000/check_url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url }),
    })
    .then(response => response.json())
    .then(data => {
        loading.style.display = "none";
        resultContainer.style.display = "block";

        if (data.status === "phishing") {
            resultText.innerHTML = "🚨 Warning! This website is unsafe!";
            resultContainer.className = "result-container phishing";
        } else {
            resultText.innerHTML = "✅ This website appears safe.";
            resultContainer.className = "result-container safe";
        }

        confidenceScore.innerHTML = `Confidence Score: <strong>${data.confidence}%</strong>`;
    })
    .catch(error => {
        console.error("Error:", error);
        loading.style.display = "none";
        resultContainer.style.display = "block";
        resultText.innerHTML = "❌ Error checking the URL. Try again.";
        resultContainer.className = "result-container phishing";
        confidenceScore.innerHTML = "";
    });
});
