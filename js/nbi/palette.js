const token = (family, step) => `var(--viz-${family}-${step})`;
const role = (name) => `var(--viz-${name})`;
const ramp = (family) => Object.freeze([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((step) => token(family, step)));
const freeze = (colors) => Object.freeze(colors);

export const foundation = Object.freeze({
  neutral: ramp("neutral"),
  yellow: ramp("yellow"),
});

export const categoricalSets = Object.freeze({
  2: freeze([role("tone-1"), role("tone-2")]),
  3: freeze([role("tone-1"), role("tone-2"), role("tone-3")]),
  4: freeze([role("tone-1"), role("tone-2"), role("tone-3"), role("tone-5")]),
  5: freeze([role("tone-1"), role("tone-2"), role("tone-3"), role("tone-4"), role("tone-5")]),
  10: freeze(Array.from({length: 10}, (_, index) => role(`tone-${index + 1}`))),
});

export const semantic = Object.freeze({
  good: role("good"),
  fair: role("middle"),
  poor: role("bad"),
  unrated: role("muted"),
});

export const sequentialSets = Object.freeze({
  condition5: freeze([role("bad"), role("bad-muted"), role("middle"), role("good-muted"), role("good")]),
  condition7: freeze([role("bad"), role("tone-3"), role("tone-4"), role("middle"), role("good-soft"), role("good-muted"), role("good")]),
  neutral5: freeze([token("neutral", 60), token("neutral", 50), token("neutral", 40), token("neutral", 30), token("neutral", 10)]),
  brand5: freeze([token("yellow", 80), token("yellow", 70), token("yellow", 60), token("yellow", 50), token("yellow", 30)]),
  brand7: freeze([token("yellow", 80), token("yellow", 70), token("yellow", 60), token("yellow", 50), token("yellow", 40), token("yellow", 30), token("yellow", 20)]),
});

export const divergingSets = Object.freeze({
  contrast5: freeze([token("neutral", 60), token("neutral", 30), token("neutral", 0), token("yellow", 30), token("yellow", 70)]),
  contrast7: freeze([token("neutral", 60), token("neutral", 40), token("neutral", 20), token("neutral", 0), token("yellow", 20), token("yellow", 50), token("yellow", 70)]),
});

export const solidEncodings = Object.freeze([
  Object.freeze({name: "Good solid", color: role("good"), kind: "solid"}),
  Object.freeze({name: "Bad solid", color: role("bad"), kind: "solid"}),
  Object.freeze({name: "Dark gray solid", color: role("tone-3"), kind: "solid"}),
  Object.freeze({name: "Middle gray solid", color: role("middle"), kind: "solid"}),
  Object.freeze({name: "Gold solid", color: role("good-muted"), kind: "solid"}),
]);

export const texturedEncodings = Object.freeze([
  Object.freeze({name: "Good diagonal", color: role("good"), kind: "diagonal"}),
  Object.freeze({name: "Bad dots", color: role("bad"), kind: "dots"}),
  Object.freeze({name: "Gray crosshatch", color: role("tone-3"), kind: "crosshatch"}),
  Object.freeze({name: "Mid-gray horizontal", color: role("tone-4"), kind: "horizontal"}),
  Object.freeze({name: "Gold checker", color: role("good-muted"), kind: "checker"}),
]);

export const textureEncodings = Object.freeze([...solidEncodings, ...texturedEncodings]);

export const categorical = categoricalSets[10];
export const sequential = sequentialSets.brand7;
export const diverging = divergingSets.contrast7;

export function categoricalScale(domain, options = {}) {
  const range = categoricalSets[domain.length] ?? categorical;
  return {type: "categorical", domain, range, ...options};
}

let textureInstance = 0;

export function textureKit(count = 10) {
  const encodings = textureEncodings.slice(0, Math.max(1, Math.min(count, textureEncodings.length)));
  const prefix = `nbi-texture-${++textureInstance}`;
  const range = encodings.map((_, index) => `url(#${prefix}-${index})`);

  return Object.freeze({
    encodings,
    range: Object.freeze(range),
    solidLimit: solidEncodings.length,
    usesTexture: encodings.length > solidEncodings.length,
    apply(plot) {
      const svg = plot?.localName === "svg" ? plot : plot?.querySelector?.("svg");
      if (!svg) return plot;
      const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      encodings.forEach((encoding, index) => defs.append(createPattern(`${prefix}-${index}`, encoding)));
      svg.prepend(defs);
      return plot;
    },
  });
}

function createPattern(id, {color, kind}) {
  const pattern = svgNode("pattern", {id, width: 10, height: 10, patternUnits: "userSpaceOnUse"});
  const background = kind === "solid" ? color : "var(--viz-surface)";
  pattern.append(svgNode("rect", {width: 10, height: 10, fill: background}));

  if (kind === "diagonal" || kind === "crosshatch") {
    pattern.append(svgNode("path", {d: "M-2 2L2-2M0 10L10 0M8 12L12 8", stroke: color, "stroke-width": 2}));
  }
  if (kind === "crosshatch") {
    pattern.append(svgNode("path", {d: "M-2 8L2 12M0 0L10 10M8-2L12 2", stroke: color, "stroke-width": 2}));
  }
  if (kind === "dots") {
    pattern.append(svgNode("circle", {cx: 2.5, cy: 2.5, r: 1.6, fill: color}));
    pattern.append(svgNode("circle", {cx: 7.5, cy: 7.5, r: 1.6, fill: color}));
  }
  if (kind === "horizontal") {
    pattern.append(svgNode("path", {d: "M0 2H10M0 7H10", stroke: color, "stroke-width": 2}));
  }
  if (kind === "checker") {
    pattern.append(svgNode("rect", {width: 5, height: 5, fill: color}));
    pattern.append(svgNode("rect", {x: 5, y: 5, width: 5, height: 5, fill: color}));
  }
  return pattern;
}

function svgNode(name, attributes) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", name);
  Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
  return node;
}
