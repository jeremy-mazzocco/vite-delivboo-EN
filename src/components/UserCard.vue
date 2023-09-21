<script>

export default {
    name: 'UserCard',
    props: {
        detailsUser: Object
    },
}
</script>

<template>
    <div class="flex">
        <div class="block">
            <div>{{ detailsUser.restaurant_name }}</div>
            <div>{{ detailsUser.email }}</div>
            <div>{{ detailsUser.address }}</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.flex {
    display: flex;
    flex-wrap: wrap;
    .block {
        margin: 20px;
        padding: 20px;
        border: 2px solid purple;
        width: 20%;
    }
}
</style>
