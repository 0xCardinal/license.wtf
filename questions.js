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