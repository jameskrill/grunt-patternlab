module.exports = function(grunt) {

  // Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    shell: {
      patternlab: {
        command: "php core/builder.php -gp"
      },
      full: {
        command: "php core/builder.php -g"
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compact'
        },
        files: {
          'source/css/style.css': 'source/css/style.scss'
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      grunt: {
        files: ['Gruntfile.js'],
        tasks: ['sass','shell:full'],
        options: {
          spawn: false
        }
      },
      scripts: {
        files: ['source/js/*.js'],
        tasks: ['shell:full'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['source/css/*.scss', 'source/css/**/*.scss'],
        tasks: ['sass','shell:full'],
        options: {
          spawn: false
        }
      },
      html: {
        files: ['source/_patterns/**/*.mustache', 'source/**/*.json'],
        tasks: ['shell:patternlab'],
        options: {
          spawn: false
        }
      }
    }
  });

  // Plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-shell');

  // Tasks
  grunt.registerTask('default', ['sass', 'shell:full', 'watch']);
};
