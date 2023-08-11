import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  // "/demo/",
  // {
  //   text: "博文",
  //   icon: "pen-to-square",
  //   prefix: "/posts/",
  //   children: [
  //     {
  //       text: "苹果",
  //       icon: "pen-to-square",
  //       prefix: "apple/",
  //       children: [
  //         { text: "苹果1", icon: "pen-to-square", link: "1" },
  //         { text: "苹果2", icon: "pen-to-square", link: "2" },
  //         "3",
  //         "4",
  //       ],
  //     },
  //     {
  //       text: "香蕉",
  //       icon: "pen-to-square",
  //       prefix: "banana/",
  //       children: [
  //         {
  //           text: "香蕉 1",
  //           icon: "pen-to-square",
  //           link: "1",
  //         },
  //         {
  //           text: "香蕉 2",
  //           icon: "pen-to-square",
  //           link: "2",
  //         },
  //         "3",
  //         "4",
  //       ],
  //     },
  //     { text: "樱桃", icon: "pen-to-square", link: "cherry" },
  //     { text: "火龙果", icon: "pen-to-square", link: "dragonfruit" },
  //     "tomato",
  //     "strawberry",
  //   ],
  // },
  // {
  //   text: "V2 文档",
  //   icon: "book",
  //   link: "https://theme-hope.vuejs.press/zh/",
  // },
  {
    text: 'css相关',
    icon: "book",
    prefix: "/css/",
    children: [
      {
        text: "css基础",
        icon: "pen-to-square",
        prefix: "base/",
        children: [
          { text: "苹果1", icon: "pen-to-square", link: "1" },
          { text: "苹果2", icon: "pen-to-square", link: "2" },
        ],
      },
      {
        text: "css高级",
        icon: "pen-to-square",
        prefix: "super/",
        children: [
          { text: "苹果1", icon: "pen-to-square", link: "1" },
          { text: "苹果2", icon: "pen-to-square", link: "2" },
        ],
      },
    ]
       
  },
  {
    text: 'js相关',
    icon: "book",
    prefix: "/js/",
    children: [
      {
        text: "js基础",
        icon: "pen-to-square",
        prefix: "base/",
        children: [
          { text: "苹果1", icon: "pen-to-square", link: "1" },
          { text: "苹果2", icon: "pen-to-square", link: "2" },
        ],
      },
      {
        text: "js高级",
        icon: "pen-to-square",
        prefix: "super/",
        children: [
          { text: "苹果1", icon: "pen-to-square", link: "1" },
          { text: "苹果2", icon: "pen-to-square", link: "2" },
        ],
      },
    ]
  },
  {
    text: 'vue相关',
    icon: "book",
    prefix: "/vue/",
    children: []
  },
  {
    text: 'react相关',
    icon: "book",
    prefix: "/react/",
    children: []
  },
  {
    text: '其他',
    icon: "book",
    prefix: "/other/",
    children: []
  },
]);
