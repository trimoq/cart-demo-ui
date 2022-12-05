<template>
    <v-app-bar
    title="AxonIQ Merch Store">
    <template v-slot:append>
        <StoryMenu />
    </template>
    </v-app-bar>
</template>

<script>

import StoryMenu from "./StoryMenu.vue"

export default {
 name: 'StoryHeader',
 components: {
    StoryMenu
 },
}
</script>
