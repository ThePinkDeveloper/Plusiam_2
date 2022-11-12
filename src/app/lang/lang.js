import { Es } from './es.js';
import { En } from './en.js';

export class Lang {

    static browserLang = ((navigator.language || navigator.userLanguage).substring(0, 2) === 'es') ? Es.data : En.data;

}