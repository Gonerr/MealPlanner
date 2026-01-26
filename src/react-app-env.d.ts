/// <reference types="react-scripts" />

// Дополнительные декларации
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}