import{_ as p,r as o,o as c,c as i,a as s,b as n,e as t,f as e}from"./app-97481773.js";const l={},u=e(`<h1 id="vuerouter简单实现" tabindex="-1"><a class="header-anchor" href="#vuerouter简单实现" aria-hidden="true">#</a> vueRouter简单实现</h1><p>我们先来了解vue-router的简单使用，先了解怎么使用，之后再去想办法怎么去实现</p><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2><p>路由：本质上是一种对应关系</p><ul><li>前端路由</li></ul><p>在SPA（单页应用）中根据用户所触发的事件改变了URL 在无需刷新的前提下 显示不同的页面内容，比如等下就要讲的Vue Router</p><ul><li>后端路由</li></ul><p>比如node.js 的路由是 URL的请求地址和服务器上面的资源对应，根据不同的请求地址返回不同的资源</p><h2 id="vue-router最基础的使用步骤" tabindex="-1"><a class="header-anchor" href="#vue-router最基础的使用步骤" aria-hidden="true">#</a> vue-router最基础的使用步骤</h2><ol><li>引入vue-router文件</li></ol><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token comment">&lt;!-- 使用vue router前提 vue 必不可少 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>./js/vue.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token comment">&lt;!-- 引入vue-router文件 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>./js/vue-router_3.0.2.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>在页面上添加 router-link 和 router-view</li></ol><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token comment">&lt;!-- 添加路由 --&gt;</span>
<span class="token comment">&lt;!-- 会被渲染为 &lt;a href=&quot;#/home&quot;&gt;&lt;/a&gt; --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/home<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Home<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-link</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/login<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Login<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-link</span><span class="token punctuation">&gt;</span></span>
<span class="token comment">&lt;!-- 展示路由的内容 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-view</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-view</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>创建路由组件</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//创建路由组件</span>
<span class="token keyword">const</span> home <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
        &lt;div&gt;欢迎来到{{name}}&lt;/div&gt;
    </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
    <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;首页&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> login <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
		&lt;div&gt;欢迎来到登录页&lt;/div&gt;
	</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>配置路由规则</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 配置路由规则</span>
<span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VueRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">routes</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token comment">//每一个路由规则都是一个对象</span>
        <span class="token comment">//path 路由的 hash地址</span>
        <span class="token comment">//component 路由的所展示的组件</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/&#39;</span><span class="token punctuation">,</span>
            <span class="token comment">// 当访问 &#39;/&#39;的时候 路由重定向 到新的地址 &#39;/home&#39;</span>
            <span class="token literal-property property">redirect</span><span class="token operator">:</span> <span class="token string">&#39;/home&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>     
        <span class="token punctuation">{</span>
            <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/home&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">component</span><span class="token operator">:</span> home<span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/login&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">component</span><span class="token operator">:</span> login<span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5"><li>挂载路由</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code> <span class="token keyword">let</span> vm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token string">&#39;#app&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 挂载到vue 上面</span>
    router<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="嵌套路由" tabindex="-1"><a class="header-anchor" href="#嵌套路由" aria-hidden="true">#</a> 嵌套路由</h2><ol><li>在路由里面添加 子路由链接和 占位符</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//创建路由组件</span>
<span class="token keyword">const</span> home <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;div&gt;
        欢迎来到首页
        &lt;br&gt;
        &lt;!-- 子路由链接 --&gt;
        &lt;router-link to=&quot;/tab1&quot;&gt;Tab1&lt;/router-link&gt;
        &lt;router-link to=&quot;/tab2&quot;&gt;Tab2&lt;/router-link&gt;

        &lt;!-- 子路由展示 --&gt;
        &lt;router-view&gt;&lt;/router-view&gt;
        &lt;/div&gt;
    </span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>添加路由组件</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 创建两个子路由组件</span>
<span class="token keyword">const</span> tab1 <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;div&gt;
    子路由1
    &lt;/div&gt;
    </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> tab2 <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;div&gt;
    子路由2
    &lt;/div&gt;
    </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>配置路由规则</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 配置路由规则</span>
<span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VueRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">routes</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/home&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">component</span><span class="token operator">:</span> home<span class="token punctuation">,</span>
            <span class="token comment">//children 表示子路由规则</span>
            <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span> <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/tab1&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">component</span><span class="token operator">:</span> tab1 <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span> <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/tab2&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">component</span><span class="token operator">:</span> tab2 <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="动态路由" tabindex="-1"><a class="header-anchor" href="#动态路由" aria-hidden="true">#</a> 动态路由</h2><div class="hint-container tip"><p class="hint-container-title">提示</p><p>path属性加上/:id 使用route对象的params.id获取动态参数</p></div><p>比如现在有这么多个路由，如果自己也配置多个路由，岂不是有点。。。多余</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span>div id<span class="token operator">=</span><span class="token string">&quot;app&quot;</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 添加路由 <span class="token operator">--</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 会被渲染为 <span class="token operator">&lt;</span>a href<span class="token operator">=</span><span class="token string">&quot;#/home&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>a<span class="token operator">&gt;</span> <span class="token operator">--</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>router<span class="token operator">-</span>link to<span class="token operator">=</span><span class="token string">&quot;/goods/1&quot;</span><span class="token operator">&gt;</span>goods1<span class="token operator">&lt;</span><span class="token operator">/</span>router<span class="token operator">-</span>link<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>router<span class="token operator">-</span>link to<span class="token operator">=</span><span class="token string">&quot;/goods/2&quot;</span><span class="token operator">&gt;</span>goods2<span class="token operator">&lt;</span><span class="token operator">/</span>router<span class="token operator">-</span>link<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>router<span class="token operator">-</span>link to<span class="token operator">=</span><span class="token string">&quot;/goods/3&quot;</span><span class="token operator">&gt;</span>goods3<span class="token operator">&lt;</span><span class="token operator">/</span>router<span class="token operator">-</span>link<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>router<span class="token operator">-</span>link to<span class="token operator">=</span><span class="token string">&quot;/goods/4&quot;</span><span class="token operator">&gt;</span>goods4<span class="token operator">&lt;</span><span class="token operator">/</span>router<span class="token operator">-</span>link<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 展示路由的内容 <span class="token operator">--</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>router<span class="token operator">-</span>view<span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>router<span class="token operator">-</span>view<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后这里就可以使用 动态路由来解决</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
    <span class="token comment">//创建路由组件</span>
    <span class="token keyword">const</span> goods <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token comment">// this.$route.parms.id 可以省略 this</span>
        <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
        &lt;div&gt;欢迎来到商品 {{$route.params.id}}页&lt;/div&gt;
        </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span>
    <span class="token comment">// 配置路由规则</span>
    <span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VueRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">routes</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token comment">// 加上\`/:id\`</span>
                <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/goods/:id&#39;</span><span class="token punctuation">,</span>
                <span class="token literal-property property">component</span><span class="token operator">:</span> goods<span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">let</span> vm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token string">&#39;#app&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token comment">// 挂载到vue 上面</span>
        router<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="路由传参" tabindex="-1"><a class="header-anchor" href="#路由传参" aria-hidden="true">#</a> 路由传参</h2><div class="hint-container tip"><p class="hint-container-title">提示</p><p>我们可以使用 props 进行传值<br> 为啥要用 props 进行传值，route不香了吗，确实route 不够灵活<br> props 值有三种情况</p></div><ol><li>布尔值类型</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//创建路由组件</span>
<span class="token keyword">const</span> goods <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">// 使用props接收</span>
    <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;id&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;div&gt;欢迎来到商品 {{id}}页&lt;/div&gt;
    </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token comment">// 配置路由规则</span>
<span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VueRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">routes</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/goods/:id&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">component</span><span class="token operator">:</span> goods<span class="token punctuation">,</span>
            <span class="token comment">//props为true, route.params将会被设置为组件属性</span>
            <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>对象类型</li></ol><p>但是这里就获取不到 id 了，会报错</p><p>这里的id 需要 <code>$route.params.id</code> 获取</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> goods <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">// 使用props接收</span>
    <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;info&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;id&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 这里的 id 是获取不到的</span>
    <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;div&gt;{{info}}来到{{name}} {{id}}页&lt;/div&gt;
    </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token comment">// 配置路由规则</span>
<span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VueRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">routes</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/goods/:id&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">component</span><span class="token operator">:</span> goods<span class="token punctuation">,</span>
            <span class="token comment">//props为对象 就会把这个对象传递的路由组件</span>
            <span class="token comment">//路由组件使用props接收</span>
            <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;商品&#39;</span><span class="token punctuation">,</span>
                <span class="token literal-property property">info</span><span class="token operator">:</span> <span class="token string">&#39;欢迎&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>函数</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> goods <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">// 使用props接收</span>
    <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;info&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;id&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;div&gt;{{info}}来到{{name}} {{id}}页&lt;/div&gt;
    </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token comment">// 配置路由规则</span>
<span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VueRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">routes</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/goods/:id&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">component</span><span class="token operator">:</span> goods<span class="token punctuation">,</span>
            <span class="token comment">//prop是一个函数的话 就可以组合传值</span>
            <span class="token function-variable function">props</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">route</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token punctuation">{</span>
                    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;商品&#39;</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">info</span><span class="token operator">:</span> <span class="token string">&#39;欢迎&#39;</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">id</span><span class="token operator">:</span> route<span class="token punctuation">.</span>params<span class="token punctuation">.</span>id<span class="token punctuation">,</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="route-和-router" tabindex="-1"><a class="header-anchor" href="#route-和-router" aria-hidden="true">#</a> route 和 router</h2><ul><li>route为当前router跳转对象里面可以获取path，params，hash，query，fullPath，matched，name</li><li>router为VueRouter实例用 new VueRouter创建的实例，想要导航到不同URL，则使用router.push方法</li><li>routes是router路由实例用来配置路由对象（顺带提一下）</li></ul><h2 id="命名路由" tabindex="-1"><a class="header-anchor" href="#命名路由" aria-hidden="true">#</a> 命名路由</h2><ul><li>路由组件</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//创建路由组件</span>
<span class="token keyword">const</span> goods <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">// 使用props接收</span>
    <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;id&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;div&gt;商品{{id}}页&lt;/div&gt;
    </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>路由配置</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//配置路由</span>
<span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VueRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">routes</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/goods/:id&#39;</span><span class="token punctuation">,</span>
            <span class="token comment">// 命名路由</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;goods&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">component</span><span class="token operator">:</span> goods<span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>绑定 :to 通过name找到定义的路由 还可以使用 params 传递参数</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span> <span class="token attr-name">:to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{name: &#39;goods&#39;, params: { id: 1 } }<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>goods1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-link</span><span class="token punctuation">&gt;</span></span>
<span class="token comment">&lt;!-- 展示路由的内容 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-view</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-view</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="编程式导航" tabindex="-1"><a class="header-anchor" href="#编程式导航" aria-hidden="true">#</a> 编程式导航</h2><ol><li>声明式导航</li></ol><p>上面所展示的都是声明是导航 比如router-link</p>`,54),r=s("p",null,"上面所展示的都是声明是导航 比如router-link",-1),d=e(`<ol start="2"><li>编程式导航</li></ol><p>在普通的网页中使用 loaction.href window.open 等等进行跳转</p><p>现在我要介绍的是Vue Router中的编程式导航</p><p>我们平时都是用router.push() **router.go(n)**方法进行跳转</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//字符串</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">&#39;/home&#39;</span><span class="token punctuation">)</span>

<span class="token comment">//对象</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>$ruter<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;/home&#39;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">//比如这个 /goods?id=1</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;/goods&#39;</span><span class="token punctuation">,</span><span class="token literal-property property">query</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token literal-property property">id</span><span class="token operator">:</span><span class="token string">&#39;1&#39;</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">//命名路由 /goods/1</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;goods&#39;</span><span class="token punctuation">,</span><span class="token literal-property property">params</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token literal-property property">id</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">//后退</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span><span class="token function">go</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="路由守卫" tabindex="-1"><a class="header-anchor" href="#路由守卫" aria-hidden="true">#</a> 路由守卫</h2><ol><li>全局守卫</li></ol><p>router.beforeEach 全局守卫 对所有的路由都起作用</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>router<span class="token punctuation">.</span><span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> 
      <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//使用时,千万不能漏写next!!!</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
      <span class="token comment">//跳转失败页面</span>
      <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/error&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">replace</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token literal-property property">query</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">back</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>to</code>: 即将要进入的目标 路由对象</p><p><code>from</code>: 当前导航正要离开 路由对象</p><p><code>next</code>: 参数不同做的事也不同</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>next() 直接进入下一个钩子<br> next(false) 停止当前导航<br> next(&#39;/路径&#39;) 跳转到path路由地址 当然这里面也可以写成对象形式 next({path : &#39;/路径&#39;})<br> next(error): 如果传入参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError()</p></div><ol start="2"><li>路由独享守卫</li></ol><p>beforeEnter 路由对象独享的守卫写在routes里面</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VueRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">routes</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/goods&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">component</span><span class="token operator">:</span> goods<span class="token punctuation">,</span>
      <span class="token function-variable function">beforeEnter</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// 一样的用法</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>组件内的守卫</li></ol><ul><li>beforeRouteEnter 进入路由前,组件还没有被实例化所以这里无法获取到this</li><li>beforeRouteUpdate (2.2) 这个阶段可以获取this,在路由复用同一个组件时触发</li><li>beforeRouteLeave 这个阶段可以获取this,当离开组件对应的路由时,此时可以用来保存数据,或数据初始化,或关闭定时器等等</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> goods <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;div&gt;goods&lt;/div&gt;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
  <span class="token function">beforeRouteEnter</span> <span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 具体逻辑</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">beforeRouteUpdate</span> <span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 具体逻辑</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">beforeRouteLeave</span> <span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 具体逻辑</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="组件缓存-keep-alive" tabindex="-1"><a class="header-anchor" href="#组件缓存-keep-alive" aria-hidden="true">#</a> 组件缓存 keep-alive</h2><p>页面重新加载会重新渲染页面比如回退的时候等等，我们有的组件它不是一个活动的(数据不变)不希望它被重新渲染，所以这里就可以使用 &lt;keep-alive&gt; &lt;/keep-alive&gt; 包裹起来，这样就不会触发created钩子<br> 应用场景：获取一个商品的详情然后回退在前进的时候就使用缓存，提高性能</p><h2 id="hash-和-history-模式" tabindex="-1"><a class="header-anchor" href="#hash-和-history-模式" aria-hidden="true">#</a> hash 和 history 模式</h2><ol><li>hash模式</li></ol><p>在vue-router中默认使用的是 hash 模式</p><p>hash是url中的锚点就是<code>#</code>,通过锚点作为路由地址,我们通常改变的是改变<code>#</code>后面部分,实现浏览器渲染指定的组件.,锚点发生改变会触发 onhashchange 事件</p><ol start="2"><li>history模式</li></ol><p>history 模式就是平时正常的地址，使用方面需要服务器支持</p><p>如果访问的路径资源没有 直接就是 404</p><p>在HTML5后新增了两个API</p><p>pushState(): IE10后支持</p><p>replaceState()</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VueRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">&#39;history&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实现一个基础的vue-router" tabindex="-1"><a class="header-anchor" href="#实现一个基础的vue-router" aria-hidden="true">#</a> 实现一个基础的vue-router</h2><ol><li>注册全局vue-router</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 保存一个全局变量 Vue</span>
<span class="token keyword">let</span> _Vue <span class="token operator">=</span> <span class="token keyword">null</span>

<span class="token comment">// 默认导出自己写的 VueRouter</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">MyVueRouter</span> <span class="token punctuation">{</span>
  <span class="token comment">// 实现install 注册 MyVueRouter vue提供install可供我们开发新的插件及全局注册组件等</span>
  <span class="token comment">// 把Vue传进去</span>
  <span class="token keyword">static</span> <span class="token function">install</span><span class="token punctuation">(</span><span class="token parameter">Vue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 定义一个标识判断是否注册了 MyVueRouter ,注册了就不用下一步了</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>MyVueRouter<span class="token punctuation">.</span>install<span class="token punctuation">.</span>installed<span class="token punctuation">)</span> <span class="token keyword">return</span>
    <span class="token comment">// 没有就进行下面的，把标识改变true</span>
    MyVueRouter<span class="token punctuation">.</span>install<span class="token punctuation">.</span>installed <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token comment">// 把全局变量 _Vue 保存</span>
    _Vue <span class="token operator">=</span> Vue
    <span class="token comment">// 为了获取Vue中的this执行这里使用 混入</span>
    _Vue<span class="token punctuation">.</span><span class="token function">mixin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token comment">// 在Vue实例创建好的时候进行操做</span>
      <span class="token function">beforeCreate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 判断是否是实例创建还是组件创建 ,可以判断是否挂载 了router</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$options<span class="token punctuation">.</span>router<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 把router注册到 _Vue上</span>
          <span class="token class-name">_Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>$router <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$options<span class="token punctuation">.</span>router
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>实现构造方法</li></ol><div class="language-tip line-numbers-mode" data-ext="tip"><pre class="language-tip"><code>optoins 保存传入的规则

routerMap 确定地址和组件的关系

current 表示当前的地址是响应式的之后渲染组件和它相关
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">MyVueRouter</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token comment">//实现构造</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 这个保存的是  routes</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>optoins <span class="token operator">=</span> options
    <span class="token comment">// routerMap 保存路由和 组件之间的关系</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>routerMap <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token comment">// 用来记录数据 这里面的数据都是 响应式</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>data <span class="token operator">=</span> _Vue<span class="token punctuation">.</span><span class="token function">observable</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token comment">// 当前路由的地址</span>
      <span class="token literal-property property">current</span><span class="token operator">:</span> <span class="token string">&#39;/&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>解析路由规则</li></ol><div class="hint-container tip"><p class="hint-container-title">提示</p><p>传入的路由规则拿到一个对象里 地址 和 组件一一匹配</p></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">MyVueRouter</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token comment">// 解析路由规则</span>
  <span class="token function">createRouterMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 把之前构造函数的中的传入的 routes 规则进行遍历</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>optoins<span class="token punctuation">.</span>routes<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 把路由 和 组件的对应关系添加到 routerMap中</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>routerMap<span class="token punctuation">[</span>item<span class="token punctuation">.</span>path<span class="token punctuation">]</span> <span class="token operator">=</span> item<span class="token punctuation">.</span>component
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>实现 router-link 组件</li></ol><div class="hint-container tip"><p class="hint-container-title">提示</p><p>router-link就是页面上所展示的路由链接</p><p>因为一般使用的基本都是运行版的Vue 所以自己把组件转为 虚拟DOM</p><p>还有就是链接会刷新的问题</p><p>自己写个函数进行跳转阻止默认事件</p><p>还得注意对应的路由所要渲染的组件</p></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">MyVueRouter</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token comment">// 实现组件</span>
  <span class="token function">initComponents</span><span class="token punctuation">(</span><span class="token parameter">Vue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 实现 router-link组件</span>
    Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">&#39;router-link&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// router-link上面的to属性将访问的地址</span>
        <span class="token literal-property property">to</span><span class="token operator">:</span> String<span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// 由于运行版的Vue不能渲染template所以这里重新写个render 这里h 也是个函数</span>
      <span class="token comment">// template: \`&lt;a :href=&quot;to&quot;&gt;&lt;slot&gt;&lt;/slot&gt;&lt;/a&gt;\`,</span>
      <span class="token function">render</span><span class="token punctuation">(</span><span class="token parameter">h</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 第一个参数是标签</span>
        <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span>
          <span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span>
          <span class="token comment">// 第二个参数是对象是 tag 里面的属性</span>
          <span class="token punctuation">{</span>
            <span class="token comment">// 设置属性</span>
            <span class="token literal-property property">attrs</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token literal-property property">href</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>to<span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token comment">// 绑定事件</span>
            <span class="token literal-property property">on</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token comment">// 重新复写点击事件,不写的话会点击会向服务器发送请求刷新页面</span>
              <span class="token literal-property property">click</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>myClick<span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token comment">// 这个是标签里面的内容 这里渲染是 默认插槽</span>
          <span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>$slots<span class="token punctuation">.</span>default<span class="token punctuation">]</span>
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">//router-link的点击事件</span>
        <span class="token function">myClick</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 因为我这里是模拟是 history的路由所以用pushState ，hash路由可以这里用 push</span>
          <span class="token comment">// 使用history修改浏览器上面的地址</span>
          <span class="token comment">// pushState 第一个参数是传递的参数,第二个是标题，第三个是链接</span>
          history<span class="token punctuation">.</span><span class="token function">pushState</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>to<span class="token punctuation">)</span>
          <span class="token comment">// 渲染相应的组件</span>
          <span class="token comment">// 渲染的页面也需要改变 data中的current是响应式的 router-view是根据current来渲染的</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span>data<span class="token punctuation">.</span>current <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>to
          <span class="token comment">// 阻止默认跳转事件</span>
          e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5"><li>实现 router-view 组件</li></ol><div class="hint-container tip"><p class="hint-container-title">提示</p><p>这里从之前解析的规则里面拿到当前的对应的组件进行转为虚拟DOM</p><p>最后router-view占位渲染到页面上</p></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">MyVueRouter</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token comment">// 实现组件</span>
  <span class="token function">initComponents</span><span class="token punctuation">(</span><span class="token parameter">Vue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 实现 router-view组件</span>
    Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">&#39;router-view&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token function">render</span><span class="token punctuation">(</span><span class="token parameter">h</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 获取的当前路径所对应的组件</span>
        <span class="token comment">// 因为当前this是Vue,this.$router才是MyVueRouter</span>
        <span class="token keyword">const</span> component <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span>routerMap<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span>data<span class="token punctuation">.</span>current<span class="token punctuation">]</span>
        <span class="token comment">// 转化为虚拟Dom</span>
        <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span>component<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="6"><li>监听前进与后退</li></ol><div class="hint-container tip"><p class="hint-container-title">提示</p><p>在完成之前的编写还是不够的，因为在浏览器点后退和前进虽然改变了浏览器的地址，但是组件却没有刷新，下面就来解决这个问题</p></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">MyVueRouter</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token comment">// 初始化事件</span>
  <span class="token function">initEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 监听浏览器地址的改变</span>
    window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;popstate&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 改变VueRouter的当前的地址 重新渲染组件</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>data<span class="token punctuation">.</span>current <span class="token operator">=</span> window<span class="token punctuation">.</span>location<span class="token punctuation">.</span>pathname
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="7"><li>在router挂载后进行初始化</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">MyVueRouter</span> <span class="token punctuation">{</span>
  <span class="token comment">// 初始化</span>
  <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 解析路由规则</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">createRouterMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// 初始化组件</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">initComponents</span><span class="token punctuation">(</span>_Vue<span class="token punctuation">)</span>
    <span class="token comment">// 初始化事件</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">initEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
    
  <span class="token keyword">static</span> <span class="token function">install</span><span class="token punctuation">(</span><span class="token parameter">Vue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>MyVueRouter<span class="token punctuation">.</span>install<span class="token punctuation">.</span>installed<span class="token punctuation">)</span> <span class="token keyword">return</span>
    MyVueRouter<span class="token punctuation">.</span>install<span class="token punctuation">.</span>installed <span class="token operator">=</span> <span class="token boolean">true</span>
    _Vue <span class="token operator">=</span> Vue
    _Vue<span class="token punctuation">.</span><span class="token function">mixin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token function">beforeCreate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$options<span class="token punctuation">.</span>router<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token class-name">_Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>$router <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$options<span class="token punctuation">.</span>router
          <span class="token comment">// 注册完router后进行初始化</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>$options<span class="token punctuation">.</span>router<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>  
  <span class="token punctuation">}</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="8"><li>完整的代码块</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 保存一个全局变量 Vue</span>
<span class="token keyword">let</span> _Vue <span class="token operator">=</span> <span class="token keyword">null</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">MyVueRouter</span> <span class="token punctuation">{</span>
  <span class="token comment">// 实现install 注册 MyVueRouter vue提供install可供我们开发新的插件及全局注册组件等</span>
  <span class="token comment">// 把Vue传进去</span>
  <span class="token keyword">static</span> <span class="token function">install</span><span class="token punctuation">(</span><span class="token parameter">Vue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 定义一个标识判断是否注册了 MyVueRouter ,注册了就不用下一步了</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>MyVueRouter<span class="token punctuation">.</span>install<span class="token punctuation">.</span>installed<span class="token punctuation">)</span> <span class="token keyword">return</span>
    <span class="token comment">// 没有就进行下面的，把标识改变true</span>
    MyVueRouter<span class="token punctuation">.</span>install<span class="token punctuation">.</span>installed <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token comment">// 把全局变量 _Vue 保存</span>
    _Vue <span class="token operator">=</span> Vue
    <span class="token comment">// 为了获取Vue中的this执行这里使用 混入</span>
    _Vue<span class="token punctuation">.</span><span class="token function">mixin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token comment">// 在Vue实例创建好的时候进行操做</span>
      <span class="token function">beforeCreate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 判断是否是实例创建还是组件创建 ,可以判断是否挂载 了router</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$options<span class="token punctuation">.</span>router<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 把router注册到 _Vue上</span>
          <span class="token class-name">_Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>$router <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$options<span class="token punctuation">.</span>router
          <span class="token comment">// 注册完router后进行初始化</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>$options<span class="token punctuation">.</span>router<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token comment">// 判断是否挂载</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 实现构造方法</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">optoins</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 这个保存的是  routes</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>optoins <span class="token operator">=</span> optoins
    <span class="token comment">// routerMap 保存路由和 组件之间的关系</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>routerMap <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token comment">// 用来记录数据 这里面的数据都是 响应式</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>data <span class="token operator">=</span> _Vue<span class="token punctuation">.</span><span class="token function">observable</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token comment">// 当前路由的地址</span>
      <span class="token literal-property property">current</span><span class="token operator">:</span> <span class="token string">&#39;/&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 解析路由规则</span>
  <span class="token function">createRouterMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 把之前构造函数的中的传入的 routes 规则进行遍历</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>optoins<span class="token punctuation">.</span>routes<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// routes中的每一项都是一个对象 { path: &#39;/XXX&#39;, component: XXX}</span>
      <span class="token comment">// 把路由 和 组件的对应关系添加到 routerMap中</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>routerMap<span class="token punctuation">[</span>item<span class="token punctuation">.</span>path<span class="token punctuation">]</span> <span class="token operator">=</span> item<span class="token punctuation">.</span>component
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 实现组件</span>
  <span class="token function">initComponents</span><span class="token punctuation">(</span><span class="token parameter">Vue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 实现 router-link组件</span>
    Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">&#39;router-link&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// router-link上面的to属性将访问的地址</span>
        <span class="token literal-property property">to</span><span class="token operator">:</span> String<span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// 由于运行版的Vue不能渲染template所以这里重新写个render 这里h 也是个函数</span>
      <span class="token comment">// template: \`&lt;a :href=&quot;to&quot;&gt;&lt;slot&gt;&lt;/slot&gt;&lt;/a&gt;\`,</span>
      <span class="token function">render</span><span class="token punctuation">(</span><span class="token parameter">h</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 第一个参数是标签</span>
        <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span>
          <span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span>
          <span class="token comment">// 第二个参数是对象是 tag 里面的属性</span>
          <span class="token punctuation">{</span>
            <span class="token comment">// 设置属性</span>
            <span class="token literal-property property">attrs</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token literal-property property">href</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>to<span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token comment">// 绑定事件</span>
            <span class="token literal-property property">on</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token comment">// 重新复写点击事件,不写的话会点击会向服务器发送请求刷新页面</span>
              <span class="token literal-property property">click</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>myClick<span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token comment">// 这个是标签里面的内容 这里渲染是 默认插槽</span>
          <span class="token comment">// 比如&lt;router-link to=&quot;/&quot;&gt;首页&lt;/router-link&gt;</span>
          <span class="token comment">// 插槽就是给首页两个字留位置,当前这只是个例子</span>
          <span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>$slots<span class="token punctuation">.</span>default<span class="token punctuation">]</span>
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">//router-link的点击事件</span>
        <span class="token function">myClick</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 因为我这里是模拟是 history的路由所以用pushState ，hash路由可以这里用 push</span>
          <span class="token comment">// 使用history修改浏览器上面的地址</span>
          <span class="token comment">// pushState 第一个参数是传递的参数,第二个是标题，第三个是链接</span>
          history<span class="token punctuation">.</span><span class="token function">pushState</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>to<span class="token punctuation">)</span>
          <span class="token comment">// 渲染相应的组件</span>
          <span class="token comment">// 渲染的页面也需要改变 data中的current是响应式的 router-view是根据current来渲染的</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span>data<span class="token punctuation">.</span>current <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>to
          <span class="token comment">// 阻止默认跳转事件</span>
          e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token comment">// 实现 router-view组件</span>
    Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">&#39;router-view&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token function">render</span><span class="token punctuation">(</span><span class="token parameter">h</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 获取的当前路径所对应的组件</span>
        <span class="token comment">// 因为当前this是Vue,this.$router才是MyVueRouter</span>
        <span class="token keyword">const</span> component <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span>routerMap<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span>data<span class="token punctuation">.</span>current<span class="token punctuation">]</span>
        <span class="token comment">// 转化为虚拟Dom</span>
        <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span>component<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 初始化事件</span>
  <span class="token function">initEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 监听浏览器地址的改变</span>
    window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;popstate&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 改变VueRouter的当前的地址 重新渲染组件</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>data<span class="token punctuation">.</span>current <span class="token operator">=</span> window<span class="token punctuation">.</span>location<span class="token punctuation">.</span>pathname
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 初始化</span>
  <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 解析路由规则</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">createRouterMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// 初始化组件</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">initComponents</span><span class="token punctuation">(</span>_Vue<span class="token punctuation">)</span>
    <span class="token comment">// 初始化事件</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">initEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>到了这里基础的实现功能差不多了，上面的例子是为了下面打基础，所有的功能实现基本都是在一个文件下很不严谨，下面就严格按照Vue Router 源码来实现自己 Vue Router</p><h2 id="vue-router源码实现" tabindex="-1"><a class="header-anchor" href="#vue-router源码实现" aria-hidden="true">#</a> vue-router源码实现</h2><ol><li>首先是Vue Router 构造</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* index.js */</span>

<span class="token comment">// 导出自己写的 VueRouter</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">VueRouter</span> <span class="token punctuation">{</span>
  <span class="token comment">// 实现构造函数功能</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取options中的routes路由规则 没有就为空数组</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_options <span class="token operator">=</span> options<span class="token punctuation">.</span>routes <span class="token operator">||</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 初始化</span>
  <span class="token function">init</span><span class="token punctuation">(</span><span class="token parameter">Vue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>注册组件 install</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* install.js */</span>

<span class="token comment">// 定义一个全局 的Vue</span>
<span class="token keyword">export</span> <span class="token keyword">let</span> _Vue <span class="token operator">=</span> <span class="token keyword">null</span>

<span class="token comment">// 导出 install方法</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">install</span><span class="token punctuation">(</span><span class="token parameter">Vue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 保存到全局的Vue</span>
  _Vue <span class="token operator">=</span> Vue
  <span class="token comment">// 混入</span>
  _Vue<span class="token punctuation">.</span><span class="token function">mixin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token comment">// Vue实例创建完毕之后操做</span>
    <span class="token function">beforeCreate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 这里是new Vue</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$options<span class="token punctuation">.</span>router<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 保存 Vue</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>_routerRoot <span class="token operator">=</span> <span class="token keyword">this</span>
        <span class="token comment">// 保存 Vue Router 的实例，以后可以通过Vue Router构造的一些方法</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>_router <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$options<span class="token punctuation">.</span>router
        <span class="token comment">// 调用Vue Router的init(Vue) 初始化操做</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>_router<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 这里是创建 Vue的组件等等</span>
        <span class="token comment">// 判断是否有父组件 ，有的话就把父组件的 _roterRoot(也就是Vue)给 子组件</span>
        <span class="token comment">// 没有父组件就把 this 这是也是(Vue) 给子组件</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>_routerRoot <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$parent <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$parent<span class="token punctuation">.</span>_routerRoot<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token keyword">this</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后在 index.js中导入install 进行为构造添加 install</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 导入 install</span>
<span class="token keyword">import</span> install <span class="token keyword">from</span> <span class="token string">&#39;./install&#39;</span>

<span class="token comment">// 导出自己写的 VueRouter</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">VueRouter</span> <span class="token punctuation">{</span>
	<span class="token operator">...</span>
<span class="token punctuation">}</span>
    
<span class="token comment">// 为VueRouter 添加 install方法</span>
VueRouter<span class="token punctuation">.</span>install <span class="token operator">=</span> install
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>编写 create-route-map.js</li></ol><div class="hint-container tip"><p class="hint-container-title">提示</p><p>这个主要的作用就是用来解析传递过来的路由 需要导出然后在 create-matcher.js进行使用</p><p>具体的细节都写了注释</p></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* create-route-map.js */</span>

<span class="token comment">// 导出具体的路由解析</span>
<span class="token doc-comment comment">/**
 *
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">routes</span> 路由规则
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">oldPathList</span> 路由列表
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">oldPathMap</span> 路由和组件的对应关系
 */</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">createRouteMap</span><span class="token punctuation">(</span><span class="token parameter">routes<span class="token punctuation">,</span> oldPathList<span class="token punctuation">,</span> oldPathMap</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 传入了就是添加动态路由 没有传入就默认为空</span>
  <span class="token keyword">const</span> pathList <span class="token operator">=</span> oldPathList <span class="token operator">||</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">const</span> pathMap <span class="token operator">=</span> oldPathMap <span class="token operator">||</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

  <span class="token comment">// 遍历规则操作</span>
  routes<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">route</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 记录路由 也是核心的解析路由 为了分工明确写的外面</span>
    <span class="token function">addRouteRecord</span><span class="token punctuation">(</span>route<span class="token punctuation">,</span> pathList<span class="token punctuation">,</span> pathMap<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token comment">// 返回新的路由列表 和 路由对应关系</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    pathList<span class="token punctuation">,</span>
    pathMap<span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 *
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">route</span> 路由规则
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">pathList</span> 路由列表
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">pathMap</span> 路由和组件之间的对应关系
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">parentRecord</span>  父路由
 */</span>
<span class="token keyword">function</span> <span class="token function">addRouteRecord</span><span class="token punctuation">(</span><span class="token parameter">route<span class="token punctuation">,</span> pathList<span class="token punctuation">,</span> pathMap<span class="token punctuation">,</span> parentRecord</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 路由地址 判断是否存在父级的路由 有的话拼接父级路由和当前路由的path 没有就是当前route.path</span>
  <span class="token keyword">const</span> path <span class="token operator">=</span> parentRecord <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>parentRecord<span class="token punctuation">.</span>path<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>route<span class="token punctuation">.</span>path<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span> <span class="token operator">:</span> route<span class="token punctuation">.</span>path
  <span class="token comment">// record作为一个路由记录 记录了路由地址,组件,父级路由   用于路由对应关系去对应相对应的path</span>
  <span class="token keyword">const</span> record <span class="token operator">=</span> <span class="token punctuation">{</span>
    path<span class="token punctuation">,</span>
    <span class="token literal-property property">component</span><span class="token operator">:</span> route<span class="token punctuation">.</span>component<span class="token punctuation">,</span>
    <span class="token literal-property property">parent</span><span class="token operator">:</span> parentRecord<span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 判断是否在路由列表中 存在当前路由，不存在进行添加当前路由，更新路由列表</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>pathList<span class="token punctuation">[</span>path<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 向路由列表中添加路由</span>
    pathList<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span>
    <span class="token comment">// 向路由对应关系中 添加path 相对应的记录</span>
    pathMap<span class="token punctuation">[</span>path<span class="token punctuation">]</span> <span class="token operator">=</span> record
  <span class="token punctuation">}</span>
  <span class="token comment">// 判断当前的 路由是否有子路由，有的话进行递归</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>route<span class="token punctuation">.</span>children<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    route<span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">childRoute</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 就简单说下最后一个参数 就是父级路由记录</span>
      <span class="token function">addRouteRecord</span><span class="token punctuation">(</span>childRoute<span class="token punctuation">,</span> pathList<span class="token punctuation">,</span> pathMap<span class="token punctuation">,</span> record<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>编写 create-matcher.js</li></ol><div class="hint-container tip"><p class="hint-container-title">提示</p><p>这个模块的意义也是解析路由不过这个是个指挥家，上面实现的是具体解析操作<br> 在这个模块里进行调用上面的具体解析路由的方法就行了<br> 有了上面面具体的路由解析，这个create-matcher.js就容易实现了，只需要简单的调用它即可<br> 这个模块返回了两个方法</p><p>match : 根据路由路径创建路由规则对象，之后就可以通过 规则对象获取到所有的路由信息然后拿到所有的组件进行创建<br> addRoutes : 添加动态路由</p></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* create-matcher.js */</span>

<span class="token comment">// 导入具体的路由解析规则</span>
<span class="token keyword">import</span> createRouteMap <span class="token keyword">from</span> <span class="token string">&#39;./create-route-map&#39;</span>

<span class="token comment">// 导出解析路由规则 传入的是规则</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">createMatcher</span><span class="token punctuation">(</span><span class="token parameter">router</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// pathList 路由的列表  pathMap 路由与组件的对应关系 nameMap这里没有考虑，先完成个简单的</span>
  <span class="token comment">// 具体的解析规则是使用  createRouteMap</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> pathList<span class="token punctuation">,</span> pathMap <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">createRouteMap</span><span class="token punctuation">(</span>router<span class="token punctuation">)</span>
  <span class="token comment">// match是 从pathMap 根据path获取 相应的路由记录</span>
  <span class="token keyword">function</span> <span class="token function">match</span><span class="token punctuation">(</span><span class="token parameter">path</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">//待实现</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 添加动态路由</span>
  <span class="token keyword">function</span> <span class="token function">addRoutes</span><span class="token punctuation">(</span><span class="token parameter">router</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 添加动态路由肯定也要解析路由规则</span>
    <span class="token function">createRouteMap</span><span class="token punctuation">(</span>router<span class="token punctuation">,</span> pathList<span class="token punctuation">,</span> pathMap<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 返回match 和 addRoutes</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    match<span class="token punctuation">,</span>
    addRoutes<span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>然后在index.js也就是Vue Router的构造中使用 createMatcher. 使用this.matcher接收</p></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 导入 install</span>
<span class="token keyword">import</span> install <span class="token keyword">from</span> <span class="token string">&#39;./install&#39;</span>
<span class="token comment">// 导入解析路由</span>
<span class="token keyword">import</span> createMatcher <span class="token keyword">from</span> <span class="token string">&#39;./create-matcher&#39;</span>

<span class="token comment">// 导出自己写的 VueRouter</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">VueRouter</span> <span class="token punctuation">{</span>
  <span class="token comment">// 实现构造函数功能</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取options中的routes路由规则 没有就为空数组</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_routes <span class="token operator">=</span> options<span class="token punctuation">.</span>routes <span class="token operator">||</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token comment">// 解析路由 传入规则 这里还返回了两个方法 match,addRoutes 用matcher接收一下之后有用</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>matcher <span class="token operator">=</span> <span class="token function">createMatcher</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_routes<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 初始化</span>
  <span class="token function">init</span><span class="token punctuation">(</span><span class="token parameter">Vue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 为VueRouter 添加 install方法</span>
VueRouter<span class="token punctuation">.</span>install <span class="token operator">=</span> install
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5"><li>编写 createMatcher</li></ol><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>看见上面在 createMatcher中定义了 一个match了吗，<br> match是 从pathMap 根据path获取 相应的路由记录<br> 上面还没有去实现，现在来实现它<br> 需要实现它的话还需要编写个 createRoute 方法，我这里写在 uitl/route.js模块里</p></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* util/route.js */</span>

<span class="token comment">// 导出 createRoute</span>
<span class="token doc-comment comment">/**
 *
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">record</span> 传过来的记录
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">}</span></span> <span class="token parameter">path</span> 路由地址
 * <span class="token keyword">@returns</span>
 */</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">createRoute</span><span class="token punctuation">(</span><span class="token parameter">record<span class="token punctuation">,</span> path</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 保存路由的记录 里面可能有多个路由 是这种模式保存 [parentRecord,childRecord]</span>
  <span class="token keyword">const</span> matched <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token comment">// 判断是否是子路由</span>
  <span class="token comment">// 下面 record = record.parent 在不断向上找parent有继续执行</span>
  <span class="token comment">// 没有就直接return 下面的对象</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>record<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 循环得到的 record不断插入到 数组的最前面</span>
    matched<span class="token punctuation">.</span><span class="token function">unshift</span><span class="token punctuation">(</span>record<span class="token punctuation">)</span>
    <span class="token comment">// 把父记录给当前record 继续循环</span>
    record <span class="token operator">=</span> record<span class="token punctuation">.</span>parent
  <span class="token punctuation">}</span>
  <span class="token comment">// 返回path 和 matched 以便之后 router-view渲染</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    path<span class="token punctuation">,</span>
    matched<span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>上面编写了 createRoute方法我们就可以在 create-mathcer.js 调用 来获取到记录了</p><p>然后再 create-mathcer.js中继续 完善 match方法</p></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* create-matcher.js */</span>

<span class="token comment">// 导入具体的路由解析规则</span>
<span class="token keyword">import</span> createRouteMap <span class="token keyword">from</span> <span class="token string">&#39;./create-route-map&#39;</span>
<span class="token comment">// 导入 createRoute</span>
<span class="token keyword">import</span> createRoute <span class="token keyword">from</span> <span class="token string">&#39;./util/route&#39;</span>

<span class="token comment">// 导出解析路由规则 传入的是规则</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">createMatcher</span><span class="token punctuation">(</span><span class="token parameter">router</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// pathList 路由的列表  pathMap 路由与组件的对应关系 nameMap这里没有考虑，先完成个简单的</span>
  <span class="token comment">// 具体的解析规则是使用  createRouteMap</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> pathList<span class="token punctuation">,</span> pathMap <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">createRouteMap</span><span class="token punctuation">(</span>router<span class="token punctuation">)</span>
  <span class="token comment">// match是 从pathMap 根据path获取 相应的路由记录</span>
  <span class="token keyword">function</span> <span class="token function">match</span><span class="token punctuation">(</span><span class="token parameter">path</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 取出path对应的记录</span>
    <span class="token keyword">const</span> record <span class="token operator">=</span> pathMap<span class="token punctuation">[</span>path<span class="token punctuation">]</span>
    <span class="token comment">// 判断记录是否存在</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>record<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token function">createRoute</span><span class="token punctuation">(</span>record<span class="token punctuation">,</span> path<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token function">createRoute</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> path<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 添加动态路由</span>
  <span class="token keyword">function</span> <span class="token function">addRoutes</span><span class="token punctuation">(</span><span class="token parameter">router</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 添加动态路由肯定也要解析路由规则</span>
    <span class="token function">createRouteMap</span><span class="token punctuation">(</span>router<span class="token punctuation">,</span> pathList<span class="token punctuation">,</span> pathMap<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 返回match 和 addRoutes</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    match<span class="token punctuation">,</span>
    addRoutes<span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="6"><li>历史记录的处理 History</li></ol><div class="hint-container tip"><p class="hint-container-title">提示</p><p>在 history目录下新建一个 base模块用来编写 父类</p><p>这个父类有 hash 模式 和 history(html5) 模式共同的方法</p><p>这里就主要演示下 hash 模式的代码</p></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* history/base.js */</span>

<span class="token comment">// 导入 我们上面写好的 createRoute</span>
<span class="token keyword">import</span> createRoute <span class="token keyword">from</span> <span class="token string">&#39;../util/route&#39;</span>

<span class="token comment">// 导出 History</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">History</span> <span class="token punctuation">{</span>
  <span class="token comment">// router 是路由对象 也就是 VUe-Router的一个实例</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">router</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 赋值给自己的 router</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>router <span class="token operator">=</span> router
    <span class="token comment">// 默认的的当前路径为 /</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>current <span class="token operator">=</span> <span class="token function">createRoute</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">&#39;/&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 将要跳转的链接</span>
  <span class="token comment">// path 是路由的地址, onComplete是一个回调</span>
  <span class="token function">transitionTo</span><span class="token punctuation">(</span><span class="token parameter">path<span class="token punctuation">,</span> onComplete</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取当前的应该跳转的路由  调用的是 Vue-Router中 this.matcher中收到的match方法</span>
    <span class="token comment">// 在这里 this.router就是 Vue-Router的一个实例 所以写成</span>
    <span class="token comment">// this.router.matcher.match(path)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>current <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>router<span class="token punctuation">.</span>matcher<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span>
    <span class="token comment">// 回调存在触发回调</span>
    onComplete <span class="token operator">&amp;&amp;</span> <span class="token function">onComplete</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* /history/hash */</span>

<span class="token comment">// 导入 base中的 History</span>
<span class="token keyword">import</span> History <span class="token keyword">from</span> <span class="token string">&#39;./base&#39;</span>

<span class="token comment">// 继承了 History</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">HashHistory</span> <span class="token keyword">extends</span> <span class="token class-name">History</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">router</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>router<span class="token punctuation">)</span>
    <span class="token comment">// 确保第一次访问的时候路由加上 #/</span>
    <span class="token function">ensuerSlash</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 监听URL的改变 设置当前的current</span>
  <span class="token function">setUpListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 监听 hash的变化</span>
    window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;hashchange&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 改变 this.current</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">transitionTo</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getCurrentLocation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 获取当前的URL的hash 当然这里要去除 #</span>
  <span class="token function">getCurrentLocation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 这里不建议写成这个 return window.location.hash.slice(1) 有兼容问题</span>
    <span class="token keyword">let</span> href <span class="token operator">=</span> window<span class="token punctuation">.</span>location<span class="token punctuation">.</span>href
    <span class="token keyword">const</span> index <span class="token operator">=</span> href<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">&#39;#&#39;</span><span class="token punctuation">)</span>
    <span class="token comment">// 当没有 #的时候 直接返回 空字符串</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token string">&#39;&#39;</span>
    <span class="token comment">// 获取 #后面的地址</span>
    href <span class="token operator">=</span> href<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>index <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> href
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 确保第一次加上 #/</span>
<span class="token keyword">function</span> <span class="token function">ensuerSlash</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 如果存在 hash的话就不行加 /</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>window<span class="token punctuation">.</span>location<span class="token punctuation">.</span>hash<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 如果没有hash值 只要给 hash 加上一个 / 它会自动加上 /#/</span>
  window<span class="token punctuation">.</span>location<span class="token punctuation">.</span>hash <span class="token operator">=</span> <span class="token string">&#39;/&#39;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>关于 html5模式 这里 就没写了</p><p>然后回到 index.js 就是自己写的 Vue Router中继续编写模式判断</p><p>最后就是 初始化 init方法</p></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* index.js */</span>

<span class="token comment">// 导入 install</span>
<span class="token keyword">import</span> install <span class="token keyword">from</span> <span class="token string">&#39;./install&#39;</span>
<span class="token comment">// 导入解析路由</span>
<span class="token keyword">import</span> createMatcher <span class="token keyword">from</span> <span class="token string">&#39;./create-matcher&#39;</span>
<span class="token comment">// 导入 HashHistory</span>
<span class="token keyword">import</span> HashHistory <span class="token keyword">from</span> <span class="token string">&#39;./history/hash&#39;</span>
<span class="token comment">// 导入 HTML5History</span>
<span class="token keyword">import</span> HTML5History <span class="token keyword">from</span> <span class="token string">&#39;./history/html5&#39;</span>

<span class="token comment">// 导出自己写的 VueRouter</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">VueRouter</span> <span class="token punctuation">{</span>
  <span class="token comment">// 实现构造函数功能</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取options中的routes路由规则 没有就为空数组</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_routes <span class="token operator">=</span> options<span class="token punctuation">.</span>routes <span class="token operator">||</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token comment">// 解析路由 传入规则 这里还返回了两个方法 match,addRoutes 用matcher接收一下之后有用</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>matcher <span class="token operator">=</span> <span class="token function">createMatcher</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_routes<span class="token punctuation">)</span>
    <span class="token comment">// 获取模式 没有就默认为 hash 模式</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>mode <span class="token operator">=</span> options<span class="token punctuation">.</span>mode <span class="token operator">||</span> <span class="token string">&#39;hash&#39;</span>
    <span class="token comment">// 使用 if 或者 分支都行 根据不同的模式执行不同的路由跳转功能等等</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>mode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> <span class="token string">&#39;history&#39;</span><span class="token operator">:</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>history <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HTML5History</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
        <span class="token keyword">break</span>
      <span class="token keyword">case</span> <span class="token string">&#39;hash&#39;</span><span class="token operator">:</span>
        <span class="token comment">// 模式的实例使用 this.history接收等下用的上</span>
        <span class="token comment">// 传入的this是 VueRouter</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>history <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashHistory</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
        <span class="token keyword">break</span>
      <span class="token keyword">default</span><span class="token operator">:</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;该模式不存在&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 初始化</span>
  <span class="token function">init</span><span class="token punctuation">(</span><span class="token parameter">Vue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 拿到模式的实例</span>
    <span class="token keyword">const</span> history <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>history
    <span class="token comment">// 进行跳转  第一个参数是path ,第二个是回调函数</span>
    history<span class="token punctuation">.</span><span class="token function">transitionTo</span><span class="token punctuation">(</span>history<span class="token punctuation">.</span>getCurrentLocation<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
      <span class="token comment">// 监听URL的改变 设置当前的 this.current</span>
      history<span class="token punctuation">.</span><span class="token function">setUpListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 为VueRouter 添加 install方法</span>
VueRouter<span class="token punctuation">.</span>install <span class="token operator">=</span> install
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="7"><li>定义一个响应值 _route</li></ol><div class="hint-container tip"><p class="hint-container-title">提示</p><p>渲染不同路由页面有个前提的就是需要一个表示 当前路由 响应式的属性</p><p>所以我们来到 install.js 添加一个响应式的 属性_route</p><p>和这个无关的代码 ...省略</p></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* install.js */</span>

<span class="token keyword">export</span> <span class="token keyword">let</span> _Vue <span class="token operator">=</span> <span class="token keyword">null</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">install</span><span class="token punctuation">(</span><span class="token parameter">Vue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  _Vue <span class="token operator">=</span> Vue
  Vue<span class="token punctuation">.</span><span class="token function">mixin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token function">beforeCreate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$options<span class="token punctuation">.</span>router<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token operator">...</span>
        <span class="token comment">// 创建一个代表当前路由 响应式的值_route</span>
        <span class="token comment">// 其实不建议使用 defineReactive直接创建。。</span>
        <span class="token comment">// 第一个参数是绑定在谁身上，第二是值名称，第二个是值</span>
        Vue<span class="token punctuation">.</span>util<span class="token punctuation">.</span><span class="token function">defineReactive</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token string">&#39;_route&#39;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_router<span class="token punctuation">.</span>history<span class="token punctuation">.</span>current<span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token operator">...</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>然后得回到 history下面的 base 添加一个修改响应式 _route的值的回调 this.cb</p></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* history/base.js */</span>

<span class="token keyword">import</span> createRoute <span class="token keyword">from</span> <span class="token string">&#39;../util/route&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">History</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">router</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>
    <span class="token comment">// cb 一个回调函数，它的作用就是修改 响应式路由的值_route ，对应的视图然后就刷新</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>cb <span class="token operator">=</span> <span class="token keyword">null</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 通过 listen来修改 cb的值</span>
  <span class="token function">listen</span><span class="token punctuation">(</span><span class="token parameter">cb</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>cb <span class="token operator">=</span> cb
  <span class="token punctuation">}</span>

  <span class="token function">transitionTo</span><span class="token punctuation">(</span><span class="token parameter">path<span class="token punctuation">,</span> onComplete</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token operator">...</span>
    <span class="token comment">// cb 存在就修改响应式路由的值</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>cb <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">cb</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>current<span class="token punctuation">)</span>
	<span class="token operator">...</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>最后在 index.js 的 init 调用 listen 方法 传入回调修改 响应式值_route</p></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* index.js */</span>

<span class="token operator">...</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">VueRouter</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token function">init</span><span class="token punctuation">(</span><span class="token parameter">Vue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>
    <span class="token comment">// 修改 响应式的 route</span>
    history<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">route</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      Vue<span class="token punctuation">.</span>_route <span class="token operator">=</span> route
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token operator">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="8"><li>添加 <code>$router</code> 和 <code>$route</code></li></ol><div class="hint-container tip"><p class="hint-container-title">提示</p><p>我们知道在 Vue Router 提供了 $router (这个是路由对象是<strong>Vue Router</strong>的实例) 还有 $route(路由规则对象)</p><p>我们自己可以来到 install.js 中进行 添加这两个属性</p></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* install.js */</span>

<span class="token operator">...</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">install</span><span class="token punctuation">(</span><span class="token parameter">Vue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token comment">// 添加 $router 路由对象  Object.defineProperty 参数分别是 为谁添加，属性名，属性值</span>
  Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span><span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> <span class="token string">&#39;$router&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// this._routerRoot代表的是 Vue ,他的_router是 Vue Router实例</span>
      <span class="token comment">// 可以回过去看看第二点</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_routerRoot<span class="token punctuation">.</span>_router
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token comment">// 添加 $route</span>
  Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span><span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> <span class="token string">&#39;$route&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 他的_route是就是刚才添加 响应式 的当前 路由</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_routerRoot<span class="token punctuation">.</span>_route
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="9"><li>router-link</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* ./components/link.js */</span>

<span class="token comment">// 导出 link</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">to</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> String<span class="token punctuation">,</span>
      <span class="token literal-property property">required</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// 渲染</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token parameter">h</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 转化为虚拟DOM</span>
    <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span>
      <span class="token comment">// 标签名</span>
      <span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span>
      <span class="token comment">// 标签属性</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">domProps</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">href</span><span class="token operator">:</span> <span class="token string">&#39;#&#39;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>to<span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// 标签里面的内容 这里是 默认插槽</span>
      <span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>$slots<span class="token punctuation">.</span>default<span class="token punctuation">]</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="10"><li>router-view</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* ./components/link.js */</span>

<span class="token comment">// 导出 view</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token parameter">h</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取路由规则对象</span>
    <span class="token keyword">const</span> route <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$route
    <span class="token comment">// 定义一个变量，用来等下 取 matched 中的值</span>
    <span class="token keyword">let</span> depth <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token comment">// 该组件为 router-view</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>routerView <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token comment">// 尝试去获取父组件</span>
    <span class="token keyword">let</span> parent <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$parent
    <span class="token comment">// 判断是否有父组件</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>parent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 判断该组件是否为 routerView</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>parent<span class="token punctuation">.</span>routerView<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        depth<span class="token operator">++</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 继续向上判断还有无父组件</span>
      parent <span class="token operator">=</span> parent<span class="token punctuation">.</span>$parent
    <span class="token punctuation">}</span>
    <span class="token comment">// 这里的route是 this.$route 就是 _route 响应式值，也就是 current</span>
    <span class="token comment">// 当初 current 是 调用了 match方法 获取到的 返回值是 matched 和 path</span>
    <span class="token comment">// matched 里面是多个路由对象 是这种模式保存 [parentRecord,childRecord]</span>
    <span class="token comment">// 通过 变量depth取出来 举个栗子 [&#39;/login&#39;,&#39;/login/tab&#39;]</span>
    <span class="token comment">// 因为使用的unshif添加后面的父组件添加到前面</span>
    <span class="token comment">// depth 一直加 ,直接取出后面即可</span>
    <span class="token keyword">const</span> record <span class="token operator">=</span> route<span class="token punctuation">.</span>matched<span class="token punctuation">[</span>depth<span class="token punctuation">]</span>
    <span class="token comment">// 没有记录直接渲染</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>record<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 有的话就获取记录中的组件</span>
    <span class="token keyword">const</span> component <span class="token operator">=</span> record<span class="token punctuation">.</span>component
    <span class="token comment">// 最后把组件渲染</span>
    <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span>component<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>好了到了这里 Vue Router的第二次编写就完成了，虽然和官方的差距很大。。额，因为这里是简化写的</p>`,96);function k(v,m){const a=o("router-link");return c(),i("div",null,[u,s("p",null,[n("/"),t(a,{to:"/goods/1"}),n("goods1/</router-link/>")]),r,s("p",null,[n("/"),t(a,{to:"/goods/1"}),n("goods1/</router-link/>")]),d])}const h=p(l,[["render",k],["__file","7.html.vue"]]);export{h as default};
