import { vocabWord } from "@/types/Courses";

export function separateWordArray(arr: vocabWord[]) {
    const engArray: string[] = [];
    const langArray: string[] = [];

    for (const word of arr) {
        engArray.push(word.eng);

        if (word.span) {
            langArray.push(word.span);
        }
    }

    return { engArray, langArray };
};

export function shuffleArray(array: any[]) {
    let arr = [...array]

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
};

