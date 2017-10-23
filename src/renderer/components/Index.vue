<template>
  <mu-content-block>
    <mu-card>
      <mu-card-header title="Sample" subTitle="This is a sample"/>
      <mu-card-title title="Content Title" subTitle="This is a sample"/>
      <mu-card-text>
        <router-link :to="{ name: 'sample-page'}">Sample page</router-link>
      </mu-card-text>
      <mu-card-actions>
        <mu-flat-button label="Action 1"/>
        <mu-flat-button label="Action 2"/>
      </mu-card-actions>
    </mu-card>
  </mu-content-block>
</template>

<script>
  export default {
    name: 'landing-page'
  }
</script>