export const MENUS = [
    {name: '快速上手', type: 'link', url: 'detail/quickstart'},
    {
      name: '教程',
      type: 'button',
      expand: false,
      subMenu: [
        {name: '简介', type: 'link', url: 'detail/tutorial'},
        {name: '英雄编辑器', type: 'link', url: 'detail/toh-pt1'},
        {name: '主从结构', type: 'link', url: 'detail/toh-pt2'},
        {name: '多个组件', type: 'link', url: 'detail/toh-pt3'},
        {name: '服务', type: 'link', url: 'detail/toh-pt4'},
        {name: '路由', type: 'link', url: 'detail/toh-pt5'},
        {name: 'HTTP', type: 'link', url: 'detail/toh-pt6'},
      ]
    },
    {
      name: '核心知识',
      type: 'button',
      expand: false,
      subMenu: [
        {name: '架构', type: 'link', url: 'detail/architecture'},
        {
          name: '模板与数据绑定',
          type: 'button',
          expand: false,
          subMenu: [
            {name: '显示数据', type: 'link', url: 'detail/displaying-data'},
            {name: '模板语法', type: 'link', url: 'detail/template-syntax'},
            {name: '生命周期钩子', type: 'link', url: 'detail/lifecycle-hooks'},
            {name: '组件交互', type: 'link', url: 'detail/component-interaction'},
            {name: '组件样式', type: 'link', url: 'detail/component-styles'},
            {name: '动态组件', type: 'link', url: 'detail/dynamic-component-loader'},
            {name: '属性型指令', type: 'link', url: 'detail/attribute-directives'},
            {name: '结构型指令', type: 'link', url: 'detail/structural-directives'},
            {name: '管道', type: 'link', url: 'detail/pipes'},
            {name: '动画', type: 'link', url: 'detail/animations'},
          ]
        },
        {
          name: '表单',
          type: 'button',
          expand: false,
          subMenu: [
            {name: '用户输入', type: 'link', url: 'detail/user-input'},
            {name: '模板驱动表单', type: 'link', url: 'detail/forms'},
            {name: '表单验证', type: 'link', url: 'detail/form-validation'},
            {name: '响应式表单', type: 'link', url: 'detail/reactive-forms'},
            {name: '动态表单', type: 'link', url: 'detail/dynamic-form'}
          ]
        },
        {name: '引用启动', type: 'link', url: 'detail/bootstrapping'},
        {
          name: 'NgModules',
          type: 'button',
          expand: false,
          subMenu: [
            {name: 'NgModule', type: 'link', url: 'detail/ngmodule'},
            {name: 'NgModule 常见问题', type: 'link', url: 'detail/ngmodule-faq'}
          ]
        },
        {
          name: '依赖注入',
          type: 'button',
          expand: false,
          subMenu: [
            {name: '依赖注入', type: 'link', url: 'detail/dependency-injection'},
            {name: '多级注入器', type: 'link', url: 'detail/hierarchical-dependency-injection'},
            {name: 'DI 实例技巧', type: 'link', url: 'detail/dependency-injection-in-action'}
          ]
        },
        {name: 'HttpClient', type: 'link', url: 'detail/http'},
        {name: '路由与导航', type: 'link', url: 'detail/router'},
        {name: '测试', type: 'link', url: 'detail/testing'},
        {name: '速查表', type: 'link', url: 'detail/cheatsheet'},
      ]
    },
    {
      name: '其它技术',
      type: 'button',
      expand: false,
      subMenu: [
        {name: '国际化（i18n）', type: 'link', url: 'detail/i18n'},
        {name: '语言服务', type: 'link', url: 'detail/language-service'},
        {name: '安全', type: 'link', url: 'detail/security'},
        {
          name: '环境设置与部署',
          type: 'button',
          expand: false,
          subMenu: [
            {name: '搭建本地开发环境', type: 'link', url: 'detail/setup'},
            {name: '搭建方式剖析', type: 'link', url: 'detail/setup-systemjs-anatomy'},
            {name: '浏览器支持', type: 'link', url: 'detail/browser-support'},
            {name: 'npm 包', type: 'link', url: 'detail/npm-packages'},
            {name: 'TypeScript 配置', type: 'link', url: 'detail/typescript-configuration'},
            {name: '预 (AoT) 编译器', type: 'link', url: 'detail/aot-compiler'},
            {name: '预 (AoT) 编译器', type: 'link', url: 'detail/metadata'},
            {name: '部署', type: 'link', url: 'detail/deployment'}
          ]
        },
        {
          name: '升级',
          type: 'button',
          expand: false,
          subMenu: [
            {name: '从 AngularJS 升级', type: 'link', url: 'detail/upgrade'},
            {name: '升级速查表', type: 'link', url: 'detail/ajs-quick-reference'}
          ]
        },
        {name: 'Visual Studio 2015 快速上手', type: 'link', url: 'detail/visual-studio-2015'},
        {name: '风格指南', type: 'link', url: 'detail/styleguide'},
        {name: '词汇表', type: 'link', url: 'detail/glossary'}
      ]
    },
    {name: 'API 参考手册', type: 'link', url: 'detail/api'}
  ];
  