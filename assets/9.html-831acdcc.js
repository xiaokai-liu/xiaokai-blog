import{_ as p,r as t,o as i,c as l,a as n,b as a,e,f as o}from"./app-02fa1acf.js";const c={},r=o(`<h1 id="编译器" tabindex="-1"><a class="header-anchor" href="#编译器" aria-hidden="true">#</a> 编译器</h1><ul><li>什么是编译器；</li><li>编译器的基本思路；</li><li>一个简单的编译器的实现；</li></ul><h2 id="什么是编译器" tabindex="-1"><a class="header-anchor" href="#什么是编译器" aria-hidden="true">#</a> 什么是编译器</h2><h3 id="编译器的介绍" tabindex="-1"><a class="header-anchor" href="#编译器的介绍" aria-hidden="true">#</a> 编译器的介绍</h3><div class="hint-container tip"><p class="hint-container-title">提示</p><p>compiler也叫编译器，是一种电脑程序，它会将用某种编程语言写成的源代码，转换成另一种编程语言。</p></div><p>从维基百科的定义来看，编译器就是个将当前语言转为其他语言的过程，回到babel上，它所做的事就是语法糖之类的转换，比如ES6/ES7/JSX转为ES5或者其他指定版本，因此称之为compiler也是正确的，换言之，像我们平时开发过程中所谓的其他工具，如：</p><ul><li>Less/Saas</li><li>TypeScript/coffeeScript</li><li>Eslint</li></ul><p>都可以看到compiler的身影，也是通过这些工具，才使得目前的前端工程化能⾛入相对的深⽔区，以下会详细介绍下compiler的实现思路及具体demo</p><h2 id="编译器的基本思路" tabindex="-1"><a class="header-anchor" href="#编译器的基本思路" aria-hidden="true">#</a> 编译器的基本思路</h2><h3 id="词法分析-lexical-analysis" tabindex="-1"><a class="header-anchor" href="#词法分析-lexical-analysis" aria-hidden="true">#</a> 词法分析(Lexical Analysis)</h3><h4 id="目的" tabindex="-1"><a class="header-anchor" href="#目的" aria-hidden="true">#</a> 目的</h4><p>将文本分割成一个个的“token”，例如：init、main、init、x、;、x、=、3、;、}等等。同时它可以去掉一些注释、空格、回车等等无效字符；</p><h4 id="生成方式" tabindex="-1"><a class="header-anchor" href="#生成方式" aria-hidden="true">#</a> 生成方式</h4><p>词法分析生成token的办法有2种：</p><ol><li>使用正则进行词法分析</li></ol><p>需要写大量的正则表达式，正则之间还有冲突需要处理，不容易维护，性能不高，所以正则只适合一些简单的模板语法，真正复杂的语言并不合适。并且有的语言并不一定自带正则引擎。</p><ol start="2"><li>使用自动机进行词法分析</li></ol><p>自动机可以很好的生成token；<br> 有穷状态自动机（finite state machine）：在有限个输入的情况下，在这些状态中转移并期望最终达到终止状态。<br> 有穷状态自动机根据确定性可以分为：<br> “确定有穷状态自动机”（DFA - Deterministic finite automaton）<br> 在输入一个状态时，只得到一个固定的状态。DFA 可以认为是一种特殊的 NFA；<br> “非确定有穷自动机”（NFA - Non-deterministic finite automaton）<br> 当输入一个字符或者条件得到一个状态机的集合。JavaScript 正则采用的是 NFA 引擎，具体看后文；</p><h3 id="语法分析-syntactic-analysis" tabindex="-1"><a class="header-anchor" href="#语法分析-syntactic-analysis" aria-hidden="true">#</a> 语法分析(Syntactic Analysis)</h3><p>我们日常所说的编译原理就是将一种语言转换为另一种语言。编译原理被称为形式语言，它是一类无需知道太多语言背景、无歧义的语言。而自然语言通常难以处理，主要是因为难以识别语言中哪些是名词哪些是动词哪些是形容词。例如：“进口汽⻋”这句话，“进口”到底是动词还是形容词？所以我们要解析一⻔语言，前提是这⻔语言有严格的语法规定的语言，而定义语言的语法规格称为 <strong>文法</strong>。</p><p>语法分析的目的就是通过词法分析器拿到的token流 + 结合文法规则，通过一定算法得到一颗抽象语法树（AST）。抽象语法树是非常重要的概念，尤其在前端领域应用很⼴。典型应用如babel插件，它的原理就是：<code>es6代码 → Babylon.parse → AST → babel-traverse → 新的AST → es5代码</code>。</p><p>从生成AST效率和实现难度上，前⼈总结主要有2种解析算法：自顶向下的分析方法和自底向上的分析方法。自底向上算法分析文法范围⼴，但实现难度大。而自顶向下算法实现相对简单，并且能够解析文法的范围也不错，所以一般的compiler都是采用深度优先索引的方式。</p><h3 id="代码转换-transformation" tabindex="-1"><a class="header-anchor" href="#代码转换-transformation" aria-hidden="true">#</a> 代码转换（Transformation）</h3><p>在得到AST后，我们一般会先将AST转为另一种AST，目的是生成更符合预期的AST，这一步称为代码转换。</p><p>代码转换的优势：主要是产生工程上的意义</p><ul><li>易移植：与机器无关，所以它作为中间语⾔可以为生成多种不同型号的目标机器码服务；</li><li>机器无关优化：对中间码进行机器无关优化，利于提高代码质量；</li><li>层次清晰：将AST映射成中间代码表示，再映射成目标代码的工作分层进行，使编译算法更加清晰</li></ul><p>对于一个Compiler而⾔，在转换阶段通常有两种形式：</p><ul><li>同语⾔的AST转换；</li><li>AST转换为新语⾔的AST；</li></ul><p>这里有一种通用的做法是，对我们之前的AST从上至下的解析（称为traversal），然后会有个映射表（称为visitor），把对应的类型做相应的转换。</p><h3 id="代码生成-code-generation" tabindex="-1"><a class="header-anchor" href="#代码生成-code-generation" aria-hidden="true">#</a> 代码生成(Code Generation)</h3><p>在实际的代码处理过程中，可能会递归的分析（recursive）我们最终生成的AST，然后对于每种type都有个对应的函数处理，当然，这可能是最简单的做法。总之，我们的目标代码会在这一步输出，对于我们的目标语⾔，它就是HTML了。</p><h3 id="完整链路-compiler" tabindex="-1"><a class="header-anchor" href="#完整链路-compiler" aria-hidden="true">#</a> 完整链路(Compiler)</h3><p>至此，我们就完成了一个完整的compiler的所有过程：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token parameter">input</span> <span class="token operator">=&gt;</span> <span class="token parameter">tokenizer</span> <span class="token operator">=&gt;</span> tokens<span class="token punctuation">;</span> <span class="token comment">// 词法分析</span>
<span class="token parameter">tokens</span> <span class="token operator">=&gt;</span> <span class="token parameter">parser</span> <span class="token operator">=&gt;</span> ast<span class="token punctuation">;</span> <span class="token comment">// 语法分析，生成AST</span>
<span class="token parameter">ast</span> <span class="token operator">=&gt;</span> <span class="token parameter">transformer</span> <span class="token operator">=&gt;</span> newAst<span class="token punctuation">;</span> <span class="token comment">// 中间层代码转换</span>
<span class="token parameter">newAst</span> <span class="token operator">=&gt;</span> <span class="token parameter">generator</span> <span class="token operator">=&gt;</span> output<span class="token punctuation">;</span> <span class="token comment">// 生成目标代码</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="一个简单的编译器的实现" tabindex="-1"><a class="header-anchor" href="#一个简单的编译器的实现" aria-hidden="true">#</a> 一个简单的编译器的实现</h2><h3 id="前置内容" tabindex="-1"><a class="header-anchor" href="#前置内容" aria-hidden="true">#</a> 前置内容</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 今天我们要一起写一个编译器。但不仅仅是任何编译器......
 * 超级小的编译器！一个很小的编译器，如果你
 * 删除所有注释，这个文件只有大约 200 行实际代码。
 *
 * 我们将把一些类似语义化代码的函数调用编译成一些类似 C 的函数
 * 函数调用。
 *
 * 如果您不熟悉其中之一。我只是给你一个快速的介绍。
 *
 * 如果我们有两个函数 \`add\` 和 \`subtract\` 他们会写成这样：
 *
 * 类似 C
 *
 * 2 + 2 (加 2 2) 加 (2, 2)
 * 4 - 2 (减 4 2) 减 (4, 2)
 * 2 + (4 - 2) (加 2 (减 4 2)) 加 (2, 减 (4, 2))
 *
 *
 * 很好，因为这正是我们要编译的。虽然这
 * 不是完整的 C 语法，它的语法以
 * 演示现代编译器的许多主要部分。
 */</span>


<span class="token doc-comment comment">/**
 * 大多数编译器分为三个主要阶段：解析、转换、
 * 和代码生成
 *
 * 1. *解析* 将原始代码转化为更抽象的代码
 * 代码的表示。
 *
 * 2. *转换* 采用这种抽象表示并进行操作
 * 无论编译器想要什么。
 *
 * 3. *代码生成*采用转换后的代码表示，并
 * 将其转换为新代码。
 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 解析
 * --------
 *
 * 解析通常分为两个阶段：词法分析和
 * 句法分析。
 *
 * 1. *词法分析*获取原始代码并将其拆分成这些东西
 * 被称为标记器（或词法分析器）的东西称为标记。
 *
 * Tokens 是一组微小的对象，描述了一个孤立的部分
 * 的语法。它们可以是数字、标签、标点符号、运算符、
 * 任何。
 *
 * 2. *句法分析*获取标记并将它们重新格式化为
 * 描述语法的每个部分及其关系的表示
 * 彼此。这被称为中间表示或
 * 抽象语法树。
 *
 * 抽象语法树，简称 AST，是一个深度嵌套的对象，
 * 以一种既易于使用⼜能告诉我们很多信息的方式表示代码
 * 信息。
 *
 * 对于以下语法：
 *
 * (加 2 (减 4 2))
 *
 * 令牌可能看起来像这样：
 *
 * [
 *    <span class="token punctuation">{</span> type: &#39;paren&#39;, value: &#39;(&#39; <span class="token punctuation">}</span>,
 *    <span class="token punctuation">{</span> type: &#39;name&#39;, value: &#39;add&#39; <span class="token punctuation">}</span>,
 *    <span class="token punctuation">{</span> type: &#39;number&#39;, value: &#39;2&#39; <span class="token punctuation">}</span>,
 *    <span class="token punctuation">{</span> type: &#39;paren&#39;, value: &#39;(&#39; <span class="token punctuation">}</span>,
 *    <span class="token punctuation">{</span> type: &#39;name&#39;, value: &#39;subtract&#39; <span class="token punctuation">}</span>,
 *    <span class="token punctuation">{</span> type: &#39;number&#39;, value: &#39;4&#39; <span class="token punctuation">}</span>,
 *    <span class="token punctuation">{</span> type: &#39;number&#39;, value: &#39;2&#39; <span class="token punctuation">}</span>,
 *    <span class="token punctuation">{</span> type: &#39;paren&#39;, value: &#39;)&#39; <span class="token punctuation">}</span>,
 *    <span class="token punctuation">{</span> type: &#39;paren&#39;, value: &#39;)&#39; <span class="token punctuation">}</span>,
 * ]
 *
 * 抽象语法树 (AST) 可能如下所示：
 *
 * <span class="token punctuation">{</span>
 *    type: &#39;Program&#39;,
 *    body: [<span class="token punctuation">{</span>
 *        type: &#39;CallExpression&#39;,
 *        name: &#39;add&#39;,
 *        params: [<span class="token punctuation">{</span>
 *            type: &#39;NumberLiteral&#39;,
 *            value: &#39;2&#39;,
 *        <span class="token punctuation">}</span>, <span class="token punctuation">{</span>
 *            type: &#39;CallExpression&#39;,
 *            name: &#39;subtract&#39;,
 *            params: [<span class="token punctuation">{</span>
 *                type: &#39;NumberLiteral&#39;,
 *                value: &#39;4&#39;,
 *            <span class="token punctuation">}</span>, <span class="token punctuation">{</span>
 *                type: &#39;NumberLiteral&#39;,
 *                value: &#39;2&#39;,
 *            <span class="token punctuation">}</span>]
 *        <span class="token punctuation">}</span>]
 *      <span class="token punctuation">}</span>]
 * <span class="token punctuation">}</span>
 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 转换
 * --------------
 *
 * 编译器的下一个阶段是转换。再次，这只是
 * 从最后一步获取 AST 并对其进行更改。它可以操纵
 * 使用相同语⾔的 AST，或者它可以将其翻译成全新的
 * 语。
 *
 * 让我们看看如何转换 AST。
 *
 * 您可能会注意到我们的 AST 中的元素看起来非常相似。
 * 这些对象具有类型属性。这些中的每一个都被称为
 * AST 节点。这些节点在它们上定义了描述一个
 * 树的隔离部分。
 *
 * 我们可以有一个“NumberLiteral”的节点：
 *
* <span class="token punctuation">{</span>
 *    type: &#39;NumberLiteral&#39;,
 *    value: &#39;2&#39;,
 * <span class="token punctuation">}</span>
 *
 * Or maybe a node for a &quot;CallExpression&quot;:
 *
 * <span class="token punctuation">{</span>
 *      type: &#39;CallExpression&#39;,
 *      name: &#39;subtract&#39;,
 *      params: [...nested nodes go here...],
 * <span class="token punctuation">}</span>
 *
 * 转换 AST 时，我们可以通过以下方式操作节点
 * 添加/删除/替换属性，我们可以添加新节点，删除节点，或者
 * 我们可以不理会现有的 AST 并创建一个全新的基于
 * 在上面。
 *
 * 由于我们的目标是一种新语⾔，我们将专注于创建一个
 * 特定于目标语⾔的全新 AST。
 *
 * 遍历
 * ---------
 *
 * 为了浏览所有这些节点，我们需要能够
 * 遍历它们。这个遍历过程会到达 AST 中的每个节点
 * 深度优先。
 *
 * <span class="token punctuation">{</span>
 *    type: &#39;Program&#39;,
 *    body: [<span class="token punctuation">{</span>
 *      type: &#39;CallExpression&#39;,
 *      name: &#39;add&#39;,
 *      params: [<span class="token punctuation">{</span>
 *          type: &#39;NumberLiteral&#39;,
 *          value: &#39;2&#39;
 *      <span class="token punctuation">}</span>, <span class="token punctuation">{</span>
 *          type: &#39;CallExpression&#39;,
 *          name: &#39;subtract&#39;,
 *          params: [<span class="token punctuation">{</span>
 *              type: &#39;NumberLiteral&#39;,
 *              value: &#39;4&#39;
 *          <span class="token punctuation">}</span>, <span class="token punctuation">{</span>
 *              type: &#39;NumberLiteral&#39;,
 *              value: &#39;2&#39;
 *          <span class="token punctuation">}</span>]
 *      <span class="token punctuation">}</span>]
 *    <span class="token punctuation">}</span>]
 * <span class="token punctuation">}</span>
 *
 * 所以对于上面的 AST，我们会去：
 *
 * 1. Program - 从 AST 的顶层开始
 * 2. CallExpression (add) - 移动到程序主体的第一个元素
 * 3. NumberLiteral (2) - 移动到 CallExpression 参数的第一个元素
 * 4. CallExpression (subtract) - 移动到 CallExpression 参数的第二个元素
 * 5. NumberLiteral (4) - 移动到 CallExpression 参数的第一个元素
 * 6. NumberLiteral (2) - 移动到 CallExpression 参数的第二个元素
 *
 * 如果我们直接操作这个 AST，而不是创建一个单独的 AST，
 * 我们可能会在这里引入各种抽象。但只是参观
 * 树中的每个节点都以完成我们正在尝试做的事情。
 *
 * 我使用“访问”这个词的原因是因为有这样的模式
 * 表示对对象结构元素的操作。
*
 * Visitors
 * --------
 *
 * 这里的基本思想是我们将创建一个“访问者”对象，
 * 具有将接受不同节点类型的方法。
 *
 * var visitor = <span class="token punctuation">{</span>
 *    NumberLiteral() <span class="token punctuation">{</span><span class="token punctuation">}</span>,
 *    CallExpression() <span class="token punctuation">{</span><span class="token punctuation">}</span>,
 * <span class="token punctuation">}</span>;
 *
 * 当我们遍历我们的AST时，我们会任何时候调用这个访问者方法
 * 输入一个匹配类型的节点
 * 
 * 为了使它有用，我们还将传递节点和引用
 * 父节点
 * 
 * var visitor = <span class="token punctuation">{</span>
 *    NumberLiteral(node, parent) <span class="token punctuation">{</span><span class="token punctuation">}</span>,
 *    CallExpression(node, parent) <span class="token punctuation">{</span><span class="token punctuation">}</span>,
 * <span class="token punctuation">}</span>;
 *
 * 但是，也存在退出时调用事物的可能性。想象
 * 我们之前的树形结构以列表形式
 *
 * - Program
 *    - CallExpression
 *      - NumberLiteral
 *      - CallExpression
 *        - NumberLiteral
 *        - NumberLiteral
 *
 * 当我们向下遍历时，我们将到达死胡同的分支。正如我们完成我们“退出”它的树的每个分支。
 * 所以我们顺着树走“进入”每个节点，然后返回我们的“退出”
 *
 * -&gt; Program (enter)
 *    -&gt; CallExpression (enter)
 *        -&gt; Number Literal (enter)
 *        &lt;- Number Literal (exit)
 *        -&gt; Call Expression (enter)
 *            -&gt; Number Literal (enter)
 *            &lt;- Number Literal (exit)
 *            -&gt; Number Literal (enter)
 *            &lt;- Number Literal (exit)
 *        &lt;- CallExpression (exit)
 *     &lt;- CallExpression (exit)
 * &lt;- Program (exit)
 *
 * 为了支持这一点，我们的访问者的最终形式将如下所示
 *
 * var visitor = <span class="token punctuation">{</span>
 *    NumberLiteral: <span class="token punctuation">{</span>
 *        enter(node, parent) <span class="token punctuation">{</span><span class="token punctuation">}</span>,
 *        exit(node, parent) <span class="token punctuation">{</span><span class="token punctuation">}</span>,
 *    <span class="token punctuation">}</span>
 * <span class="token punctuation">}</span>;
 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 代码生成
 * ---------------
 *
 * 编译器的最后阶段是代码生成。有时编译器会做
 * 与转换重叠的东西，但大部分是代码
 * 生成只是意味着取出我们的 AST 和字符串化代码。
 *
 * 代码生成器有几种不同的工作方式，一些编译器会重用
 * 早期的令牌，其他⼈将创建一个单独的表示
 * 代码，以便他们可以线性打印节点，但据我所知
 * 将使用我们刚刚创建的相同 AST，这是我们将重点关注的内容。
 *
 * 实际上，我们的代码生成器将知道如何“打印”所有不同的
 * AST的节点类型，它会递归调用自己打印嵌套
 * 节点，直到所有内容都打印成一长串代码。
 */</span>

<span class="token doc-comment comment">/**
 *就是这样！这就是编译器的所有不同部分。
 *
 * 现在这并不是说每个编译器看起来都和我在这里描述的完全一样。
 * 编译器有许多不同的用途，它们可能需要更多的步骤
 * 我有详细的。
 *
 * 但是现在您应该对大多数编译器的外观有一个大致的高级概念
 * 喜欢。
 *
 * 现在我已经解释了所有这些，你们都可以自己写了
 * 编译器对吗？
 *
 * 开个玩笑，这就是我来帮忙的：P
 *
 * 那么让我们开始吧...
 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="词法分析" tabindex="-1"><a class="header-anchor" href="#词法分析" aria-hidden="true">#</a> 词法分析</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">tokenizer</span><span class="token punctuation">(</span><span class="token parameter">input</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> current <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

  <span class="token keyword">let</span> tokens <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token keyword">while</span><span class="token punctuation">(</span>current <span class="token operator">&lt;</span> input<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> char <span class="token operator">=</span> input<span class="token punctuation">[</span>current<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token comment">//左括号</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>char <span class="token operator">===</span> <span class="token string">&#39;(&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      tokens<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;paren&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;(&#39;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      current<span class="token operator">++</span>
      <span class="token keyword">continue</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//右括号</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>char <span class="token operator">===</span> <span class="token string">&#39;)&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      tokens<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;paren&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;)&#39;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
      current<span class="token operator">++</span>
      <span class="token keyword">continue</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//空白符</span>
    <span class="token keyword">let</span> <span class="token constant">WHITESPACE</span> <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\s</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token constant">WHITESPACE</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>char<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      current<span class="token operator">++</span>
      <span class="token keyword">continue</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//数字符</span>
    <span class="token keyword">let</span> <span class="token constant">NUMBERS</span> <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[0-9]</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token constant">NUMBERS</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>char<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> value <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
      <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token constant">NUMBERS</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>char<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        value <span class="token operator">+=</span> char
        char <span class="token operator">=</span> input<span class="token punctuation">[</span><span class="token operator">++</span>current<span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      token<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;number&#39;</span><span class="token punctuation">,</span> value<span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token keyword">continue</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//双引号符</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>char <span class="token operator">===</span> <span class="token string">&#39;&quot;&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> value <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
      char <span class="token operator">=</span> input<span class="token punctuation">[</span><span class="token operator">++</span>current<span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token keyword">while</span><span class="token punctuation">(</span>char <span class="token operator">!==</span> <span class="token string">&#39;&quot;&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        value <span class="token operator">+=</span> char<span class="token punctuation">;</span>
        char <span class="token operator">=</span> input<span class="token punctuation">[</span><span class="token operator">++</span>current<span class="token punctuation">]</span>
        tokens<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;string&#39;</span><span class="token punctuation">,</span> value<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">continue</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//字母符</span>
    <span class="token keyword">let</span> <span class="token constant">LETTERS</span> <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[a-z]</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token constant">LETTERS</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>char<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> value <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
      <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token constant">LETTERS</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>char<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        value <span class="token operator">+=</span> char<span class="token punctuation">;</span>
        char <span class="token operator">=</span> input<span class="token punctuation">[</span><span class="token operator">++</span>current<span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      tokens<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;name&#39;</span><span class="token punctuation">,</span> value<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">continue</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span><span class="token string">&#39;i dont know what this character is: &#39;</span> <span class="token operator">+</span> char<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> tokens<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="语法分析" tabindex="-1"><a class="header-anchor" href="#语法分析" aria-hidden="true">#</a> 语法分析</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">parser</span><span class="token punctuation">(</span><span class="token parameter">tokens</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> current <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

  <span class="token keyword">function</span> <span class="token function">walk</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> token <span class="token operator">=</span> tokens<span class="token punctuation">[</span>current<span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span><span class="token punctuation">(</span>token<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">&#39;number&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      current<span class="token operator">++</span><span class="token punctuation">;</span>

      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;NumberLiteral&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">value</span><span class="token operator">:</span> token<span class="token punctuation">.</span>value<span class="token punctuation">,</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span><span class="token punctuation">(</span>token<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">&#39;string&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      current<span class="token operator">++</span><span class="token punctuation">;</span>

      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;StringLiteral&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">value</span><span class="token operator">:</span> token<span class="token punctuation">.</span>value<span class="token punctuation">,</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>token<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">&#39;paren&#39;</span> <span class="token operator">&amp;&amp;</span> token<span class="token punctuation">.</span>value <span class="token operator">===</span> <span class="token string">&#39;(&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      token <span class="token operator">=</span> tokens<span class="token punctuation">[</span><span class="token operator">++</span>current<span class="token punctuation">]</span>

      <span class="token keyword">let</span> node <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;CallExpression&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> token<span class="token punctuation">.</span>value<span class="token punctuation">,</span>
        <span class="token literal-property property">params</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span>

      token <span class="token operator">=</span> tokens<span class="token punctuation">[</span><span class="token operator">++</span>current<span class="token punctuation">]</span><span class="token punctuation">;</span>

      <span class="token keyword">while</span><span class="token punctuation">(</span>token<span class="token punctuation">.</span>type <span class="token operator">!==</span> <span class="token string">&#39;paren&#39;</span> <span class="token operator">||</span> <span class="token punctuation">(</span>token<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">&#39;paren&#39;</span> <span class="token operator">&amp;&amp;</span> token<span class="token punctuation">.</span>value <span class="token operator">!==</span> <span class="token string">&#39;)&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        node<span class="token punctuation">.</span>params<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token function">walk</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        token <span class="token operator">=</span> tokens<span class="token punctuation">[</span>current<span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
      current<span class="token operator">++</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> node<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span>token<span class="token punctuation">.</span>type<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">let</span> ast <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Program&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">body</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">while</span><span class="token punctuation">(</span>current <span class="token operator">&lt;</span> tokens<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ast<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token function">walk</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> ast
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="代码转换" tabindex="-1"><a class="header-anchor" href="#代码转换" aria-hidden="true">#</a> 代码转换</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//原始ast</span>
<span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Program&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">body</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;CallExpression&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;add&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">params</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;NumberLiteral&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;2&#39;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;CallExpression&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;subtract&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">params</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;NumberLiteral&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;4&#39;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;NumberLiteral&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;4&#39;</span>
      <span class="token punctuation">}</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment">///transformed ast</span>
<span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Program&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">body</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;ExpressionStatemen&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">expression</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;CallExpression&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">callee</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Identifier&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;add&#39;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token literal-property property">arguments</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;NumberLiteral&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;2&#39;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;CallExpression&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">callee</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Identifier&#39;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;subtract&#39;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">arguments</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
          <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;NumberLiteral&#39;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;4&#39;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;NumberLiteral&#39;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;2&#39;</span>
        <span class="token punctuation">}</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//遍历ast</span>
<span class="token keyword">function</span> <span class="token function">traverser</span><span class="token punctuation">(</span><span class="token parameter">ast<span class="token punctuation">,</span> visitor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">function</span> <span class="token function">traverseArray</span><span class="token punctuation">(</span><span class="token parameter">array<span class="token punctuation">,</span> parent</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    array<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">child</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">traverseNode</span><span class="token punctuation">(</span>child<span class="token punctuation">,</span> parent<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">function</span> <span class="token function">traverseNode</span><span class="token punctuation">(</span><span class="token parameter">node<span class="token punctuation">,</span> parent</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> methods <span class="token operator">=</span> visitor<span class="token punctuation">[</span>node<span class="token punctuation">.</span>type<span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span><span class="token punctuation">(</span>methods <span class="token operator">&amp;&amp;</span> methods<span class="token punctuation">.</span>enter<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      methods<span class="token punctuation">.</span><span class="token function">enter</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> parent<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">switch</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> <span class="token string">&#39;Program&#39;</span><span class="token operator">:</span>
        <span class="token function">traverseArray</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>body<span class="token punctuation">,</span> node<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token keyword">case</span> <span class="token string">&#39;CallExpression&#39;</span><span class="token operator">:</span>
        <span class="token function">traverseArray</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>params<span class="token punctuation">,</span> node<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token keyword">case</span> <span class="token string">&#39;NumberLiteral&#39;</span><span class="token operator">:</span>
      <span class="token keyword">case</span> <span class="token string">&#39;StringLiteral&#39;</span><span class="token operator">:</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token keyword">default</span><span class="token operator">:</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>type<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>methods <span class="token operator">&amp;&amp;</span> methods<span class="token punctuation">.</span>exit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      methods<span class="token punctuation">.</span><span class="token function">exit</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> parent<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token function">traverseNode</span><span class="token punctuation">(</span>ast<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">transformer</span><span class="token punctuation">(</span><span class="token parameter">ast</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> newAst <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Program&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">body</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>

  ast<span class="token punctuation">.</span>_context <span class="token operator">=</span> newAst<span class="token punctuation">.</span>body<span class="token punctuation">;</span>

  <span class="token function">traverser</span><span class="token punctuation">(</span>ast<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">NumberLiteral</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function">enter</span><span class="token punctuation">(</span><span class="token parameter">node<span class="token punctuation">,</span> parent</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        parent<span class="token punctuation">.</span>_context<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;NumberLiteral&#39;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">value</span><span class="token operator">:</span> node<span class="token punctuation">.</span>value<span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">StringLiteral</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function">enter</span><span class="token punctuation">(</span><span class="token parameter">node<span class="token punctuation">,</span> parent</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        parent<span class="token punctuation">.</span>_context<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;StringLiteral&#39;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">value</span><span class="token operator">:</span> node<span class="token punctuation">.</span>value<span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">CallExpression</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function">enter</span><span class="token punctuation">(</span><span class="token parameter">node<span class="token punctuation">,</span> parent</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> expression <span class="token operator">=</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;CallExpression&#39;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">callee</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Identifier&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> node<span class="token punctuation">.</span>name<span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token literal-property property">arguments</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
        node<span class="token punctuation">.</span>_context <span class="token operator">=</span> expression<span class="token punctuation">.</span>arguments<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>parent<span class="token punctuation">.</span>type <span class="token operator">!==</span> <span class="token string">&#39;CallExpression&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          expression <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;ExpressionStatement&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">expression</span><span class="token operator">:</span> expression<span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        parent<span class="token punctuation">.</span>_context<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>expression<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> newAst
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="代码生成" tabindex="-1"><a class="header-anchor" href="#代码生成" aria-hidden="true">#</a> 代码生成</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">codeGenerator</span><span class="token punctuation">(</span><span class="token parameter">node</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">&#39;Program&#39;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> node<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>codeGenerator<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&#39;\\n&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token string">&#39;ExpressionStatement&#39;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token function">codeGenerator</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>expression<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&#39;;&#39;</span> <span class="token comment">// &lt;&lt; (...because we like tocode the *correct* way)</span>
      <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token string">&#39;CallExpression&#39;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> <span class="token function">codeGenerator</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>callee<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&#39;(&#39;</span> <span class="token operator">+</span> node<span class="token punctuation">.</span>arguments<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>codeGenerator<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&#39;, &#39;</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&#39;)&#39;</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token string">&#39;Identifier&#39;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> node<span class="token punctuation">.</span>name<span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token string">&#39;NumberLiteral&#39;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> node<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token string">&#39;StringLiteral&#39;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> <span class="token string">&#39;&quot;&#39;</span> <span class="token operator">+</span> node<span class="token punctuation">.</span>value <span class="token operator">+</span> <span class="token string">&#39;&quot;&#39;</span><span class="token punctuation">;</span>

    <span class="token keyword">default</span><span class="token operator">:</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>type<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="完整流程" tabindex="-1"><a class="header-anchor" href="#完整流程" aria-hidden="true">#</a> 完整流程</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 *
 * 1. input =&gt; tokenizer =&gt; tokens
 * 2. tokens =&gt; parser =&gt; ast
 * 3. ast =&gt; transformer =&gt; newAst
 * 4. newAst =&gt; generator =&gt; output
 */</span>
<span class="token keyword">function</span> <span class="token function">compiler</span><span class="token punctuation">(</span><span class="token parameter">input</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> tokens <span class="token operator">=</span> <span class="token function">tokenizer</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> ast <span class="token operator">=</span> <span class="token function">parser</span><span class="token punctuation">(</span>tokens<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> newAst <span class="token operator">=</span> <span class="token function">transformer</span><span class="token punctuation">(</span>ast<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> output <span class="token operator">=</span> <span class="token function">codeGenerator</span><span class="token punctuation">(</span>newAst<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> output<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>`,52),u={href:"https://github.com/jamiebuilds/the-super-tiny-compiler",target:"_blank",rel:"noopener noreferrer"},d={href:"https://github.com/jacksplwxy/JavaScript-compiler",target:"_blank",rel:"noopener noreferrer"};function v(k,m){const s=t("ExternalLinkIcon");return i(),l("div",null,[r,n("ul",null,[n("li",null,[n("a",u,[a("the super tiny complier"),e(s)])]),n("li",null,[n("a",d,[a("Javascript complier"),e(s)])])])])}const y=p(c,[["render",v],["__file","9.html.vue"]]);export{y as default};
