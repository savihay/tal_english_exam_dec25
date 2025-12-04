export const DATA = {
    letters: [
        { char: 'Aa', sound: 'A' },
        { char: 'Bb', sound: 'B' },
        { char: 'Dd', sound: 'D' },
        { char: 'Gg', sound: 'G' },
        { char: 'Nn', sound: 'N' }
    ],
    colors: [
        { name: 'Red', hex: '#FF5252' },
        { name: 'Blue', hex: '#448AFF' },
        { name: 'Black', hex: '#333333' },
        { name: 'Yellow', hex: '#FFD740' },
        { name: 'Green', hex: '#69F0AE' },
        { name: 'Gray', hex: '#9E9E9E' },
        { name: 'Pink', hex: '#FF69B4' },
        { name: 'Purple', hex: '#E040FB' },
        { name: 'White', hex: '#FFFFFF' },
        { name: 'Brown', hex: '#8D6E63' },
        { name: 'Orange', hex: '#FFAB40' }
    ],
    numbers: Array.from({ length: 13 }, (_, i) => ({ val: i, text: i.toString() })),
    cognates: [
        { id: 'balloon', name: 'Balloon', first: 'B', icon: '🎈' },
        { id: 'astronaut', name: 'Astronaut', first: 'A', icon: '👨‍🚀' },
        { id: 'ambulance', name: 'Ambulance', first: 'A', icon: '🚑' },
        { id: 'avocado', name: 'Avocado', first: 'A', icon: '🥑' },
        { id: 'guitar', name: 'Guitar', first: 'G', icon: '🎸' },
        { id: 'bus', name: 'Bus', first: 'B', icon: '🚌' },
        { id: 'gorilla', name: 'Gorilla', first: 'G', icon: '🦍' }
    ],
    vocab: [
        { eng: 'Family', heb: 'משפחה', distractors: ['חברים', 'בית ספר'] },
        { eng: 'Dog', heb: 'כלב', distractors: ['חתול', 'סוס'] },
        { eng: 'Cat', heb: 'חתול', distractors: ['כלב', 'עכבר'] },
        { eng: 'Big', heb: 'גדול', distractors: ['קטן', 'אדום'] },
        { eng: 'Small', heb: 'קטן', distractors: ['גדול', 'שמח'] },
        { eng: 'Happy', heb: 'שמח', distractors: ['עצוב', 'כועס'] },
        { eng: 'Sad', heb: 'עצוב', distractors: ['שמח', 'רעב'] },
        { eng: 'Head', heb: 'ראש', distractors: ['יד', 'רגל'] },
        { eng: 'Hand', heb: 'יד', distractors: ['ראש', 'בטן'] }
    ],
    reading: [
        { text: 'banana', heb: 'בננה', distractors: ['תפוח', 'אגס'] },
        { text: 'bag', heb: 'תיק', distractors: ['ספר', 'עיפרון'] },
        { text: 'dad', heb: 'אבא', distractors: ['אמא', 'אח'] },
        { text: 'bad', heb: 'רע', distractors: ['טוב', 'שמח'] },
        { text: 'Ann', heb: 'אן (שם)', distractors: ['אני', 'הוא'] },
        { text: 'Look', heb: 'תסתכל', distractors: ['תשמע', 'תלך'] },
        { text: 'I am', heb: 'אני', distractors: ['אתה', 'הוא'] }
    ]
};
