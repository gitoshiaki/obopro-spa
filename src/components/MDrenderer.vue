<template lang="pug">
.markdown-body(v-html="rendered")
</template>

<script>
import marked from 'marked'
export default {
    name: "MDrenderer",
    props: {
        raw: String
    },
    computed: {
        rendered(){
            return marked(this.raw)
        }
    },
}
</script>

<style>
@import '~simplemde/dist/simplemde.min.css';
@import '~github-markdown-css';
.markdown-body ul {
    list-style-type: disc;
}
</style>