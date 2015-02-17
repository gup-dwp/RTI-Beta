module.exports = function (grunt) {
  grunt.initConfig({
    watch  : {
      sass : {
        files : 'app/assets/sass/*.scss',
        tasks : ['sass']
      }
    },
    sass: {
      dev: {
        options: {
          style: "expanded",
          sourcemap: true,
          includePaths: [
            'govuk_modules/govuk_template/assets/stylesheets',
            'govuk_modules/govuk_frontend_toolkit/stylesheets'
          ]
        },
        files: [{
          expand: true,
          cwd: "app/assets/sass",
          src: ["*.scss"],
          dest: "public/assets/stylesheets",
          ext: ".css"
        }]
      }
    },
    // Copies templates and assets from external modules and dirs
    copy: {
      assets: {
        files: [{
          expand: true,
          cwd: 'app/assets/',
          src: ['**/*', '!sass/**'],
          dest: 'public/assets/'
        }],
        files: [{
          expand: true,
          cwd: 'govuk_modules/govuk_template/assets',
          src: '**',
          dest: 'public/assets/'
        }]
      },
      govuk: {
        files: [{
          expand: true,
          cwd: 'node_modules/govuk_frontend_toolkit',
          src: '**',
          dest: 'govuk_modules/govuk_frontend_toolkit/'
        },
        {
          expand: true,
          cwd: 'node_modules/govuk_template_mustache/',
          src: '**',
          dest: 'govuk_modules/govuk_template/'
        }]
      },
    },
    // workaround for libsass
    replace: {
      fixSass: {
        src: ['govuk_modules/govuk_template/**/*.scss', 'govuk_modules/govuk_frontend_toolkit/**/*.scss'],
        overwrite: true,
        replacements: [{
          from: /filter:chroma(.*);/g,
          to: 'filter:unquote("chroma$1");'
        }]
      }
    },

    // Watches styles and specs for changes
    watch: {
      css: {
        files: ['app/assets/sass/**/*.scss'],
        tasks: ['sass'],
        options: { nospawn: true }
      }
    },
    browserSync : {
      default_options : {
        bsFiles : {
          src : [
            "public/assets/stylesheets/*.css",
            "*.html"
          ]
        },
        options : {
          watchTask : true,
          server : {
            baseDir : "./public/"
          }
        }
      }
    }
  });

  [
    'grunt-contrib-copy',
    'grunt-contrib-watch',
    'grunt-contrib-clean',
    'grunt-sass',
    'grunt-text-replace',
    'grunt-browser-sync'
  ].forEach(function (task) {
    grunt.loadNpmTasks(task);
  });


  grunt.registerTask('default', [
    'copy',
    'replace',
    'sass',
    'browserSync'
  ]);
};
