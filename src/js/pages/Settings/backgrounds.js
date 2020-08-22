import theme from "config/theme";

const backgrounds = Object.keys(theme.backgrounds).map((e, index) => ({
    id: index,
    backgroundColor: theme.backgrounds[e],
    key: e,
}));

const thumbs = Object.keys(theme.backgroundsThumbs).map((e, index) => ({
    id: index,
    backgroundColor: theme.backgroundsThumbs[e],
    key: e,
}));

export { backgrounds, thumbs };

// export default [
//     {
//         id: 0,
//         background: theme.backgrounds.imageOne,
//     },
//     {
//         id: 1,
//         background: theme.backgrounds.imageTwo,
//     },
//     {
//         id: 2,
//         background: theme.backgrounds.imageThree,
//     },
//     {
//         id: 3,
//         background: theme.backgrounds.imageFour,
//     },
//     {
//         id: 4,
//         background: theme.backgrounds.imageFive,
//     },
//     {
//         id: 5,
//         background: theme.backgrounds.imageSix,
//     },
//     {
//         id: 6,
//         background: theme.backgrounds.imageSeven,
//     },
//     {
//         id: 7,
//         background: theme.backgrounds.imageEight,
//     },
//     {
//         id: 8,
//         background: theme.backgrounds.imageNine,
//     },
// ];
