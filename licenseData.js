// License data for analysis UI
window.licenseDatabase = {
  "mit": {
    "name": "MIT License",
    "parameters": {
      "commercial-use": {
        "status": "allowed",
        "description": "You can use the software for commercial purposes."
      },
      "attribution-required": {
        "status": "required",
        "description": "You must give credit to the original author."
      },
      "copyleft-strength": {
        "status": "none",
        "description": "No copyleft requirements; you can relicense as you wish."
      },
      "patent-grant": {
        "status": "not-granted",
        "description": "No explicit patent protection is provided."
      },
      "tivoization-protection": {
        "status": "not-protected",
        "description": "Does not prevent use in locked-down hardware."
      },
      "permissiveness": {
        "status": "permissive",
        "description": "Very few restrictions on reuse or modification."
      },
      "license-compatibility": {
        "status": "high",
        "description": "Compatible with most other open source licenses."
      },
      "relicensing-allowed": {
        "status": "yes",
        "description": "You can relicense the code under any terms."
      },
      "jurisdiction-ambiguity": {
        "status": "unspecified",
        "description": "No specific jurisdiction is defined for legal disputes."
      }
    }
  },
  "apache-2.0": {
    "name": "Apache License 2.0",
    "parameters": {
      "commercial-use": {
        "status": "allowed",
        "description": "You can use the software for commercial purposes."
      },
      "attribution-required": {
        "status": "required",
        "description": "You must give credit to the original author."
      },
      "copyleft-strength": {
        "status": "none",
        "description": "No copyleft requirements; you can relicense as you wish."
      },
      "patent-grant": {
        "status": "granted",
        "description": "Provides explicit patent protection to users."
      },
      "tivoization-protection": {
        "status": "not-protected",
        "description": "Does not prevent use in locked-down hardware."
      },
      "permissiveness": {
        "status": "permissive",
        "description": "Very few restrictions on reuse or modification."
      },
      "license-compatibility": {
        "status": "high",
        "description": "Compatible with most other open source licenses."
      },
      "relicensing-allowed": {
        "status": "yes",
        "description": "You can relicense the code under compatible terms."
      },
      "jurisdiction-ambiguity": {
        "status": "specified",
        "description": "U.S. law is specified for legal disputes."
      }
    }
  },
  "gpl-3.0": {
    "name": "GNU General Public License v3.0",
    "parameters": {
      "commercial-use": {
        "status": "allowed",
        "description": "You can use the software for commercial purposes."
      },
      "attribution-required": {
        "status": "required",
        "description": "You must give credit to the original author."
      },
      "copyleft-strength": {
        "status": "strong",
        "description": "Strong copyleft: all changes and derivatives must be open source."
      },
      "patent-grant": {
        "status": "granted",
        "description": "Provides explicit patent protection to users."
      },
      "tivoization-protection": {
        "status": "protected",
        "description": "Prevents use in locked-down hardware (Tivoization)."
      },
      "permissiveness": {
        "status": "restrictive",
        "description": "Significant restrictions to ensure code remains open source."
      },
      "license-compatibility": {
        "status": "low",
        "description": "Not compatible with many permissive licenses."
      },
      "relicensing-allowed": {
        "status": "no",
        "description": "Cannot be relicensed under other terms."
      },
      "jurisdiction-ambiguity": {
        "status": "unspecified",
        "description": "No specific jurisdiction is defined for legal disputes."
      }
    }
  }
};

window.paramMeta = {
  'commercial-use': {
    icon: '💰',
    title: 'Commercial Use',
    question: 'Can others use your code to make money — including in closed-source, for-profit products?',
    impact: 'You write a cool text-to-speech engine. A company bundles it into their product and sells it — is that okay with you?'
  },
  'attribution-required': {
    icon: '👏',
    title: 'Attribution Required',
    question: 'Does someone need to credit you if they use your code?',
    impact: 'Someone includes your library in a mobile app. Do they need to include "Built with X by @you" somewhere?'
  },
  'copyleft-strength': {
    icon: '🔄',
    title: 'Copyleft Strength',
    question: 'If someone changes your code, do they have to release their changes too?',
    impact: 'A company modifies your code and uses it in a product. Do they have to release their modified code?'
  },
  'patent-grant': {
    icon: '🛡️',
    title: 'Patent Grant',
    question: 'Does the license protect users from patent lawsuits by contributors?',
    impact: 'A contributor adds a feature and later claims it violates their patent. Are you protected?'
  },
  'tivoization-protection': {
    icon: '🔒',
    title: 'Tivoization Protection',
    question: 'Can your code be used in locked-down hardware where users can’t modify it?',
    impact: 'Your code runs on a Wi-Fi router. Can the user replace it with their own version, or does the device prevent that?'
  },
  'permissiveness': {
    icon: '🟢',
    title: 'Permissiveness',
    question: 'How many restrictions are there on reuse, remixing, and integration with other code?',
    impact: 'A startup wants to use your code in a commercial SaaS product. How much legal work do they have to do?'
  },
  'license-compatibility': {
    icon: '🤝',
    title: 'License Compatibility',
    question: 'Can this license be used together with other popular licenses in one project?',
    impact: 'You want to use both MIT and GPL code in your project. Are you legally allowed to distribute it?'
  },
  'relicensing-allowed': {
    icon: '🗂️',
    title: 'Relicensing Allowed',
    question: 'Can others relicense your code under a different license?',
    impact: 'Your MIT-licensed code gets pulled into a GPL project. Now the combined project is under GPL. Is that okay with you?'
  },
  'jurisdiction-ambiguity': {
    icon: '⚖️',
    title: 'Jurisdiction Ambiguity',
    question: 'Does the license specify which country’s laws apply to disputes?',
    impact: 'A license dispute goes to court. Which country’s laws decide the outcome?'
  }
}; 