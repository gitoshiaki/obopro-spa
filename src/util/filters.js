import moment from "moment"

export default {
    dateFormat(value) {
        if (!value) return ''
        value = value.toString()
        return moment(value).format('YYYY/MM/DD HH:MM')
    },
    truncate(value, length, omission) {
        const len = length ? parseInt(length, 10) : 20;
        const omm = omission ? omission.toString() : '...';
        if (value.length <= len) return value
        return value.substring(0, length) + omm;
    },
    capitalize(value) {
        if (!value) return ''
        const values = value.toString().split(/\s+/)
        return values.map((value) => {
            return value.charAt(0).toUpperCase() + value.slice(1)
        }).join(" ")
    },
    relativeTime(date) {
        return moment(date).fromNow();
        // return moment(date).format('YYYY/MM/DD');
    },
    resizeTitle(text) {
        if (text.length > 10) {
            return text.slice(0, 9) + "..."
        }
        return text
    }
}