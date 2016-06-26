module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    useminPrepare: {
      html: 'src/public/index.html'
    }
  });


  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('build', [
    'useminPrepare',
    'concat:generated',
    'cssmin:generated',
    'uglify:generated',
    'usemin'
  ]);

  grunt.registerTask('default', ['build']);

};

/**

 concat: {
      generated: {
        files: [
          {
            dest: 'src/public/build/app.js',
            src: [
              "src/public/vendor/jquery/dist/jquery.min.js",
              "src/public/vendor/angular/angular.min.js",
              "src/public/vendor/angular-cookies/angular-cookies.min.js",
              "src/public/vendor/bootstrap/dist/js/bootstrap.min.js",
              "src/public/vendor/angular-animate/angular-animate.min.js",
              "src/public/vendor/angular-bootstrap-contextmenu/contextMenu.js",
              "src/public/vendor/sweetalert/dist/sweetalert.min.js",
              "src/public/vendor/angular-sweetalert/dist/ngSweetAlert.min.js",
              "src/public/vendor/angular-aria/angular-aria.min.js",
              "src/public/vendor/moment/min/moment.min.js",
              "src/public/vendor/moment/locale/tr.js",
              "src/public/vendor/angular-moment/angular-moment.min.js",
              "src/public/vendor/angular-messages/angular-messages.min.js",
              "src/public/vendor/angular-ui-router/release/angular-ui-router.min.js",
              "src/public/vendor/angular-ui-utils/index.js",
              "src/public/vendor/angular-bootstrap/ui-bootstrap-tpls.js",
              "src/public/vendor/angular-ui-scroll/dist/ui-scroll.min.js",
              "src/public/vendor/angular-ui-scrollpoint/dist/scrollpoint.min.js",
              "src/public/vendor/angular-ui-event/dist/event.min.js",
              "src/public/vendor/angular-ui-mask/dist/mask.min.js",
              "src/public/vendor/angular-ui-validate/dist/validate.min.js",
              "src/public/vendor/angular-ui-indeterminate/dist/indeterminate.min.js",
              "src/public/vendor/angular-ui-uploader/dist/uploader.min.js",
              "src/public/vendor/angular-ui-jq/ui-jq.js",
              "src/public/vendor/oclazyload/dist/ocLazyLoad.js",
              "src/public/vendor/jquery.stellar/jquery.stellar.min.js",
              "src/public/vendor/slicknav/dist/jquery.slicknav.min.js",
              "src/public/app/app.js",
              "src/public/app/config.js",
              "src/public/app/config.lazyload.js",
              "src/public/app/config.router.js",
              "src/public/app/main.js",
              "src/public/app/services/ui-load.js"
            ]
          }
        ]
      }
    },
 uglify: {
      generated: {
        files: [
          {
            dest: 'src/public/build/app.js',
            src: ['src/public/build/app.js']
          }
        ]
      }
    }
 }*/