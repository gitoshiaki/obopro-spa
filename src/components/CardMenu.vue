<template lang="pug">
.card-menu
    ul.card-menu-list
        li.list-item(
            @click="myprofile"
        )
            font-awesome-icon.list-item-icon(icon="user")
            span マイページ
        li.list-item(
            @click="logout"
        )
            font-awesome-icon.list-item-icon(icon="sign-out-alt")
            span ログアウト
</template>

<script>
export default {
    name: "CardMenu",
    methods: {
        logout(){
            this.$store.dispatch('logout')
            this.$auth0.logout()
        },
        myprofile(){
            this.$parent.close()
            const id = this.$store.state.profile.id
            this.$router.push({
                name:'Profile',
                params: { id }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.card-menu
    display block
    min-width 10rem
    min-height 10rem
.card-menu-list
    background: #fff;
    border-radius: 5px;
.list-item
    padding: 1rem;
    border-bottom: .5px solid rgba(0,0,0,0.1);
    display flex
    justify-content flex-start
    align-items center
    cursor pointer
    &:hover
        background rgba(0,0,0,0.1)
    &-icon
        margin-right 1rem
</style>
