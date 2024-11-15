import {
  FontAwesomeIcon,
  faArrowRight,
  faBluesky,
  faGithub
} from "/build/_shared/chunk-XYTWFRTD.js";
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

// src/app/routes/contact.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"src\\\\app\\\\routes\\\\contact.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "src\\app\\routes\\contact.tsx"
  );
  import.meta.hot.lastModified = "1731662823221.451";
}
var meta = () => {
  return [{
    title: "Contact | Skiddle's Blog"
  }, {
    name: "description",
    content: "Get in touch with me through various social platforms and communication channels."
  }];
};
function Contact() {
  const contactMethods = [{
    name: "Bluesky",
    username: "@skiddle.id",
    url: "https://bsky.app/profile/skiddle.id",
    icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FontAwesomeIcon, { icon: faBluesky, className: "text-2xl" }, void 0, false, {
      fileName: "src/app/routes/contact.tsx",
      lineNumber: 38,
      columnNumber: 11
    }, this)
  }, {
    name: "GitHub",
    username: "@arcestia",
    url: "https://github.com/arcestia",
    icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FontAwesomeIcon, { icon: faGithub, className: "text-2xl" }, void 0, false, {
      fileName: "src/app/routes/contact.tsx",
      lineNumber: 43,
      columnNumber: 11
    }, this)
  }];
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container mx-auto px-4 py-12", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-2xl mx-auto", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-4xl font-bold text-primary mb-8", children: "Get in Touch" }, void 0, false, {
      fileName: "src/app/routes/contact.tsx",
      lineNumber: 47,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-lg text-primary mb-8", children: "I'm always interested in connecting with fellow developers, technology enthusiasts, and anyone interested in decentralized social media. Feel free to reach out through any of the platforms below." }, void 0, false, {
      fileName: "src/app/routes/contact.tsx",
      lineNumber: 49,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-6", children: contactMethods.map((method) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: method.url, target: "_blank", rel: "noopener noreferrer", className: "flex items-center p-4 bg-tertiary rounded-lg hover:bg-secondary transition-colors duration-200", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mr-4 text-primary", children: method.icon }, void 0, false, {
        fileName: "src/app/routes/contact.tsx",
        lineNumber: 57,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-xl font-semibold text-primary", children: method.name }, void 0, false, {
          fileName: "src/app/routes/contact.tsx",
          lineNumber: 59,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-secondary", children: method.username }, void 0, false, {
          fileName: "src/app/routes/contact.tsx",
          lineNumber: 60,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "src/app/routes/contact.tsx",
        lineNumber: 58,
        columnNumber: 15
      }, this)
    ] }, method.name, true, {
      fileName: "src/app/routes/contact.tsx",
      lineNumber: 56,
      columnNumber: 41
    }, this)) }, void 0, false, {
      fileName: "src/app/routes/contact.tsx",
      lineNumber: 55,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-12 p-6 bg-tertiary rounded-lg", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-2xl font-bold text-primary mb-4", children: "Open Source" }, void 0, false, {
        fileName: "src/app/routes/contact.tsx",
        lineNumber: 66,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-primary mb-4", children: "Interested in contributing to my projects? Check out my repositories on GitHub and feel free to open issues or submit pull requests." }, void 0, false, {
        fileName: "src/app/routes/contact.tsx",
        lineNumber: 67,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "https://github.com/arcestia/atprotoblog", target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center accent-blue hover-text-purple transition-colors", children: [
        "View ATProtoBlog Repository",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FontAwesomeIcon, { icon: faArrowRight, className: "ml-2" }, void 0, false, {
          fileName: "src/app/routes/contact.tsx",
          lineNumber: 73,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "src/app/routes/contact.tsx",
        lineNumber: 71,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "src/app/routes/contact.tsx",
      lineNumber: 65,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "src/app/routes/contact.tsx",
    lineNumber: 46,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "src/app/routes/contact.tsx",
    lineNumber: 45,
    columnNumber: 10
  }, this);
}
_c = Contact;
var _c;
$RefreshReg$(_c, "Contact");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Contact as default,
  meta
};
//# sourceMappingURL=/build/routes/contact-WYIGYHLU.js.map
