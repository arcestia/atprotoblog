import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  useLoaderData
} from "/build/_shared/chunk-UE2T33M3.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  createHotContext
} from "/build/_shared/chunk-5JT7EZ26.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import "/build/_shared/chunk-7M6SC7J5.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// src/app/routes/_index.tsx
var import_node = __toESM(require_node(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"src\\\\app\\\\routes\\\\_index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "src\\app\\routes\\_index.tsx"
  );
  import.meta.hot.lastModified = "1731649604524.3572";
}
var meta = () => {
  return [{
    title: "It's Skiddle! \u{1F44B}"
  }, {
    name: "description",
    content: "bluesky, generative artwork, machine learning, decentralized social media"
  }];
};
function Index() {
  _s();
  const {
    posts,
    profile
  } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container flex flex-col mx-auto pt-10 md:pt-20 pb-20 gap-10", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-col text-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col md:flex-row justify-center items-center gap-4 md:gap-20 pb-4 md:pb-8", children: [
        profile ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { className: "rounded-full w-32 h-32", src: profile.avatar, alt: "Skiddle's avatar" }, void 0, false, {
          fileName: "src/app/routes/_index.tsx",
          lineNumber: 56,
          columnNumber: 22
        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-32 h-32 bg-gray-300 rounded-full" }, void 0, false, {
          fileName: "src/app/routes/_index.tsx",
          lineNumber: 56,
          columnNumber: 111
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-5xl md:text-6xl font-bold", children: "It's Skiddle! \u{1F44B}" }, void 0, false, {
          fileName: "src/app/routes/_index.tsx",
          lineNumber: 57,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "src/app/routes/_index.tsx",
        lineNumber: 55,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-2xl text-300", children: "javascript, ATProto, decentralized social media" }, void 0, false, {
        fileName: "src/app/routes/_index.tsx",
        lineNumber: 59,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "src/app/routes/_index.tsx",
      lineNumber: 54,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-3xl font-bold", children: "blog posts" }, void 0, false, {
        fileName: "src/app/routes/_index.tsx",
        lineNumber: 62,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "list-none", children: posts?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((post) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PostItem, { post }, post.rkey, false, {
        fileName: "src/app/routes/_index.tsx",
        lineNumber: 64,
        columnNumber: 113
      }, this)) }, void 0, false, {
        fileName: "src/app/routes/_index.tsx",
        lineNumber: 63,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "src/app/routes/_index.tsx",
      lineNumber: 61,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "src/app/routes/_index.tsx",
    lineNumber: 53,
    columnNumber: 10
  }, this);
}
_s(Index, "RathzISvtlwTQfT1Mv4jL9VMfJ4=", false, function() {
  return [useLoaderData];
});
_c = Index;
function PostItem({
  post
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
      new Date(post.createdAt).toLocaleDateString("en-US", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit"
      }),
      "\xA0\xA0\u2014\xA0\xA0"
    ] }, void 0, true, {
      fileName: "src/app/routes/_index.tsx",
      lineNumber: 78,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { className: "font-bold hover:underline", href: `/posts/${post.rkey}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-xl", children: [
      " ",
      post.title
    ] }, void 0, true, {
      fileName: "src/app/routes/_index.tsx",
      lineNumber: 87,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "src/app/routes/_index.tsx",
      lineNumber: 86,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "src/app/routes/_index.tsx",
    lineNumber: 77,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "src/app/routes/_index.tsx",
    lineNumber: 76,
    columnNumber: 10
  }, this);
}
_c2 = PostItem;
var _c;
var _c2;
$RefreshReg$(_c, "Index");
$RefreshReg$(_c2, "PostItem");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Index as default,
  meta
};
//# sourceMappingURL=/build/routes/_index-VR457REL.js.map
