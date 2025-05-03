export const initialState = {
  transcript: '',
  isListening: false,
  recognition: null,
  voices: [],
  selectedVoice: null,
  speaking: false,
  supported: {
    recognition: false,
    synthesis: false,
  },
};

export const ACTIONS = {
  SET_TRANSCRIPT: 'SET_TRANSCRIPT',
  SET_LISTENING: 'SET_LISTENING',
  SET_RECOGNITION: 'SET_RECOGNITION',
  SET_SUPPORTED: 'SET_SUPPORTED',
  SET_VOICES: 'SET_VOICES',
  SET_SELECTED_VOICE: 'SET_SELECTED_VOICE',
  SET_SPEAKING: 'SET_SPEAKING',
};

export function speechReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_TRANSCRIPT:
      return { ...state, transcript: action.payload };
    case ACTIONS.SET_LISTENING:
      return { ...state, isListening: action.payload };
    case ACTIONS.SET_RECOGNITION:
      return { ...state, recognition: action.payload };
    case ACTIONS.SET_SUPPORTED:
      return { ...state, supported: { ...state.supported, ...action.payload } };
    case ACTIONS.SET_VOICES:
      return { ...state, voices: action.payload };
    case ACTIONS.SET_SELECTED_VOICE:
      return { ...state, selectedVoice: action.payload };
    case ACTIONS.SET_SPEAKING:
      return { ...state, speaking: action.payload };
    default:
      return state;
  }
}
