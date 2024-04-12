export const mean = (list) => {
    let mean = 0;
    list.forEach((item) => (mean += item));
    mean /= list.length;
    return mean;
};

export const std = (list) => {
    const mn = mean(list);
    const squares = list.map((item) => Math.pow(mn - item, 2));
    let sum = 0;
    squares.forEach((item) => (sum += item));
    sum /= squares.length;
    return Math.sqrt(sum);
};

export const median = (list) => {
    const values = [...list].sort((a, b) => a - b);
    const half = Math.floor(values.length / 2);
    return values.length % 2
        ? values[half]
        : (values[half - 1] + values[half]) / 2;
};

export const min = (list) => {
    let min = list[0];
    for (let i = 1; i < list.length; i++) if (list[i] < min) min = list[i];
    return min;
};

export const max = (list) => {
    let max = list[0];
    for (let i = 1; i < list.length; i++) if (list[i] > max) max = list[i];
    return max;
};

export const range = (list) => {
    return max(list) - min(list);
};

export const iqr = (list) => {
    const values = [...list].sort((a, b) => a - b);
    const medianIndex = list.length / 2;
    const q1 = median(
        values.slice(
            0,
            Math.floor(medianIndex) == medianIndex
                ? medianIndex
                : Math.floor(medianIndex)
        )
    );
    const q3 = median(
        values.slice(
            Math.floor(medianIndex) == 0 ? medianIndex : Math.ceil(medianIndex),
            values.length
        )
    );
    console.log(q3 + ' ' + q1);
    return q3 - q1;
};
