const {remote} = require('electron');
const path = require('path');
const i18next = require('i18next');
const LanguageDetector = require('i18next-browser-languagedetector');
var Backend = require('i18next-sync-fs-backend');


function install(Vue) {

	Vue.i18n = {};
	Vue.i18n.options = {
		debug: true,

        // Gettext style
        lng: getLanguage(),
		fallbackLng: "en",
        // fallbackLng: false,
        keySeparator: false,

        // Namespaces
		ns: [
			"app"
		],
		defaultNS: "app",

		// backend opts
        initImmediate: false,
        backend: {
            // path where resources get loaded from
            loadPath: path.join(__dirname,'../locales/{{lng}}/{{ns}}.json'),
			/*// path to post missing resources
			addPath: path.join(__dirname,'../locales/{{lng}}/{{ns}}.missing.json')
			// jsonIndent to use when storing json files
      		jsonIndent: 4*/
        }
    };

    // i18next intialisation
	i18next
	    // .use(LanguageDetector)
	    .use(Backend)
	    .init(Vue.i18n.options);

	// Vue plugins instance method
	Vue.prototype.$tr = function(key, opts){
		return i18next.t(key, opts);
	};

	// Vue static methods
	Vue.tr = function(key, opts){
		return i18next.t(key, opts);
	};

	/**
	 * Parse user locale to always have le language (example: 'en-US' become 'en')
	 */
	function getLanguage() {
		var lang = remote.getGlobal("lang");
		return lang.indexOf("-") > -1 ? lang.split("-")[0] : lang;
	}


}

module.exports = install;