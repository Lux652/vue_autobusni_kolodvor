<template>
  <nav>
    <v-toolbar color="primary" app>
        <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title >
          <v-icon>directions_bus</v-icon>
        <span class="font-weight-light">Autobusni</span>
        <span class>Kolodvor</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" app light>
        <v-layout column align-center>
            
        </v-layout>

    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
    data() {
        return {
            drawer:false
        }
    }
}
</script>
