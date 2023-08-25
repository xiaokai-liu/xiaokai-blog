import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/css/": [
    {
      text: "css相关",
      icon: "book",
      prefix: "",
      children: [
        {
          text: '基础',
          prefix: "base",
          children: 'structure',
        },
        {
          text: '高级',
          prefix: "super",
          children: 'structure',
        }
      ],
    },
  ],
  "/js/": [
    {
      text: "js相关",
      icon: "book",
      prefix: "",
      link: "",
      children: "structure",
    }
  ]
  
});
