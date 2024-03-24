const getSpeechRecognition = () => {
  try {
    return (
      (globalThis as any)?.SpeechRecognition ||
      (window as any)?.SpeechRecognition ||
      (window as any)?.webkitSpeechRecognition
    );
  } catch {
    return null;
  }
};

const getSpeechSynthesis = () => {
  try {
    return (
      (globalThis as any)?.speechSynthesis ||
      (window as any)?.speechSynthesis ||
      (window as any)?.webkitSpeechSynthesis
    );
  } catch {
    return null;
  }
};

const getSpeechSynthesisUtterance = () => {
  try {
    return (
      (globalThis as any)?.SpeechSynthesisUtterance ||
      (window as any)?.SpeechSynthesisUtterance ||
      (window as any)?.webkitSpeechSynthesisUtterance
    );
  } catch {
    return null;
  }
};
export const SpeechRecognition = getSpeechRecognition();
export const SpeechSynthesis = getSpeechSynthesis();
export const SpeechSynthesisUtterance = getSpeechSynthesisUtterance();
