<template>
  <div class="layout">
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
        <!-- <mu-list @change="handleListChange" :value="activeList">
          <mu-list-item>
            <mu-icon slot="left" value="settings" />
            <mu-icon slot="center" value="settings" />
          </mu-list-item>
          <mu-sub-header>Server</mu-sub-header>
          <mu-list-item>
            <commands></commands>
          </mu-list-item>
        </mu-list> -->
      </div>
      <div class="content-right">
        <div class="header"></div>
        <!-- <div class="body">
          <mu-sub-header>Jekyll Embedded Simple Server</mu-sub-header>
          <mu-content-block>
            <router-link :to="{ name: 'sample-page'}">Sample page</router-link>
            <br>
            <commands></commands>
          </mu-content-block>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Commands from './Jekyll/Commands'

  export default {
    name: 'landing-page',
    data () {
      return {
        activeTab: 'tab1',
        activeList: 'list1'
      }
    },
    computed: mapState('Jekyll', [
      'status'
    ]),
    methods: {
      handleTabChange (val) {
        this.activeTab = val
      },
      handleListChange (val) {
        this.activeList = val
      }
    },
    components: {
      Commands
    }
  }
</script>

<style scoped>
.layout{
}

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
  float: right;
  background-color: rgb(236, 236, 236);
}

.header{
  background-color: white;
  height: 40px;
}

.body{
  min-height: 500px;
  background-color: white;
  margin: 10px 20px;
}
</style>