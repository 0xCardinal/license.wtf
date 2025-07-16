// Updated Questions Data
const questions = [
  {
    id: 'commercial_use',
    param: 'commercial',
    text: 'Do you want to allow commercial use of your code?',
    emoji: '💸',
    description: 'Can companies or individuals use your code to make money?',
    type: 'toggle',
    weight: 15,
    options: [
      { value: 'true', text: '✅ Sure', emoji: '✅' },
      { value: 'maybe', text: '🤷 Don’t know', emoji: '🤷' },
      { value: 'false', text: '❌ No', emoji: '❌' }
    ]
  },
  {
    id: 'copyleft_strength',
    param: 'copyleft',
    text: 'Should others have to share improvements they make?',
    emoji: '♻️',
    description: 'Do you want improvements to be shared with the community?',
    type: 'toggle',
    weight: 14,
    options: [
      { value: 'required', text: '♻️ Always', emoji: '♻️' },
      { value: 'optional', text: '🤷 Optional', emoji: '🤷' },
      { value: 'not_needed', text: '✅ No need', emoji: '✅' }
    ]
  },
  {
    id: 'attribution_required',
    param: 'attribution',
    text: 'Should people credit you when using your code?',
    emoji: '🙏',
    description: 'Should your name be included when your code is used?',
    type: 'toggle',
    weight: 13,
    options: [
      { value: 'true', text: '🙏 Yes', emoji: '🙏' },
      { value: 'maybe', text: '🤷 Don’t know', emoji: '🤷' },
      { value: 'false', text: '😎 No need', emoji: '😎' }
    ]
  },
  {
    id: 'permissiveness',
    param: ['permissiveness', 'compatibility'],
    text: 'Can your code be used in closed-source software?',
    emoji: '🔒',
    description: 'Is it okay to include your code in proprietary software?',
    type: 'toggle',
    weight: 12,
    options: [
      { value: 'true', text: '✅ Totally fine', emoji: '✅' },
      { value: 'maybe', text: '🤷 Depends', emoji: '🤷' },
      { value: 'false', text: '❌ Not okay', emoji: '❌' }
    ]
  },
  {
    id: 'patent_grant',
    param: 'patents',
    text: 'Do you want protection from patent claims?',
    emoji: '🛡️',
    description: 'Should contributors give up patent rights to avoid lawsuits?',
    type: 'toggle',
    weight: 10,
    options: [
      { value: 'true', text: '🛡️ Yes', emoji: '🛡️' },
      { value: 'maybe', text: '🤷 Maybe', emoji: '🤷' },
      { value: 'false', text: '❌ No', emoji: '❌' }
    ]
  },
  {
    id: 'tivoization_protection',
    param: 'tivoization',
    text: 'Should users be able to change your code on locked devices?',
    emoji: '📦',
    description: 'Should your code stay editable even in hardware like routers or TVs?',
    type: 'toggle',
    weight: 8,
    options: [
      { value: 'true', text: '🔓 Yes, allow it', emoji: '🔓' },
      { value: 'maybe', text: '🤷 Not sure', emoji: '🤷' },
      { value: 'false', text: '📦 Lock it down', emoji: '📦' }
    ]
  },
  {
    id: 'popular_safe',
    param: ['permissiveness', 'compatibility'],
    text: 'Do you prefer a popular, easy license?',
    emoji: '🌍',
    description: 'Should your license be simple and widely adopted?',
    type: 'toggle',
    weight: 9,
    options: [
      { value: 'true', text: '👍 Yes, keep it easy', emoji: '👍' },
      { value: 'maybe', text: '🤷 Don’t know', emoji: '🤷' },
      { value: 'false', text: '⚙️ I want control', emoji: '⚙️' }
    ]
  }
];
