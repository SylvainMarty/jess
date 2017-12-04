<template>
    <mu-appbar title="Logs" class="logs-bottombar">
        <mu-icon-button icon="autorenew" slot="left" @click="click()"/>
        <mu-icon-button icon="keyboard_arrow_up" slot="right" @click="click()"/>
    </mu-appbar>
</template>

<script>
//   import { mapState } from 'vuex'
export default {
  methods: {
    click () {
      console.log('Clicked on bottombar')
    }
  }
  // name: 'jekyll-embedded-simple-server',
  // computed: mapState('Jekyll', [
  // 'status'
  // ]),
  // components: {
  // Commands
  // }
}
</script>

<style>
.logs-bottombar {
    background-color: rgba(50,50,50,1);
}
</style>

