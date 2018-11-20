<template lang="pug">
.actionButton(@click="$emit('click',$event)")
    slot
</template>

<script>
export default {
    name: 'actionButton'
}
</script>

<style lang="stylus">
.actionButton
    box-sizing border-box
    width: 100%;
    max-width: 30rem;
    font-size: 1rem;
    display: block;
    text-align: center;
    padding: 1rem;
    line-height 1rem
    margin: 1rem auto 0;
    background: linear-gradient(to right, #f80759, #bc4e9c);
    color: white;
    font-weight: bold;
    border-radius: 5px;
    box-shadow: 0 1px 20px -5px lightblue;
    cursor pointer
    transition .2s ease
    &.cancel
      background: transparent
      border: 0
      box-shadow: none
      color gray
    &:hover
    &:focus
    &:active
      outline 0
      transform scale(.95)
</style>
