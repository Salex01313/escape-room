let correctOrder = [
    "From sports icons to historical figures, role models have shaped societies for generations.",
    "Role models play a significant role in shaping personal development.",
    "Positive role models inspire growth, while negative role models can lead to harmful behaviors.",
    "This essay will compare and contrast the influence of positive and negative role models on adolescent decision-making."
];

let dropArea = document.getElementById("drop-area");
let draggedItem = null;
let tryAgainButton = document.querySelector("button:nth-of-type(2)");

document.querySelectorAll(".sentence").forEach(sentence => {
    sentence.addEventListener("dragstart", function() {
        draggedItem = this;
    });
});

dropArea.addEventListener("dragover", function(event) {
    event.preventDefault();
});

dropArea.addEventListener("drop", function() {
    if (draggedItem) {
        dropArea.appendChild(draggedItem);
        draggedItem = null;
    }
});

function checkOrder() {
    let userOrder = Array.from(dropArea.children).map(s => s.textContent);
    let resultText = document.getElementById("result");
    let paraphraseText = document.getElementById("paraphrase").value.trim();
    let feedbackMessage = document.getElementById("feedback-message");

    if (JSON.stringify(userOrder) === JSON.stringify(correctOrder)) {
        document.getElementById("game-container").classList.add("hidden");
        document.getElementById("success-screen").classList.remove("hidden");

        feedbackMessage.textContent = provideParaphraseFeedback(paraphraseText);
    } else {
        resultText.textContent = "❌ ERROR: Corrupt data detected! Rearrange and try again!";
        resultText.classList.remove("hidden");
        tryAgainButton.classList.remove("hidden");
    }
}

function provideParaphraseFeedback(text) {
    if (text.length === 0) {
        return "⚠️ Your paraphrase is missing! Try rewording the thesis statement in your own words.";
    } else if (!text.toLowerCase().includes("role models") || !text.toLowerCase().includes("influence")) {
        return "⚠️ Your paraphrase is unclear. Make sure to include key ideas about role models and their influence.";
    } else {
        return "✅ Great job! Your paraphrase captures the main idea!";
    }
}

function tryAgain() {
    location.reload();
}
