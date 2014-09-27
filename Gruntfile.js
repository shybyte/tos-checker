module.exports = function (grunt) {

  var grunt_config = {
    watch: {
      templates: {
        files: 'app/templates/**/*.hbs',
        tasks: ['handlebars']
      }
    },

    handlebars: {
      compile: {
        options: {
          namespace: "templates",
          partialRegex: /.*/,
          partialsUseNamespace: true,
          processName: function (filePath) {
            return filePath.replace('app/templates/', '').replace('.hbs', '');
          }
        },
        files: {
          "app/generated/templates.js": ["app/templates/**/*.hbs"]
        }
      }
    }
  };

  grunt.initConfig(grunt_config);

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-handlebars');

  grunt.registerTask('default', ['handlebars','watch']);
};
