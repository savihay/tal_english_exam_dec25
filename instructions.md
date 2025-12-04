# Project Specification: Grade 3 English Exam Prep App

## Role
You are an expert React developer specializing in educational tools for children.

## Goal
Create a mobile-responsive, single-file React application to help a 3rd-grade Hebrew-speaking student prepare for a specific English exam.

## 1. Technical Stack
*   **Framework**: React (Functional Components, Hooks).
*   **Styling**: Tailwind CSS (via CDN/classes) + Custom CSS animations for floating elements.
*   **Icons**: lucide-react.
*   **Audio**: window.speechSynthesis (Browser native TTS).
*   **Output**: A single, self-contained .html file.

## 2. Design Philosophy (Mobile First & Gamified)
*   **Target Audience**: 8-9 year old Hebrew speakers.
*   **Language**: Hebrew interface.
*   **Vibe**: Fun, animated, and "juicy" (lots of feedback).
*   **Gamification**:
    *   Stars/Score: Always visible.
    *   Confetti: Trigger on completing a section.
    *   Animations: Use CSS keyframes for floating balloons and bubbles.

## 3. Data & Content (Strict Adherence to Syllabus)

### Section A: Letters (Focus: Recognition)
*   **Items**: Aa, Bb, Dd, Gg, Nn.
*   **Activity**: Flashcards with sound.

### Section B: Colors (Gamified: "Pop the Balloon")
*   **Items**: Red, Blue, Black, Yellow, Green, Gray, Pink, Purple, White, Brown, Orange.
*   **Activity**:
    *   **Visuals**: Render colored "balloons" (oval shapes with strings) floating upward or hovering on screen.
    *   **Mechanic**: App speaks a color (e.g., "Red"). The child must tap/pop the correct red balloon.
    *   **Feedback**: The balloon "pops" (disappears with a small effect) and a success sound plays.

### Section C: Numbers (Gamified: "Number Bubbles")
*   **Items**: 0-12.
*   **Activity**:
    *   **Visuals**: Render transparent "bubbles" (circles with white borders) containing numbers floating gently on the screen.
    *   **Mechanic**: App speaks a number (e.g., "Seven"). The child must tap the bubble with '7'.
    *   **Feedback**: Bubble pops with a satisfying animation.

### Section D: Cognates (Focus: Identification & First Letter)
*   **Items**: Balloon (B), Astronaut (A), Ambulance (A), Avocado (A), Guitar (G), Bus (B), Gorilla (G).
*   **Logic**:
    *   **The Grid**: Show images/icons for ALL cognates.
    *   **The Audio**: Play audio for one (e.g., "Ambulance").
    *   **Selection**: Child identifies and clicks the image.
    *   **First Letter**: Prompt: "What is the first letter?" (A, B, G, N, D).

### Section E: Vocabulary (Focus: Hebrew Translation)
*   **Items**: (Same list as before: Family, Animals, Objects, Adjectives, Body parts).
*   **Activity**: "Hebrew Multiple Choice".
    *   Show icon + Play English Audio.
    *   Show 3 Hebrew text buttons (1 correct, 2 distractors).

### Section F: Reading (Focus: Text Translation)
*   **Items**: banana, bag, dad, bad, Ann, Look, I am.
*   **Activity**: Show English Text -> Select Hebrew Meaning.

### Section G: Name Practice
*   **Activity**: Input field. Type name -> Enter -> App spells it out letter by letter.

## 4. Component Structure
*   **App**: Main container.
*   **FloatingGame**: A reusable component for Balloons (Colors) and Bubbles (Numbers). Handles the animation loop and click logic.
*   **CognateGame**: "Select from Grid" + "First Letter".
*   **HebrewQuizGame**: Vocabulary & Reading.
*   **TTSHelper**: Speech utility.

## 5. Implementation Details
*   **Animations**: Use standard CSS @keyframes defined in a <style> tag for the floating motion (up/down or jitter).
*   **Hebrew UI**: dir="rtl".
*   **Icons**: Use lucide-react.

## 6. Reference Material
*   **Code Style**: Use https://github.com/savihay/englishtutor as a baseline.

## 7. Execution
Generate the full code now. Ensure animations are smooth and the game is responsive on mobile.
