declare module 'page-flip' {
    export class PageFlip {
        constructor(element: HTMLElement, options: any);
        loadFromHTML(elements: NodeListOf<Element> | HTMLElement[] | Element[]): void;
        on(eventName: string, callback: (e: any) => void): void;
        flipNext(): void;
        flipPrev(): void;
    }
}
