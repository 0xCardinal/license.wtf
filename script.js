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
  const scoreBadge = `<span class="score-badge">${recommendation.score}%</span>`;
  
  const positivesHtml = recommendation.positives.map(reason => 
    `<div class="reason-item">${reason}</div>`
  ).join('');
  
  const negativesHtml = recommendation.negatives.map(reason => 
    `<div class="reason-item negative">${reason}</div>`
  ).join('');
  
  card.innerHTML = `
    <div class="recommendation-content">
      <div class="recommendation-emoji">${emoji}</div>
      <div class="recommendation-details">
        <div class="recommendation-header">
          <h2 class="recommendation-title">${recommendation.name}</h2>
          ${bestMatchBadge}
          ${scoreBadge}
        </div>
        <p class="recommendation-description">${recommendation.description}</p>
        
        <div class="reasons-grid">
          ${positivesHtml}
          ${negativesHtml}
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
    
    // Process each question using its weight
    questions.forEach(question => {
      const answer = answers[question.id];
      if (answer !== undefined) {
        const weight = question.weight;
        totalWeight += weight;
        
        // Get the license characteristic for this question
        const licenseValue = license.characteristics[question.id];
        
        if (question.type === 'toggle') {
          // Handle toggle questions
          if (licenseValue === answer) {
            score += weight;
          } else if (answer === 'maybe' && licenseValue) {
            score += weight * 0.7;
          } else if (answer === 'optional' && licenseValue === 'maybe') {
            score += weight * 0.8;
          }
        } else if (question.type === 'slider') {
          // Handle slider questions
          const userValue = answer;
          
          if (question.id === 'complexity') {
            const userPrefersSimple = userValue >= 7;
            const licenseIsSimple = licenseValue === 'high';
            if (userPrefersSimple === licenseIsSimple) {
              score += weight;
            } else if (userValue >= 4 && userValue <= 6) {
              score += weight * 0.5;
            }
          } else if (question.id === 'copyleft') {
            const userPrefersStrongCopyleft = userValue >= 7;
            const licenseHasStrongCopyleft = licenseValue === 'strong';
            if (userPrefersStrongCopyleft === licenseHasStrongCopyleft) {
              score += weight;
            } else if (userValue >= 4 && userValue <= 6) {
              const licenseHasWeakCopyleft = licenseValue === 'weak';
              if (licenseHasWeakCopyleft) {
                score += weight * 0.7;
              }
            }
          } else if (question.id === 'compatibility') {
            const userPrefersHighCompatibility = userValue >= 7;
            const licenseHasHighCompatibility = licenseValue === 'high';
            if (userPrefersHighCompatibility === licenseHasHighCompatibility) {
              score += weight;
            } else if (userValue >= 4 && userValue <= 6) {
              const licenseHasMediumCompatibility = licenseValue === 'medium';
              if (licenseHasMediumCompatibility) {
                score += weight * 0.7;
              }
            }
          }
        }
      }
    });
    
    return {
      license,
      score: totalWeight > 0 ? (score / totalWeight) * 100 : 0
    };
  });
  
  // Sort by score (highest first) and return top 3
  // Add tie-breaking by considering other factors for licenses with same score
  return scores
    .sort((a, b) => {
      // Primary sort by score
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      
      // Tie-breaking: prefer licenses with more matching characteristics
      let aMatches = 0;
      let bMatches = 0;
      
      // Count exact matches for each characteristic
      const characteristics = ['commercial', 'share_changes', 'closed_source', 'saas_opensource', 'patents', 'complexity', 'copyleft', 'compatibility'];
      
      characteristics.forEach(char => {
        if (answers[char] !== undefined) {
          if (a.license.characteristics[char] === answers[char]) aMatches++;
          if (b.license.characteristics[char] === answers[char]) bMatches++;
        }
      });
      
      if (bMatches !== aMatches) {
        return bMatches - aMatches;
      }
      
      // If still tied, prefer simpler licenses (higher complexity value means simpler)
      const aComplexity = a.license.characteristics.complexity === 'high' ? 3 : a.license.characteristics.complexity === 'medium' ? 2 : 1;
      const bComplexity = b.license.characteristics.complexity === 'high' ? 3 : b.license.characteristics.complexity === 'medium' ? 2 : 1;
      
      return bComplexity - aComplexity;
    })
    .slice(0, 3)
    .map(item => {
      const personalizedReasons = generatePersonalizedReasons(item.license);
      return {
        name: item.license.name,
        description: item.license.description,
        positives: personalizedReasons.positives,
        negatives: personalizedReasons.negatives,
        score: Math.round(item.score)
      };
    });
}

// Generate personalized positive and negative reasons based on user answers
function generatePersonalizedReasons(license) {
  const positives = [];
  const negatives = [];
  
  // Commercial use
  if (answers.commercial !== undefined) {
    if (license.characteristics.commercial === answers.commercial) {
      if (answers.commercial === true) {
        positives.push('✓ Allows commercial use');
      } else if (answers.commercial === false) {
        positives.push('✓ Restricts commercial use');
      } else {
        positives.push('✓ Flexible commercial policy');
      }
    } else if (answers.commercial === 'maybe') {
      // For maybe, show what the license actually does
      if (license.characteristics.commercial) {
        positives.push('✓ Allows commercial use');
      } else {
        positives.push('✓ Restricts commercial use');
      }
    } else {
      if (answers.commercial === true) {
        negatives.push('✗ Restricts commercial use');
      } else if (answers.commercial === false) {
        negatives.push('✗ Allows commercial use');
      }
    }
  }
  
  // Share changes
  if (answers.share_changes !== undefined) {
    if (license.characteristics.share_changes === answers.share_changes) {
      if (answers.share_changes === 'required') {
        positives.push('✓ Requires sharing changes');
      } else if (answers.share_changes === 'not_needed') {
        positives.push('✓ No sharing requirement');
      } else {
        positives.push('✓ Optional sharing policy');
      }
    } else if (answers.share_changes === 'optional') {
      // For optional, show what the license actually does
      if (license.characteristics.share_changes === 'required') {
        positives.push('✓ Requires sharing changes');
      } else if (license.characteristics.share_changes === 'not_needed') {
        positives.push('✓ No sharing requirement');
      } else {
        positives.push('✓ Optional sharing policy');
      }
    } else {
      if (answers.share_changes === 'required') {
        negatives.push('✗ No sharing requirement');
      } else if (answers.share_changes === 'not_needed') {
        negatives.push('✗ Requires sharing changes');
      }
    }
  }
  
  // Closed source
  if (answers.closed_source !== undefined) {
    if (license.characteristics.closed_source === answers.closed_source) {
      if (answers.closed_source === true) {
        positives.push('✓ Allows closed-source derivatives');
      } else if (answers.closed_source === false) {
        positives.push('✓ Prevents closed-source derivatives');
      } else {
        positives.push('✓ Flexible derivative policy');
      }
    } else if (answers.closed_source === 'maybe') {
      // For maybe, show what the license actually does
      if (license.characteristics.closed_source) {
        positives.push('✓ Allows closed-source derivatives');
      } else {
        positives.push('✓ Prevents closed-source derivatives');
      }
    } else {
      if (answers.closed_source === true) {
        negatives.push('✗ Prevents closed-source derivatives');
      } else if (answers.closed_source === false) {
        negatives.push('✗ Allows closed-source derivatives');
      }
    }
  }
  
  // SaaS open source
  if (answers.saas_opensource !== undefined) {
    if (license.characteristics.saas_opensource === answers.saas_opensource) {
      if (answers.saas_opensource === true) {
        positives.push('✓ Requires SaaS to be open source');
      } else if (answers.saas_opensource === false) {
        positives.push('✓ No SaaS open source requirement');
      } else {
        positives.push('✓ Flexible SaaS policy');
      }
    } else if (answers.saas_opensource === 'maybe') {
      // For maybe, show what the license actually does
      if (license.characteristics.saas_opensource) {
        positives.push('✓ Requires SaaS to be open source');
      } else {
        positives.push('✓ No SaaS open source requirement');
      }
    } else {
      if (answers.saas_opensource === true) {
        negatives.push('✗ No SaaS open source requirement');
      } else if (answers.saas_opensource === false) {
        negatives.push('✗ Requires SaaS to be open source');
      }
    }
  }
  
  // Patents
  if (answers.patents !== undefined) {
    if (license.characteristics.patents === answers.patents) {
      if (answers.patents === true) {
        positives.push('✓ Provides patent protection');
      } else if (answers.patents === false) {
        positives.push('✓ No patent protection');
      } else {
        positives.push('✓ Balanced patent approach');
      }
    } else if (answers.patents === 'maybe') {
      // For maybe, show what the license actually does
      if (license.characteristics.patents) {
        positives.push('✓ Provides patent protection');
      } else {
        positives.push('✓ No patent protection');
      }
    } else {
      if (answers.patents === true) {
        negatives.push('✗ No patent protection');
      } else if (answers.patents === false) {
        negatives.push('✗ Includes patent protection');
      }
    }
  }
  
  // Complexity
  if (answers.complexity !== undefined) {
    const userPrefersSimple = answers.complexity >= 7;
    const licenseIsSimple = license.characteristics.complexity === 'high';
    
    if (userPrefersSimple === licenseIsSimple) {
      if (userPrefersSimple) {
        positives.push('✓ Simple and easy to understand');
      } else {
        positives.push('✓ Comprehensive legal protection');
      }
    } else {
      if (userPrefersSimple) {
        negatives.push('✗ More complex than preferred');
      } else {
        negatives.push('✗ Too simple for needs');
      }
    }
  }
  
  // Copyleft
  if (answers.copyleft !== undefined) {
    const userPrefersStrongCopyleft = answers.copyleft >= 7;
    const licenseHasStrongCopyleft = license.characteristics.copyleft === 'strong';
    
    if (userPrefersStrongCopyleft === licenseHasStrongCopyleft) {
      if (userPrefersStrongCopyleft) {
        positives.push('✓ Strong copyleft protection');
      } else {
        positives.push('✓ Permissive approach');
      }
    } else {
      if (userPrefersStrongCopyleft) {
        negatives.push('✗ Weak copyleft protection');
      } else {
        negatives.push('✗ Too restrictive');
      }
    }
  }
  
  // Compatibility
  if (answers.compatibility !== undefined) {
    const userPrefersHighCompatibility = answers.compatibility >= 7;
    const licenseHasHighCompatibility = license.characteristics.compatibility === 'high';
    
    if (userPrefersHighCompatibility === licenseHasHighCompatibility) {
      if (userPrefersHighCompatibility) {
        positives.push('✓ Highly compatible with other licenses');
      } else {
        positives.push('✓ Focused on specific use cases');
      }
    } else {
      if (userPrefersHighCompatibility) {
        negatives.push('✗ Limited compatibility');
      } else {
        negatives.push('✗ Too permissive');
      }
    }
  }
  
  // Add some general characteristics if we don't have enough personalized reasons
  if (positives.length < 2) {
    if (license.characteristics.commercial) {
      positives.push('✓ Allows commercial use');
    }
    if (license.characteristics.complexity === 'high') {
      positives.push('✓ Simple and easy to understand');
    }
    if (license.characteristics.compatibility === 'high') {
      positives.push('✓ Good compatibility with other licenses');
    }
  }
  
  if (negatives.length < 1 && positives.length > 2) {
    // Add a balanced negative if we have enough positives
    if (license.characteristics.copyleft === 'strong') {
      negatives.push('⚠ May be too restrictive for some use cases');
    } else if (license.characteristics.copyleft === 'none') {
      negatives.push('⚠ Provides minimal protection for your code');
    }
  }
  
  return { positives, negatives };
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