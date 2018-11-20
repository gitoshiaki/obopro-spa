import axios from 'axios'

export default {
    CLOUDINARY_NAME: "dp5qt2zx6",
    CLOUDINARY_PRESET: "rfvkx2ur",
    imageUploader(file) {
        const url = `https://api.cloudinary.com/v1_1/${this.CLOUDINARY_NAME}/image/upload`

        var params = new FormData()
        params.append('file', file)
        params.append('upload_preset', this.CLOUDINARY_PRESET)

        return axios.post(url, params)
    },
    validateUrl(url){
        const validUrl = /^https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+/g
        return validUrl.test(url)
    }
}
