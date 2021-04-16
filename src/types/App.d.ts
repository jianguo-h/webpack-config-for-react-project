/// <reference types="react" />
/// <reference types="react-dom" />

declare module '*.module.css' {
  const styles: { readonly [key: string]: string };
  export default styles;
}

declare module '*.module.less' {
  const styles: { readonly [key: string]: string };
  export default styles;
}
