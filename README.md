# webpack-config-for-react-project

> 为react项目开发而搭建的一套webpack基础配置，在此配置上进行扩展

## 目录按如下结构

```
.
├── build                                       // webpack配置文件
├── config                                      // 其它一些配置
├── dist                                        // 打包后的目录
├── src                                         // 源码
│   ├── api                                     // 接口管理
│   ├── components                              // 组件
│   ├── styles                                  // 全局样式
│   ├── router                                  // react路由配置
│   ├── store                                   // redux配置
│   ├── utils                                   // 工具函数
│   ├── libs                                    // 打包的三方库, 如react, react-dom等
│   ├── pages                                   // 页面级组件
│   ├── static                                  // 静态资源
│   ├── App.js                                  // 根组件文件
│   ├── index.js                                // 入口文件
│   ├── index.html                              // 模板html文件
├── babel.config.js                             // babel配置文件
├── .eslintrc.js                                // eslint配置文件
├── postcss.config.js                           // postcss配置文件
.
```