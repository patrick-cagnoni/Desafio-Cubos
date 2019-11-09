export const timeConverter = (time) => {
    const hours = time / 60;
    const rhours = Math.floor(hours);
    const minutes = Math.round( ( hours - rhours ) * 60 );

    return `${rhours}h${minutes}min`;
}

export const dateConverter = date => {
    if(!date) return ""
    let newDate = date.split('-').reverse();
    return `${newDate[0]}/${newDate[1]}/${newDate[2]}`;
}

export const sample = (array, start, end) => {
    let resultArr = [];
    
    array.forEach( (elem, i) => {
        if(i >= start && i < end)
            resultArr.push(elem)
    });

    return resultArr

}

export const subString = (string) => {
    const maxChar = 255;
    return string.length > maxChar? string.substring(0, maxChar) + ' ...': string
}