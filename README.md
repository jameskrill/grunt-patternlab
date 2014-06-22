grunt-patternlab
================

This is a basic setup for [Patternlab](www.patternlab.io) with [Grunt](www.gruntjs.com).

##Description##

This setup adds to files: *Gruntfile.js* and *package.json*. These files are required to run grunt.  They have been setup with the following packages:

* grunt-contrib-sass
* grunt-contrib-watch
* grunt-shell

##Grunt Files##

###package.json###
```javascript
{
  "name": "jacober",
  "version": "0.1.0",
  "devDependencies": {
    "grunt": "~0.4.5",
    "grunt-shell": "~0.7.0",
    "grunt-contrib-watch": "~0.6.1",
    "grunt-contrib-sass": "~0.7.3"
  }
}
```

###Gruntfile.js###

```javascript
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
```

##Usage##

```bash
$ grunt
```
