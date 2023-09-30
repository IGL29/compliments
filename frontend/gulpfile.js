import webp from 'gulp-webp';
import gulp from 'gulp';

const { src, dest } = gulp; 

const images = () => {
  return src('public/img/').pipe(webp()).pipe(dest('public/img/'));
};

export default images;
