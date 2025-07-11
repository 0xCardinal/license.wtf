// App state
let answers = {};
let showResults = false;

// DOM elements
const quizSection = document.getElementById('quiz-section');
const resultsSection = document.getElementById('results-section');
const questionsContainer = document.querySelector('.questions-container');
const submitBtn = document.getElementById('submit-btn');
const restartBtn = document.getElementById('restart-btn');
const recommendationsContainer = document.querySelector('.recommendations-container');
const themeToggleBtn = document.getElementById('theme-toggle-btn');

// Initialize the app
function init() {
  loadTheme();
  renderQuestions();
  setupEventListeners();
}

// Render questions
function renderQuestions() {
  questionsContainer.innerHTML = '';
  
  questions.forEach((question, index) => {
    const questionElement = createQuestionElement(question, index);
    questionsContainer.appendChild(questionElement);
    
    // Initialize slider questions with default values if not already set
    if (question.type === 'slider' && answers[question.id] === undefined) {
      answers[question.id] = 5; // Default value for sliders
    }
  });
  
  // Update submit button state after initializing defaults
  updateSubmitButton();
}

// Create question element
function createQuestionElement(question, index) {
  const questionDiv = document.createElement('div');
  questionDiv.className = 'question';
  questionDiv.style.animationDelay = `${index * 0.1}s`;
  
  const header = `
    <div class="question-header">
      <div class="question-emoji">${question.emoji}</div>
      <h2 class="question-text">${question.text}</h2>
      <p class="question-description">${question.description}</p>
    </div>
  `;
  
  const controls = question.type === 'toggle' 
    ? createToggleControls(question)
    : createSliderControls(question);
  
  questionDiv.innerHTML = `
    ${header}
    <div class="question-controls">
      ${controls}
    </div>
  `;
  
  return questionDiv;
}

// Create toggle controls
function createToggleControls(question) {
  const currentValue = answers[question.id];
  
  const buttonsHtml = question.options.map(option => {
    const isActive = currentValue === option.value ? 'active' : '';
    return `
      <button class="toggle-btn ${isActive}" data-question="${question.id}" data-value="${option.value}">
        ${option.text}
      </button>
    `;
  }).join('');
  
  return `
    <div class="toggle-buttons">
      ${buttonsHtml}
    </div>
  `;
}

// Create slider controls
function createSliderControls(question) {
  const currentValue = typeof answers[question.id] === 'number' ? answers[question.id] : 5;
  
  return `
    <div class="slider-container">
      <div class="slider-labels">
        <span>${question.minLabel}</span>
        <span>${question.maxLabel}</span>
      </div>
      <input 
        type="range" 
        min="1" 
        max="10" 
        value="${currentValue}" 
        class="slider" 
        data-question="${question.id}"
      />
      <div class="slider-value">
        <span>${currentValue}/10</span>
      </div>
    </div>
  `;
}

// Setup event listeners
function setupEventListeners() {
  // Toggle button clicks
  questionsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle-btn')) {
      const questionId = e.target.dataset.question;
      const value = e.target.dataset.value;
      
      // Convert string values to appropriate types
      let processedValue = value;
      if (value === 'true') processedValue = true;
      else if (value === 'false') processedValue = false;
      // Keep other string values as they are (maybe, not_needed, optional, required)
      
      handleAnswer(questionId, processedValue);
    }
  });
  
  // Slider changes
  questionsContainer.addEventListener('input', (e) => {
    if (e.target.classList.contains('slider')) {
      const questionId = e.target.dataset.question;
      const value = parseInt(e.target.value);
      handleAnswer(questionId, value);
      
      // Update the displayed value
      const valueElement = e.target.parentElement.querySelector('.slider-value span');
      if (valueElement) {
        valueElement.textContent = `${value}/10`;
      }
    }
  });
  
  // Submit button
  submitBtn.addEventListener('click', handleSubmit);
  
  // Restart button
  restartBtn.addEventListener('click', restart);
  
  // Theme toggle
  themeToggleBtn.addEventListener('click', toggleTheme);
}

// Handle answer changes
function handleAnswer(questionId, value) {
  answers[questionId] = value;
  updateQuestionDisplay(questionId, value);
  updateSubmitButton();
}

// Update question display
function updateQuestionDisplay(questionId, value) {
  const question = questions.find(q => q.id === questionId);
  if (!question) return;
  
  // Find the question container
  const questionContainer = questionsContainer.querySelector(`[data-question="${questionId}"]`).closest('.question');
  if (!questionContainer) return;
  
  if (question.type === 'toggle') {
    // Remove all active classes from toggle buttons in this question
    const buttons = questionContainer.querySelectorAll('.toggle-btn');
    buttons.forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Add active class to the correct button
    const targetButton = questionContainer.querySelector(`[data-question="${questionId}"][data-value="${value}"]`);
    if (targetButton) {
      targetButton.classList.add('active');
    }
  }
  // Note: Slider updates are handled automatically by the input event
}

// Update submit button state
function updateSubmitButton() {
  const allQuestionsAnswered = questions.every(q => answers[q.id] !== undefined);
  
  if (allQuestionsAnswered) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

// Handle submit
function handleSubmit() {
  showResults = true;
  renderResults();
  showResultsSection();
  // Scroll to the top to show all licenses from the beginning
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show results section
function showResultsSection() {
  quizSection.style.display = 'none';
  resultsSection.style.display = 'block';
}

// Show quiz section
function showQuizSection() {
  resultsSection.style.display = 'none';
  quizSection.style.display = 'block';
}

// Restart the quiz
function restart() {
  answers = {};
  showResults = false;
  showQuizSection();
  renderQuestions();
  updateSubmitButton();
}

// Render results
function renderResults() {
  const recommendations = calculateRecommendations();
  
  recommendationsContainer.innerHTML = '';
  
  recommendations.forEach((rec, index) => {
    const card = createRecommendationCard(rec, index);
    recommendationsContainer.appendChild(card);
  });
}

// Create recommendation card
function createRecommendationCard(recommendation, index) {
  const card = document.createElement('div');
  card.className = `recommendation-card ${index === 0 ? 'best-match' : ''}`;
  card.style.animationDelay = `${index * 0.2}s`;
  
  const emoji = index === 0 ? '👑' : index === 1 ? '🥈' : '🥉';
  const bestMatchBadge = index === 0 ? '<span class="best-match-badge">Best Match</span>' : '';
  
  const reasonsHtml = recommendation.reasons.map(reason => 
    `<div class="reason-item">${reason}</div>`
  ).join('');
  
  card.innerHTML = `
    <div class="recommendation-content">
      <div class="recommendation-emoji">${emoji}</div>
      <div class="recommendation-details">
        <div class="recommendation-header">
          <h2 class="recommendation-title">${recommendation.name}</h2>
          ${bestMatchBadge}
        </div>
        <p class="recommendation-description">${recommendation.description}</p>
        <div class="reasons-grid">
          ${reasonsHtml}
        </div>
      </div>
    </div>
  `;
  
  return card;
}

// Calculate recommendations based on answers
function calculateRecommendations() {
  const scores = licenses.map(license => {
    let score = 0;
    let totalWeight = 0;
    
    // Commercial use
    if (answers.commercial !== undefined) {
      const weight = 15;
      totalWeight += weight;
      if (license.characteristics.commercial === answers.commercial) {
        score += weight;
      } else if (answers.commercial === 'maybe' && license.characteristics.commercial) {
        score += weight * 0.7;
      }
    }
    
    // Share changes
    if (answers.share_changes !== undefined) {
      const weight = 12;
      totalWeight += weight;
      if (license.characteristics.share_changes === answers.share_changes) {
        score += weight;
      } else if (answers.share_changes === 'optional' && license.characteristics.share_changes === 'maybe') {
        score += weight * 0.8;
      }
    }
    
    // Closed source
    if (answers.closed_source !== undefined) {
      const weight = 12;
      totalWeight += weight;
      if (license.characteristics.closed_source === answers.closed_source) {
        score += weight;
      } else if (answers.closed_source === 'maybe' && license.characteristics.closed_source === 'maybe') {
        score += weight * 0.8;
      }
    }
    
    // SaaS open source
    if (answers.saas_opensource !== undefined) {
      const weight = 10;
      totalWeight += weight;
      if (license.characteristics.saas_opensource === answers.saas_opensource) {
        score += weight;
      } else if (answers.saas_opensource === 'maybe' && license.characteristics.saas_opensource === 'maybe') {
        score += weight * 0.8;
      }
    }
    
    // Patents
    if (answers.patents !== undefined) {
      const weight = 8;
      totalWeight += weight;
      if (license.characteristics.patents === answers.patents) {
        score += weight;
      } else if (answers.patents === 'maybe' && license.characteristics.patents === 'maybe') {
        score += weight * 0.8;
      }
    }
    
    // Complexity (slider)
    if (answers.complexity !== undefined) {
      const weight = 10;
      totalWeight += weight;
      const userPrefersSimple = answers.complexity >= 7;
      const licenseIsSimple = license.characteristics.complexity === 'high';
      if (userPrefersSimple === licenseIsSimple) {
        score += weight;
      } else if (answers.complexity >= 4 && answers.complexity <= 6) {
        score += weight * 0.5;
      }
    }
    
    // Copyleft (slider)
    if (answers.copyleft !== undefined) {
      const weight = 12;
      totalWeight += weight;
      const userPrefersStrongCopyleft = answers.copyleft >= 7;
      const licenseHasStrongCopyleft = license.characteristics.copyleft === 'strong';
      if (userPrefersStrongCopyleft === licenseHasStrongCopyleft) {
        score += weight;
      } else if (answers.copyleft >= 4 && answers.copyleft <= 6) {
        const licenseHasWeakCopyleft = license.characteristics.copyleft === 'weak';
        if (licenseHasWeakCopyleft) {
          score += weight * 0.7;
        }
      }
    }
    
    // Compatibility (slider)
    if (answers.compatibility !== undefined) {
      const weight = 11;
      totalWeight += weight;
      const userPrefersHighCompatibility = answers.compatibility >= 7;
      const licenseHasHighCompatibility = license.characteristics.compatibility === 'high';
      if (userPrefersHighCompatibility === licenseHasHighCompatibility) {
        score += weight;
      } else if (answers.compatibility >= 4 && answers.compatibility <= 6) {
        const licenseHasMediumCompatibility = license.characteristics.compatibility === 'medium';
        if (licenseHasMediumCompatibility) {
          score += weight * 0.7;
        }
      }
    }
    
    return {
      license,
      score: totalWeight > 0 ? (score / totalWeight) * 100 : 0
    };
  });
  
  // Sort by score (highest first) and return top 3
  return scores
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => ({
      name: item.license.name,
      description: item.license.description,
      reasons: item.license.reasons,
      score: Math.round(item.score)
    }));
}

// Theme management
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init); 