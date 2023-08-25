import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
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
          { text: "基础", icon: "pen-to-square", link: "1" },
          { text: "常见需求", icon: "pen-to-square", link: "2" },
        ],
      },
      {
        text: "css高级",
        icon: "pen-to-square",
        prefix: "super/",
        children: [
          { text: "css常见布局", icon: "pen-to-square", link: "1" },
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
        prefix: "初级/",
        children: [
          { text: "苹果1", icon: "pen-to-square", link: "1" },
          { text: "苹果2", icon: "pen-to-square", link: "2" },
        ],
      },
      {
        text: "js高级",
        icon: "pen-to-square",
        prefix: "高级/",
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
