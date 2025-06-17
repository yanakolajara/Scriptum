export const getPreferredVoice = (voices) =>
  voices.find(
    (v) => v.lang.includes('en') && v.name.toLowerCase().includes('female')
  ) ||
  voices.find((v) => v.lang.includes('en')) ||
  voices[0];
