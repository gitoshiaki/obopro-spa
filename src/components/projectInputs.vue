<template lang="pug">
.inputs-container
    .group
        textarea.text(
            type="text"
            v-model="project.name"
            placeholder="南門商店街ポスター展"
            ref="textarea"
            )
    .group
        SimpleMDE(
            v-model="project.description"
            )
</template>

<script>
import SimpleMDE from 'vue-simplemde/src/markdown-editor'

export default {
    name: "projectInputs",
    components: {
        SimpleMDE
    },
    props: {
        value: Object
    },
    data(){
        return {
            project: this.value
        }
    },
    watch: {
        value(value){
            this.project = value
        },
        project(value){
            this.$emit("input",value)
        }
    },
}
</script>

<style lang="stylus" scoped>
@import '~simplemde/dist/simplemde.min.css';

.inputs-container
    width 100%
.group
    width 100%
    margin-top: .7rem;
.text
    width: 100%;
    height: 3.5rem;
    line-height: 1.5rem;
    font-size: 1rem;
    border: 0;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    background: #fff;
    padding: 1rem;
    box-sizing: border-box;
    &.large
        height 10rem
    &:focus
        outline none
        background: rgba
.label
    margin: 1rem 0 .3rem;
    color: rgba(0,0,0,0.5);
    font-size: 0.9rem;
    text-align: left;
</style>
