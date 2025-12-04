# Grade 3 English Exam Prep App

A mobile-responsive, gamified React application designed to help 3rd-grade Hebrew-speaking students prepare for their English exam. The app focuses on letter recognition, vocabulary, numbers, colors, and basic reading skills through interactive games and quizzes.

## 🎯 Project Goal
To provide a fun, engaging, and "juicy" learning experience for 8-9 year olds, adhering strictly to their exam syllabus. The app uses animations, sound effects, and positive reinforcement (confetti, stars) to keep students motivated.

## 🛠️ Technical Stack
*   **Framework**: React (Vite)
*   **Styling**: Tailwind CSS + Custom CSS Animations
*   **Icons**: lucide-react
*   **Audio**: Web Speech API (Browser native Text-to-Speech)
*   **Deployment**: GitHub Pages

## 🎮 Features & Sections

### 1. Letters (Recognition)
*   **Focus**: Identifying letters Aa, Bb, Dd, Gg, Nn.
*   **Activity**: Interactive flashcards with audio pronunciation.

### 2. Colors ("Pop the Balloon")
*   **Focus**: Color recognition (Red, Blue, Green, etc.).
*   **Activity**: The app speaks a color, and the student must pop the corresponding floating balloon.
*   **Mechanic**: Physics-like floating animations.

### 3. Numbers ("Number Bubbles")
*   **Focus**: Numbers 0-12.
*   **Activity**: Similar to the balloon game, but with transparent bubbles containing numbers.

### 4. Cognates (First Letter)
*   **Focus**: Words that sound similar in English and Hebrew (e.g., Balloon/Balon).
*   **Activity**: Identify the object and select its starting letter (A, B, G, etc.).

### 5. Vocabulary (Hebrew Quiz)
*   **Focus**: Translation of common words (Family, Animals, Objects, Adjectives, Body parts).
*   **Activity**: Hear/See the English word and select the correct Hebrew translation from 3 options.

### 6. Reading
*   **Focus**: Simple words and phrases (e.g., "banana", "I am", "dad").
*   **Activity**: Read the English text and select the Hebrew meaning.

### 7. Name Practice
*   **Focus**: Spelling.
*   **Activity**: Type a name, and the app spells it out letter by letter.

## 📂 Project Structure

```
├── src/
│   ├── components/         # Game and UI components
│   │   ├── CognateGame.jsx # Section D logic
│   │   ├── Flashcards.jsx  # Section A logic
│   │   ├── FloatingGame.jsx# Shared logic for Balloons (Colors) & Bubbles (Numbers)
│   │   ├── LettersGame.jsx # Letter recognition game
│   │   ├── NamePractice.jsx# Section G logic
│   │   ├── Navigation.jsx  # Home screen menu
│   │   └── QuizGame.jsx    # Shared logic for Vocab & Reading quizzes
│   ├── data/
│   │   └── content.js      # Centralized data (words, colors, numbers, questions)
│   ├── hooks/
│   │   └── useGameLogic.js # Custom hook for game state management
│   ├── App.jsx             # Main routing and layout
│   └── main.jsx            # Entry point
├── instructions.md         # Original project specification
└── README.md               # Project documentation
```

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/savihay/tal_english_exam_dec25.git
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
4.  **Build for production:**
    ```bash
    npm run build
    ```

## 🎨 Design Philosophy
*   **Mobile-First**: Optimized for touch interaction on phones and tablets.
*   **Hebrew Interface**: All instructions and feedback are in Hebrew (RTL layout).
*   **Gamification**: Persistent score tracking and celebratory effects.
