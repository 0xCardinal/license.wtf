// License database
const licenses = [
  {
    name: 'MIT',
    description: 'Super simple and permissive. Anyone can do almost anything with your code, including selling it.',
    characteristics: {
      // 1. Commercial Use
      commercial: true,
      // 2. Attribution Required
      attribution: true,
      // 3. Copyleft Strength ('none', 'weak', 'strong')
      copyleft: 'none',
      // 4. Patent Grant
      patents: false,
      // 5. Tivoization Protection
      tivoization: false,
      // 6. Permissiveness ('permissive', 'restrictive')
      permissiveness: 'permissive',
      // 7. License Compatibility ('high', 'medium', 'low')
      compatibility: 'high',
      // 8. Relicensing Allowed ('yes', 'limited', 'no')
      relicensing: 'yes',
      // 9. Jurisdiction Ambiguity (true = ambiguous, false = specified)
      jurisdiction: true
    }
  },
  {
    name: 'Apache 2.0',
    description: 'Like MIT but with better patent protection and more explicit terms for contributions.',
    characteristics: {
      commercial: true,
      attribution: true,
      copyleft: 'none',
      patents: true,
      tivoization: false,
      permissiveness: 'permissive',
      compatibility: 'high',
      relicensing: 'yes',
      jurisdiction: false // Specified (US)
    }
  },
  {
    name: 'GPL-3.0',
    description: 'Strong copyleft license that requires derivative works to also be open source.',
    characteristics: {
      commercial: true,
      attribution: true,
      copyleft: 'strong',
      patents: true,
      tivoization: true,
      permissiveness: 'restrictive',
      compatibility: 'low',
      relicensing: 'no',
      jurisdiction: true
    }
  },
  {
    name: 'BSD-3-Clause',
    description: 'Very similar to MIT but with an extra clause about endorsements.',
    characteristics: {
      commercial: true,
      attribution: true,
      copyleft: 'none',
      patents: false,
      tivoization: false,
      permissiveness: 'permissive',
      compatibility: 'high',
      relicensing: 'yes',
      jurisdiction: true
    }
  },
  {
    name: 'LGPL-2.1',
    description: 'Allows linking with proprietary code while keeping the library itself open source.',
    characteristics: {
      commercial: true,
      attribution: true,
      copyleft: 'weak',
      patents: 'maybe',
      tivoization: false,
      permissiveness: 'medium',
      compatibility: 'medium',
      relicensing: 'limited',
      jurisdiction: true
    }
  },
  {
    name: 'AGPL-3.0',
    description: 'Like GPL but also covers network use, requiring SaaS applications to be open source.',
    characteristics: {
      commercial: true,
      attribution: true,
      copyleft: 'strong',
      patents: true,
      tivoization: true,
      permissiveness: 'restrictive',
      compatibility: 'low',
      relicensing: 'no',
      jurisdiction: true
    }
  },
  {
    name: 'MPL-2.0',
    description: 'File-level copyleft that allows mixing with proprietary code at the file level.',
    characteristics: {
      commercial: true,
      attribution: true,
      copyleft: 'weak',
      patents: true,
      tivoization: false,
      permissiveness: 'medium',
      compatibility: 'medium',
      relicensing: 'limited',
      jurisdiction: true
    }
  },
  {
    name: 'CC0',
    description: 'Public domain dedication - you give up all rights to your work.',
    characteristics: {
      commercial: true,
      attribution: false,
      copyleft: 'none',
      patents: false,
      tivoization: false,
      permissiveness: 'permissive',
      compatibility: 'high',
      relicensing: 'yes',
      jurisdiction: true
    }
  },
  {
    name: 'Unlicense',
    description: 'Another public domain dedication, similar to CC0.',
    characteristics: {
      commercial: true,
      attribution: false,
      copyleft: 'none',
      patents: false,
      tivoization: false,
      permissiveness: 'permissive',
      compatibility: 'high',
      relicensing: 'yes',
      jurisdiction: true
    }
  },
  {
    name: 'WTFPL',
    description: 'Do What The Fuck You Want To Public License - extremely permissive.',
    characteristics: {
      commercial: true,
      attribution: false,
      copyleft: 'none',
      patents: false,
      tivoization: false,
      permissiveness: 'permissive',
      compatibility: 'high',
      relicensing: 'yes',
      jurisdiction: true
    }
  }
]; 