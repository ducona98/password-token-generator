import{w as o,q as i,p as t,M as c,L as l,S as u,t as d,O as m,i as h}from"./chunk-EPOLDU6W-Wp3N_t67.js";import{L as p}from"./LanguageContext-Cp_5wlyz.js";function g({children:s}){return t.jsxs("html",{lang:"en",className:"light",suppressHydrationWarning:!0,children:[t.jsxs("head",{children:[t.jsx("meta",{charSet:"utf-8"}),t.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),t.jsx(c,{}),t.jsx(l,{}),t.jsx("script",{dangerouslySetInnerHTML:{__html:`
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'light';
                  document.documentElement.classList.remove('light', 'dark');
                  document.documentElement.classList.add(theme);
                } catch (e) {}
              })();
            `}})]}),t.jsxs("body",{className:"antialiased",children:[t.jsx(p,{children:s}),t.jsx(u,{}),t.jsx(d,{})]})]})}const f=o(function(){return t.jsx(m,{})}),y=i(function({error:e}){let n="Oops!",a="An unexpected error occurred.",r;return h(e)&&(n=e.status===404?"404":"Error",a=e.status===404?"The requested page could not be found.":e.statusText||a),t.jsxs("main",{className:"pt-16 p-4 container mx-auto",children:[t.jsx("h1",{children:n}),t.jsx("p",{children:a}),r]})});export{y as ErrorBoundary,g as Layout,f as default};
