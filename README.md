# Ace-Fi Mobile App

A React Native crypto exchange application with AI-powered onboarding and user interaction.

## Features

- AI-powered conversational signup process
- Dark mode UI with SF Pro font
- Bank account verification
- Crypto exchange functionality (coming soon)

## Prerequisites

- Node.js (v14 or later)
- Yarn package manager
- Expo CLI
- iOS Simulator or Android Emulator
- Gemini AI API key

## Setup

1. Install dependencies:
```bash
yarn install
```

2. Configure environment variables:
Create a `.env` file in the root directory with the following variables:
```
GEMINI_API_KEY=your_gemini_api_key
```

3. Add SF Pro fonts:
- Create an `assets/fonts` directory in the `src` folder
- Add the following font files:
  - SF-Pro-Text-Regular.otf
  - SF-Pro-Text-Bold.otf

4. Start the development server:
```bash
yarn start
```

## Project Structure

```
ace-fi/
├── src/
│   ├── assets/
│   │   └── fonts/
│   ├── components/
│   ├── screens/
│   ├── services/
│   └── utils/
├── App.tsx
├── app.json
└── package.json
```

## Development

- `yarn start` - Start the Expo development server
- `yarn ios` - Start the iOS simulator
- `yarn android` - Start the Android emulator
- `yarn test` - Run tests
- `yarn lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 