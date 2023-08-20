import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    // {
    //   text: "如何使用",
    //   icon: "laptop-code",
    //   prefix: "demo/",
    //   link: "demo/",
    //   children: "structure",
    // },
    //  {
    //   text: "文章",
    //   icon: "book",
    //   prefix: "posts/",
    //   children: "structure",
    // },
    {
      text: "css相关",
      icon: "book",
      prefix: "css/",
      link: 'css/',
      children: "structure",
    },
    {
      text: "js相关",
      icon: "book",
      prefix: "js/",
      children: "structure",
    },
    {
      text: "vue相关",
      icon: "book",
      prefix: "vue/",
      children: "structure",
    },
    {
      text: "react相关",
      icon: "book",
      prefix: "react/",
      children: "structure",
    },
    {
      text: "其它",
      icon: "book",
      prefix: "other/",
      children: "structure",
    },
    // "intro",
    // "slides",
  ],
});
