function* idGenerator() {
    let index = 0;
    while (true) {
        yield index++;
    }
}

const generator = idGenerator();

export function getNextId() {
    return generator.next().value;
}
