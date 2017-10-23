<template>
  <div>
    <div>
      <mu-raised-button label="Start" primary v-if="status === 'stopped'" @click="serve('/Users/Sylvain/Documents/Travail_Perso/_Git/manonlay.github.com')"/>
      <mu-raised-button label="Stop" secondary v-else-if="status === 'running'" @click="stop()"/>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    computed: mapState('Jekyll', [
      'status'
    ]),
    methods: mapActions('Jekyll', [
      'serve',
      'stop'
    ])
  }
</script>