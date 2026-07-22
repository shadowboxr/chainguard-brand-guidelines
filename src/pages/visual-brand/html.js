export var CPAL_HTML = (function () {
  function sw(c) {
    var rows = c.rows
      .map(function (r) {
        return '<button type="button" class="cpal-row" data-copy="' + r[1] + '" data-label="' + r[0] + '">' + r[0] + ": " + r[1] + "</button>";
      })
      .join("");
    return '<div class="cpal-sw' + (c.dark ? " is-dark" : "") + '" style="background:' + c.fill + ";height:" + c.h + 'px" data-copy="' + c.hex + '" data-label="HEX"><span class="cpal-name">Name: ' + c.name + '</span><div class="cpal-rows">' + rows + "</div></div>";
  }
  function cat(title, list, cols, items, note) {
    var g = '<div class="cpal-grid cpal-grid--' + cols + '">' + items.map(sw).join("") + "</div>";
    var n = note ? '<div class="cpal-note"><span class="cpal-note__icon">*</span><p>' + note + "</p></div>" : "";
    return '<section class="cpal-cat"><div class="cpal-cat__head"><h3 class="cpal-cat__name">' + title + '</h3><span class="cpal-cat__list">' + list + "</span></div>" + g + n + "</section>";
  }
  var NOTE = "Note: We reserve use of our tertiary colors primarily to depict good/bad, positive/negative outcomes.";
  var blurple = { name: "Blurple", fill: "var(--blurple-500)", h: 300, hex: "#6226FB", rows: [["HEX", "#6226FB"], ["CMYK", "64% 76% 0% 0%"], ["RGB", "98 38 251"], ["PMS", "2725 C"]] };
  var hero = sw({ name: "Blurple", fill: "var(--blurple-500)", h: 300, hex: "#6226FB", rows: blurple.rows });

  var core = cat("Core", "Blurple | White | Ink", 3, [blurple, { name: "White", dark: true, fill: "var(--neutral-0)", h: 300, hex: "#FFFFFF", rows: [["HEX", "#FFFFFF"], ["CMYK", "0% 0% 0% 0%"], ["RGB", "255 255 255"]] }, { name: "Ink", fill: "var(--neutral-900)", h: 300, hex: "#0D161C", rows: [["HEX", "#0D161C"], ["CMYK", "93% 76% 58% 81%"], ["RGB", "13 22 28"], ["PMS", "7547 C"]] }], "");
  var secondary = cat("Secondary", "Fuchsia | Aqua", 2, [{ name: "Fuchsia", fill: "var(--fuchsia-500)", h: 204, hex: "#FD2BF2", rows: [["HEX", "#FD2BF2"], ["CMYK", "11% 99% 4% 0%"], ["RGB", "253 43 242"], ["PMS", "232 C"]] }, { name: "Aqua", fill: "var(--aqua-500)", h: 204, hex: "#2BBAFD", rows: [["HEX", "#2BBAFD"], ["CMYK", "77% 9% 6% 0%"], ["RGB", "43 186 253"], ["PMS", "299 C"]] }], "");
  var tertiary = cat("Tertiary", "Lime | Solar | Amber | Orange", 2, [{ name: "Lime", fill: "var(--lime-500)", h: 150, hex: "#04BD13", rows: [["HEX", "#04BD13"], ["RGB", "4 189 19"]] }, { name: "Solar", fill: "var(--solar-500)", h: 150, hex: "#FD3964", rows: [["HEX", "#FD3964"], ["RGB", "253 57 100"]] }, { name: "Amber", dark: true, fill: "var(--amber-500)", h: 150, hex: "#F8C222", rows: [["HEX", "#F8C222"], ["RGB", "248 194 34"]] }, { name: "Orange", fill: "var(--orange-500)", h: 150, hex: "#F85722", rows: [["HEX", "#F85722"], ["RGB", "248 87 34"]] }], NOTE);
  return hero + '<section class="cpal-body"><h3 class="cpal-h3">We have four color categories:</h3><div class="cpal-cats">' + core + secondary + tertiary + "</div></section>";
})();

export var CSC_HTML = (function () {
  var ARROW = '<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.33314 5.48571V2.74286H2.66686V5.48571H5.33314ZM5.33314 10.9714V8.22857H2.66686V10.9714H5.33314ZM2.66686 2.74286V0H0V2.74286H2.66686ZM2.66686 13.7143V10.9714H0V13.7143H2.66686ZM8 8.22857V5.48571H5.33314V8.22857H8Z" fill="currentColor"/></svg>';
  var B = [["50", "#F8F6FE"], ["100", "#F1ECFE"], ["200", "#C8B6F6"], ["300", "#C0A8FD"], ["400", "#9D7AF6"], ["500", "#6226FB"], ["600", "#4104DD"], ["800", "#3200AF"], ["900", "#14003D"], ["950", "#090119"]];
  var N = [["0", "#FFFFFF"], ["50", "#FBFBFF"], ["100", "#E7E8E8"], ["200", "#D0D2D3"], ["300", "#B7BABC"], ["400", "#9EA2A4"], ["500", "#7A7E81"], ["600", "#565C60"], ["700", "#3D4449"], ["800", "#192228"], ["900", "#0D161C"], ["950", "#060C10"]];
  var FU = [["100", "#FEF5FE"], ["200", "#FDDFFC"], ["500", "#FD2BF2"], ["800", "#A10099"], ["900", "#480044"]];
  var AQ = [["100", "#F5FCFF"], ["200", "#DFF4FE"], ["500", "#2BBAFD"], ["800", "#006A97"], ["900", "#003247"]];
  var LI = [["100", "#F2FDF2"], ["200", "#E9FCEA"], ["500", "#04BD13"], ["800", "#108000"], ["900", "#083E00"]];
  var SO = [["100", "#FEF6F6"], ["200", "#FCE0E0"], ["500", "#FD3964"], ["800", "#D40555"], ["900", "#640017"]];
  var AM = [["100", "#FAF5E5"], ["500", "#F8C222"], ["900", "#654E0B"]];
  var OR = [["100", "#FAEAE5"], ["500", "#F85722"], ["900", "#65220B"]];
  function rgb(h) {
    h = h.replace("#", "");
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  function txt(h) {
    var c = rgb(h);
    return (c[0] * 299 + c[1] * 587 + c[2] * 114) / 1000 > 165 ? "var(--neutral-900)" : "#fff";
  }
  function seg(step, hex, kind) {
    var c = rgb(hex),
      r = c[0] + " " + c[1] + " " + c[2];
    var cls = "scale-seg",
      at = "";
    if (kind === "open") cls += " scale-seg--open is-current";
    else if (kind === "light") {
      at = ' data-open="light"';
      cls += " is-current";
    } else if (kind === "dark") at = ' data-open="dark"';
    return '<div class="' + cls + '"' + at + ' style="background:' + hex + ";color:" + txt(hex) + '" data-copy="' + hex + '" data-label="HEX"><span class="scale-seg__num">' + step + '</span><div class="scale-seg__vals"><button type="button" class="cpal-row" data-copy="' + hex + '" data-label="HEX">HEX: ' + hex + '</button><button type="button" class="cpal-row" data-copy="' + r + '" data-label="RGB">RGB: ' + r + "</button></div></div>";
  }
  function bar(sh, open, h, ink) {
    var n1 = sh.length - 1;
    var s = sh
      .map(function (x) {
        var k = "";
        if (ink) {
          if (x[0] === "0") k = "light";
          else if (x[0] === "900") k = "dark";
        } else if (x[0] === open) k = "open";
        return seg(x[0], x[1], k);
      })
      .join("");
    return '<div class="scale-bar" style="--n1:' + n1 + ";height:" + h + 'px">' + s + '<button type="button" class="scale-nav scale-nav--prev" aria-label="Previous shade">' + ARROW + '</button><button type="button" class="scale-nav scale-nav--next" aria-label="Next shade">' + ARROW + "</button></div>";
  }
  function card(title, label, body) {
    var r = label ? '<span class="cpal-cat__list">' + label + "</span>" : "";
    return '<section class="cpal-cat"><div class="cpal-cat__head"><h3 class="cpal-cat__name">' + title + "</h3>" + r + "</div>" + body + "</section>";
  }
  function sub(name, label, barHTML) {
    return '<div class="scale-sub"><div class="scale-sub__head"><span class="scale-sub__name">' + name + '</span><span class="cpal-cat__list">' + label + "</span></div>" + barHTML + "</div>";
  }
  var blurple = card("Blurple Scale", "10 step: 50 - 950", bar(B, "500", 300, false));
  var ink = card("Ink Scale", "12 step: 0 - 950", bar(N, null, 300, true));
  var sec = card("Secondary Scales", "", sub("Fuchsia", "5 step: 100 - 900", bar(FU, "500", 204, false)) + sub("Aqua", "5 step: 100 - 900", bar(AQ, "500", 204, false)));
  var ter = card("Tertiary Scales", "", sub("Lime", "5 step: 100 - 900", bar(LI, "500", 150, false)) + sub("Solar", "5 step: 100 - 900", bar(SO, "500", 150, false)) + sub("Amber", "3 step: 100 - 900", bar(AM, "500", 150, false)) + sub("Orange", "3 step: 100 - 900", bar(OR, "500", 150, false)));
  return '<h3 id="scales" class="cpal-h3 fanchor">Color Scales</h3><div class="cpal-cats">' + blurple + ink + sec + ter + '</div><div class="cpal-tip" aria-hidden="true"></div>';
})();

export var CXHTML = (function () {
  function media() {
    return '<div class="fsplit__main"><div class="fsplit__media"></div></div>';
  }
  function trow(label, desc) {
    return '<div class="fsplit__row"><div class="fsplit__side fsplit__side--tall"><h4 class="fsplit__label">' + label + '</h4><p class="fsplit__desc">' + desc + "</p></div>" + media() + "</div>";
  }
  function prow(label, items) {
    var lis = items
      .map(function (t) {
        return "<li>" + t + "</li>";
      })
      .join("");
    return '<div class="fsplit__row"><div class="fsplit__side"><h4 class="fsplit__label">' + label + '</h4></div><div class="fsplit__main"><ul class="fsplit__list">' + lis + "</ul></div></div>";
  }
  var themes =
    '<section class="cxsec"><h3 id="themes" class="cpal-h3 fanchor">Color themes</h3><p class="cxintro">Our expanded palette gives our brand flexibility without losing consistency. The tints and shades create a spectrum of color that is both useful for dark/light mode, and modern monochromatic design. We group our colors into “themes” so that this expanded use of color stays consistent.</p><div class="fsplit">' +
    trow("Light mode", "This is our core color theme. It allows us to lead with bold Ink type, supported by our blocks in full color, and accents in the Light and Air tints.") +
    trow("Dark mode", "Our dark mode variation creates a sleek, modern look that reflects the dark mode many of our engineers prefer to work in. Dark mode relies on bold white type, and our dark and deep color shades.") +
    trow("Monochromatic tone-on-tone", "Can be used in light blurple, fuschia, and aqua; or dark blurple, fuschia, and aqua; for when you’d like to give visual variety to a repeatable system (examples include webinar meta images or book covers).") +
    trow("Blurple core", "This color-drench option emphasizes our core color, and creates a very bold look for impactful statements and advertising opportunities.") +
    "</div></section>";
  var print =
    '<section class="cxsec"><h3 id="print" class="cpal-h3 fanchor">Print</h3><p class="cxintro">Our colors are optimized for digital, so please use the following guidelines to ensure consistency in print applications.</p><div class="fsplit">' +
    prow("Recommended", ["Use Pantone colors whenever possible. If Pantone printing is not available, use the approved CMYK values.", "Print on black or dark backgrounds whenever possible to help the brand colors appear more vibrant.", "For vinyl applications, prioritize Pantone printing. This has produced the most consistent color results with vendors."]) +
    prow("Avoid", ["Avoid printing on fabric when possible, as color reproduction can be less consistent.", "Do not combine fabric and vinyl graphics within the same space unless the colors can be closely matched, as differences will be more noticeable side by side.", "For swag, use a black or white base when the item color cannot be accurately matched to an approved Pantone."]) +
    "</div></section>";
  var a11y = '<section class="cxsec"><h3 id="accessibility" class="cpal-h3 fanchor">Accessibility</h3><p class="cxintro">Our goal is to make our brand accessible to everyone, regardless of ability or device. We follow WCAG AA standards. Use the approved text and background color combinations below to maintain accessible contrast.</p><div class="cxph"></div></section>';
  return themes + print + a11y;
})();

var ARW = '<span class="tdrop__arw"><svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.33314 5.48571V2.74286H2.66686V5.48571H5.33314ZM5.33314 10.9714V8.22857H2.66686V10.9714H5.33314ZM2.66686 2.74286V0H0V2.74286H2.66686ZM2.66686 13.7143V10.9714H0V13.7143H2.66686ZM8 8.22857V5.48571H5.33314V8.22857H8Z" fill="currentColor"/></svg></span>';
var NAV = '<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.33314 5.48571V2.74286H2.66686V5.48571H5.33314ZM5.33314 10.9714V8.22857H2.66686V10.9714H5.33314ZM2.66686 2.74286V0H0V2.74286H2.66686ZM2.66686 13.7143V10.9714H0V13.7143H2.66686ZM8 8.22857V5.48571H5.33314V8.22857H8Z" fill="currentColor"/></svg>';
var DLI = '<svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 10H0V8.75H10V10ZM5.625 5H6.875V6.25H5.625V7.5H4.375V6.25H3.125V5H4.375V0H5.625V5ZM3.125 5H1.875V3.75H3.125V5ZM8.125 5H6.875V3.75H8.125V5Z" fill="currentColor"/></svg>';
function cgWrap() {
  var s = "",
    d = "";
  for (var i = 0; i < 6; i++) {
    s += '<div class="tirl__slide"><span class="tirl__ph">' + (i < 9 ? "0" : "") + (i + 1) + "</span></div>";
    d += '<button type="button" class="tirl__dot' + (i === 0 ? " is-on" : "") + '" data-i="' + i + '" aria-label="Slide ' + (i + 1) + '"></button>';
  }
  return '<div class="tirl-wrap"><div class="tirl"><div class="tirl__track">' + s + '</div></div><div class="tirl__nav"><button type="button" class="tirl__arw tirl__arw--prev" data-dir="-1" aria-label="Previous">' + NAV + '</button><div class="tirl__dots">' + d + '</div><button type="button" class="tirl__arw tirl__arw--next" data-dir="1" aria-label="Next">' + NAV + "</button></div></div>";
}
function tDL(href, label, noop) {
  return '<a class="tdl" href="' + href + '"' + (noop ? " data-noop" : ' target="_blank" rel="noopener"') + ">" + DLI + "<span>" + label + "</span></a>";
}
function tRow(label, fdV, fdL, faV, faL, size, leadT, leadC, spacT, spacP, wnum, wname, text, cls) {
  var meta = '<span class="tspec__meta">Leading: ' + leadT + " | Spacing: " + spacT + " | Weight: " + wname + "</span>";
  var lp = label ? '<span class="tpill tpill--label">' + label + "</span>" : "";
  return '<div class="tspec__row" data-font="' + fdV + '" data-size="' + size + '" data-lh="' + leadC + '" data-spac="' + spacP + '" data-wt="' + wnum + '"><div class="tspec__ctrl"><div class="tspec__cl">' + lp +
    '<div class="tdrop-wrap"><button type="button" class="tpill tdrop" data-drop aria-expanded="false"><span class="tdrop__val">' + fdL + "</span>" + ARW + "</button>" +
    '<div class="tdrop-menu"><button type="button" class="tdrop-opt" data-font="' + fdV + '">' + fdL + '</button><button type="button" class="tdrop-opt" data-font="' + faV + '">' + faL + "</button></div></div>" +
    '</div><div class="tspec__cr">' + meta + '<button type="button" class="tpill tcopy" data-copycss><span class="tcopy__t">Copy CSS</span></button></div></div>' +
    '<p class="tspec__text ' + cls + '" data-specimen contenteditable="true" spellcheck="false">' + text + "</p></div>";
}
function fMedia(label, desc) {
  return '<div class="fsplit__row"><div class="fsplit__side fsplit__side--tall"><h4 class="fsplit__label">' + label + '</h4><p class="fsplit__desc">' + desc + '</p></div><div class="fsplit__main"><div class="fsplit__media"></div></div></div>';
}
function fText(label, text) {
  return '<div class="fsplit__row"><div class="fsplit__side"><h4 class="fsplit__label">' + label + '</h4></div><div class="fsplit__main"><p class="fsplit__body">' + text + "</p></div></div>";
}
function xSec(id, title, intro, body) {
  return '<section class="cxsec"><h3 id="' + id + '" class="cpal-h3 fanchor">' + title + '</h3><p class="cxintro">' + intro + "</p>" + (body || '<div class="cxph"></div>') + "</section>";
}

export var TYPO_HTML =
  '<section class="typo-fonts">' +
  '<h3 id="fonts" class="cpal-h3 fanchor">Fonts</h3>' +
  '<p class="cxintro">Our primary font is Gellix, and we use Roobert SemiMono as a secondary accent. To maintain a consistent look, we also have Google font alternatives for use on Docs and slides.</p>' +
  '<div class="tcard"><div class="tcard__head"><span class="tcard__name">Gellix</span><span class="cpal-cat__list">Web font alternative: Poppins</span></div>' +
  '<p class="tcard__desc">Gellix is our primary typeface: modern, friendly, and built for clarity. Its geometric forms and balanced proportions make it just as effective in dense technical content as it is in bold, expressive headlines. We use Gellix across every Chainguard touchpoint to maintain consistency and confidence. Heavier weights bring impact to headlines and key statements, while lighter weights create breathing room in longer-form content.</p>' +
  '<div class="tspec">' + tRow("Heading", "gellix", "Gellix", "poppins", "Poppins", 64, "100%", "1", "-3%", -3, 700, "Bold", "The trusted source for open source", "tspec__text--heading") +
  tRow("Body", "gellix", "Gellix", "poppins", "Poppins", 16, "150%", "1.5", "-3%", -3, 400, "Regular", "Developers and AI agents are pulling open source at a pace that’s outrunning reactive security. Chainguard delivers the industry’s largest zero-CVE, built-from-source container image catalog for engineers who refuse to choose between velocity and trust.", "tspec__text--body") +
  '<div class="tspec__dl">' + tDL("#", "Download Gellix Family", true) + tDL("https://fonts.google.com/specimen/Poppins", "Download Poppins", false) + "</div></div>" +
  '<h4 class="tirl__title">Gellix IRL</h4>' + cgWrap() + "</div>" +
  '<div class="tcard"><div class="tcard__head"><span class="tcard__name">Roobert Semimono</span><span class="cpal-cat__list">Web font alternative: Roboto Mono</span></div>' +
  '<p class="tcard__desc">Roobert SemiMono is our secondary typeface; technical, precise, and unmistakably Chainguard. Its semi-monospaced design nods to engineering environments, creating a bridge between clarity and code. We use Roobert SemiMono to highlight technical details, product interfaces, and type accents (like eyebrow text).</p>' +
  '<div class="tspec">' + tRow("", "roobert", "Roobert SemiMono", "robotomono", "Roboto Mono", 16, "150%", "1.5", "6%", 6, 500, "Medium", "Only Chainguard can deliver the security and compliance your organization needs while being the partner that engineering teams can count on.", "tspec__text--mono") +
  '<div class="tspec__dl">' + tDL("#", "Download Roobert SemiMono", true) + tDL("https://fonts.google.com/specimen/Roboto+Mono", "Download Roboto Mono", false) + "</div></div>" +
  '<h4 class="tirl__title">Roobert SemiMono IRL</h4>' + cgWrap() + "</div>" +
  "</section>" +
  xSec("hierarchy", "Hierarchy", "Our bold, modern primary typeface is an important and recognizable element of our brand system. We use Gellix Bold at scale to display headlines with impact and personality, supported by smaller Gellix Regular for body copy.", '<div class="cpal-note"><span class="cpal-note__icon">*</span><p>We reserve all-caps Roobert Semimono for labels (like eyebrows, date/time, and our website url)</p></div><div class="cxph"></div>') +
  xSec("alignment", "Alignment", "We align type primarily to the left, and in some select applications, center. Left alignment is used as the default for most content applications, since it is the most clear and easy to read. We reserve center alignment for more striking applications like a homepage hero, an out-of-home campaign, and bold statement presentation slides.") +
  xSec("capitalization", "Capitalization", "As outlined in our Writing Style Guide, we use sentence case for all of our headlines. We only use capital letters at the start of the sentence, or when mentioning a proper noun like a person, place, company, or product (like Chainguard Containers, or The Guardener). We reserve all-caps for labels, like eyebrow text.") +
  xSec("cursor-highlight", "The cursor and highlight", "Our brand system uses two elements alongside our typeface: the cursor and the highlight.", '<div class="fsplit">' + fMedia("The cursor", "Inspired by a terminal, the cursor grounds eyebrow text elements and other labels. It is an opportunity to introduce our core colors and speak directly to our engineering audience.") + fMedia("The highlight", "The highlight element combines the highlighting capability in a terminal with our building blocks, to create an opportunity for emphasis on a couple words of a headline.") + "</div>");

export var DE_HTML =
  '<p class="cxintro">Our brand system is made up of various design elements that allow us to create a flexible, yet recognizable visual brand.</p>' +
  xSec("the-visible-grid", "The visible grid", "The grid is the foundation of our visual brand. We keep the grid visible to add structure, and as a nod to the importance of the underlying foundation that is keeping our software supply chain secure.") +
  xSec("building-blocks", "Building blocks", "The individual building blocks create a design element that we can use to create pattern, structure, or meaning through our icons. They create a balance between structure and playfulness.") +
  xSec("patterns", "Patterns", "By combining the grid and building blocks, we create patterns that add texture and depth to our visual brand. The patterns are used as background elements, and are a flexible design element that gives us range.") +
  xSec("the-cursor", "The Cursor", "The cursor is a direct reference to our engineering audience. As a design element, it can be expanded into a highlight, or block text treatment that creates bold typographic moments.");

export var DV_HTML =
  '<p class="cxintro">Data allows us to communicate patterns, concepts, and our value with visual impact.</p>' +
  '<div class="fsplit">' + fText("Keep it simple", "Keep the focus on the data, and the story you are telling. Do not overcomplicate with visuals or design elements that do not add value.") +
  fText("Use color with intent", "Use color only when it adds emphasis or meaning; for example use Blurple to call attention to a key stat, or Lime/Solar to signify good/bad.") +
  fText("Create structure", "Use the grid to clearly organize the data, and make it easy to read, especially when creating longer lists or tables.") + "</div>" +
  '<div class="dnote"><h3 class="dnote__title">Design notes</h3><div class="fsplit">' +
  '<div class="fsplit__row"><div class="fsplit__side"><h4 class="fsplit__label">Color</h4></div><div class="fsplit__main"><p class="fsplit__body">Data visualizations can be created using our core and secondary colors.</p><ul class="fsplit__list"><li>Always consider if there is enough contrast between categories of a chart.</li><li>Simple charts and visualizations (4 categories or less) can be monochromatic, using our tints and shades.</li><li>When representing data, always reserve the use of Lime/Solar for good/bad, or increase/decrease.</li></ul></div></div>' +
  '<div class="fsplit__row"><div class="fsplit__side"><h4 class="fsplit__label">Type</h4></div><div class="fsplit__main"><p class="fsplit__body">Large-scale stats should always use Gellix Bold. Body copy should be Gellix Regular to ensure legibility. Labels can use Roobert SemiMono.</p></div></div>' +
  "</div></div>" +
  '<div class="dv-ex"><h3 id="data-viz-examples" class="cpal-h3 fanchor">Data Visualization Examples</h3>' + cgWrap() + "</div>";
