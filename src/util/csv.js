export default {
    parse(text){
        const arr = this.readAsArray(text)
        const obj = this.arrayToObject(arr)
        return obj
    },
    readAsArray(text){
        return text.split("\n")
            .map(line => {
                return line.split(",")
                    .map(item => item.trim())
            })
    },
    arrayToObject(arr) {
        // supposed to be head line is label
        const [labels, ...data] = arr
        // index to label mapping rule
        const indexes = {}
        labels.forEach(label => {
            indexes[label] = labels.indexOf(label)
        });
        // array to object with the mapping rule
        return data.map(line => {
            const obj = {}
            Object.keys(indexes).forEach(key => {
                obj[key] = line[indexes[key]]
            })
            return obj
        })
    }
}