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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
      compatibility: 'medium'
    }
  },
  {
    name: 'CC0',
    description: 'Public domain dedication - you give up all rights to your work.',
    characteristics: {
      commercial: true,
      share_changes: 'not_needed',
      closed_source: true,
      saas_opensource: false,
      patents: false,
      complexity: 'high',
      copyleft: 'none',
      compatibility: 'high'
    }
  },
  {
    name: 'Unlicense',
    description: 'Another public domain dedication, similar to CC0.',
    characteristics: {
      commercial: true,
      share_changes: 'not_needed',
      closed_source: true,
      saas_opensource: false,
      patents: false,
      complexity: 'high',
      copyleft: 'none',
      compatibility: 'high'
    }
  },
  {
    name: 'WTFPL',
    description: 'Do What The Fuck You Want To Public License - extremely permissive.',
    characteristics: {
      commercial: true,
      share_changes: 'not_needed',
      closed_source: true,
      saas_opensource: false,
      patents: false,
      complexity: 'high',
      copyleft: 'none',
      compatibility: 'high'
    }
  }
]; 