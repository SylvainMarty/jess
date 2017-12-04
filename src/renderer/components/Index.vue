<template>
  <div>
    <toolbar/>
    <mu-content-block class="jess-content-layout">
      <mu-flexbox :gutter="32" align="flex-start">
        <mu-flexbox-item>
          <global-configuration/>
        </mu-flexbox-item>
        <mu-flexbox-item>
          <select-project/>
        </mu-flexbox-item>
        <mu-flexbox-item class="flex-demo">
          <project-settings/>
        </mu-flexbox-item>
      </mu-flexbox>
    </mu-content-block>
    <bottom-bar/>
  </div>
</template>

<script>
  import Toolbar from './Toolbar'
  import GlobalConfiguration from './panels/GlobalConfiguration'
  import SelectProject from './panels/ProjectSelection'
  import ProjectSettings from './panels/ProjectSettings'
  import BottomBar from './BottomBar'

  export default {
    name: 'landing-page',
    components: {
      Toolbar,
      GlobalConfiguration,
      SelectProject,
      ProjectSettings,
      BottomBar
    }
  }
</script>

<style>
body {
  background-color: rgba(236,236,236,1);
}
</style>
