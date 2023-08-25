const e=JSON.parse('{"key":"v-5d244a80","path":"/css/base/2.html","title":"css常见需求","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2022-01-20T00:00:00.000Z","category":["css"],"tag":["基础","css常见需求"],"description":"css常见需求 自定义属性 之前我们通常是在less scss这些预处理器里才可以使用变量，而现在css里也支持了变量的用法。通过自定义属性就可以在想要使用的地方引用它。 自定义属性也和普通属性一样具有级联性，申明在 :root 下的时候，在全文档范围内可用，而如果是在某个元素下申明自定义属性，则只能在它及它的子元素下才可以使用。 自定义属性必须通过 --x 的格式申明，比如：--theme-color: red; 使用自定义属性的时候，需要用 var 函数。比如： &lt;!-- 定义自定义属性 --&gt; :root { --theme-color: red; } &lt;!-- 使用变量 --&gt; h1 { color: var(--theme-color); }","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/css/base/2.html"}],["meta",{"property":"og:title","content":"css常见需求"}],["meta",{"property":"og:description","content":"css常见需求 自定义属性 之前我们通常是在less scss这些预处理器里才可以使用变量，而现在css里也支持了变量的用法。通过自定义属性就可以在想要使用的地方引用它。 自定义属性也和普通属性一样具有级联性，申明在 :root 下的时候，在全文档范围内可用，而如果是在某个元素下申明自定义属性，则只能在它及它的子元素下才可以使用。 自定义属性必须通过 --x 的格式申明，比如：--theme-color: red; 使用自定义属性的时候，需要用 var 函数。比如： &lt;!-- 定义自定义属性 --&gt; :root { --theme-color: red; } &lt;!-- 使用变量 --&gt; h1 { color: var(--theme-color); }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-08-25T07:43:37.000Z"}],["meta",{"property":"article:author","content":"xiaokai"}],["meta",{"property":"article:tag","content":"基础"}],["meta",{"property":"article:tag","content":"css常见需求"}],["meta",{"property":"article:published_time","content":"2022-01-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-08-25T07:43:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"css常见需求\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-01-20T00:00:00.000Z\\",\\"dateModified\\":\\"2023-08-25T07:43:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"xiaokai\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[{"level":2,"title":"自定义属性","slug":"自定义属性","link":"#自定义属性","children":[]},{"level":2,"title":"1px 边框解决方案","slug":"_1px-边框解决方案","link":"#_1px-边框解决方案","children":[]},{"level":2,"title":"清除浮动","slug":"清除浮动","link":"#清除浮动","children":[{"level":3,"title":"BFC清除浮动","slug":"bfc清除浮动","link":"#bfc清除浮动","children":[]},{"level":3,"title":"通过 clear 清除浮动","slug":"通过-clear-清除浮动","link":"#通过-clear-清除浮动","children":[]}]},{"level":2,"title":"消除浏览器默认样式","slug":"消除浏览器默认样式","link":"#消除浏览器默认样式","children":[]},{"level":2,"title":"长文本处理","slug":"长文本处理","link":"#长文本处理","children":[{"level":3,"title":"字符超出部分换行","slug":"字符超出部分换行","link":"#字符超出部分换行","children":[]},{"level":3,"title":"字符超出位置使用连字符","slug":"字符超出位置使用连字符","link":"#字符超出位置使用连字符","children":[]},{"level":3,"title":"单行文本超出省略","slug":"单行文本超出省略","link":"#单行文本超出省略","children":[]},{"level":3,"title":"多行文本超出省略","slug":"多行文本超出省略","link":"#多行文本超出省略","children":[]},{"level":3,"title":"整块文本溢出处理","slug":"整块文本溢出处理","link":"#整块文本溢出处理","children":[]}]},{"level":2,"title":"水平垂直居中","slug":"水平垂直居中","link":"#水平垂直居中","children":[{"level":3,"title":"单行的文本.inline或者inline-block","slug":"单行的文本-inline或者inline-block","link":"#单行的文本-inline或者inline-block","children":[]},{"level":3,"title":"固定宽高的块级盒子","slug":"固定宽高的块级盒子","link":"#固定宽高的块级盒子","children":[]},{"level":3,"title":"不固定的宽高的块级盒子","slug":"不固定的宽高的块级盒子","link":"#不固定的宽高的块级盒子","children":[]}]}],"git":{"createdTime":1692949417000,"updatedTime":1692949417000,"contributors":[{"name":"xiaokai-liu","email":"1404197328@qq.com","commits":1}]},"readingTime":{"minutes":6.45,"words":1935},"filePathRelative":"css/base/2.md","localizedDate":"2022年1月20日","excerpt":"<h1> css常见需求</h1>\\n<h2> 自定义属性</h2>\\n<p>之前我们通常是在less scss这些预处理器里才可以使用变量，而现在css里也支持了变量的用法。通过自定义属性就可以在想要使用的地方引用它。</p>\\n<p>自定义属性也和普通属性一样具有级联性，申明在 :root 下的时候，在全文档范围内可用，而如果是在某个元素下申明自定义属性，则只能在它及它的子元素下才可以使用。</p>\\n<p>自定义属性必须通过 --x 的格式申明，比如：--theme-color: red; 使用自定义属性的时候，需要用 var 函数。比如：</p>\\n<div class=\\"language-css line-numbers-mode\\" data-ext=\\"css\\"><pre class=\\"language-css\\"><code><span class=\\"token selector\\">&lt;!-- 定义自定义属性 --&gt;\\n:root</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token property\\">--theme-color</span><span class=\\"token punctuation\\">:</span> red<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token selector\\">&lt;!-- 使用变量 --&gt;\\nh1</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token property\\">color</span><span class=\\"token punctuation\\">:</span> <span class=\\"token function\\">var</span><span class=\\"token punctuation\\">(</span>--theme-color<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};
