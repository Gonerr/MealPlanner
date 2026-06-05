const TestsTS = () => {
    return <div></div>;
};

// Нужна функция которая будет возвращать true если буквы вернут нас в то же положение ТО ЕСТЬ букв w будет столько же сколько n и наоборот
export function isValidWalk(walk: string[]) {
    if (walk.length < 2 || walk.length > 10) return false;

    let charw = walk.filter((l) => l === "w").length;
    let charn = walk.filter((l) => l === "n").length;
    let chare = walk.filter((l) => l === "e").length;
    let chars = walk.filter((l) => l === "s").length;

    return charw === chare && charn === chars;
}

export default TestsTS;
