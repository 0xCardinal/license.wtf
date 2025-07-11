# license.ftw

This is a pure HTML, CSS, and JavaScript version of the license wizard application, converted from the original React/TypeScript implementation. Live at [licenses.wtf](https://licenses.wtf).

## Features

- **Interactive Quiz**: Answer 8 questions about your licensing preferences
- **Smart Recommendations**: Get personalized license recommendations based on your answers
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Dark Mode Support**: Automatically adapts to system preferences
- **No Dependencies**: Pure vanilla web technologies

## How to Use

1. **Visit the Site**: Go to [licenses.wtf](https://licenses.wtf)
2. **Answer Questions**: 
   - Toggle questions: Click "Yes", "No", or "Maybe" buttons
   - Slider questions: Drag the slider to set your preference (1-10 scale)
3. **Get Recommendations**: Click "Get My License Recommendation!" when all questions are answered
4. **Review Results**: See your top 3 license recommendations with explanations
5. **Try Again**: Click "Try Again" to restart the quiz

## Questions

The quiz asks about:

1. **Commercial Use** 💸 - Can people use your code in commercial projects?
2. **Share Changes** ♻️ - Should people share their changes back?
3. **Closed Source** 🔒 - Is it okay if someone turns your code into a closed-source product?
4. **SaaS Open Source** 🌐 - If someone runs your code on a web app, should they open source it too?
5. **Patent Protection** 🛡️ - Do you want protection for your ideas (patents)?
6. **License Simplicity** 📜 - How simple should your license be?
7. **Copyleft Strength** ♻️ - How strongly do you want others to keep their code open?
8. **License Compatibility** 🤝 - How compatible should your license be with other codebases?

## Supported Licenses

The application recommends from these popular open source licenses:

- **MIT** - Simple and permissive
- **Apache 2.0** - Like MIT with better patent protection
- **GPL-3.0** - Strong copyleft license
- **BSD-3-Clause** - Very similar to MIT
- **LGPL-2.1** - Allows linking with proprietary code
- **AGPL-3.0** - GPL with network use coverage
- **MPL-2.0** - File-level copyleft
- **ISC** - Simplified BSD license
- **CC0** - Public domain dedication
- **Unlicense** - Public domain with patent grant

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # All CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Design System

The application uses a consistent design system with:

- **Colors**: HSL-based color palette with light/dark mode support
- **Typography**: Inter font family
- **Spacing**: Consistent spacing scale
- **Animations**: Smooth transitions and micro-interactions
- **Responsive**: Mobile-first responsive design

## Converting from React

This version maintains the exact same functionality as the original React app:

- ✅ All questions and logic preserved
- ✅ Same scoring algorithm
- ✅ Identical UI/UX
- ✅ All animations and interactions
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Theme toggle functionality

## Development

To modify the application:

1. **Add Questions**: Edit the `questions` array in `script.js`
2. **Change Styling**: Modify CSS variables in `styles.css`
3. **Update Logic**: Edit the scoring functions in `script.js`
4. **Add Licenses**: Update the license database in `script.js`
5. **Deploy**: Push changes to the hosting provider for licenses.wtf

## License

This project is open source and available under the MIT License. 