'use strict';
var util = require('util');
var path = require('path');//AND slugify
var yeoman = require('yeoman-generator');
function convertToSlug(Text)
{
	return Text
		.toLowerCase()
		.replace(/[^\w ]+/g,'')
		.replace(/ +/g,'-')
		;
}

var WpGenerator = module.exports = function WpGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	this.appname = path.basename(process.cwd());

	this.on('end', function () {
		this.installDependencies({
			bower: true,
			npm: true,
			skipInstall: false,
			callback: function () {
				console.log('Everything is ready!');
			}
		});

		// this.runInstall("sudo npm install");

	});

	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(WpGenerator, yeoman.generators.Base);

WpGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	// have Yeoman greet the user.
	console.log(this.yeoman);

	console.log("Я уже установил normalize.Пожалуйста ответьте на следующие вопросы.");

	var prompts = [
	{
		type: 'input',
		name: 'project_name',
		message: 'Enter the name of the project',
		default: 'Test Project'
	},
	{
		type: 'input',
		name: 'db_name',
		message: 'Enter the database name'
	},
	{
		type: 'input',
		name: 'db_user',
		message: 'Enter the user name',
		default: 'root'
	},
	{
		type: 'input',
		name: 'db_pass',
		message: 'Enter DB password'
	},
	{
		type: 'input',
		name: 'db_host',
		message: 'Enter the host',
		default: 'localhost'
	},
	{
		type: 'input',
		name: 'table_prefix',
		message: 'Enter the database name',
		default: 'wp_'
	},
	{
		type: 'confirm',
		name: 'bootstrap',
		message: 'Будем использовать Twitter Bootstrap 3?',
		default: false
	}
	];

	this.prompt(prompts, function (props) {

		function hasFeature(feat) { return props.features.indexOf(feat) !== -1; }
		this.project_name = props.project_name;
		this.db_name = props.db_name;
		this.db_user = props.db_user;
		this.db_pass = props.db_pass;
		this.db_host = props.db_host;
		this.table_prefix = props.table_prefix;
		this.bootstrap = props.bootstrap;
		// this.sass = props.sass;
		// this.modernizr = hasFeature('modernizr');
		// this.autoprefixer = hasFeature('autoprefixer');

		console.log(this.bootstrap);

		cb();
	}.bind(this));
};


WpGenerator.prototype.git = function git() {
	console.log("git");
	this.copy('gitignore', '.gitignore');
};

WpGenerator.prototype.projectfiles = function projectfiles() {
	this.copy('editorconfig', '.editorconfig');
};
WpGenerator.prototype.packageJSON = function packageJSON() {
	this.template('_package.json', 'package.json');
}
WpGenerator.prototype.gruntfile = function gruntfile() {
	this.template('Gruntfile.js', 'Gruntfile.js');
}

WpGenerator.prototype.bower = function bower() {
	this.template('_bower.json', 'bower.json');
	this.copy('bowerrc', '.bowerrc');
}

// WpGenerator.prototype.readIndex = function readIndex() {
//   this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
//   this.indexFile = this.engine(this.indexFile, this);
// }

// WpGenerator.prototype.writeIndex = function writeIndex() {
//   var fndir = 'bower_components/foundation/js/foundation/';
//   var twbsdir = 'bower_components/sass-bootstrap/js/';
//   if (this.framework == 'foundation') {
//     this.indexFile = this.appendScripts(this.indexFile, 'js/foundation.js', [
//       fndir + "foundation.js",
//       fndir + "foundation.abide.js",
//       fndir + "foundation.accordion.js",
//       fndir + "foundation.alert.js",
//       fndir + "foundation.clearing.js",
//       fndir + "foundation.dropdown.js",
//       fndir + "foundation.interchange.js",
//       fndir + "foundation.joyride.js",
//       fndir + "foundation.magellan.js",
//       fndir + "foundation.offcanvas.js",
//       fndir + "foundation.orbit.js",
//       fndir + "foundation.reveal.js",
//       fndir + "foundation.tab.js",
//       fndir + "foundation.tooltip.js",
//       fndir + "foundation.topbar.js"
//       ]);
//   } else if (this.framework == 'bootstrap') {
//     this.indexFile = this.appendScripts(this.indexFile, 'js/bootstrap.min.js', [
//         twbsdir + "affix.js",
//         twbsdir + "alert.js",
//         twbsdir + "dropdown.js",
//         twbsdir + "tooltip.js",
//         twbsdir + "modal.js",
//         twbsdir + "transition.js",
//         twbsdir + "button.js",
//         twbsdir + "popover.js",
//         twbsdir + "carousel.js",
//         twbsdir + "scrollspy.js",
//         twbsdir + "collapse.js",
//         twbsdir + "tab.js"
//       ]);
//   }
// };

// WpGenerator.prototype.stylesheets = function stylesheets() {
//   if (this.framework == 'bootstrap' && this.sass) {
//     this.template('bootstrap.scss', 'app/scss/main.scss');
//   } else if (this.framework == 'foundation' && this.sass) {
//     this.copy('foundation.scss', 'app/scss/main.scss');
//   } 
// };


WpGenerator.prototype.app = function app() {
	this.mkdir('app');
	this.mkdir('app/css');
	this.mkdir('app/fonts');
	this.mkdir('app/img');
	this.mkdir('app/js');
	this.mkdir('app/less');

	this.copy('index.html', 'app/index.html');
	//Less
	this.copy('less/_classes.less', 'app/less/_classes.less');
	this.copy('less/main.less', 'app/less/main.less');
	this.copy('less/_mixins.less', 'app/less/_mixins.less');
	this.copy('less/_normalizeplus.less', 'app/less/_normalizeplus.less');
	//JS
	this.copy('js/_functions.js', 'app/js/_functions.js');
	this.copy('js/main.js', 'app/js/main.js');

	// this.write('app/index.html', this.indexFile);
	this.copy('aditional.css', 'app/css/aditional.css');
	this.copy('aditional.js', 'app/js/aditional.js');
	this.copy('favicon.ico', 'app/favicon.ico');
	this.copy('404.html', 'app/404.html');
	this.copy('robots.txt', 'app/robots.txt');
	this.copy('htaccess', 'app/.htaccess');

	// console.log(this.git);
};

WpGenerator.prototype.wordpress = function wordpress() {
	this.directory('wordpress', './');
	this.wp_config = this.readFileAsString(path.join(this.sourceRoot(), 'wp_files/_wp-config.php'));
	this.wp_config = this.engine(this.wp_config, this);
	this.write('wp-config.php', this.wp_config);
	// this.template('wp_files/_wp-config.php','wp-config.php');

};

// WpGenerator.prototype.local = function local() {
// 	this.template('_sites-available',"/etc/apache2/sites-available/"+convertToSlug(this.project_name)+'.loc');
// 	this.hosts = this.readFileAsString('/etc/hosts');
// 	// this.prependToFile('/etc/hosts', 'test');//tagName, content
// 	this.write('/etc/hosts','127.0.0.1\t '+convertToSlug(this.project_name)+'.loc\n'+this.hosts);
// }