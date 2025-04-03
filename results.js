
// results.js

let searchText; // Declare searchText in the correct scope

document.addEventListener('DOMContentLoaded', () => {
    setSearchInputFromQuery();
    
    updateDisplayedText(); // Call to update all relevant sections
    
    myFunc(sourceLang, targetLang, data);
    
    initSearchResults(); 
});

function initSearchResults() {
    // Handle search item selection
    const searchItems = document.querySelectorAll('.search-item');
    searchItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            searchItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Update search input with selected text
            const searchInput = document.getElementById('search-input');
            searchInput.value = item.textContent;
            
            // In a real app, this would trigger a new search
            updateSearchResults(item.textContent);
        });
    });
    
    // Handle add translation button
    const addTranslationBtn = document.querySelector('.add-translation-btn');
    addTranslationBtn.addEventListener('click', () => {
        // In a real app, this would open a form to add translation
        alert('This would open a form to add your translation contribution!');
    });
    
    // Handle language links
    const languageLinks = document.querySelectorAll('.language-link');
    languageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // In a real app, this would navigate to the language dictionary
            const language = link.textContent.toLowerCase();
            alert(`Navigating to ${language} dictionary...`);
        });
    });
    
}

function setSearchInputFromQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    searchText = urlParams.get('query'); // Store the query in the variable
    if (searchText) {
        document.getElementById('search-input').value = decodeURIComponent(searchText);
        updateDisplayedText(); // Call to update all relevant sections
    }
}
function myFunc(sourceLang, targetLang, data) {
    // Simulate an API call and return dummy data
    const translations = {
        "french": {
            "bonjour": "werio",
            "comment ca va": "xoxio",
        },
        "english": {
            "hello": "werio",
            "how are you": "xoxio",
        }
    };

    // Return the translation based on the source and target language
    return translations[sourceLang][data.toLowerCase()] || "Translation not found";
}

function getSimilarPhrases(searchText) {
    // Function that returns similar phrases based on the search text
    const similarPhrases = {
        "bonjour": ["salut", "coucou", "bienvenue"],
        "comment ca va": ["ça va bien", "tout va bien"],
        "je mange": ["je suis en train de manger", "je prends un repas"],
        "fille": ["fille", "jeune fille", "filleule"],
        // Add more phrases as needed
    };

    const trimmedSearchText = searchText.trim().toLowerCase(); // Trim whitespace and convert to lowercase
    console.log("Searching for similar phrases for:", trimmedSearchText); // Log the input for debugging
    const phrases = similarPhrases[trimmedSearchText] || [];
    return phrases.length > 0 ? phrases : ["No similar phrases found."];
}
// Example usage within the existing logic
function updateDisplayedText() {
    // Update all relevant sections with the translation result
    const searchQuery = document.querySelector('.search-query');
    searchQuery.textContent = `Translation of "${searchText}" into Ghomálá'`;

    const dictionaryInfo = document.querySelector('.dictionary-info h3');
    dictionaryInfo.innerHTML = `"${searchText.toUpperCase()}" IN <a href="#" class="language-link">FRENCH</a> - <a href="#" class="language-link">GHOMÁLÁ'</a> DICTIONARY`;

    const noResultsBox = document.querySelector('.no-results-box p');
    noResultsBox.innerHTML = `Currently we have no translations for <strong>"${searchText}"</strong> in the dictionary, maybe you can add one? Make sure to check automatic translation, translation memory or indirect translations.`;

    const similarPhrases = getSimilarPhrases(searchText);
    const similarPhrasesSection1 = document.querySelector('.similar-phrases-section1');
    similarPhrasesSection1.innerHTML = `PHRASES SIMILAR TO "${searchText.toUpperCase()}" WITH TRANSLATIONS INTO GHOMÁLÁ': ${similarPhrases.join(', ')}`;

    const similarPhrasesSection2 = document.querySelector('.similar-phrases-section2');
    similarPhrasesSection2.innerHTML = `PHRASES SIMILAR TO "${searchText.toUpperCase()}" WITH TRANSLATIONS INTO GHOMÁLÁ': ${similarPhrases.join(', ')}`;

    const sourceLang = "french"; // This should be dynamically set based on user input
    const targetLang = "ghomala"; // This should be dynamically set based on user input
    const translationResult = myFunc(sourceLang, targetLang, searchText);

    // Check if there are results based on the translation
    const hasResults = translationResult !== "Translation not found";

    if (hasResults) {
        document.getElementById('results-section').style.display = 'block';
        document.getElementById('no-results-section').style.display = 'none';

        document.getElementById('translation-result').textContent = translationResult;
    } else {
        document.getElementById('results-section').style.display = 'none';
        document.getElementById('no-results-section').style.display = 'block';
    }
}

document.addEventListener("DOMContentLoaded", function () {
  const keyboardContainer = document.getElementById("aglc-keyboard");
  const closeKeyboardBtn = document.querySelector(".close-keyboard");

  // Close the keyboard when the button is clicked
  closeKeyboardBtn.addEventListener("click", function () {
    keyboardContainer.style.display = "none";
  });
});




document.addEventListener("DOMContentLoaded", function () {
  const keyboardBtn = document.querySelector(".keyboard-btn");
  const keyboardContainer = document.getElementById("aglc-keyboard");
  const textInput = document.getElementById("translation-text");
  let isShiftActive = false;
  let isCapsActive = false;

  // Afficher / Cacher le clavier
  keyboardBtn.addEventListener("click", function () {
    keyboardContainer.style.display =
      keyboardContainer.style.display === "none" ? "flex" : "none";
  });

  // Ajouter un caractère au champ de texte
  document.querySelectorAll(".key").forEach((key) => {
    key.addEventListener("click", function () {
      let char = this.textContent;

      if (this.classList.contains("backspace")) {
        textInput.value = textInput.value.slice(0, -1);
      } else if (this.classList.contains("space")) {
        textInput.value += " ";
      } else if (this.classList.contains("return")) {
        textInput.value += "\n";
      } else if (this.classList.contains("shift")) {
        isShiftActive = !isShiftActive;
      } else if (this.classList.contains("capslock")) {
        isCapsActive = !isCapsActive;
      } else {
        if (isShiftActive || isCapsActive) {
          char = char.toUpperCase();
        } else {
          char = char.toLowerCase();
        }
        textInput.value += char;
      }
    });
  });
});


document.addEventListener("click", (event) => {
  const keyboardContainer = document.getElementById("aglc-keyboard");
  if (!event.target.closest("#aglc-keyboard") && !event.target.closest(".keyboard-btn")) {
    keyboardContainer.style.display = "none";
  }
});

const keyboardContainer = document.getElementById("aglc-keyboard");
let isDragging = false;
let offset = { x: 0, y: 0 };

keyboardContainer.addEventListener("mousedown", (e) => {
  isDragging = true;
  offset.x = e.clientX - keyboardContainer.getBoundingClientRect().left;
  offset.y = e.clientY - keyboardContainer.getBoundingClientRect().top;
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    keyboardContainer.style.position = 'absolute';
    keyboardContainer.style.left = `${e.clientX - offset.x}px`;
    keyboardContainer.style.top = `${e.clientY - offset.y}px`;
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});


document.addEventListener("DOMContentLoaded", function () {
  const keyboardContainer = document.getElementById("aglc-keyboard");
  const textInput = document.getElementById("search-input"); // Utilisez le champ correspondant

  const keyboardBtn = document.querySelector(".keyboard-btn");
  keyboardBtn.addEventListener("click", function () {
    keyboardContainer.style.display =
      keyboardContainer.style.display === "none" ? "flex" : "none";
  });

  // Ajouter le caractère au champ de texte
  document.querySelectorAll(".key").forEach((key) => {
    key.addEventListener("click", function () {
      let char = this.getAttribute("data-char");
      textInput.value += char; // Ajouter le caractère au champ de texte
    });
  });
});

