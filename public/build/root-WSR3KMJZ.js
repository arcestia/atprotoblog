import {
  Link
} from "/build/_shared/chunk-UFUN3MPZ.js";
import {
  FontAwesomeIcon,
  faBluesky,
  faGithub,
  faMoon,
  faSun
} from "/build/_shared/chunk-XYTWFRTD.js";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useRouteError
} from "/build/_shared/chunk-UE2T33M3.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  createHotContext
} from "/build/_shared/chunk-5JT7EZ26.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// src/app/tailwind.css?url
var tailwind_default = "/build/_assets/tailwind-3RUDOYK3.css?url";

// src/app/styles/theme.css?url
var theme_default = "/build/_assets/theme-24V2WU6K.css?url";

// src/app/components/theme-switcher.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"src\\\\app\\\\components\\\\theme-switcher.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "src\\app\\components\\theme-switcher.tsx"
  );
  import.meta.hot.lastModified = "1731662803561.3118";
}
var ThemeSwitcher = () => {
  _s();
  const [theme, setTheme] = (0, import_react.useState)("light");
  const [mounted, setMounted] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (systemPrefersDark) {
      setTheme("dark");
    }
  }, []);
  (0, import_react.useEffect)(() => {
    if (!mounted)
      return;
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);
  const toggleTheme = () => {
    setTheme((prevTheme) => prevTheme === "light" ? "dark" : "light");
  };
  if (!mounted)
    return null;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: toggleTheme, className: "\n        relative p-2 rounded-lg text-secondary\n        bg-tertiary hover:bg-accent-blue/10\n        dark:bg-secondary dark:hover:bg-accent-blue/10\n        focus:outline-none focus:ring-2 focus:ring-accent-blue/50\n        transition-colors duration-200\n      ", "aria-label": `Switch to ${theme === "light" ? "dark" : "light"} theme`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-6 h-6 relative flex items-center justify-center", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FontAwesomeIcon, { icon: faSun, className: `
            text-lg absolute
            transition-all duration-300 ease-in-out
            ${theme === "dark" ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}
          ` }, void 0, false, {
      fileName: "src/app/components/theme-switcher.tsx",
      lineNumber: 60,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FontAwesomeIcon, { icon: faMoon, className: `
            text-lg absolute
            transition-all duration-300 ease-in-out
            ${theme === "light" ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}
          ` }, void 0, false, {
      fileName: "src/app/components/theme-switcher.tsx",
      lineNumber: 65,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "src/app/components/theme-switcher.tsx",
    lineNumber: 59,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "src/app/components/theme-switcher.tsx",
    lineNumber: 52,
    columnNumber: 10
  }, this);
};
_s(ThemeSwitcher, "irO646EbSVqPL90dedilwyEs6oc=");
_c = ThemeSwitcher;
var _c;
$RefreshReg$(_c, "ThemeSwitcher");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// src/app/root.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"src\\\\app\\\\root.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s2 = $RefreshSig$();
var _s22 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "src\\app\\root.tsx"
  );
}
var links = () => [{
  rel: "stylesheet",
  href: tailwind_default
}, {
  rel: "stylesheet",
  href: theme_default
}, {
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossorigin: true
}, {
  href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
  rel: "stylesheet"
}];
var themeScript = `
  let theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.classList.toggle('dark', theme === 'dark');
`;
function Layout({
  children
}) {
  _s2();
  const location = useLocation();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("html", { lang: "en", className: "antialiased", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("meta", { charSet: "utf-8" }, void 0, false, {
        fileName: "src/app/root.tsx",
        lineNumber: 58,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }, void 0, false, {
        fileName: "src/app/root.tsx",
        lineNumber: 59,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Meta, {}, void 0, false, {
        fileName: "src/app/root.tsx",
        lineNumber: 60,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Links, {}, void 0, false, {
        fileName: "src/app/root.tsx",
        lineNumber: 61,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("script", { dangerouslySetInnerHTML: {
        __html: themeScript
      } }, void 0, false, {
        fileName: "src/app/root.tsx",
        lineNumber: 62,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "src/app/root.tsx",
      lineNumber: 57,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("body", { className: "flex flex-col min-h-screen bg-main text-primary antialiased", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex-grow", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("header", { className: "sticky top-0 z-50 border-b border-light bg-header-blur", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "container mx-auto px-4 sm:px-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex justify-between items-center h-16", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("nav", { className: "flex items-center space-x-4 sm:space-x-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(NavLink, { href: "/", selected: location.pathname === "/", children: "Home" }, void 0, false, {
              fileName: "src/app/root.tsx",
              lineNumber: 72,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(NavLink, { href: "/about", selected: location.pathname === "/about", children: "About" }, void 0, false, {
              fileName: "src/app/root.tsx",
              lineNumber: 75,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(NavLink, { href: "/contact", selected: location.pathname === "/contact", children: "Contact" }, void 0, false, {
              fileName: "src/app/root.tsx",
              lineNumber: 78,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "src/app/root.tsx",
            lineNumber: 71,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(ThemeSwitcher, {}, void 0, false, {
            fileName: "src/app/root.tsx",
            lineNumber: 82,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "src/app/root.tsx",
          lineNumber: 70,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "src/app/root.tsx",
          lineNumber: 69,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "src/app/root.tsx",
          lineNumber: 68,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("main", { className: "container mx-auto px-4 sm:px-6 py-6 sm:py-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "bg-card rounded-lg border border-light p-4 sm:p-6", children }, void 0, false, {
          fileName: "src/app/root.tsx",
          lineNumber: 88,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "src/app/root.tsx",
          lineNumber: 87,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "src/app/root.tsx",
        lineNumber: 67,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("footer", { className: "mt-auto border-t border-light bg-footer", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "container mx-auto px-4 sm:px-6 py-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex items-center space-x-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("a", { href: "https://bsky.app/profile/skiddle.id", target: "_blank", rel: "noopener noreferrer", className: "text-secondary hover-text-blue transition-colors", "aria-label": "Bluesky Profile", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(FontAwesomeIcon, { icon: faBluesky, className: "text-xl" }, void 0, false, {
            fileName: "src/app/root.tsx",
            lineNumber: 100,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "src/app/root.tsx",
            lineNumber: 98,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("a", { href: "https://github.com/arcestia", target: "_blank", rel: "noopener noreferrer", className: "text-secondary hover-text-blue transition-colors", "aria-label": "GitHub Profile", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(FontAwesomeIcon, { icon: faGithub, className: "text-xl" }, void 0, false, {
            fileName: "src/app/root.tsx",
            lineNumber: 104,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "src/app/root.tsx",
            lineNumber: 102,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "src/app/root.tsx",
          lineNumber: 97,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { className: "text-secondary text-sm", children: [
          (/* @__PURE__ */ new Date()).getFullYear(),
          " ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("a", { href: "https://github.com/arcestia/atprotoblog", target: "_blank", rel: "noopener noreferrer", className: "accent-blue hover-text-purple transition-colors", children: "ATProtoBlog" }, void 0, false, {
            fileName: "src/app/root.tsx",
            lineNumber: 109,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "src/app/root.tsx",
          lineNumber: 107,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "src/app/root.tsx",
        lineNumber: 96,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "src/app/root.tsx",
        lineNumber: 95,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "src/app/root.tsx",
        lineNumber: 94,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(ScrollRestoration, {}, void 0, false, {
        fileName: "src/app/root.tsx",
        lineNumber: 118,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Scripts, {}, void 0, false, {
        fileName: "src/app/root.tsx",
        lineNumber: 119,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "src/app/root.tsx",
      lineNumber: 66,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "src/app/root.tsx",
    lineNumber: 56,
    columnNumber: 10
  }, this);
}
_s2(Layout, "pkHmaVRPskBaU4tMJuJJpV42k1I=", false, function() {
  return [useLocation];
});
_c2 = Layout;
function App() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Outlet, {}, void 0, false, {
    fileName: "src/app/root.tsx",
    lineNumber: 128,
    columnNumber: 10
  }, this);
}
_c22 = App;
function NavLink({
  href,
  selected,
  children
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Link, { href, className: `
        relative py-1 text-primary hover-text-blue
        transition-colors duration-200 font-medium
        ${selected ? "accent-blue" : ""}
        after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5
        after:bg-accent-blue after:scale-x-0 hover:after:scale-x-100
        after:transition-transform after:duration-200
        ${selected ? "after:scale-x-100" : ""}
      `, children }, void 0, false, {
    fileName: "src/app/root.tsx",
    lineNumber: 136,
    columnNumber: 10
  }, this);
}
_c3 = NavLink;
function ErrorBoundary() {
  _s22();
  const error = useRouteError();
  console.error(error);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("html", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("title", { children: "Oh no!" }, void 0, false, {
        fileName: "src/app/root.tsx",
        lineNumber: 156,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Meta, {}, void 0, false, {
        fileName: "src/app/root.tsx",
        lineNumber: 157,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Links, {}, void 0, false, {
        fileName: "src/app/root.tsx",
        lineNumber: 158,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "src/app/root.tsx",
      lineNumber: 155,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("body", { className: "bg-main text-primary", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex flex-col items-center justify-center min-h-screen p-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "max-w-md w-full space-y-4 text-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h1", { className: "text-4xl font-bold accent-red", children: "Oops!" }, void 0, false, {
          fileName: "src/app/root.tsx",
          lineNumber: 163,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { className: "text-lg text-secondary", children: "Something went wrong." }, void 0, false, {
          fileName: "src/app/root.tsx",
          lineNumber: 164,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Link, { href: "/", className: "inline-block px-4 py-2 rounded-lg bg-accent-blue hover:bg-accent-purple text-white transition-colors", children: "Go back home" }, void 0, false, {
          fileName: "src/app/root.tsx",
          lineNumber: 165,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "src/app/root.tsx",
        lineNumber: 162,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "src/app/root.tsx",
        lineNumber: 161,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Scripts, {}, void 0, false, {
        fileName: "src/app/root.tsx",
        lineNumber: 171,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "src/app/root.tsx",
      lineNumber: 160,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "src/app/root.tsx",
    lineNumber: 154,
    columnNumber: 10
  }, this);
}
_s22(ErrorBoundary, "oAgjgbJzsRXlB89+MoVumxMQqKM=", false, function() {
  return [useRouteError];
});
_c4 = ErrorBoundary;
var _c2;
var _c22;
var _c3;
var _c4;
$RefreshReg$(_c2, "Layout");
$RefreshReg$(_c22, "App");
$RefreshReg$(_c3, "NavLink");
$RefreshReg$(_c4, "ErrorBoundary");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  ErrorBoundary,
  Layout,
  App as default,
  links
};
//# sourceMappingURL=/build/root-WSR3KMJZ.js.map
