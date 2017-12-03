<template>
    <mu-appbar class="jess-toolbar">
        <div slot="left">
            <h1>
                JESS<br>
                <small>Jekyll Embedded Simple Server</small>
            </h1>
        </div>
        <div slot="right">
            <mu-badge :content="status" :class="status"/>
            <commands></commands>
        </div>
    </mu-appbar>
</template>

<script>
  import { mapState } from 'vuex'
  import Commands from './Jekyll/Commands'

  export default {
    name: 'jekyll-embedded-simple-server',
    computed: mapState('Jekyll', [
      'status'
    ]),
    components: {
      Commands
    }
  }
</script>

<style>
.jess-toolbar {
    height: 90px;
    background-color: #ffffff;
}
.jess-toolbar h1,
.jess-toolbar small {
    font-weight: 400;
}
.jess-toolbar h1 {
    font-size: 22px;
    color: rgba(51,51,51,1);
}
.jess-toolbar small {
    font-size: 18px;
    color: rgba(174,174,174,1);
}
.jess-toolbar em.mu-badge {
    width: 88px;
    height: 36px;
    margin-bottom: 5px;
    text-transform: uppercase;
}
.jess-toolbar .stopped em.mu-badge {
  background-color: #FF5252;
}
.jess-toolbar .running em.mu-badge {
  background-color: #4CAF50;
}
</style>
