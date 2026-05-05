// This file is used to declare modules for non-TypeScript files (e.g. CSS, images)
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
setups
declare module 'react-quill/dist/quill.snow.css';