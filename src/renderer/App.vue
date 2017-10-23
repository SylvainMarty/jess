<template>
  <div id="app" class="layout">
    <div class="content">
      <div class="content-left">
        <div class="logo">
          JESS
        </div>
        <mu-content-block>
          <mu-flat-button icon="settings" :to="{ name: 'global-config-page'}" style="color:#757575;"/>
          <mu-flat-button icon="help_outline" :to="{ name: 'sample-page'}" style="color:#757575;"/>
          <mu-badge :content="status" primary/>
        </mu-content-block>
        <mu-sub-header>Server</mu-sub-header>
        <mu-content-block>
          <commands></commands>
        </mu-content-block>
      </div>
      <div class="content-right">
        <div class="header"></div>
        <mu-divider />
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Commands from './components/Jekyll/Commands'

  export default {
    name: 'jekyll-embedded-simple-server',
    // data () {
    //   return {
    //     activeTab: 'tab1',
    //     activeList: 'list1'
    //   }
    // },
    computed: mapState('Jekyll', [
      'status'
    ]),
    components: {
      Commands
    }
  }
</script>

<style scoped>
.logo{
  font-size: 24px;
  color: white;
  text-align: center;
  color: #7e57c2;
  padding: 10px 20px;
}

.tab{
  margin: 0 auto;
  width: 400px;
}

.content{
  overflow: hidden;
}

.content-left{
  width: 30%;
  float: left;
  background-color: rgb(225, 225, 225);
  height: 563px;
}

.content-right{
  width: 70%;
  display: inline-block;
  min-height: 563px;
  height: auto;
  background-color: rgb(236, 236, 236);
}

.header{
  height: 40px;
}

.body{
  min-height: 500px;
  background-color: white;
  margin: 10px 20px;
}
</style>