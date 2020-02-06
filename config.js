Perch.UserConfig.redactor = function ()
{
let fixResizer = function() {
$('head').append('<style type="text/css">#redactor-image-resizer { z-index: 1000; }</style>');
}
let load = function (cb) {
jQuery.getScript(Perch.path + '/addons/plugins/editors/redactor-plugins/inlinestyle.min.js', function() {
jQuery.getScript(Perch.path + '/addons/plugins/editors/redactor-plugins/fontcolor.min.js', function() {
jQuery.getScript(Perch.path + '/addons/plugins/editors/redactor-plugins/table.min.js', function() {
jQuery.getScript(Perch.path + '/addons/plugins/editors/redactor-plugins/video.min.js', function() {
jQuery.getScript(Perch.path + '/addons/plugins/editors/redactor-plugins/properties.min.js', function() {
jQuery.getScript(Perch.path + '/addons/plugins/editors/redactor-plugins/alignment.min.js', function() {
jQuery.getScript(Perch.path + '/addons/plugins/editors/redactor-plugins/fullscreen.js', function() {
jQuery.getScript(Perch.path + '/addons/plugins/editors/redactor-plugins/widget.js', function() {
jQuery.getScript(Perch.path + '/addons/plugins/editors/redactor-plugins/counter.js', function() {
jQuery.getScript(Perch.path + '/addons/plugins/editors/redactor-plugins/definedlinks.js', function() {
jQuery.getScript(Perch.path + '/addons/plugins/editors/redactor-plugins/pipit_inlineperchassets/inlineperchassets.js', function() {fixResizer(); cb();
});
});
});
});
});
});
});
});
});
});
});
}


let get = function (profile, config, field) {
config.plugins = config.plugins.filter(function (item) {
return item !== 'perchassets'
})

if (config.plugins.indexOf('fontcolor') === -1) config.plugins.push('fontcolor');
if (config.plugins.indexOf('alignment') === -1) config.plugins.push('alignment');
if (config.plugins.indexOf('inlineperchassets') === -1) config.plugins.push('inlineperchassets');
if (config.plugins.indexOf('properties') === -1) config.plugins.push('properties');
if (config.plugins.indexOf('widget') === -1) config.plugins.push('widget');
if (config.plugins.indexOf('definedlinks') === -1) {
	config.plugins.push('definedlinks');
	config.definedlinks = Perch.path + '/addons/plugins/editors/redactor-plugins/page-list.php';
	}
if (config.plugins.indexOf('inlinestyle') === -1) config.plugins.push('inlinestyle');
if (config.plugins.indexOf('table') === -1) config.plugins.push('table');
if (config.plugins.indexOf('video') === -1) config.plugins.push('video');
if (config.plugins.indexOf('counter') === -1) config.plugins.push('counter');
if (config.plugins.indexOf('fullscreen') === -1) config.plugins.push('fullscreen');

config.imageResizable = true;
config.imagePosition = true;
config.buttonsAdd = ['underline', 'line'];

console.log(config);

  if(profile == 'simple') {
    // hide some buttons
    config.buttonsHide = [];
    // remove some plugins
    config.plugins = config.plugins.filter(function (item) {
    return item !== 'table'
  	});
    config.plugins = config.plugins.filter(function (item) {
    return item !== 'fullscreen'
  	});
    config.plugins = config.plugins.filter(function (item) {
    return item !== 'widget'
  	});
    config.plugins = config.plugins.filter(function (item) {
    return item !== 'fontcolor'
  	});
    config.plugins = config.plugins.filter(function (item) {
    return item !== 'inlineperchassets'
  	});
    config.plugins = config.plugins.filter(function (item) {
    return item !== 'video'
  	});
    config.plugins = config.plugins.filter(function (item) {
    return item !== 'properties'
  	});
  }

  if(profile == 'minimal') {
    // hide some buttons
    config.buttonsHide = ['html', 'deleted','format', 'link', 'lists', 'line'];
    // remove some plugins
    config.plugins = config.plugins.filter(function (item) {
    return item !== 'table'
  	});
    config.plugins = config.plugins.filter(function (item) {
    return item !== 'fullscreen'
  	});
    config.plugins = config.plugins.filter(function (item) {
    return item !== 'widget'
  	});
    config.plugins = config.plugins.filter(function (item) {
    return item !== 'fontcolor'
  	});
    config.plugins = config.plugins.filter(function (item) {
    return item !== 'alignment'
  	});
    config.plugins = config.plugins.filter(function (item) {
    return item !== 'inlineperchassets'
  	});
    config.plugins = config.plugins.filter(function (item) {
    return item !== 'properties'
  	});
    config.plugins = config.plugins.filter(function (item) {
    return item !== 'inlinestyle'
  	});
    config.plugins = config.plugins.filter(function (item) {
    return item !== 'inlinestyles'
  	});
  }



return config;
};

return {
'get': get,
'load': load
}
}();



