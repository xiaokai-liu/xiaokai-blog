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
          children: ['1.md','2.md','3.md','4.md','5.md','6.md','7.md','8.md'],
        },
        {
          text: '高级',
          prefix: "super",
          children: ['1.md','2.md','3.md','4.md'],
        }
      ],
    },
  ],
  "/js/": [
    {
      text: "js相关",
      icon: "book",
      prefix: "",
      children: [
        {
          text: '基础',
          prefix: "基础",
          children: ['1.md','2.md','3.md','4.md','5.md','6.md','7.md','8.md'],
        },
        {
          text: '高级',
          prefix: "高级",
          children: ['1.md','2.md','3.md','4.md'],
        }
      ],
    }
  ]
  
});
