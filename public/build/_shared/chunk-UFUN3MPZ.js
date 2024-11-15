import {
  createHotContext
} from "/build/_shared/chunk-5JT7EZ26.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// src/app/components/link.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"src\\\\app\\\\components\\\\link.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "src\\app\\components\\link.tsx"
  );
  import.meta.hot.lastModified = "1731649604523.3564";
}
function Link({
  href,
  children
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { className: "text-500 underline", href, children }, void 0, false, {
    fileName: "src/app/components/link.tsx",
    lineNumber: 26,
    columnNumber: 10
  }, this);
}
_c = Link;
var _c;
$RefreshReg$(_c, "Link");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

export {
  Link
};
//# sourceMappingURL=/build/_shared/chunk-UFUN3MPZ.js.map
