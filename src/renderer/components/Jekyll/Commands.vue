<template>
  <div>
      <span class="server-commands" ref="commands" @mouseenter="handleHover" @mouseleave="handleHoverExit">
        <mu-raised-button label="Start" primary v-if="status === 'stopped'" @click="serve('/Users/Sylvain/Documents/Travail_Perso/_Git/manonlay.github.com')" class="stopped"/>
        <mu-raised-button label="Stop" secondary v-else-if="status === 'running'" @click="stop()" class="running"/>
        <mu-tooltip :label="tooltipLabel" :show="show" :trigger="trigger" :touch="touch" :verticalPosition="'bottom'" :horizontalPosition="'left'"/>
      </span>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    data () {
      return {
        show: false,
        touch: true,
        trigger: null
      }
    },
    mounted () {
      this.trigger = this.$refs.commands
    },
    computed: {
      tooltipLabel () {
        return this.status === 'running' ? 'Clickez pour arrêter le serveur' : 'Clickez pour démarrer le serveur'
      },
      ...mapState('Jekyll', [
        'status'
      ])
    },
    methods: {
      handleHover () {
        this.show = true
      },
      handleHoverExit () {
        this.show = false
      },
      ...mapActions('Jekyll', [
        'serve',
        'stop'
      ])
    }
  }
</script>

<style scoped>
.server-commands {
  position: relative;
}
.mu-raised-button.stopped {
  background-color: #4CAF50;
}
.mu-raised-button.running {
  background-color: #FF5252;
}
</style>
