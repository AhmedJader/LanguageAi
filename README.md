# Language AI 
<a href="https://github.com/AhmedJader/LanguageAi">
<img src="Screenshot 2024-10-27 014131.png" alt="website home screen">

### Core Technologies

- **Next.js**: React-based framework for frontend.
- **React**: Component-based UI framework for modular, reusable elements.
- **OpenAI API (GPT-4)**: Language model backend for translations and language processing.
- **HTML5 Speech Recognition & Synthesis APIs**: For voice input and text-to-speech capabilities.
- **Custom Hooks**: Managing translation states and interactions with OpenAI API.
- **Tailwind CSS**: CSS framework for responsive and customizable UI.

## Features

- **Text-to-Text Translation**  
  High-accuracy translations between multiple languages using the GPT-4 model, fetched via `useTranslate` custom hook.

- **Speech-to-Text Processing**  
  Voice input converted into editable text, enhancing accessibility with real-time transcription support.

- **Text-to-Speech Output**  
  Converts translated text to audio using `SpeechSynthesisUtterance`, facilitating language learning and accessibility.

- **File Upload Translation**  
  Users can upload `.rtf` files, which are read, processed, and converted into translated text.

- **Link Paste for Content Fetching**  
  Fetches text from pasted links for direct translation, enabling flexible and fast content input.

- **Language Selector**  
  Dropdown component for selecting source and target languages, built to support dynamic language addition.

- **Responsive UI and Copy-Share**  
  Provides copy-to-clipboard and sharing functionality for translated text, ensuring easy access and distribution.

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AhmedJader/LanguageAi.git
   ```

2. Install dependencies:
   ```bash
   cd LanguageAi
   npm install
   ```

3. Start the application:
   ```bash
   npm run dev
   ```

### Acknowledgements

I would like to thank the creator of the following resource(s) that greatly assisted in the development of this project:

- **[Build an AI Voice & Text Translation]([URL to the video](https://www.youtube.com/watch?v=dGHFV_RMGag&t=912s))** by **[Albert Mend]**: This video provided valuable insights and guidance on implementing OpenAi for this project.
