import es from './es.js';
import en from './en.js';

export default ((navigator.language || navigator.userLanguage).substring(0, 2) === 'es') ? es : en;