// Questions data
const questions = [
  {
    id: 'commercial',
    text: 'Can people use your code in commercial projects?',
    emoji: '💸',
    description: 'Should companies be able to make money using your code?',
    type: 'toggle',
    options: [
      { value: false, text: '❌ No', emoji: '❌' },
      { value: 'maybe', text: '🤷 I don\'t mind', emoji: '🤷' },
      { value: true, text: '✅ Yes', emoji: '✅' }
    ]
  },
  {
    id: 'share_changes',
    text: 'Should people share their changes back?',
    emoji: '♻️',
    description: 'Do you want improvements to come back to the community?',
    type: 'toggle',
    options: [
      { value: 'not_needed', text: '🙅 Never', emoji: '🙅' },
      { value: 'optional', text: '🤷 Optional', emoji: '🤷' },
      { value: 'required', text: '♻️ Always', emoji: '♻️' }
    ]
  },
  {
    id: 'closed_source',
    text: 'Is it okay if someone turns your code into a closed-source product?',
    emoji: '🔒',
    description: 'How do you feel about proprietary derivatives?',
    type: 'toggle',
    options: [
      { value: false, text: '❌ Not okay', emoji: '❌' },
      { value: 'maybe', text: '🤷 Depends', emoji: '🤷' },
      { value: true, text: '✅ Totally fine', emoji: '✅' }
    ]
  },
  {
    id: 'saas_opensource',
    text: 'If someone runs your code on a web app (like a SaaS), should they open source it too?',
    emoji: '🌐',
    description: 'What about web applications and services?',
    type: 'toggle',
    options: [
      { value: false, text: '🕵️ No need', emoji: '🕵️' },
      { value: 'maybe', text: '🤷 Not sure', emoji: '🤷' },
      { value: true, text: '🌐 Yes, always', emoji: '🌐' }
    ]
  },
  {
    id: 'patents',
    text: 'Do you want protection for your ideas (patents)?',
    emoji: '🛡️',
    description: 'Protection against patent trolls and legal issues',
    type: 'toggle',
    options: [
      { value: false, text: '❌ No', emoji: '❌' },
      { value: 'maybe', text: '🤷 Maybe', emoji: '🤷' },
      { value: true, text: '🛡️ Yes', emoji: '🛡️' }
    ]
  },
  {
    id: 'complexity',
    text: 'How simple should your license be?',
    emoji: '📜',
    description: 'Simple licenses are easier to understand and adopt',
    type: 'slider',
    minLabel: '📜 Legal text is fine',
    maxLabel: '⚡ Super simple'
  },
  {
    id: 'copyleft',
    text: 'How strongly do you want others to keep their code open (copyleft)?',
    emoji: '♻️',
    description: 'Should derivative works use the same license?',
    type: 'slider',
    minLabel: '🔓 Not at all',
    maxLabel: '♻️ All of it'
  },
  {
    id: 'compatibility',
    text: 'How compatible should your license be with other codebases?',
    emoji: '🤝',
    description: 'Should your license work well with other licenses?',
    type: 'slider',
    minLabel: '🧱 Doesn\'t matter',
    maxLabel: '🤝 Must work with many'
  }
];

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
  });
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

// License database
const licenses = [
  {
    name: 'MIT',
    description: 'Super simple and permissive. Anyone can do almost anything with your code, including selling it.',
    characteristics: {
      commercial: true,
      share_changes: 'not_needed',
      closed_source: true,
      saas_opensource: false,
      patents: false,
      complexity: 'high',
      copyleft: 'none',
      compatibility: 'high'
    },
    reasons: [
      'Allows commercial use ✓',
      'No requirement to share changes ✓',
      'Very simple to understand ✓',
      'Widely adopted and trusted ✓',
      'Highly compatible with other licenses ✓'
    ]
  },
  {
    name: 'Apache 2.0',
    description: 'Like MIT but with better patent protection and more explicit terms for contributions.',
    characteristics: {
      commercial: true,
      share_changes: 'not_needed',
      closed_source: true,
      saas_opensource: false,
      patents: true,
      complexity: 'medium',
      copyleft: 'none',
      compatibility: 'high'
    },
    reasons: [
      'Allows commercial use ✓',
      'Strong patent protection ✓',
      'Clear contribution guidelines ✓',
      'Enterprise-friendly ✓',
      'Good compatibility ✓'
    ]
  },
  {
    name: 'GPL-3.0',
    description: 'Strong copyleft license that requires derivative works to also be open source.',
    characteristics: {
      commercial: true,
      share_changes: 'required',
      closed_source: false,
      saas_opensource: true,
      patents: true,
      complexity: 'low',
      copyleft: 'strong',
      compatibility: 'low'
    },
    reasons: [
      'Ensures changes are shared ✓',
      'Strong copyleft protection ✓',
      'Prevents proprietary derivatives ✓',
      'Community-focused ✓',
      'Protects software freedom ✓'
    ]
  },
  {
    name: 'BSD-3-Clause',
    description: 'Very similar to MIT but with an extra clause about endorsements.',
    characteristics: {
      commercial: true,
      share_changes: 'not_needed',
      closed_source: true,
      saas_opensource: false,
      patents: false,
      complexity: 'high',
      copyleft: 'none',
      compatibility: 'high'
    },
    reasons: [
      'Allows commercial use ✓',
      'Extremely simple ✓',
      'Prevents name misuse ✓',
      'Academic friendly ✓',
      'Highly compatible ✓'
    ]
  },
  {
    name: 'LGPL-2.1',
    description: 'Allows linking with proprietary code while keeping the library itself open source.',
    characteristics: {
      commercial: true,
      share_changes: 'optional',
      closed_source: 'maybe',
      saas_opensource: 'maybe',
      patents: 'maybe',
      complexity: 'medium',
      copyleft: 'weak',
      compatibility: 'medium'
    },
    reasons: [
      'Allows commercial linking ✓',
      'Balances open source and business needs ✓',
      'Good for libraries ✓',
      'Moderate copyleft ✓'
    ]
  },
  {
    name: 'AGPL-3.0',
    description: 'Like GPL but also covers network use, requiring SaaS applications to be open source.',
    characteristics: {
      commercial: true,
      share_changes: 'required',
      closed_source: false,
      saas_opensource: true,
      patents: true,
      complexity: 'low',
      copyleft: 'strong',
      compatibility: 'low'
    },
    reasons: [
      'Covers network use ✓',
      'Strongest copyleft protection ✓',
      'Prevents SaaS loopholes ✓',
      'Ensures complete openness ✓'
    ]
  },
  {
    name: 'MPL-2.0',
    description: 'File-level copyleft that allows mixing with proprietary code at the file level.',
    characteristics: {
      commercial: true,
      share_changes: 'optional',
      closed_source: 'maybe',
      saas_opensource: 'maybe',
      patents: true,
      complexity: 'medium',
      copyleft: 'weak',
      compatibility: 'high'
    },
    reasons: [
      'File-level copyleft ✓',
      'Good for libraries ✓',
      'Patent protection ✓',
      'High compatibility ✓'
    ]
  },
  {
    name: 'ISC',
    description: 'Simplified BSD license, functionally equivalent to MIT but shorter.',
    characteristics: {
      commercial: true,
      share_changes: 'not_needed',
      closed_source: true,
      saas_opensource: false,
      patents: false,
      complexity: 'high',
      copyleft: 'none',
      compatibility: 'high'
    },
    reasons: [
      'Simplest possible license ✓',
      'Allows commercial use ✓',
      'No restrictions ✓',
      'Maximum compatibility ✓'
    ]
  },
  {
    name: 'CC0',
    description: 'Public domain dedication, giving up all rights to your work.',
    characteristics: {
      commercial: true,
      share_changes: 'not_needed',
      closed_source: true,
      saas_opensource: false,
      patents: false,
      complexity: 'high',
      copyleft: 'none',
      compatibility: 'high'
    },
    reasons: [
      'Public domain ✓',
      'Maximum freedom ✓',
      'No restrictions whatsoever ✓',
      'Perfect compatibility ✓'
    ]
  },
  {
    name: 'Unlicense',
    description: 'Public domain dedication with explicit patent grant.',
    characteristics: {
      commercial: true,
      share_changes: 'not_needed',
      closed_source: true,
      saas_opensource: false,
      patents: false,
      complexity: 'high',
      copyleft: 'none',
      compatibility: 'high'
    },
    reasons: [
      'Public domain ✓',
      'Explicit patent grant ✓',
      'Maximum permissiveness ✓',
      'Perfect compatibility ✓'
    ]
  }
];

// Calculate recommendations
function calculateRecommendations() {
  const licenseScores = licenses.map(license => {
    let score = 0;
    const chars = license.characteristics;
    
    // Commercial use
    if (answers.commercial === true && chars.commercial === true) score += 3;
    else if (answers.commercial === 'maybe' && chars.commercial === true) score += 2;
    else if (answers.commercial === false && chars.commercial === false) score += 3;
    
    // Share changes
    if (answers.share_changes === chars.share_changes) score += 3;
    else if (answers.share_changes === 'maybe' && chars.share_changes === 'optional') score += 2;
    
    // Closed source
    if (answers.closed_source === chars.closed_source) score += 3;
    else if (answers.closed_source === 'maybe' && chars.closed_source === 'maybe') score += 2;
    
    // SaaS open source
    if (answers.saas_opensource === chars.saas_opensource) score += 3;
    else if (answers.saas_opensource === 'maybe' && chars.saas_opensource === 'maybe') score += 2;
    
    // Patents
    if (answers.patents === chars.patents) score += 3;
    else if (answers.patents === 'maybe' && chars.patents === 'maybe') score += 2;
    
    // Complexity (convert slider to categories)
    const complexityLevel = answers.complexity <= 3 ? 'low' : answers.complexity <= 7 ? 'medium' : 'high';
    if (complexityLevel === chars.complexity) score += 3;
    
    // Copyleft (convert slider to categories)
    const copyleftLevel = answers.copyleft <= 3 ? 'none' : answers.copyleft <= 7 ? 'weak' : 'strong';
    if (copyleftLevel === chars.copyleft) score += 3;
    
    // Compatibility (convert slider to categories)
    const compatibilityLevel = answers.compatibility <= 3 ? 'low' : answers.compatibility <= 7 ? 'medium' : 'high';
    if (compatibilityLevel === chars.compatibility) score += 3;
    
    return {
      ...license,
      score
    };
  });
  
  return licenseScores
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(license => ({
      name: license.name,
      score: license.score,
      description: license.description,
      reasons: license.reasons
    }));
}



// Theme management
function loadTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init); 