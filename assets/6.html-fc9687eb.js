import{_ as t,r as p,o as e,c as o,a as n,b as s,e as c,f as l}from"./app-ecd677b5.js";const i="/assets/init-57961954.png",u="/assets/initvue2-48d9c206.png",r={},k=n("h1",{id:"vue2源码解析-响应式原理",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#vue2源码解析-响应式原理","aria-hidden":"true"},"#"),s(" vue2源码解析-响应式原理")],-1),d=n("h2",{id:"vue源码获取",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#vue源码获取","aria-hidden":"true"},"#"),s(" vue源码获取")],-1),v={href:"https://github.com/vuejs/vue",target:"_blank",rel:"noopener noreferrer"},m=l('<h2 id="首次渲染过程" tabindex="-1"><a class="header-anchor" href="#首次渲染过程" aria-hidden="true">#</a> 首次渲染过程</h2><p>Vue的初始化已经完毕后，才开始进行首次渲染</p><figure><img src="'+i+`" alt="init" tabindex="0" loading="lazy"><figcaption>init</figcaption></figure><h2 id="响应式处理的入口" tabindex="-1"><a class="header-anchor" href="#响应式处理的入口" aria-hidden="true">#</a> 响应式处理的入口</h2><ul><li>src/core/instance/init.js <ul><li>initState(vm) vm 状态的初始化</li><li>初始化了 _data、_props、methods 等</li></ul></li><li>src/core/instance/state.js</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>opts<span class="token punctuation">.</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">initData</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
	<span class="token function">observe</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span>_data <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">true</span> <span class="token comment">/* asRootData */</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>initData(vm) vm 数据的初始化</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">initData</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">vm</span><span class="token operator">:</span> Component</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> data <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>data
  <span class="token comment">// 初始化 _data，组件中 data 是函数，调用函数返回结果 // 否则直接返回 data</span>
  data <span class="token operator">=</span> vm<span class="token punctuation">.</span>_data <span class="token operator">=</span> <span class="token keyword">typeof</span> data <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span>
    <span class="token operator">?</span> <span class="token function">getData</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> vm<span class="token punctuation">)</span>
    <span class="token operator">:</span> data <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isPlainObject</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    data <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">warn</span><span class="token punctuation">(</span>
      <span class="token string">&#39;data functions should return an object:\\n&#39;</span> <span class="token operator">+</span>
      <span class="token string">&#39;https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function&#39;</span><span class="token punctuation">,</span>
      vm
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// proxy data on instance</span>
  <span class="token comment">// 获取 data 中的所有属性</span>
  <span class="token keyword">const</span> keys <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
  <span class="token keyword">const</span> props <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>props
  <span class="token keyword">const</span> methods <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>methods
  <span class="token keyword">let</span> i <span class="token operator">=</span> keys<span class="token punctuation">.</span>length
  <span class="token comment">// 判断 data 上的成员是否和 props/methods 重名</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> key <span class="token operator">=</span> keys<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>methods <span class="token operator">&amp;&amp;</span> <span class="token function">hasOwn</span><span class="token punctuation">(</span>methods<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">warn</span><span class="token punctuation">(</span>
          <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Method &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot; has already been defined as a data property.</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
          vm
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>props <span class="token operator">&amp;&amp;</span> <span class="token function">hasOwn</span><span class="token punctuation">(</span>props<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">warn</span><span class="token punctuation">(</span>
        <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">The data property &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot; is already declared as a prop. </span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
        <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Use prop default value instead.</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
        vm
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isReserved</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">proxy</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">_data</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> key<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// observe data</span>
  <span class="token comment">// 响应书处理 入口</span>
  <span class="token function">observe</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token boolean">true</span> <span class="token comment">/* asRootData */</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>src/core/observer/index.js <ul><li>observe(value, asRootData)<br> 负责为每一个 Object 类型的 value 创建一个 observer 实例</li></ul></li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">observe</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">value</span><span class="token operator">:</span> any<span class="token punctuation">,</span> <span class="token literal-property property">asRootData</span><span class="token operator">:</span> <span class="token operator">?</span>boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> Observer <span class="token operator">|</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token comment">// 判断 value 是否是对象</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isObject</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">||</span> value <span class="token keyword">instanceof</span> <span class="token class-name">VNode</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">let</span> <span class="token literal-property property">ob</span><span class="token operator">:</span> Observer <span class="token operator">|</span> <span class="token keyword">void</span>
  <span class="token comment">// 如果 value 有 __ob__ 属性</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">hasOwn</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> <span class="token string">&#39;__ob__&#39;</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> value<span class="token punctuation">.</span>__ob__ <span class="token keyword">instanceof</span> <span class="token class-name">Observer</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 有 __ob__ 属性代表已经进行了响应式处理，就不需要再进行处理</span>
    ob <span class="token operator">=</span> value<span class="token punctuation">.</span>__ob__
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>
    shouldObserve <span class="token operator">&amp;&amp;</span>
    <span class="token operator">!</span><span class="token function">isServerRendering</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
    <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token function">isPlainObject</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
    Object<span class="token punctuation">.</span><span class="token function">isExtensible</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
    <span class="token operator">!</span>value<span class="token punctuation">.</span>_isVue
  <span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 判断是否可以进行响应式处理</span>
    <span class="token comment">// 创建一个 Observer 对象</span>
    ob <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Observer</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>asRootData <span class="token operator">&amp;&amp;</span> ob<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ob<span class="token punctuation">.</span>vmCount<span class="token operator">++</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> ob
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="observer" tabindex="-1"><a class="header-anchor" href="#observer" aria-hidden="true">#</a> Observer</h2><ul><li>src/core/observer/index.js <ul><li>对对象做响应化处理</li><li>对数组做响应化处理</li></ul></li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">Observer</span> <span class="token punctuation">{</span>
  <span class="token comment">// 观测对象</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> any<span class="token punctuation">;</span>
  <span class="token comment">// 依赖对象</span>
  <span class="token literal-property property">dep</span><span class="token operator">:</span> Dep<span class="token punctuation">;</span>
  <span class="token comment">// 实例计数器</span>
  <span class="token literal-property property">vmCount</span><span class="token operator">:</span> number<span class="token punctuation">;</span> <span class="token comment">// number of vms that have this object as root $data</span>

  <span class="token function">constructor</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">value</span><span class="token operator">:</span> any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 被观察的对象</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value
    <span class="token comment">// dep 对象</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>dep <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Dep</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// 初始化实例 vmCount 为0</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>vmCount <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token comment">// 将实例挂在到观察对象的 __ob__ 属性</span>
    <span class="token function">def</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> <span class="token string">&#39;__ob__&#39;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 数组的响应式处理</span>
      <span class="token doc-comment comment">/**
       * hasProto 的目的主要用来，判断当前浏览器是否支持__proto__，也就是用来处理浏览器的兼容性问题，
       * 如果当前浏览器支持__proto__原型这个属性则会调用protoAugment函数，否则调用copyAugment函数
       */</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>hasProto<span class="token punctuation">)</span> <span class="token punctuation">{</span> 
        <span class="token comment">// 修改原型__proto__</span>
        <span class="token function">protoAugment</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> arrayMethods<span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">copyAugment</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> arrayMethods<span class="token punctuation">,</span> arrayKeys<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 为数组的每一个对象创建一个 observe 实例</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">observeArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// 对象的响应式处理</span>
      <span class="token comment">// 遍历对象中的每个属性，转换成 getter和setter</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">walk</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */</span>
  <span class="token function">walk</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">obj</span><span class="token operator">:</span> Object</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取观察对象的每个属性</span>
    <span class="token keyword">const</span> keys <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
    <span class="token comment">// 遍历属性 设置为响应式数据</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> keys<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">defineReactive</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> keys<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * Observe a list of Array items.
   */</span>
  <span class="token function">observeArray</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">items</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>any<span class="token operator">&gt;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 遍历当前数组中的所有成员，通过observe方法把数组里面的成员如果是对象的转换为响应式的对象</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> l <span class="token operator">=</span> items<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> l<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">observe</span><span class="token punctuation">(</span>items<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="对象响应式处理-——defifinereactive" tabindex="-1"><a class="header-anchor" href="#对象响应式处理-——defifinereactive" aria-hidden="true">#</a> 对象响应式处理 ——defifineReactive()</h3><ul><li>src/core/observer/index.js</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 为一个对象定义一个响应式属性</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">defineReactive</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">obj</span><span class="token operator">:</span> Object<span class="token punctuation">,</span>
  <span class="token literal-property property">key</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
  <span class="token literal-property property">val</span><span class="token operator">:</span> any<span class="token punctuation">,</span>
  customSetter<span class="token operator">?</span><span class="token operator">:</span> <span class="token operator">?</span>Function<span class="token punctuation">,</span>
  shallow<span class="token operator">?</span><span class="token operator">:</span> boolean</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 收集依赖 </span>
  <span class="token keyword">const</span> dep <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Dep</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 负责收集所有属性的依赖</span>
  <span class="token comment">// 获取 obj 的属性描述符对象</span>
  <span class="token keyword">const</span> property <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyDescriptor</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>property <span class="token operator">&amp;&amp;</span> property<span class="token punctuation">.</span>configurable <span class="token operator">===</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 不可配置的 —— 不可删除、不可修改</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 提供预定义的存取器函数</span>
  <span class="token comment">// cater for pre-defined getter/setters</span>
  <span class="token keyword">const</span> getter <span class="token operator">=</span> property <span class="token operator">&amp;&amp;</span> property<span class="token punctuation">.</span>get
  <span class="token keyword">const</span> setter <span class="token operator">=</span> property <span class="token operator">&amp;&amp;</span> property<span class="token punctuation">.</span>set
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token operator">!</span>getter <span class="token operator">||</span> setter<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> arguments<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    val <span class="token operator">=</span> obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 判断是否递归观察子对象，并将子对象属性都转换成 getter、setter，返回子观察对象</span>
  <span class="token keyword">let</span> childOb <span class="token operator">=</span> <span class="token operator">!</span>shallow <span class="token operator">&amp;&amp;</span> <span class="token function">observe</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
  Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> key<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">reactiveGetter</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果预定于的 getter 存在则 value 等于getter 调用的返回值 否则直接赋予属性值</span>
      <span class="token keyword">const</span> value <span class="token operator">=</span> getter <span class="token operator">?</span> <span class="token function">getter</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token operator">:</span> val

      <span class="token comment">// 如果存在当前依赖目标，即 watcher 对象，则建立依赖</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>Dep<span class="token punctuation">.</span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 收集依赖</span>
        dep<span class="token punctuation">.</span><span class="token function">depend</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token comment">// 如果子观察目标存在，建立子对象的依赖关系</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>childOb<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          childOb<span class="token punctuation">.</span>dep<span class="token punctuation">.</span><span class="token function">depend</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token comment">// 如果属性是数组，则特殊处理收集数组对象依赖</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">dependArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 返回属性值</span>
      <span class="token keyword">return</span> value
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">reactiveSetter</span> <span class="token punctuation">(</span><span class="token parameter">newVal</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果预定于的 getter 存在则 value 等于getter 调用的返回值 否则直接赋予属性值</span>
      <span class="token keyword">const</span> value <span class="token operator">=</span> getter <span class="token operator">?</span> <span class="token function">getter</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token operator">:</span> val
      <span class="token comment">/* eslint-disable no-self-compare */</span>
      <span class="token comment">// 如果新值等于旧值或者新值旧值为NAN则不执行</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>newVal <span class="token operator">===</span> value <span class="token operator">||</span> <span class="token punctuation">(</span>newVal <span class="token operator">!==</span> newVal <span class="token operator">&amp;&amp;</span> value <span class="token operator">!==</span> value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span>
      <span class="token punctuation">}</span>
      <span class="token comment">/* eslint-enable no-self-compare */</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> customSetter<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">customSetter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// #7981: for accessor properties without setter</span>
      <span class="token comment">// 如果没有 setter 直接返回</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>getter <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>setter<span class="token punctuation">)</span> <span class="token keyword">return</span>
      <span class="token comment">// 如果预定义 setter 存在则调用，否则直接更新值</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>setter<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">setter</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> newVal<span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        val <span class="token operator">=</span> newVal
      <span class="token punctuation">}</span>
      <span class="token comment">// 如果新值是对象，观察子对象并返回 子的observer对象</span>
      childOb <span class="token operator">=</span> <span class="token operator">!</span>shallow <span class="token operator">&amp;&amp;</span> <span class="token function">observe</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span>
      <span class="token comment">// 派发更新</span>
      dep<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>总结： <ul><li>为一个对象定义一个响应式的属性，每一个属性对应一个 dep 对象</li><li>如果该属性的值是对象，继续调用 observe</li><li>如果给属性赋新值，继续调用 observe</li><li>如果数据更新发送通知</li></ul></li></ul><h3 id="数组响应式处理" tabindex="-1"><a class="header-anchor" href="#数组响应式处理" aria-hidden="true">#</a> 数组响应式处理</h3><p>首先看下 Observer 构造函数里面的代码块</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 数组的响应式处理</span>
  <span class="token doc-comment comment">/**
   * hasProto 的目的主要用来，判断当前浏览器是否支持__proto__，也就是用来处理浏览器的兼容性问题，
   * 如果当前浏览器支持__proto__原型这个属性则会调用protoAugment函数，否则调用copyAugment函数
   */</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>hasProto<span class="token punctuation">)</span> <span class="token punctuation">{</span> 
    <span class="token comment">// 修改原型__proto__</span>
    <span class="token function">protoAugment</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> arrayMethods<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token function">copyAugment</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> arrayMethods<span class="token punctuation">,</span> arrayKeys<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 为数组的每一个对象创建一个 observe 实例</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">observeArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  <span class="token comment">// 对象的响应式处理</span>
  <span class="token comment">// 遍历对象中的每个属性，转换成 getter和setter</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">walk</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 重新设置当前数组的原型属性，</span>
<span class="token keyword">function</span> <span class="token function">protoAugment</span> <span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> <span class="token literal-property property">src</span><span class="token operator">:</span> Object</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">/* eslint-disable no-proto */</span>
  <span class="token comment">// 将目标的__proto__原型直接修改为src</span>
  target<span class="token punctuation">.</span>__proto__ <span class="token operator">=</span> src
  <span class="token comment">/* eslint-enable no-proto */</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */</span>
<span class="token comment">/* istanbul ignore next */</span>
<span class="token keyword">function</span> <span class="token function">copyAugment</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">target</span><span class="token operator">:</span> Object<span class="token punctuation">,</span> <span class="token literal-property property">src</span><span class="token operator">:</span> Object<span class="token punctuation">,</span> <span class="token literal-property property">keys</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>string<span class="token operator">&gt;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> l <span class="token operator">=</span> keys<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> l<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> key <span class="token operator">=</span> keys<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    <span class="token comment">// 给当前对象重新定义keys里面的函数</span>
    <span class="token function">def</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> src<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>处理数组修改数据的方法 <ul><li>src/core/observer/array.js</li></ul></li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/*
 * not type checking this file because flow doesn&#39;t play well with
 * dynamically accessing methods on Array prototype
 */</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> def <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;../util/index&#39;</span>

<span class="token keyword">const</span> arrayProto <span class="token operator">=</span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype

<span class="token comment">// 克隆数组的原型</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> arrayMethods <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>arrayProto<span class="token punctuation">)</span>

<span class="token comment">// 修改数组的方法</span>
<span class="token keyword">const</span> methodsToPatch <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token string">&#39;push&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;pop&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;shift&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;unshift&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;splice&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;sort&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;reverse&#39;</span>
<span class="token punctuation">]</span>

<span class="token doc-comment comment">/**
 * Intercept mutating methods and emit events
 */</span>
methodsToPatch<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">method</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// cache original method</span>
  <span class="token keyword">const</span> original <span class="token operator">=</span> arrayProto<span class="token punctuation">[</span>method<span class="token punctuation">]</span>
  <span class="token comment">// 给arrayMethods重新设置修改数组的方法</span>
  <span class="token function">def</span><span class="token punctuation">(</span>arrayMethods<span class="token punctuation">,</span> method<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token function">mutator</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 执行数组的原始方法</span>
    <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">original</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
    <span class="token comment">// 获取数组对象的 ob 对象</span>
    <span class="token keyword">const</span> ob <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>__ob__
    <span class="token keyword">let</span> inserted
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>method<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> <span class="token string">&#39;push&#39;</span><span class="token operator">:</span>
      <span class="token keyword">case</span> <span class="token string">&#39;unshift&#39;</span><span class="token operator">:</span>
        inserted <span class="token operator">=</span> args
        <span class="token keyword">break</span>
      <span class="token keyword">case</span> <span class="token string">&#39;splice&#39;</span><span class="token operator">:</span>
        inserted <span class="token operator">=</span> args<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
        <span class="token keyword">break</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 对插入的新元素，重新遍历数组元素，设置为响应式数据</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>inserted<span class="token punctuation">)</span> ob<span class="token punctuation">.</span><span class="token function">observeArray</span><span class="token punctuation">(</span>inserted<span class="token punctuation">)</span>
    <span class="token comment">// notify change</span>
    <span class="token comment">// 调用了修改数组方法，调用数组的ob 对象进行发送通知</span>
    ob<span class="token punctuation">.</span>dep<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> result
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>修改数组的解读：<br> a. 先调用pop，push这些原有数组的方法<br> b. 然后找到可能会给数组新增元素的方法<br> c. 如果新增了元素，那么调用 ob.observeArray(inserted) 方法遍历数组中新增元素并转换为响应式对象<br> d. 然后调用notify方法进行发送通知<br> e. 返回结果</li></ul><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>app<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span>数组响应式<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>
{{arr}}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>../../dist/vue.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">const</span> vm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token string">&#39;#app&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">arr</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>控制台依次输入：<br> ■ vm.arr.push(222)<br> ■ vm.arr[0] = 345<br> ■ vm.arr.length = 0</p></li><li><p>结果：第一个输入是更新了；第二个、第三个没有更新</p></li><li><p>源码角度出发进行分析：<br> 1.输入 vm.arr 查看数组里面的原型，是因为只修改了数组的&#39;push&#39;,&#39;pop&#39;,&#39;shift&#39;,&#39;unshift&#39;,&#39;splice&#39;,&#39;sort&#39;,&#39;reverse&#39;方法，进行了派发更新的操作；<br> 2.查看源码，在处理数组的响应式的时候，并没有对数组的方法进行响应式处理，而是对数组里面的元素为对象的进行了响应式处理</p></li></ul><h2 id="dep依赖收集" tabindex="-1"><a class="header-anchor" href="#dep依赖收集" aria-hidden="true">#</a> Dep依赖收集</h2><ul><li>src/core/observer/dep.js <ul><li>依赖对象</li><li>记录 watcher 对象</li><li>depend() -- watcher 记录对应的 dep</li><li>发布通知</li></ul></li></ul><p>在 defineReactive() 的 getter 中创建 dep 对象，并判断 Dep.target 是否有值, 调用 dep.depend()</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">reactiveGetter</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 如果预定于的 getter 存在则 value 等于getter 调用的返回值 否则直接赋予属性值</span>
  <span class="token keyword">const</span> value <span class="token operator">=</span> getter <span class="token operator">?</span> <span class="token function">getter</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token operator">:</span> val

  <span class="token comment">// 如果存在当前依赖目标，即 watcher 对象，则建立依赖</span>
  <span class="token doc-comment comment">/**
   * Dep.target什么时候设置的？？？？？
   * 是在调用 mountComponent() 方法的时候，创建了渲染 watcher 对象，执行 watcher 中的 get() 方法
   * 在get方法里调用了 pushTarget(this),将watcher赋值给 Dep.target \`Dep.target = target\`
   */</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>Dep<span class="token punctuation">.</span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 收集依赖</span>
    dep<span class="token punctuation">.</span><span class="token function">depend</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// 如果子观察目标存在，建立子对象的依赖关系</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>childOb<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      childOb<span class="token punctuation">.</span>dep<span class="token punctuation">.</span><span class="token function">depend</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token comment">// 如果属性是数组，则特殊处理收集数组对象依赖</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">dependArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 返回属性值</span>
  <span class="token keyword">return</span> value
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>src/core/observer/dep.js</li></ul><h3 id="dep类" tabindex="-1"><a class="header-anchor" href="#dep类" aria-hidden="true">#</a> Dep类</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Dep</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token operator">?</span>Watcher<span class="token punctuation">;</span>
  <span class="token literal-property property">id</span><span class="token operator">:</span> number<span class="token punctuation">;</span>
  <span class="token comment">// dep 实例对应的watcher对象、订阅者数组</span>
  <span class="token literal-property property">subs</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>Watcher<span class="token operator">&gt;</span><span class="token punctuation">;</span>

  <span class="token function">constructor</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> uid<span class="token operator">++</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>subs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 添加新的订阅者 watcher 对象</span>
  <span class="token function">addSub</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">sub</span><span class="token operator">:</span> Watcher</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>subs<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>sub<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 移除订阅者</span>
  <span class="token function">removeSub</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">sub</span><span class="token operator">:</span> Watcher</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">remove</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>subs<span class="token punctuation">,</span> sub<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 将观察对象和watcher 简历依赖</span>
  <span class="token function">depend</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Dep<span class="token punctuation">.</span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果 target存在，把dep对象添加到 watcher的依赖中</span>
      Dep<span class="token punctuation">.</span>target<span class="token punctuation">.</span><span class="token function">addDep</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 发布通知</span>
  <span class="token function">notify</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// stabilize the subscriber list first</span>
    <span class="token keyword">const</span> subs <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>subs<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>config<span class="token punctuation">.</span>async<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// subs aren&#39;t sorted in scheduler if not running async</span>
      <span class="token comment">// we need to sort them now to make sure they fire in correct</span>
      <span class="token comment">// order</span>
      subs<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> a<span class="token punctuation">.</span>id <span class="token operator">-</span> b<span class="token punctuation">.</span>id<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> l <span class="token operator">=</span> subs<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> l<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      subs<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Dep.target 用来存放目前正在使用的 watcher；全局唯一 并且一次也只能有一个watcher被使用</span>
<span class="token comment">// The current target watcher being evaluated.</span>
<span class="token comment">// This is globally unique because only one watcher</span>
<span class="token comment">// can be evaluated at a time.</span>
Dep<span class="token punctuation">.</span>target <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token keyword">const</span> targetStack <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token comment">// targetStack 要放入栈中的目的是？</span>
<span class="token comment">// 因为vue2中，每个组件都会对应一个watcher对象，每个组件都会有 mountcomponent，</span>
<span class="token comment">// 在实际开发中，组件中会调用子组件，那么就需要先将父组件的watcher先挂载起来，</span>
<span class="token comment">// 等子组件渲染完毕后，再把父组件对应的 watcher 出栈，父组件继续渲染</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">pushTarget</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token operator">?</span>Watcher</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  targetStack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
  <span class="token comment">// 将watcher赋值给 Dep.target</span>
  Dep<span class="token punctuation">.</span>target <span class="token operator">=</span> target
<span class="token punctuation">}</span>

<span class="token comment">// 出栈</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">popTarget</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  targetStack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  Dep<span class="token punctuation">.</span>target <span class="token operator">=</span> targetStack<span class="token punctuation">[</span>targetStack<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="watcher类" tabindex="-1"><a class="header-anchor" href="#watcher类" aria-hidden="true">#</a> Watcher类</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Watcher</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">vm</span><span class="token operator">:</span> Component<span class="token punctuation">;</span>
  <span class="token literal-property property">expression</span><span class="token operator">:</span> string<span class="token punctuation">;</span>
  <span class="token literal-property property">cb</span><span class="token operator">:</span> Function<span class="token punctuation">;</span>
  <span class="token literal-property property">id</span><span class="token operator">:</span> number<span class="token punctuation">;</span>
  <span class="token literal-property property">deep</span><span class="token operator">:</span> boolean<span class="token punctuation">;</span>
  <span class="token literal-property property">user</span><span class="token operator">:</span> boolean<span class="token punctuation">;</span>
  <span class="token literal-property property">lazy</span><span class="token operator">:</span> boolean<span class="token punctuation">;</span>
  <span class="token literal-property property">sync</span><span class="token operator">:</span> boolean<span class="token punctuation">;</span>
  <span class="token literal-property property">dirty</span><span class="token operator">:</span> boolean<span class="token punctuation">;</span>
  <span class="token literal-property property">active</span><span class="token operator">:</span> boolean<span class="token punctuation">;</span>
  <span class="token literal-property property">deps</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>Dep<span class="token operator">&gt;</span><span class="token punctuation">;</span>
  <span class="token literal-property property">newDeps</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>Dep<span class="token operator">&gt;</span><span class="token punctuation">;</span>
  <span class="token literal-property property">depIds</span><span class="token operator">:</span> SimpleSet<span class="token punctuation">;</span>
  <span class="token literal-property property">newDepIds</span><span class="token operator">:</span> SimpleSet<span class="token punctuation">;</span>
  <span class="token literal-property property">before</span><span class="token operator">:</span> <span class="token operator">?</span>Function<span class="token punctuation">;</span>
  <span class="token literal-property property">getter</span><span class="token operator">:</span> Function<span class="token punctuation">;</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> any<span class="token punctuation">;</span>

  <span class="token function">constructor</span> <span class="token punctuation">(</span>
    <span class="token parameter"><span class="token literal-property property">vm</span><span class="token operator">:</span> Component<span class="token punctuation">,</span>
    <span class="token literal-property property">expOrFn</span><span class="token operator">:</span> string <span class="token operator">|</span> Function<span class="token punctuation">,</span>
    <span class="token literal-property property">cb</span><span class="token operator">:</span> Function<span class="token punctuation">,</span>
    options<span class="token operator">?</span><span class="token operator">:</span> <span class="token operator">?</span>Object<span class="token punctuation">,</span>
    isRenderWatcher<span class="token operator">?</span><span class="token operator">:</span> boolean</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>vm <span class="token operator">=</span> vm
    <span class="token keyword">if</span> <span class="token punctuation">(</span>isRenderWatcher<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      vm<span class="token punctuation">.</span>_watcher <span class="token operator">=</span> <span class="token keyword">this</span>
    <span class="token punctuation">}</span>
    vm<span class="token punctuation">.</span>_watchers<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token comment">// options</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>deep <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span>options<span class="token punctuation">.</span>deep
      <span class="token keyword">this</span><span class="token punctuation">.</span>user <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span>options<span class="token punctuation">.</span>user
      <span class="token keyword">this</span><span class="token punctuation">.</span>lazy <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span>options<span class="token punctuation">.</span>lazy
      <span class="token keyword">this</span><span class="token punctuation">.</span>sync <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span>options<span class="token punctuation">.</span>sync
      <span class="token keyword">this</span><span class="token punctuation">.</span>before <span class="token operator">=</span> options<span class="token punctuation">.</span>before
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>deep <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>user <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lazy <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>sync <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>cb <span class="token operator">=</span> cb
    <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> <span class="token operator">++</span>uid <span class="token comment">// uid for batching</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>active <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>dirty <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lazy <span class="token comment">// for lazy watchers</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>deps <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>newDeps <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>depIds <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>newDepIds <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>expression <span class="token operator">=</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span>
      <span class="token operator">?</span> expOrFn<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token operator">:</span> <span class="token string">&#39;&#39;</span>
    <span class="token comment">// parse expression for getter</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> expOrFn <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>getter <span class="token operator">=</span> expOrFn
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// expOrFn 是字符串的时候，例如 watch: {&#39;person.name&#39;: function...}</span>
      <span class="token comment">// parsePath(&#39;person.name&#39;) 返回一个函数获取 person.name 的值</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>getter <span class="token operator">=</span> <span class="token function">parsePath</span><span class="token punctuation">(</span>expOrFn<span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>getter<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>getter <span class="token operator">=</span> noop
        process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">warn</span><span class="token punctuation">(</span>
          <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Failed watching path: &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>expOrFn<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot; </span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
          <span class="token string">&#39;Watcher only accepts simple dot-delimited paths. &#39;</span> <span class="token operator">+</span>
          <span class="token string">&#39;For full control, use a function instead.&#39;</span><span class="token punctuation">,</span>
          vm
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lazy
      <span class="token operator">?</span> <span class="token keyword">undefined</span>
      <span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * Evaluate the getter, and re-collect dependencies.
   */</span>
  <span class="token function">get</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">pushTarget</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token keyword">let</span> value
    <span class="token keyword">const</span> vm <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>vm
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      value <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getter</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> vm<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>user<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">handleError</span><span class="token punctuation">(</span>e<span class="token punctuation">,</span> vm<span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">getter for watcher &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>expression<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> e
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
      <span class="token comment">// &quot;touch&quot; every property so they are all tracked as</span>
      <span class="token comment">// dependencies for deep watching</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>deep<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">traverse</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token function">popTarget</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">cleanupDeps</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> value
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * Add a dependency to this directive.
   */</span>
  <span class="token function">addDep</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">dep</span><span class="token operator">:</span> Dep</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> id <span class="token operator">=</span> dep<span class="token punctuation">.</span>id
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>newDepIds<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>newDepIds<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>newDeps<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>dep<span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>depIds<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        dep<span class="token punctuation">.</span><span class="token function">addSub</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * Clean up for dependency collection.
   */</span>
  <span class="token function">cleanupDeps</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>deps<span class="token punctuation">.</span>length
    <span class="token keyword">while</span> <span class="token punctuation">(</span>i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> dep <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>deps<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>newDepIds<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>dep<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        dep<span class="token punctuation">.</span><span class="token function">removeSub</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">let</span> tmp <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>depIds
    <span class="token keyword">this</span><span class="token punctuation">.</span>depIds <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>newDepIds
    <span class="token keyword">this</span><span class="token punctuation">.</span>newDepIds <span class="token operator">=</span> tmp
    <span class="token keyword">this</span><span class="token punctuation">.</span>newDepIds<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    tmp <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>deps
    <span class="token keyword">this</span><span class="token punctuation">.</span>deps <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>newDeps
    <span class="token keyword">this</span><span class="token punctuation">.</span>newDeps <span class="token operator">=</span> tmp
    <span class="token keyword">this</span><span class="token punctuation">.</span>newDeps<span class="token punctuation">.</span>length <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * Subscriber interface.
   * Will be called when a dependency changes.
   */</span>
  <span class="token function">update</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">/* istanbul ignore else */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>lazy<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>dirty <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>sync<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token function">queueWatcher</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * Scheduler job interface.
   * Will be called by the scheduler.
   */</span>
  <span class="token function">run</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>active<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>
        value <span class="token operator">!==</span> <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">||</span>
        <span class="token comment">// Deep watchers and watchers on Object/Arrays should fire even</span>
        <span class="token comment">// when the value is the same, because the value may</span>
        <span class="token comment">// have mutated.</span>
        <span class="token function">isObject</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">||</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>deep
      <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// set new value</span>
        <span class="token keyword">const</span> oldValue <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>value
        <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>user<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">const</span> info <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">callback for watcher &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>expression<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span><span class="token template-punctuation string">\`</span></span>
          <span class="token function">invokeWithErrorHandling</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>cb<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>vm<span class="token punctuation">,</span> <span class="token punctuation">[</span>value<span class="token punctuation">,</span> oldValue<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>vm<span class="token punctuation">,</span> info<span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">cb</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>vm<span class="token punctuation">,</span> value<span class="token punctuation">,</span> oldValue<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * Evaluate the value of the watcher.
   * This only gets called for lazy watchers.
   */</span>
  <span class="token function">evaluate</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>dirty <span class="token operator">=</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * Depend on all deps collected by this watcher.
   */</span>
  <span class="token function">depend</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>deps<span class="token punctuation">.</span>length
    <span class="token keyword">while</span> <span class="token punctuation">(</span>i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>deps<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">depend</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * Remove self from all dependencies&#39; subscriber list.
   */</span>
  <span class="token function">teardown</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>active<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// remove self from vm&#39;s watcher list</span>
      <span class="token comment">// this is a somewhat expensive operation so we skip it</span>
      <span class="token comment">// if the vm is being destroyed.</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>vm<span class="token punctuation">.</span>_isBeingDestroyed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">remove</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>vm<span class="token punctuation">.</span>_watchers<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>deps<span class="token punctuation">.</span>length
      <span class="token keyword">while</span> <span class="token punctuation">(</span>i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>deps<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">removeSub</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>active <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此Watcher是属于渲染Watcher</p><p>渲染 watcher 的执行过程</p><ul><li>当数据更新，defifineReactive 的 set 方法中调用 dep.notify()</li><li>调用 watcher 的 update()</li><li>调用 queueWatcher()，把 wacher 存入队列，如果已经存入，不重复添加</li><li>循环调用 flflushSchedulerQueue() <ul><li>通过 nextTick()，在消息循环结束之前时候调用 flflushSchedulerQueue()</li></ul></li><li>调用 wacher.run() <ul><li>调用 wacher.get() 获取最新值</li><li>如果是渲染 wacher 结束</li><li>如果是用户 watcher，调用 this.cb()</li></ul></li></ul><h2 id="watcher种类" tabindex="-1"><a class="header-anchor" href="#watcher种类" aria-hidden="true">#</a> Watcher种类</h2><p>Watcher分为三种：</p><ul><li>Computed Watcher：我们的计算属性就是使用watcher实现的；在initState时初始化</li><li>用户 Watcher：侦听器和vm.$watch方法都是属于用户 Watcher；在initState时初始化</li><li>渲染 Watcher：数据更新时；在mountComponent 函数中创建的</li></ul><p>创建顺序：计算属性 Watcher、用户 Watcher (侦听器)、渲染 Watcher</p><h3 id="渲染-watcher-的创建时机" tabindex="-1"><a class="header-anchor" href="#渲染-watcher-的创建时机" aria-hidden="true">#</a> 渲染 Watcher 的创建时机</h3><ul><li>src/core/instance/lifecycle.js</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">mountComponent</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">vm</span><span class="token operator">:</span> Component<span class="token punctuation">,</span>
  <span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token operator">?</span>Element<span class="token punctuation">,</span>
  hydrating<span class="token operator">?</span><span class="token operator">:</span> boolean</span>
<span class="token punctuation">)</span><span class="token operator">:</span> Component <span class="token punctuation">{</span>
  vm<span class="token punctuation">.</span>$el <span class="token operator">=</span> el
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>render<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>render <span class="token operator">=</span> createEmptyVNode
    <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">/* istanbul ignore if */</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>template <span class="token operator">&amp;&amp;</span> vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>template<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token string">&#39;#&#39;</span><span class="token punctuation">)</span> <span class="token operator">||</span>
        vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>el <span class="token operator">||</span> el<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">warn</span><span class="token punctuation">(</span>
          <span class="token string">&#39;You are using the runtime-only build of Vue where the template &#39;</span> <span class="token operator">+</span>
          <span class="token string">&#39;compiler is not available. Either pre-compile the templates into &#39;</span> <span class="token operator">+</span>
          <span class="token string">&#39;render functions, or use the compiler-included build.&#39;</span><span class="token punctuation">,</span>
          vm
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">warn</span><span class="token punctuation">(</span>
          <span class="token string">&#39;Failed to mount component: template or render function not defined.&#39;</span><span class="token punctuation">,</span>
          vm
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token function">callHook</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token string">&#39;beforeMount&#39;</span><span class="token punctuation">)</span>

  <span class="token keyword">let</span> updateComponent
  <span class="token comment">/* istanbul ignore if */</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> config<span class="token punctuation">.</span>performance <span class="token operator">&amp;&amp;</span> mark<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">updateComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> name <span class="token operator">=</span> vm<span class="token punctuation">.</span>_name
      <span class="token keyword">const</span> id <span class="token operator">=</span> vm<span class="token punctuation">.</span>_uid
      <span class="token keyword">const</span> startTag <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">vue-perf-start:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span>
      <span class="token keyword">const</span> endTag <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">vue-perf-end:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span>

      <span class="token function">mark</span><span class="token punctuation">(</span>startTag<span class="token punctuation">)</span>
      <span class="token keyword">const</span> vnode <span class="token operator">=</span> vm<span class="token punctuation">.</span><span class="token function">_render</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token function">mark</span><span class="token punctuation">(</span>endTag<span class="token punctuation">)</span>
      <span class="token function">measure</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">vue </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> render</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> startTag<span class="token punctuation">,</span> endTag<span class="token punctuation">)</span>

      <span class="token function">mark</span><span class="token punctuation">(</span>startTag<span class="token punctuation">)</span>
      vm<span class="token punctuation">.</span><span class="token function">_update</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> hydrating<span class="token punctuation">)</span>
      <span class="token function">mark</span><span class="token punctuation">(</span>endTag<span class="token punctuation">)</span>
      <span class="token function">measure</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">vue </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> patch</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> startTag<span class="token punctuation">,</span> endTag<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">updateComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      vm<span class="token punctuation">.</span><span class="token function">_update</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span><span class="token function">_render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> hydrating<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// we set this to vm._watcher inside the watcher&#39;s constructor</span>
  <span class="token comment">// since the watcher&#39;s initial patch may call $forceUpdate (e.g. inside child</span>
  <span class="token comment">// component&#39;s mounted hook), which relies on vm._watcher being already defined</span>
  <span class="token keyword">new</span> <span class="token class-name">Watcher</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> updateComponent<span class="token punctuation">,</span> noop<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function">before</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>vm<span class="token punctuation">.</span>_isMounted <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>vm<span class="token punctuation">.</span>_isDestroyed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">callHook</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token string">&#39;beforeUpdate&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">true</span> <span class="token comment">/* isRenderWatcher */</span><span class="token punctuation">)</span>
  hydrating <span class="token operator">=</span> <span class="token boolean">false</span>

  <span class="token comment">// manually mounted instance, call mounted on self</span>
  <span class="token comment">// mounted is called for render-created child components in its inserted hook</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>vm<span class="token punctuation">.</span>$vnode <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    vm<span class="token punctuation">.</span>_isMounted <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token function">callHook</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token string">&#39;mounted&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> vm
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>响应式处理过程总结</p><figure><img src="`+u+'" alt="init" tabindex="0" loading="lazy"><figcaption>init</figcaption></figure>',47);function b(y,h){const a=p("ExternalLinkIcon");return e(),o("div",null,[k,d,n("p",null,[s("项目地址: "),n("a",v,[s("https://github.com/vuejs/vue"),c(a)])]),m])}const f=t(r,[["render",b],["__file","6.html.vue"]]);export{f as default};
