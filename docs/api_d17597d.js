define('docs/api.md', function(require, exports, module) {

  module.exports = {
    "title": "动态数据",
    "html": "<p>除了渲染静态页面及表单，amis 还能渲染动态数据，比如下面这个表格数据是来自 api 这个接口的请求</p>\n<pre><code class=\"lang-json\"><span class=\"token punctuation\">{</span>\n  <span class=\"token property\">\"type\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"crud\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"api\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\" http://xxx/api/sample\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"columns\"</span><span class=\"token operator\">:</span> <span class=\"token punctuation\">[</span>\n    <span class=\"token punctuation\">{</span>\n      <span class=\"token property\">\"name\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"engine\"</span><span class=\"token punctuation\">,</span>\n      <span class=\"token property\">\"label\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"引擎\"</span>\n    <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n    <span class=\"token punctuation\">{</span>\n      <span class=\"token property\">\"name\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"browser\"</span><span class=\"token punctuation\">,</span>\n      <span class=\"token property\">\"label\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"浏览器\"</span>\n    <span class=\"token punctuation\">}</span>\n  <span class=\"token punctuation\">]</span>\n<span class=\"token punctuation\">}</span>\n</code></pre>\n<p>amis 期望这个 api 接口返回的是如下的格式：</p>\n<pre><code class=\"lang-json\"><span class=\"token punctuation\">{</span>\n  <span class=\"token property\">\"status\"</span><span class=\"token operator\">:</span> <span class=\"token number\">0</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"msg\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"data\"</span><span class=\"token operator\">:</span> <span class=\"token punctuation\">{</span>\n    <span class=\"token property\">\"items\"</span><span class=\"token operator\">:</span> <span class=\"token punctuation\">[</span>\n      <span class=\"token punctuation\">{</span>\n        <span class=\"token property\">\"engine\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"Trident\"</span><span class=\"token punctuation\">,</span>\n        <span class=\"token property\">\"browser\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"IE 9\"</span>\n      <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n      <span class=\"token punctuation\">{</span>\n        <span class=\"token property\">\"engine\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"Gecko\"</span><span class=\"token punctuation\">,</span>\n        <span class=\"token property\">\"browser\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"Firefox 70\"</span>\n      <span class=\"token punctuation\">}</span>\n    <span class=\"token punctuation\">]</span>\n  <span class=\"token punctuation\">}</span>\n<span class=\"token punctuation\">}</span>\n</code></pre>\n<p>下面是具体介绍</p>\n<h3><a class=\"anchor\" name=\"%E6%95%B4%E4%BD%93%E6%A0%BC%E5%BC%8F\" href=\"#%E6%95%B4%E4%BD%93%E6%A0%BC%E5%BC%8F\" aria-hidden=\"true\"><svg aria-hidden=\"true\" class=\"octicon octicon-link\" height=\"16\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"16\"><path d=\"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z\"></path></svg></a>整体格式</h3><p>要求每个接口都返回 <code>status</code> 字段用来表示成功还是失败，如果失败了，通过 <code>msg</code> 字段来说明失败原因。当然如果成功 <code>msg</code> 也可以用来设置提示信息。</p>\n<pre><code class=\"lang-json\"><span class=\"token punctuation\">{</span>\n  <span class=\"token property\">\"status\"</span><span class=\"token operator\">:</span> <span class=\"token number\">0</span><span class=\"token punctuation\">,</span> <span class=\"token comment\">// 0 表示成功，非0 表示失败</span>\n  <span class=\"token property\">\"msg\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"\"</span><span class=\"token punctuation\">,</span> <span class=\"token comment\">// 提示信息 包括失败和成功</span>\n  <span class=\"token property\">\"data\"</span><span class=\"token operator\">:</span> <span class=\"token punctuation\">{</span>\n    <span class=\"token comment\">// ...</span>\n    <span class=\"token comment\">// 具体的数据</span>\n  <span class=\"token punctuation\">}</span>\n<span class=\"token punctuation\">}</span>\n</code></pre>\n<p>如果你的系统有自己的规范，可以在 fetcher 统一进行适配，如：</p>\n<pre><code class=\"lang-js\"><span class=\"token punctuation\">{</span>\n  <span class=\"token function\">renderAmis</span><span class=\"token punctuation\">(</span>\n    <span class=\"token punctuation\">{</span>\n      <span class=\"token comment\">// 这里是 amis 的 Json 配置。</span>\n      type<span class=\"token operator\">:</span> <span class=\"token string\">'page'</span><span class=\"token punctuation\">,</span>\n      title<span class=\"token operator\">:</span> <span class=\"token string\">'简单页面'</span><span class=\"token punctuation\">,</span>\n      body<span class=\"token operator\">:</span> <span class=\"token string\">'内容'</span>\n    <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n    <span class=\"token punctuation\">{</span>\n      <span class=\"token comment\">// props</span>\n    <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n    <span class=\"token punctuation\">{</span>\n      <span class=\"token comment\">// 忽略别的设置项</span>\n      <span class=\"token function-variable function\">fetcher</span><span class=\"token operator\">:</span> <span class=\"token keyword\">function</span> <span class=\"token punctuation\">(</span><span class=\"token parameter\">api</span><span class=\"token punctuation\">)</span> <span class=\"token punctuation\">{</span>\n        <span class=\"token comment\">// 适配这种格式 {\"code\": 0, \"message\": \"\", \"result\": {}}</span>\n        <span class=\"token keyword\">return</span> <span class=\"token function\">axios</span><span class=\"token punctuation\">(</span>config<span class=\"token punctuation\">)</span><span class=\"token punctuation\">.</span><span class=\"token function\">then</span><span class=\"token punctuation\">(</span><span class=\"token parameter\">response</span> <span class=\"token operator\">=></span> <span class=\"token punctuation\">{</span>\n          <span class=\"token keyword\">let</span> payload <span class=\"token operator\">=</span> <span class=\"token punctuation\">{</span>\n            status<span class=\"token operator\">:</span> response<span class=\"token punctuation\">.</span>data<span class=\"token punctuation\">.</span>code<span class=\"token punctuation\">,</span>\n            msg<span class=\"token operator\">:</span> response<span class=\"token punctuation\">.</span>data<span class=\"token punctuation\">.</span>message<span class=\"token punctuation\">,</span>\n            data<span class=\"token operator\">:</span> response<span class=\"token punctuation\">.</span>data<span class=\"token punctuation\">.</span>result\n          <span class=\"token punctuation\">}</span><span class=\"token punctuation\">;</span>\n\n          <span class=\"token keyword\">return</span> <span class=\"token punctuation\">{</span>\n            <span class=\"token operator\">...</span>response<span class=\"token punctuation\">,</span>\n            data<span class=\"token operator\">:</span> payload\n          <span class=\"token punctuation\">}</span><span class=\"token punctuation\">;</span>\n        <span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n      <span class=\"token punctuation\">}</span>\n    <span class=\"token punctuation\">}</span>\n  <span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n<span class=\"token punctuation\">}</span>\n</code></pre>\n<h3><a class=\"anchor\" name=\"%E5%85%B7%E4%BD%93%E8%A6%81%E6%B1%82\" href=\"#%E5%85%B7%E4%BD%93%E8%A6%81%E6%B1%82\" aria-hidden=\"true\"><svg aria-hidden=\"true\" class=\"octicon octicon-link\" height=\"16\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"16\"><path d=\"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z\"></path></svg></a>具体要求</h3><p>每个渲染的接口返回都有自己的格式要求，主要体现在 data 字段内部，具体请参考每个渲染的接口说明。</p>\n<ul>\n<li><a href=\"/amis/docs/renderers/Page#接口说明\">Page</a></li>\n<li><a href=\"/amis/docs/renderers/CRUD#接口说明\">CRUD</a></li>\n<li><a href=\"/amis/docs/renderers/Form/Form#接口说明\">Form</a><ul>\n<li><a href=\"/amis/docs/renderers/Form/Select#接口说明\">Select</a></li>\n<li><a href=\"/amis/docs/renderers/Form/Checkboxes#接口说明\">Checkboxes</a></li>\n<li><a href=\"/amis/docs/renderers/Form/Radios#接口说明\">Radios</a></li>\n<li><a href=\"/amis/docs/renderers/Form/List#接口说明\">List</a></li>\n</ul>\n</li>\n<li><a href=\"/amis/docs/renderers/Wizard#接口说明\">Wizard</a></li>\n</ul>\n<p><code>TBD</code></p>\n\n\n<div class=\"m-t-lg b-l b-info b-3x wrapper bg-light dk\">文档内容有误？欢迎大家一起来编写，文档地址：<i class=\"fa fa-github\"></i><a href=\"https://github.com/baidu/amis/tree/master/docs/api.md\">/docs/api.md</a>。</div>",
    "toc": {
      "label": "目录",
      "type": "toc",
      "children": [
        {
          "label": "整体格式",
          "fragment": "%E6%95%B4%E4%BD%93%E6%A0%BC%E5%BC%8F",
          "fullPath": "#%E6%95%B4%E4%BD%93%E6%A0%BC%E5%BC%8F",
          "level": 3
        },
        {
          "label": "具体要求",
          "fragment": "%E5%85%B7%E4%BD%93%E8%A6%81%E6%B1%82",
          "fullPath": "#%E5%85%B7%E4%BD%93%E8%A6%81%E6%B1%82",
          "level": 3
        }
      ],
      "level": 0
    }
  };

});