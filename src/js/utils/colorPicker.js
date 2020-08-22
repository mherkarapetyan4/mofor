function plainColorPicker({
    theme: {
        colors: { plainColors },
    },
}) {
    const keys = Object.keys(plainColors);
    return plainColors[keys[(keys.length * Math.random()) << 0]];
}

function gradientColorPicker({
    theme: {
        colors: { gradients },
    },
}) {
    const keys = Object.keys(gradients);
    return gradients[keys[(keys.length * Math.random()) << 0]];
}

export { plainColorPicker, gradientColorPicker };
