function getLargestConsecutiveChars(data) {
    let largest = '';
    let current = '';
    for (let i = 0; i < data.length; i++) {
        if (current[0] !== data[i]) {
            current = data[i];
        } else {
            current += data[i];
        }

        if (current.length >= largest.length) {
            largest = current;
        }
    }
    return largest;
}