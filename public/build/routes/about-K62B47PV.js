import {
  FontAwesomeIcon,
  faCloud,
  faCode,
  faGithub,
  faGlobe,
  faJs,
  faNode,
  faPaintBrush,
  faReact,
  faUserShield
} from "/build/_shared/chunk-XYTWFRTD.js";
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

// src/app/routes/about.tsx
var import_node = __toESM(require_node(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"src\\\\app\\\\routes\\\\about.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "src\\app\\routes\\about.tsx"
  );
  import.meta.hot.lastModified = "1731662910951.519";
}
var meta = () => {
  return [{
    title: "About Me | Skiddle's Blog"
  }, {
    name: "description",
    content: "Learn more about me, my work, and my interests in technology and development."
  }];
};
function About() {
  _s();
  const {
    profile
  } = useLoaderData();
  const skills = [{
    name: "JavaScript/TypeScript",
    icon: faJs,
    color: "text-yellow-500"
  }, {
    name: "React",
    icon: faReact,
    color: "text-blue-400"
  }, {
    name: "Node.js",
    icon: faNode,
    color: "text-green-500"
  }, {
    name: "ATProtocol",
    icon: faCloud,
    color: "text-sky-500"
  }, {
    name: "Web Development",
    icon: faGlobe,
    color: "text-purple-500"
  }, {
    name: "Decentralized Systems",
    icon: faCode,
    color: "text-indigo-500"
  }];
  const interests = [{
    name: "Decentralized Social Networks",
    icon: faCloud,
    color: "text-blue-400"
  }, {
    name: "Open Source Development",
    icon: faGithub,
    color: "text-gray-500"
  }, {
    name: "Web Technologies",
    icon: faCode,
    color: "text-green-500"
  }, {
    name: "User Experience Design",
    icon: faPaintBrush,
    color: "text-pink-500"
  }, {
    name: "Digital Privacy & Security",
    icon: faUserShield,
    color: "text-red-500"
  }];
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container mx-auto px-4 py-12", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-3xl mx-auto", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col md:flex-row items-center md:items-start gap-8 mb-12", children: [
      profile?.avatar && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: profile.avatar, alt: "Profile", className: "w-40 h-40 rounded-full object-cover" }, void 0, false, {
        fileName: "src/app/routes/about.tsx",
        lineNumber: 97,
        columnNumber: 31
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-4xl font-bold text-primary mb-4", children: "About Me" }, void 0, false, {
          fileName: "src/app/routes/about.tsx",
          lineNumber: 99,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-xl text-primary mb-4", children: "Hi! I'm Skiddle, a passionate developer and technology enthusiast." }, void 0, false, {
          fileName: "src/app/routes/about.tsx",
          lineNumber: 100,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "src/app/routes/about.tsx",
        lineNumber: 98,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "src/app/routes/about.tsx",
      lineNumber: 96,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { className: "mb-12", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-2xl font-bold text-primary mb-4", children: "Background" }, void 0, false, {
        fileName: "src/app/routes/about.tsx",
        lineNumber: 107,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-lg text-primary mb-4", children: "I specialize in web development and decentralized technologies, with a particular focus on the ATProtocol ecosystem. My journey in tech has been driven by a desire to create meaningful and impactful solutions." }, void 0, false, {
        fileName: "src/app/routes/about.tsx",
        lineNumber: 108,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "src/app/routes/about.tsx",
      lineNumber: 106,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { className: "mb-12", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-2xl font-bold text-primary mb-4", children: "Skills & Expertise" }, void 0, false, {
        fileName: "src/app/routes/about.tsx",
        lineNumber: 116,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: skills.map((skill) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-tertiary text-primary p-4 rounded-lg flex items-center gap-3 hover:bg-secondary transition-colors duration-200", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FontAwesomeIcon, { icon: skill.icon, className: `text-xl ${skill.color}` }, void 0, false, {
          fileName: "src/app/routes/about.tsx",
          lineNumber: 119,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: skill.name }, void 0, false, {
          fileName: "src/app/routes/about.tsx",
          lineNumber: 120,
          columnNumber: 17
        }, this)
      ] }, skill.name, true, {
        fileName: "src/app/routes/about.tsx",
        lineNumber: 118,
        columnNumber: 34
      }, this)) }, void 0, false, {
        fileName: "src/app/routes/about.tsx",
        lineNumber: 117,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "src/app/routes/about.tsx",
      lineNumber: 115,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { className: "mb-12", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-2xl font-bold text-primary mb-4", children: "Current Focus" }, void 0, false, {
        fileName: "src/app/routes/about.tsx",
        lineNumber: 126,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-lg text-primary mb-4", children: "I'm currently working on various projects in the decentralized social media space, with a particular emphasis on building tools and applications for the Bluesky ecosystem." }, void 0, false, {
        fileName: "src/app/routes/about.tsx",
        lineNumber: 127,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "src/app/routes/about.tsx",
      lineNumber: 125,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-2xl font-bold text-primary mb-4", children: "Interests" }, void 0, false, {
        fileName: "src/app/routes/about.tsx",
        lineNumber: 135,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "space-y-3", children: interests.map((interest) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: "flex items-center gap-3 text-lg text-primary", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FontAwesomeIcon, { icon: interest.icon, className: `${interest.color}` }, void 0, false, {
          fileName: "src/app/routes/about.tsx",
          lineNumber: 138,
          columnNumber: 17
        }, this),
        interest.name
      ] }, interest.name, true, {
        fileName: "src/app/routes/about.tsx",
        lineNumber: 137,
        columnNumber: 40
      }, this)) }, void 0, false, {
        fileName: "src/app/routes/about.tsx",
        lineNumber: 136,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "src/app/routes/about.tsx",
      lineNumber: 134,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "src/app/routes/about.tsx",
    lineNumber: 95,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "src/app/routes/about.tsx",
    lineNumber: 94,
    columnNumber: 10
  }, this);
}
_s(About, "A7llzW2ObhyXiF+J/8JglTlJ6LM=", false, function() {
  return [useLoaderData];
});
_c = About;
var _c;
$RefreshReg$(_c, "About");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  About as default,
  meta
};
//# sourceMappingURL=/build/routes/about-K62B47PV.js.map
