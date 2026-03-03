import { justify } from "./newTest";

describe('justify function', () => {
    test('returns full text if length <= width', () => {
        const text = 'Lorem';
        expect(justify(text,10)).toBe('Lorem');
    })
})
