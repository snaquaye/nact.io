webpackJsonp([64463788176840],{388:function(n,s){n.exports={data:{allPostTitles:{edges:[{node:{frontmatter:{title:"Adapters",lesson:6,category:"reasonml",chapter:2,type:"lesson"},fields:{slug:"/adapters"}}},{node:{frontmatter:{title:"Decoders and Encoders",lesson:2,category:"reasonml",chapter:4,type:"lesson"},fields:{slug:"/decoders-and-encoders"}}},{node:{frontmatter:{title:"Hierarchy",lesson:4,category:"reasonml",chapter:2,type:"lesson"},fields:{slug:"/hierarchy"}}},{node:{frontmatter:{title:"Actor Communication",lesson:2,category:"reasonml",chapter:2,type:"lesson"},fields:{slug:"/actor-communication"}}},{node:{frontmatter:{title:"Getting Started",lesson:2,category:"reasonml",chapter:1,type:"lesson"},fields:{slug:"/getting-started"}}},{node:{frontmatter:{title:"Persist",lesson:1,category:"reasonml",chapter:3,type:"lesson"},fields:{slug:"/persist"}}},{node:{frontmatter:{title:"Snapshotting",lesson:2,category:"reasonml",chapter:3,type:"lesson"},fields:{slug:"/snapshotting"}}},{node:{frontmatter:{title:"Introduction",lesson:1,category:"reasonml",chapter:1,type:"lesson"},fields:{slug:"/introduction"}}},{node:{frontmatter:{title:"Stateful Actors",lesson:1,category:"reasonml",chapter:2,type:"lesson"},fields:{slug:"/stateful-actors"}}},{node:{frontmatter:{title:"Querying",lesson:3,category:"reasonml",chapter:2,type:"lesson"},fields:{slug:"/querying"}}},{node:{frontmatter:{title:"Timeouts",lesson:3,category:"reasonml",chapter:3,type:"lesson"},fields:{slug:"/timeouts"}}},{node:{frontmatter:{title:"Supervision",lesson:5,category:"reasonml",chapter:2,type:"lesson"},fields:{slug:"/supervision"}}}]},postBySlug:{html:'<h2 id="schema-evolution"><a href="#schema-evolution" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Schema evolution</h2>\n<p>Evolution is a natural part of a systems lifecycle; requirements change, reality sets in and bugs are fixed.\nAs a result, migrating data from one version to another is a normal part of running a system in production.</p>\n<p>One approach to schema evolution is running some kind of batch job which upgrades the old types to the new in-place.\nThis approach is not without its risks: if done without discipline, there is the chance of data loss and other unhappy happenstances. It also goes against the philosophy of data immutability. Another downside of this approach to migration is that due to  the behavior of stateful actors, an all or nothing migration would likely require downtime.  </p>\n<p>An alternative approach which fits in with the idea of event sourcing and immutable data is lazy upgrades between schema versions</p>\n<p>For example let us imagine we have versions <code>S</code><sub><code>1</code></sub>, <code>S</code><sub><code>2</code></sub> and <code>S</code><sub><code>3</code></sub> of a schema <code>S</code>. Messages <code>m</code><sub><code>1</code></sub> and <code>m</code><sub><code>2</code></sub> were persisted with <code>S</code><sub><code>1</code></sub>, while <code>m</code><sub><code>3</code></sub> was saved with <code>S</code><sub><code>2</code></sub>. We\'ve made a change and are forced to use <code>S</code><sub><code>3</code></sub> of the schema. When replaying messages, all we need to do is define two functions: <code>S</code><sub><code>1</code></sub><code>=></code> <code>S</code><sub><code>2</code></sub> and <code>S</code><sub><code>2</code></sub><code>=></code> <code>S</code><sub><code>3</code></sub>. We apply <code>S</code><sub><code>2</code></sub><code>=></code> <code>S</code><sub><code>3</code></sub> to <code>m</code><sub><code>3</code></sub> to upgrade it to latest version of the <code>S</code>. For <code>m</code><sub><code>2,3</code></sub> we map <code>S</code><sub><code>1</code></sub><code>=></code> <code>S</code><sub><code>2</code></sub> then map from <code>S</code><sub><code>2</code></sub><code>=></code> <code>S</code><sub><code>3</code></sub> to complete the upgrade. Being able to support this strategy was the first motivation for introducing decoders and encoders.</p>\n<h2 id="persistent-actors-and-json"><a href="#persistent-actors-and-json" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Persistent Actors and JSON</h2>\n<p>The <code>spawnPersistent</code> function includes a number of optional arguments, namely <code>~encoder</code>, <code>~stateEncoder</code>, <code>~decoder</code> and <code>~stateDecoder</code>. These functions decode <code>Js.Json.t</code> values into Reason types and encode Reason types into types of <code>Js.Json.t</code>. The decoders are well suited to performing schema evolution, while the encoders are useful for adding version information and creating a more stable persistent representation. </p>\n<blockquote>\n<p>Note: A second motivation for adding decoders and encoders is that Reason\'s runtime representation when serialized to JSON isn\'t very human readable nor stable. Variants for example, are currently represented by an arrays, and the variant tag is just a number which is set in the <code>tag</code> field on an array. This is problematic as JSON does not support associative arrays. Nact includes an <code>unsafeDecoder</code> and <code>unsafeEncoder</code>, which is set on the persistent actor by default to cater for this limitation. </p>\n</blockquote>\n<blockquote>\n<p>If you use a custom decoder/encoder, you should ensure that all variants are serialized correctly to avoid any nasty surprises. The <code>unsafeDecoder</code> and <code>unsafeEncoder</code> have been made available in the public API so as to allow for safe serialization if you only want to manually serialize a subset of information. The this <strong>unsafe</strong> encoder/decoder pair are so named because the functions are not stack safe and may result in a stack overflow if an object is too deeply nested. Long lists are a prime candidate for overflow as they are represented by nested arrays. You would be advised to as a rule to either use lists sparingly or explicitly encode a list as an array when persisting.</p>\n</blockquote>\n<h2 id="cracking-the-code"><a href="#cracking-the-code" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Cracking the Code</h2>\n<p>The <code>DaVinci_Decode</code> example below demonstrates how to deal with an enthusiastic but naïve coworker who a) thought that <a href="https://en.wikipedia.org/wiki/ROT13">ROT<sub>13</sub></a> was a good encryption scheme and b) applied it <strong>everywhere</strong>. </p>\n<p>In the example, version zero of the message protocol is ROT13 encoded and needs to be unscrambled before\nit is processed by the actor. Version one is encoded in plain text.</p>\n<div class="gatsby-highlight">\n      <pre class="language-reason"><code><span class="token comment" spellcheck="true">/* Rot13 code */</span>\n<span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token class-name">Char</span><span class="token punctuation">.</span>code<span class="token punctuation">(</span><span class="token character string">\'a\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">let</span> toPositionInAlphabet <span class="token operator">=</span> <span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token class-name">Char</span><span class="token punctuation">.</span>code<span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token operator">-</span> a<span class="token punctuation">;</span>\n\n<span class="token keyword">let</span> fromPositionInAlphabet <span class="token operator">=</span> <span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token class-name">Char</span><span class="token punctuation">.</span>unsafe_chr<span class="token punctuation">(</span>c <span class="token operator">+</span> a<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">let</span> rot13 <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span>map<span class="token punctuation">(</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>toPositionInAlphabet<span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">13</span><span class="token punctuation">)</span> <span class="token operator">mod</span> <span class="token number">26</span> <span class="token operator">|</span><span class="token operator">></span> fromPositionInAlphabet<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">type</span> msg <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">.</span> <span class="token string">"version"</span><span class="token punctuation">:</span> int<span class="token punctuation">,</span> <span class="token string">"text"</span><span class="token punctuation">:</span> string<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token comment" spellcheck="true">/* Encoders and Decoders */</span>\n<span class="token keyword">let</span> jsonDecoder <span class="token operator">=</span> <span class="token punctuation">(</span>json<span class="token punctuation">)</span> <span class="token operator">=></span>\n  <span class="token class-name">Json</span><span class="token punctuation">.</span><span class="token class-name">Decode</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">"version"</span><span class="token punctuation">:</span> json <span class="token operator">|</span><span class="token operator">></span> field<span class="token punctuation">(</span><span class="token string">"version"</span><span class="token punctuation">,</span> int<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"text"</span><span class="token punctuation">:</span> json <span class="token operator">|</span><span class="token operator">></span> field<span class="token punctuation">(</span><span class="token string">"text"</span><span class="token punctuation">,</span> string<span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">let</span> decoder <span class="token operator">=</span> <span class="token punctuation">(</span>json<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">let</span> msg <span class="token operator">=</span> json <span class="token operator">|</span><span class="token operator">></span> jsonDecoder<span class="token punctuation">;</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>msg<span class="token operator">#</span><span class="token operator">#</span>version <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    rot13<span class="token punctuation">(</span>msg<span class="token operator">#</span><span class="token operator">#</span>text<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n    msg<span class="token operator">#</span><span class="token operator">#</span>text\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">let</span> encoder <span class="token operator">=</span> <span class="token punctuation">(</span>msg<span class="token punctuation">)</span> <span class="token operator">=></span>\n  <span class="token class-name">Json</span><span class="token punctuation">.</span><span class="token class-name">Encode</span><span class="token punctuation">.</span><span class="token punctuation">(</span>object_<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token string">"version"</span><span class="token punctuation">,</span> int<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token string">"text"</span><span class="token punctuation">,</span> msg <span class="token operator">|</span><span class="token operator">></span> string<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">open</span> <span class="token constructor variable">Nact</span><span class="token punctuation">;</span>\n\n<span class="token comment" spellcheck="true">/* Specify a concrete persistence engine here */</span>\n<span class="token keyword">let</span> system <span class="token operator">=</span> start<span class="token punctuation">(</span><span class="token operator">~</span>persistenceEngine<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">let</span> actor <span class="token operator">=</span>\n  spawnPersistent<span class="token punctuation">(</span>\n    <span class="token operator">~</span>key<span class="token operator">=</span><span class="token string">"da-vinci-code"</span><span class="token punctuation">,</span>    \n    <span class="token comment" spellcheck="true">/* Decoder and encoder functions are specified here */</span>\n    <span class="token operator">~</span>decoder<span class="token punctuation">,</span>    \n    <span class="token operator">~</span>encoder<span class="token punctuation">,</span>\n    system<span class="token punctuation">,</span>\n    <span class="token punctuation">(</span>state<span class="token punctuation">,</span> msg<span class="token punctuation">,</span> ctx<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      <span class="token class-name">Js</span><span class="token punctuation">.</span>log<span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token keyword">let</span> nextState <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token class-name">Js</span><span class="token punctuation">.</span><span class="token class-name">Promise</span><span class="token punctuation">.</span>resolve<span class="token punctuation">(</span><span class="token punctuation">[</span>msg<span class="token punctuation">,</span> <span class="token operator">...</span>state<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span> ctx<span class="token punctuation">.</span>recovering<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        ctx<span class="token punctuation">.</span>persist<span class="token punctuation">(</span>msg<span class="token punctuation">)</span> <span class="token operator">|</span><span class="token operator">></span> <span class="token class-name">Js</span><span class="token punctuation">.</span><span class="token class-name">Promise</span><span class="token punctuation">.</span>then_<span class="token punctuation">(</span>nextState<span class="token punctuation">)</span>\n      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n        nextState<span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">[</span><span class="token punctuation">]</span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>',timeToRead:4,excerpt:"Schema evolution Evolution is a natural part of a systems lifecycle; requirements change, reality sets in and bugs are fixed. \nAs a result...",frontmatter:{title:"Decoders and Encoders",cover:"https://unsplash.it/400/300/?random?BoldMage",date:"28/01/2018",category:"reasonml",tags:["getting-started","nact","reason","bucklescript"]},fields:{slug:"/decoders-and-encoders"}}},pathContext:{slug:"/decoders-and-encoders",category:"reasonml"}}}});
//# sourceMappingURL=path---lesson-reasonml-decoders-and-encoders-9edbf9b7fba2b1bc4b9e.js.map