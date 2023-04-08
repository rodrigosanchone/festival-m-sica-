const {src, dest, watch, parallel}= require("gulp");

//css
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

//para mejorar y mimificar el código css
const autoprefixer= require('autoprefixer'); //para mejorar el soport en navegadores que no tenga ciertas funciones
const cssnano = require('cssnano'); //comprime el código css mimifica 
const postcss = require('gulp-postcss');//transformaciones

//imagenes
const cache= require('gulp-cache');
const imagemin= require('gulp-imagemin');
const webp = require( 'gulp-webp');
const avif = require('gulp-avif');

//sourcemaps
const sourcemaps = require('gulp-sourcemaps')

//para mimificar el js
const terser = require('gulp-terser-js');




function css(done){
   
     src("src/scss/**/*.scss") //indetifica el archivo sass
     .pipe(sourcemaps.init())
     .pipe(plumber())
     .pipe(sass())  //compilarlo
     .pipe(postcss([autoprefixer(),cssnano()]))
     .pipe(sourcemaps.write('.'))
     .pipe(dest("build/css")); //almacenamiento en el disco duro
  
    //almacenamiento en el disco duro
  done();
}

function imagenes(done){
  const opciones={
    optimizationLevel:3
  }
  src('src/img/**/*.{png,jpg}')
  .pipe(cache(imagemin(opciones)))
  .pipe(dest('build/img'))
  done();
}

function versionWebp(done){
  const opciones={
    quality:50

  }
   src('src/img/**/*.{png,jpg}')//indetifica los archivos img
   .pipe(webp(opciones))
   .pipe(dest("build/img"))
   done();
}

function versionAvif(done){
  const opciones={
    quality:50

  }
   src('src/img/**/*.{png,jpg}')//indetifica los archivos img
   .pipe(avif(opciones))
   .pipe(dest("build/img"))
   done();
}

function javascript(done){
  src('src/js/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(terser())
  .pipe(sourcemaps.write('.'))
  .pipe(dest('build/js'))
  done()
}

function dev(done){
  watch("src/scss/**/*.scss", css)
  watch("src/js/**/*.js", javascript)
  done();
}


exports.css = css;
exports.js=javascript;
exports.imagenes= imagenes;
exports.versionWebp= versionWebp;
exports.versionAvif= versionAvif;
exports.dev = parallel(versionAvif,imagenes,versionWebp,javascript,dev,css)

