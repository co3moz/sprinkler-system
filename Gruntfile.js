module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    useminPrepare: {
      html: 'src/public/index.html',
      options: {
        dest: 'src/public/build'
      }
    },
    copy: {
      main: {
        src: 'src/public/index.html',
        dest: 'src/public/build/index.html'
      },
      font: {
        expand: true,
        flatten: true,
        dest: 'src/public/build/fonts/',
        src: 'src/public/vendor/font-awesome/fonts/*'
      }
    },
    usemin: {
      html: 'src/public/build/index.html'
    },
    clean: {
      build: ['src/public/build'],
      tmp: ['.tmp']
    }
  });


  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('build', [
    'clean:build',
    'useminPrepare',
    'concat:generated',
    'cssmin:generated',
    'uglify:generated',
    'copy:main',
    'copy:font',
    'usemin',
    'clean:tmp'
  ]);

  grunt.registerTask('default', ['build']);

};