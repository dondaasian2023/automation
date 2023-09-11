import { JSDOM } from 'jsdom';

export function getElementByQuerySelector(stringHtml, querySelector) {
    const parser = new JSDOM(stringHtml);
    return parser.window.document.querySelector(querySelector);
}
