const Vue = require('vue/dist/vue.common');
const fs = require("fs");
const path = require('path');
const properties = require("../properties.json");
var Jekyll = require("../modules/Jekyll.js");

var jekyll = new Jekyll();

var app = new Vue({
    el: '#app',

    data: function() {
        var self = {
            message: 'Hello Vue!',
            conf: {}
        };
        jekyll.getConfig().then(function(config){
            self.conf = config;
        });

        return self;
    },

    methods: {
        save: save
    }
});


function save() {
    console.log("saving...", this.conf);
    jekyll.configure(this.conf).then(function(newConf){
        console.warn("Save done !");
        this.conf = newConf;
    });
}
