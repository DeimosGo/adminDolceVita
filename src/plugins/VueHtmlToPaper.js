/* eslint-disable no-useless-escape */
/* eslint-disable no-extra-boolean-cast */
function addStyles(win, styles) {
    styles.forEach((style) => {
        let link = win.document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", style);
        win.document.getElementsByTagName("head")[0].appendChild(link);
    });
}
const VueHtmlToPaper = {
    install(Vue, options = {}) {
        let globals = Vue.prototype || Vue.config.globalProperties;
        globals.$htmlToPaper = (el, localOptions, cb = () => true) => {
            let defaultName = "_blank",
                defaultSpecs = ["fullscreen=yes", "titlebar=no", "scrollbars=yes"],
                defaultReplace = true,
                defaultStyles = [];
            let {
                name = defaultName,
                    specs = defaultSpecs,
                    replace = defaultReplace,
                    styles = defaultStyles
            } = options;

            // If has localOptions
            // TODO: improve logic
            // eslint-disable-next-line no-extra-boolean-cast
            if (!!localOptions) {
                if (localOptions.name) name = localOptions.name;
                if (localOptions.specs) specs = localOptions.specs;
                if (localOptions.replace) replace = localOptions.replace;
                if (localOptions.styles) styles = localOptions.styles;
            }

            specs = !!specs.length ? specs.join(",") : "";

            const element = window.document.getElementById(el);

            if (!element) {
                alert(`Element to print #${el} not found!`);
                return;
            }

            const url = "https://cdn.jsdelivr.net/npm/chart.js@3.8.0/dist/chart.min.js";
            const win = window.open(url, name, specs, replace);

            win.document.write(`
            <html>
            <head>
                <title>${window.document.title}</title>
                <style>
                /*
! tailwindcss v3.1.1 | MIT License | https://tailwindcss.com
*/

/*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*,
::before,
::after {
  box-sizing: border-box;
  /* 1 */
  border-width: 0;
  /* 2 */
  border-style: solid;
  /* 2 */
  border-color: #e4e4e7;
  /* 2 */
}

::before,
::after {
  --tw-content: '';
}

html {
  line-height: 1.5;
  /* 1 */
  -webkit-text-size-adjust: 100%;
  /* 2 */
  -moz-tab-size: 4;
  /* 3 */
  -o-tab-size: 4;
     tab-size: 4;
  /* 3 */
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  /* 4 */
}

body {
  margin: 0;
  /* 1 */
  line-height: inherit;
  /* 2 */
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

hr {
  height: 0;
  /* 1 */
  color: inherit;
  /* 2 */
  border-top-width: 1px;
  /* 3 */
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
          text-decoration: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b,
strong {
  font-weight: bolder;
}

code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  /* 1 */
  font-size: 1em;
  /* 2 */
}

/*
Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}


sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table {
  text-indent: 0;
  /* 1 */
  border-color: inherit;
  /* 2 */
  border-collapse: collapse;
  /* 3 */
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  /* 1 */
  font-size: 100%;
  /* 1 */
  font-weight: inherit;
  /* 1 */
  line-height: inherit;
  /* 1 */
  color: inherit;
  /* 1 */
  margin: 0;
  /* 2 */
  padding: 0;
  /* 3 */
}

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

button,
select {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button;
  /* 1 */
  background-color: transparent;
  /* 2 */
  background-image: none;
  /* 2 */
}

/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring {
  outline: auto;
}


:-moz-ui-invalid {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search'] {
  -webkit-appearance: textfield;
  /* 1 */
  outline-offset: -2px;
  /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}


::-webkit-file-upload-button {
  -webkit-appearance: button;
  /* 1 */
  font: inherit;
  /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::-moz-placeholder, textarea::-moz-placeholder {
  opacity: 1;
  /* 1 */
  color: #a1a1aa;
  /* 2 */
}

input::placeholder,
textarea::placeholder {
  opacity: 1;
  /* 1 */
  color: #a1a1aa;
  /* 2 */
}

/*
Set the default cursor for buttons.
*/

button,
[role="button"] {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/

:disabled {
  cursor: default;
}

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block;
  /* 1 */
  vertical-align: middle;
  /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

*, ::before, ::after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(99 102 241 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
}

::-webkit-backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(99 102 241 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
}

::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(99 102 241 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.visible {
  visibility: visible;
}

.fixed {
  position: fixed;
}

.absolute {
  position: absolute;
}

.relative {
  position: relative;
}

.top-0 {
  top: 0px;
}

.right-0 {
  right: 0px;
}

.bottom-0 {
  bottom: 0px;
}

.left-0 {
  left: 0px;
}

.top-8 {
  top: 2rem;
}

.-bottom-5 {
  bottom: -1.25rem;
}

.top-6 {
  top: 1.5rem;
}

.bottom-9 {
  bottom: 2.25rem;
}

.top-5 {
  top: 1.25rem;
}

.right-8 {
  right: 2rem;
}

.bottom-8 {
  bottom: 2rem;
}

.-top-6 {
  top: -1.5rem;
}

.bottom-6 {
  bottom: 1.5rem;
}

.top-32 {
  top: 8rem;
}

.top-3 {
  top: 0.75rem;
}

.top-10 {
  top: 2.5rem;
}

.top-11 {
  top: 2.75rem;
}

.right-1 {
  right: 0.25rem;
}

.top-14 {
  top: 3.5rem;
}

.z-40 {
  z-index: 40;
}

.z-20 {
  z-index: 20;
}

.z-0 {
  z-index: 0;
}

.z-30 {
  z-index: 30;
}

.z-50 {
  z-index: 50;
}

.z-10 {
  z-index: 10;
}

.m-auto {
  margin: auto;
}

.m-0 {
  margin: 0px;
}

.m-1 {
  margin: 0.25rem;
}

.my-6 {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.-mx-1\.5 {
  margin-left: -0.375rem;
  margin-right: -0.375rem;
}

.-my-1\.5 {
  margin-top: -0.375rem;
  margin-bottom: -0.375rem;
}

.-mx-1 {
  margin-left: -0.25rem;
  margin-right: -0.25rem;
}

.-my-1 {
  margin-top: -0.25rem;
  margin-bottom: -0.25rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.mt-0 {
  margin-top: 0px;
}

.mt-10 {
  margin-top: 2.5rem;
}

.mb-1 {
  margin-bottom: 0.25rem;
}

.mt-1 {
  margin-top: 0.25rem;
}

.mt-3 {
  margin-top: 0.75rem;
}

.ml-2 {
  margin-left: 0.5rem;
}

.ml-3 {
  margin-left: 0.75rem;
}

.mb-8 {
  margin-bottom: 2rem;
}

.mt-6 {
  margin-top: 1.5rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.ml-8 {
  margin-left: 2rem;
}

.mr-1 {
  margin-right: 0.25rem;
}

.ml-auto {
  margin-left: auto;
}

.ml-6 {
  margin-left: 1.5rem;
}

.ml-1 {
  margin-left: 0.25rem;
}

.mt-7 {
  margin-top: 1.75rem;
}

.mr-8 {
  margin-right: 2rem;
}

.mt-4 {
  margin-top: 1rem;
}

.block {
  display: block;
}

.inline {
  display: inline;
}

.flex {
  display: flex;
}

.inline-flex {
  display: inline-flex;
}

.table {
  display: table;
}

.grid {
  display: grid;
}

.contents {
  display: contents;
}

.hidden {
  display: none;
}

.h-100v {
  height: 100vh;
}

.h-5\/6 {
  height: 83.333333%;
}

.h-10 {
  height: 2.5rem;
}

.h-70v {
  height: 70vh;
}

.h-36 {
  height: 9rem;
}

.h-90v {
  height: 90vh;
}

.h-24 {
  height: 6rem;
}

.h-0 {
  height: 0px;
}

.h-fit {
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
}

.h-5 {
  height: 1.25rem;
}

.h-60v {
  height: 60vh;
}

.h-14 {
  height: 3.5rem;
}

.h-64 {
  height: 16rem;
}

.h-52 {
  height: 13rem;
}

.h-80 {
  height: 20rem;
}

.h-full {
  height: 100%;
}

.h-16 {
  height: 4rem;
}

.h-8 {
  height: 2rem;
}

.h-6 {
  height: 1.5rem;
}

.h-50v {
  height: 50vh;
}

.h-44 {
  height: 11rem;
}

.h-32 {
  height: 8rem;
}

.h-20 {
  height: 5rem;
}

.h-min {
  height: -webkit-min-content;
  height: -moz-min-content;
  height: min-content;
}

.h-56 {
  height: 14rem;
}

.max-h-70v {
  max-height: 70vh;
}

.max-h-32 {
  max-height: 8rem;
}

.max-h-65v {
  max-height: 65vh;
}

.w-full {
  width: 100%;
}

.w-screen {
  width: 100vw;
}

.w-11\/12 {
  width: 91.666667%;
}

.w-4 {
  width: 1rem;
}

.w-36 {
  width: 9rem;
}

.w-4\/5 {
  width: 80%;
}

.w-64 {
  width: 16rem;
}

.w-0 {
  width: 0px;
}

.w-1\/4 {
  width: 25%;
}

.w-48 {
  width: 12rem;
}

.w-40 {
  width: 10rem;
}

.w-1\/2 {
  width: 50%;
}

.w-1\/3 {
  width: 33.333333%;
}

.w-10 {
  width: 2.5rem;
}

.w-10\/12 {
  width: 83.333333%;
}

.w-1\/6 {
  width: 16.666667%;
}

.w-56 {
  width: 14rem;
}

.w-52 {
  width: 13rem;
}

.w-11 {
  width: 2.75rem;
}

.w-2\/5 {
  width: 40%;
}

.w-3\/5 {
  width: 60%;
}

.w-20 {
  width: 5rem;
}

.w-80 {
  width: 20rem;
}

.w-2\/4 {
  width: 50%;
}

.w-300 {
  width: 300px;
}

.w-12 {
  width: 3rem;
}

.w-95pct {
  width: 95%;
}

.w-14 {
  width: 3.5rem;
}

.w-8 {
  width: 2rem;
}

.w-3\/4 {
  width: 75%;
}

.w-5 {
  width: 1.25rem;
}

.w-60 {
  width: 15rem;
}

.w-1\/5 {
  width: 20%;
}

.w-44 {
  width: 11rem;
}

.w-16 {
  width: 4rem;
}

.w-fit {
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
}

.w-72 {
  width: 18rem;
}

.w-1 {
  width: 0.25rem;
}

.w-100 {
  width: 580px;
}

.w-2 {
  width: 0.5rem;
}

.w-600p {
  width: 600px;
}

.w-3 {
  width: 0.75rem;
}

.w-96 {
  width: 24rem;
}

.min-w-780 {
  min-width: 780px;
}

.min-w-580 {
  min-width: 580px;
}

.flex-shrink-0 {
  flex-shrink: 0;
}

.flex-shrink {
  flex-shrink: 1;
}

.border-collapse {
  border-collapse: collapse;
}

.-translate-y-1 {
  --tw-translate-y: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.scale-105 {
  --tw-scale-x: 1.05;
  --tw-scale-y: 1.05;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.scale-100 {
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.scale-95 {
  --tw-scale-x: .95;
  --tw-scale-y: .95;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.cursor-pointer {
  cursor: pointer;
}

.cursor-not-allowed {
  cursor: not-allowed;
}

.resize {
  resize: both;
}

.appearance-none {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.flex-row {
  flex-direction: row;
}

.flex-col {
  flex-direction: column;
}

.place-content-center {
  place-content: center;
}

.place-content-start {
  place-content: start;
}

.place-content-end {
  place-content: end;
}

.place-items-start {
  place-items: start;
}

.place-items-center {
  place-items: center;
}

.items-start {
  align-items: flex-start;
}

.items-end {
  align-items: flex-end;
}

.items-center {
  align-items: center;
}

.justify-start {
  justify-content: flex-start;
}

.justify-end {
  justify-content: flex-end;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.justify-items-center {
  justify-items: center;
}

.gap-x-4 {
  -moz-column-gap: 1rem;
       column-gap: 1rem;
}

.gap-y-12 {
  row-gap: 3rem;
}

.gap-y-5 {
  row-gap: 1.25rem;
}

.space-y-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.75rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.75rem * var(--tw-space-y-reverse));
}

.space-x-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1rem * var(--tw-space-x-reverse));
  margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
}

.space-x-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.75rem * var(--tw-space-x-reverse));
  margin-left: calc(0.75rem * calc(1 - var(--tw-space-x-reverse)));
}

.space-x-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.25rem * var(--tw-space-x-reverse));
  margin-left: calc(0.25rem * calc(1 - var(--tw-space-x-reverse)));
}

.space-y-8 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(2rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(2rem * var(--tw-space-y-reverse));
}

.space-y-10 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(2.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(2.5rem * var(--tw-space-y-reverse));
}

.space-y-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
}

.space-y-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1rem * var(--tw-space-y-reverse));
}

.space-y-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.25rem * var(--tw-space-y-reverse));
}

.space-x-6 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1.5rem * var(--tw-space-x-reverse));
  margin-left: calc(1.5rem * calc(1 - var(--tw-space-x-reverse)));
}

.space-x-0 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0px * var(--tw-space-x-reverse));
  margin-left: calc(0px * calc(1 - var(--tw-space-x-reverse)));
}

.space-x-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.5rem * var(--tw-space-x-reverse));
  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
}

.space-x-7 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1.75rem * var(--tw-space-x-reverse));
  margin-left: calc(1.75rem * calc(1 - var(--tw-space-x-reverse)));
}

.place-self-end {
  place-self: end;
}

.overflow-auto {
  overflow: auto;
}

.overflow-hidden {
  overflow: hidden;
}

.overflow-visible {
  overflow: visible;
}

.overflow-scroll {
  overflow: scroll;
}

.overflow-y-visible {
  overflow-y: visible;
}

.overflow-y-scroll {
  overflow-y: scroll;
}

.rounded-md {
  border-radius: 0.375rem;
}

.rounded-xl {
  border-radius: 0.75rem;
}

.rounded-full {
  border-radius: 9999px;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.rounded-2xl {
  border-radius: 1rem;
}

.rounded-none {
  border-radius: 0px;
}

.rounded-l-lg {
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}

.rounded-r-lg {
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

.border-2 {
  border-width: 2px;
}

.border {
  border-width: 1px;
}

.border-x {
  border-left-width: 1px;
  border-right-width: 1px;
}

.border-y {
  border-top-width: 1px;
  border-bottom-width: 1px;
}

.border-b {
  border-bottom-width: 1px;
}

.border-t {
  border-top-width: 1px;
}

.border-t-4 {
  border-top-width: 4px;
}

.border-t-0 {
  border-top-width: 0px;
}

.border-r {
  border-right-width: 1px;
}

.border-submarine-600 {
  --tw-border-opacity: 1;
  border-color: rgb(5 150 105 / var(--tw-border-opacity));
}

.border-pink-300 {
  --tw-border-opacity: 1;
  border-color: rgb(249 168 212 / var(--tw-border-opacity));
}

.border-indigo-300 {
  --tw-border-opacity: 1;
  border-color: rgb(196 181 253 / var(--tw-border-opacity));
}

.border-pinkViolet-300 {
  --tw-border-opacity: 1;
  border-color: rgb(240 171 252 / var(--tw-border-opacity));
}

.border-purple-300 {
  --tw-border-opacity: 1;
  border-color: rgb(216 180 254 / var(--tw-border-opacity));
}

.border-cerise-800 {
  --tw-border-opacity: 1;
  border-color: rgb(159 18 57 / var(--tw-border-opacity));
}

.border-azureMarine-700 {
  --tw-border-opacity: 1;
  border-color: rgb(3 105 161 / var(--tw-border-opacity));
}

.border-azure-600 {
  --tw-border-opacity: 1;
  border-color: rgb(37 99 235 / var(--tw-border-opacity));
}

.border-upBar {
  --tw-border-opacity: 1;
  border-color: rgb(190 85 85 / var(--tw-border-opacity));
}

.border-gray-200 {
  --tw-border-opacity: 1;
  border-color: rgb(228 228 231 / var(--tw-border-opacity));
}

.border-azure-400 {
  --tw-border-opacity: 1;
  border-color: rgb(96 165 250 / var(--tw-border-opacity));
}

.border-azure-200 {
  --tw-border-opacity: 1;
  border-color: rgb(191 219 254 / var(--tw-border-opacity));
}

.border-azure-700 {
  --tw-border-opacity: 1;
  border-color: rgb(29 78 216 / var(--tw-border-opacity));
}

.border-card {
  --tw-border-opacity: 1;
  border-color: rgb(173 54 54 / var(--tw-border-opacity));
}

.border-azureMarine-800 {
  --tw-border-opacity: 1;
  border-color: rgb(7 89 133 / var(--tw-border-opacity));
}

.border-cerise-500 {
  --tw-border-opacity: 1;
  border-color: rgb(244 63 94 / var(--tw-border-opacity));
}

.border-azureAqua-500 {
  --tw-border-opacity: 1;
  border-color: rgb(6 182 212 / var(--tw-border-opacity));
}

.border-gray-700 {
  --tw-border-opacity: 1;
  border-color: rgb(63 63 70 / var(--tw-border-opacity));
}

.border-emerald-500 {
  --tw-border-opacity: 1;
  border-color: rgb(34 197 94 / var(--tw-border-opacity));
}

.border-cerise-600 {
  --tw-border-opacity: 1;
  border-color: rgb(225 29 72 / var(--tw-border-opacity));
}

.border-pumpkin-600 {
  --tw-border-opacity: 1;
  border-color: rgb(234 88 12 / var(--tw-border-opacity));
}

.border-gray-100 {
  --tw-border-opacity: 1;
  border-color: rgb(244 244 245 / var(--tw-border-opacity));
}

.border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgb(212 212 216 / var(--tw-border-opacity));
}

.border-azure-500 {
  --tw-border-opacity: 1;
  border-color: rgb(59 130 246 / var(--tw-border-opacity));
}

.border-gray-500 {
  --tw-border-opacity: 1;
  border-color: rgb(113 113 122 / var(--tw-border-opacity));
}

.border-fontColor {
  --tw-border-opacity: 1;
  border-color: rgb(224 180 180 / var(--tw-border-opacity));
}

.border-gray-600 {
  --tw-border-opacity: 1;
  border-color: rgb(82 82 91 / var(--tw-border-opacity));
}

.border-azureAqua-700 {
  --tw-border-opacity: 1;
  border-color: rgb(14 116 144 / var(--tw-border-opacity));
}

.border-azureAqua-600 {
  --tw-border-opacity: 1;
  border-color: rgb(8 145 178 / var(--tw-border-opacity));
}

.border-b-azureMarine-700 {
  --tw-border-opacity: 1;
  border-bottom-color: rgb(3 105 161 / var(--tw-border-opacity));
}

.border-b-cerise-900 {
  --tw-border-opacity: 1;
  border-bottom-color: rgb(136 19 55 / var(--tw-border-opacity));
}

.border-r-cerise-900 {
  --tw-border-opacity: 1;
  border-right-color: rgb(136 19 55 / var(--tw-border-opacity));
}

.bg-gray-900 {
  --tw-bg-opacity: 1;
  background-color: rgb(24 24 27 / var(--tw-bg-opacity));
}

.bg-saffron-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(234 179 8 / var(--tw-bg-opacity));
}

.bg-gray-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(250 250 250 / var(--tw-bg-opacity));
}

.bg-white-0 {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

.bg-gray-600 {
  --tw-bg-opacity: 1;
  background-color: rgb(82 82 91 / var(--tw-bg-opacity));
}

.bg-gray-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(113 113 122 / var(--tw-bg-opacity));
}

.bg-azureMarine-600 {
  --tw-bg-opacity: 1;
  background-color: rgb(2 132 199 / var(--tw-bg-opacity));
}

.bg-cerise-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 205 211 / var(--tw-bg-opacity));
}

.bg-azureMarine-700 {
  --tw-bg-opacity: 1;
  background-color: rgb(3 105 161 / var(--tw-bg-opacity));
}

.bg-gray-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(244 244 245 / var(--tw-bg-opacity));
}

.bg-card {
  --tw-bg-opacity: 1;
  background-color: rgb(173 54 54 / var(--tw-bg-opacity));
}

.bg-gray-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(228 228 231 / var(--tw-bg-opacity));
}

.bg-emerald-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(220 252 231 / var(--tw-bg-opacity));
}

.bg-island-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(20 184 166 / var(--tw-bg-opacity));
}

.bg-azureMarine-800 {
  --tw-bg-opacity: 1;
  background-color: rgb(7 89 133 / var(--tw-bg-opacity));
}

.bg-cerise-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(255 228 230 / var(--tw-bg-opacity));
}

.bg-gray-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(161 161 170 / var(--tw-bg-opacity));
}

.bg-upBar {
  --tw-bg-opacity: 1;
  background-color: rgb(190 85 85 / var(--tw-bg-opacity));
}

.bg-azureMarine-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(224 242 254 / var(--tw-bg-opacity));
}

.bg-azure-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(239 246 255 / var(--tw-bg-opacity));
}

.bg-gray-700 {
  --tw-bg-opacity: 1;
  background-color: rgb(63 63 70 / var(--tw-bg-opacity));
}

.p-2 {
  padding: 0.5rem;
}

.p-1 {
  padding: 0.25rem;
}

.p-7 {
  padding: 1.75rem;
}

.p-4 {
  padding: 1rem;
}

.p-0 {
  padding: 0px;
}

.p-1\.5 {
  padding: 0.375rem;
}

.p-5 {
  padding: 1.25rem;
}

.px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}

.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.py-8 {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.py-7 {
  padding-top: 1.75rem;
  padding-bottom: 1.75rem;
}

.px-7 {
  padding-left: 1.75rem;
  padding-right: 1.75rem;
}

.py-9 {
  padding-top: 2.25rem;
  padding-bottom: 2.25rem;
}

.px-1 {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}

.px-1\.5 {
  padding-left: 0.375rem;
  padding-right: 0.375rem;
}

.px-10 {
  padding-left: 2.5rem;
  padding-right: 2.5rem;
}

.px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}

.pt-16 {
  padding-top: 4rem;
}

.pt-12 {
  padding-top: 3rem;
}

.pt-7 {
  padding-top: 1.75rem;
}

.pt-4 {
  padding-top: 1rem;
}

.pb-2 {
  padding-bottom: 0.5rem;
}

.pb-3 {
  padding-bottom: 0.75rem;
}

.pt-2 {
  padding-top: 0.5rem;
}

.pl-1 {
  padding-left: 0.25rem;
}

.pb-4 {
  padding-bottom: 1rem;
}

.pr-1 {
  padding-right: 0.25rem;
}

.pl-3 {
  padding-left: 0.75rem;
}

.pr-2 {
  padding-right: 0.5rem;
}

.pr-4 {
  padding-right: 1rem;
}

.pl-4 {
  padding-left: 1rem;
}

.pl-2 {
  padding-left: 0.5rem;
}

.pb-1 {
  padding-bottom: 0.25rem;
}

.pl-6 {
  padding-left: 1.5rem;
}

.pr-8 {
  padding-right: 2rem;
}

.pt-0 {
  padding-top: 0px;
}

.pr-16 {
  padding-right: 4rem;
}

.pt-1 {
  padding-top: 0.25rem;
}

.text-left {
  text-align: left;
}

.text-center {
  text-align: center;
}

.text-justify {
  text-align: justify;
}

.text-start {
  text-align: start;
}

.text-end {
  text-align: end;
}

.font-hindMadurai {
  font-family: Hind Madurai, sans-serif;
}

.text-3xl {
  font-size: 1.875rem;
  line-height: 2.25rem;
}

.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}

.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}

.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}

.text-8xl {
  font-size: 6rem;
  line-height: 1;
}

.text-base {
  font-size: 1rem;
  line-height: 1.5rem;
}

.font-bold {
  font-weight: 700;
}

.font-semibold {
  font-weight: 600;
}

.font-medium {
  font-weight: 500;
}

.font-normal {
  font-weight: 400;
}

.font-light {
  font-weight: 300;
}

.text-card {
  --tw-text-opacity: 1;
  color: rgb(173 54 54 / var(--tw-text-opacity));
}

.text-azureMarine-800 {
  --tw-text-opacity: 1;
  color: rgb(7 89 133 / var(--tw-text-opacity));
}

.text-submarine-600 {
  --tw-text-opacity: 1;
  color: rgb(5 150 105 / var(--tw-text-opacity));
}

.text-cerise-500 {
  --tw-text-opacity: 1;
  color: rgb(244 63 94 / var(--tw-text-opacity));
}

.text-white-0 {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}

.text-gray-600 {
  --tw-text-opacity: 1;
  color: rgb(82 82 91 / var(--tw-text-opacity));
}

.text-pink-400 {
  --tw-text-opacity: 1;
  color: rgb(244 114 182 / var(--tw-text-opacity));
}

.text-indigo-400 {
  --tw-text-opacity: 1;
  color: rgb(167 139 250 / var(--tw-text-opacity));
}

.text-pinkViolet-400 {
  --tw-text-opacity: 1;
  color: rgb(232 121 249 / var(--tw-text-opacity));
}

.text-purple-400 {
  --tw-text-opacity: 1;
  color: rgb(192 132 252 / var(--tw-text-opacity));
}

.text-cerise-700 {
  --tw-text-opacity: 1;
  color: rgb(190 18 60 / var(--tw-text-opacity));
}

.text-azure-600 {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity));
}

.text-upBar {
  --tw-text-opacity: 1;
  color: rgb(190 85 85 / var(--tw-text-opacity));
}

.text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(63 63 70 / var(--tw-text-opacity));
}

.text-azureMarine-700 {
  --tw-text-opacity: 1;
  color: rgb(3 105 161 / var(--tw-text-opacity));
}

.text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(113 113 122 / var(--tw-text-opacity));
}

.text-cerise-800 {
  --tw-text-opacity: 1;
  color: rgb(159 18 57 / var(--tw-text-opacity));
}

.text-azure-700 {
  --tw-text-opacity: 1;
  color: rgb(29 78 216 / var(--tw-text-opacity));
}

.text-cerise-600 {
  --tw-text-opacity: 1;
  color: rgb(225 29 72 / var(--tw-text-opacity));
}

.text-gray-800 {
  --tw-text-opacity: 1;
  color: rgb(39 39 42 / var(--tw-text-opacity));
}

.text-gray-400 {
  --tw-text-opacity: 1;
  color: rgb(161 161 170 / var(--tw-text-opacity));
}

.text-azureAqua-500 {
  --tw-text-opacity: 1;
  color: rgb(6 182 212 / var(--tw-text-opacity));
}

.text-emerald-500 {
  --tw-text-opacity: 1;
  color: rgb(34 197 94 / var(--tw-text-opacity));
}

.text-emerald-700 {
  --tw-text-opacity: 1;
  color: rgb(21 128 61 / var(--tw-text-opacity));
}

.text-gray-900 {
  --tw-text-opacity: 1;
  color: rgb(24 24 27 / var(--tw-text-opacity));
}

.text-azure-900 {
  --tw-text-opacity: 1;
  color: rgb(30 58 138 / var(--tw-text-opacity));
}

.text-pumpkin-600 {
  --tw-text-opacity: 1;
  color: rgb(234 88 12 / var(--tw-text-opacity));
}

.text-azure-500 {
  --tw-text-opacity: 1;
  color: rgb(59 130 246 / var(--tw-text-opacity));
}

.text-cerise-100 {
  --tw-text-opacity: 1;
  color: rgb(255 228 230 / var(--tw-text-opacity));
}

.text-fontColor {
  --tw-text-opacity: 1;
  color: rgb(224 180 180 / var(--tw-text-opacity));
}

.text-gray-300 {
  --tw-text-opacity: 1;
  color: rgb(212 212 216 / var(--tw-text-opacity));
}

.text-azureAqua-700 {
  --tw-text-opacity: 1;
  color: rgb(14 116 144 / var(--tw-text-opacity));
}

.text-azureAqua-600 {
  --tw-text-opacity: 1;
  color: rgb(8 145 178 / var(--tw-text-opacity));
}

.underline {
  -webkit-text-decoration-line: underline;
          text-decoration-line: underline;
}

.opacity-20 {
  opacity: 0.2;
}

.opacity-95 {
  opacity: 0.95;
}

.opacity-25 {
  opacity: 0.25;
}

.shadow-md {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.shadow-lg {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.shadow-sm {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.shadow-2xl {
  --tw-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --tw-shadow-colored: 0 25px 50px -12px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.shadow-gray-200 {
  --tw-shadow-color: #e4e4e7;
  --tw-shadow: var(--tw-shadow-colored);
}

.shadow-gray-400 {
  --tw-shadow-color: #a1a1aa;
  --tw-shadow: var(--tw-shadow-colored);
}

.shadow-gray-500 {
  --tw-shadow-color: #71717a;
  --tw-shadow: var(--tw-shadow-colored);
}

.shadow-gray-300 {
  --tw-shadow-color: #d4d4d8;
  --tw-shadow: var(--tw-shadow-colored);
}

.shadow-cerise-800 {
  --tw-shadow-color: #9f1239;
  --tw-shadow: var(--tw-shadow-colored);
}

.outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.outline {
  outline-style: solid;
}

.brightness-50 {
  --tw-brightness: brightness(.5);
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}

.grayscale {
  --tw-grayscale: grayscale(100%);
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}

.invert {
  --tw-invert: invert(100%);
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}

.sepia {
  --tw-sepia: sepia(100%);
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}

.filter {
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}

.transition {
  transition-property: color, background-color, border-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-text-decoration-color, -webkit-backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-text-decoration-color, -webkit-backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.duration-100 {
  transition-duration: 100ms;
}

.duration-200 {
  transition-duration: 200ms;
}

.duration-150 {
  transition-duration: 150ms;
}

.duration-300 {
  transition-duration: 300ms;
}

.card {
  margin: auto;
  display: flex;
  height: 9rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1rem * var(--tw-space-y-reverse));
}

.card {
  border-radius: 0.375rem;
  border-width: 1px;
  --tw-border-opacity: 1;
  border-color: rgb(255 241 242 / var(--tw-border-opacity));
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 600;
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.card:hover {
  --tw-scale-x: 1.05;
  --tw-scale-y: 1.05;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.buttonEdit {
  height: 2rem;
  width: 6rem;
  border-radius: 0.375rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.buttonEdit:hover {
  --tw-scale-x: 1.05;
  --tw-scale-y: 1.05;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.placeholder\:font-medium::-moz-placeholder {
  font-weight: 500;
}

.placeholder\:font-medium::placeholder {
  font-weight: 500;
}

.placeholder\:text-gray-200::-moz-placeholder {
  --tw-text-opacity: 1;
  color: rgb(228 228 231 / var(--tw-text-opacity));
}

.placeholder\:text-gray-200::placeholder {
  --tw-text-opacity: 1;
  color: rgb(228 228 231 / var(--tw-text-opacity));
}

.placeholder\:text-gray-400::-moz-placeholder {
  --tw-text-opacity: 1;
  color: rgb(161 161 170 / var(--tw-text-opacity));
}

.placeholder\:text-gray-400::placeholder {
  --tw-text-opacity: 1;
  color: rgb(161 161 170 / var(--tw-text-opacity));
}

.after\:absolute::after {
  content: var(--tw-content);
  position: absolute;
}

.after\:top-\[2px\]::after {
  content: var(--tw-content);
  top: 2px;
}

.after\:left-\[2px\]::after {
  content: var(--tw-content);
  left: 2px;
}

.after\:h-5::after {
  content: var(--tw-content);
  height: 1.25rem;
}

.after\:w-5::after {
  content: var(--tw-content);
  width: 1.25rem;
}

.after\:rounded-full::after {
  content: var(--tw-content);
  border-radius: 9999px;
}

.after\:border::after {
  content: var(--tw-content);
  border-width: 1px;
}

.after\:border-gray-300::after {
  content: var(--tw-content);
  --tw-border-opacity: 1;
  border-color: rgb(212 212 216 / var(--tw-border-opacity));
}

.after\:bg-white-0::after {
  content: var(--tw-content);
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

.after\:transition-all::after {
  content: var(--tw-content);
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.after\:content-\[\'\'\]::after {
  --tw-content: '';
  content: var(--tw-content);
}

.odd\:bg-azure-50:nth-child(odd) {
  --tw-bg-opacity: 1;
  background-color: rgb(239 246 255 / var(--tw-bg-opacity));
}

.hover\:h-12:hover {
  height: 3rem;
}

.hover\:w-98pct:hover {
  width: 98%;
}

.hover\:-translate-y-1:hover {
  --tw-translate-y: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.hover\:scale-105:hover {
  --tw-scale-x: 1.05;
  --tw-scale-y: 1.05;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.hover\:scale-95:hover {
  --tw-scale-x: .95;
  --tw-scale-y: .95;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.hover\:scale-100:hover {
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.hover\:scale-110:hover {
  --tw-scale-x: 1.1;
  --tw-scale-y: 1.1;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.hover\:border:hover {
  border-width: 1px;
}

.hover\:border-gray-300:hover {
  --tw-border-opacity: 1;
  border-color: rgb(212 212 216 / var(--tw-border-opacity));
}

.hover\:border-azureAqua-500:hover {
  --tw-border-opacity: 1;
  border-color: rgb(6 182 212 / var(--tw-border-opacity));
}

.hover\:bg-azure-600:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(37 99 235 / var(--tw-bg-opacity));
}

.hover\:bg-upBar:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(190 85 85 / var(--tw-bg-opacity));
}

.hover\:bg-azure-700:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity));
}

.hover\:bg-card:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(173 54 54 / var(--tw-bg-opacity));
}

.hover\:bg-cerise-500:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(244 63 94 / var(--tw-bg-opacity));
}

.hover\:bg-azureMarine-700:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(3 105 161 / var(--tw-bg-opacity));
}

.hover\:bg-cerise-200:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(254 205 211 / var(--tw-bg-opacity));
}

.hover\:bg-azure-500:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(59 130 246 / var(--tw-bg-opacity));
}

.hover\:text-white-0:hover {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}

.hover\:text-gray-100:hover {
  --tw-text-opacity: 1;
  color: rgb(244 244 245 / var(--tw-text-opacity));
}

.hover\:text-gray-200:hover {
  --tw-text-opacity: 1;
  color: rgb(228 228 231 / var(--tw-text-opacity));
}

.hover\:text-azureAqua-500:hover {
  --tw-text-opacity: 1;
  color: rgb(6 182 212 / var(--tw-text-opacity));
}

.hover\:opacity-100:hover {
  opacity: 1;
}

.hover\:shadow-sm:hover {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.hover\:shadow-xl:hover {
  --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.hover\:shadow-none:hover {
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.hover\:shadow-lg:hover {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.hover\:brightness-125:hover {
  --tw-brightness: brightness(1.25);
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}

.focus\:border:focus {
  border-width: 1px;
}

.focus\:border-gray-300:focus {
  --tw-border-opacity: 1;
  border-color: rgb(212 212 216 / var(--tw-border-opacity));
}

.focus\:ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

.focus\:ring-cerise-400:focus {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(251 113 133 / var(--tw-ring-opacity));
}

.active\:text-white-0:active {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}

.peer:checked ~ .peer-checked\:bg-azureMarine-600 {
  --tw-bg-opacity: 1;
  background-color: rgb(2 132 199 / var(--tw-bg-opacity));
}

.peer:checked ~ .peer-checked\:after\:translate-x-full::after {
  content: var(--tw-content);
  --tw-translate-x: 100%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.peer:checked ~ .peer-checked\:after\:border-white-0::after {
  content: var(--tw-content);
  --tw-border-opacity: 1;
  border-color: rgb(255 255 255 / var(--tw-border-opacity));
}

.peer:focus ~ .peer-focus\:outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

@media (prefers-color-scheme: dark) {
  .dark\:border-gray-600 {
    --tw-border-opacity: 1;
    border-color: rgb(82 82 91 / var(--tw-border-opacity));
  }

  .dark\:bg-gray-700 {
    --tw-bg-opacity: 1;
    background-color: rgb(63 63 70 / var(--tw-bg-opacity));
  }

  .dark\:bg-cerise-200 {
    --tw-bg-opacity: 1;
    background-color: rgb(254 205 211 / var(--tw-bg-opacity));
  }

  .dark\:text-gray-300 {
    --tw-text-opacity: 1;
    color: rgb(212 212 216 / var(--tw-text-opacity));
  }

  .dark\:hover\:bg-cerise-300:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(253 164 175 / var(--tw-bg-opacity));
  }
}

@media (min-width: 768px) {
  .md\:w-2\/5 {
    width: 40%;
  }

  .md\:w-11\/12 {
    width: 91.666667%;
  }

  .md\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .md\:flex-row {
    flex-direction: row;
  }
}

@media (min-width: 1024px) {
  .lg\:top-10 {
    top: 2.5rem;
  }

  .lg\:top-0 {
    top: 0px;
  }

  .lg\:mb-0 {
    margin-bottom: 0px;
  }

  .lg\:mt-0 {
    margin-top: 0px;
  }

  .lg\:mt-10 {
    margin-top: 2.5rem;
  }

  .lg\:mt-4 {
    margin-top: 1rem;
  }

  .lg\:inline {
    display: inline;
  }

  .lg\:flex {
    display: flex;
  }

  .lg\:h-56 {
    height: 14rem;
  }

  .lg\:h-50v {
    height: 50vh;
  }

  .lg\:h-55v {
    height: 55vh;
  }

  .lg\:w-4\/5 {
    width: 80%;
  }

  .lg\:w-5\/6 {
    width: 83.333333%;
  }

  .lg\:w-1\/3 {
    width: 33.333333%;
  }

  .lg\:w-80 {
    width: 20rem;
  }

  .lg\:w-2\/5 {
    width: 40%;
  }

  .lg\:w-56 {
    width: 14rem;
  }

  .lg\:w-3\/5 {
    width: 60%;
  }

  .lg\:w-10\/12 {
    width: 83.333333%;
  }

  .lg\:w-1\/4 {
    width: 25%;
  }

  .lg\:w-100 {
    width: 580px;
  }

  .lg\:w-1\/6 {
    width: 16.666667%;
  }

  .lg\:w-2\/6 {
    width: 33.333333%;
  }

  .lg\:w-600p {
    width: 600px;
  }

  .lg\:w-40 {
    width: 10rem;
  }

  .lg\:w-1\/2 {
    width: 50%;
  }

  .lg\:w-auto {
    width: auto;
  }

  .lg\:w-20 {
    width: 5rem;
  }

  .lg\:w-96 {
    width: 24rem;
  }

  .lg\:w-full {
    width: 100%;
  }

  .lg\:w-4\/6 {
    width: 66.666667%;
  }

  .lg\:w-48 {
    width: 12rem;
  }

  .lg\:scale-105 {
    --tw-scale-x: 1.05;
    --tw-scale-y: 1.05;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .lg\:scale-100 {
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .lg\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .lg\:flex-row {
    flex-direction: row;
  }

  .lg\:place-items-start {
    place-items: start;
  }

  .lg\:items-start {
    align-items: flex-start;
  }

  .lg\:items-end {
    align-items: flex-end;
  }

  .lg\:justify-start {
    justify-content: flex-start;
  }

  .lg\:justify-between {
    justify-content: space-between;
  }

  .lg\:gap-0 {
    gap: 0px;
  }

  .lg\:space-y-0 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-y-reverse: 0;
    margin-top: calc(0px * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(0px * var(--tw-space-y-reverse));
  }

  .lg\:space-x-4 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(1rem * var(--tw-space-x-reverse));
    margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .lg\:space-x-7 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(1.75rem * var(--tw-space-x-reverse));
    margin-left: calc(1.75rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .lg\:space-x-2 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .lg\:space-x-0 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0px * var(--tw-space-x-reverse));
    margin-left: calc(0px * calc(1 - var(--tw-space-x-reverse)));
  }

  .lg\:space-x-1 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.25rem * var(--tw-space-x-reverse));
    margin-left: calc(0.25rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .lg\:overflow-auto {
    overflow: auto;
  }

  .lg\:rounded-none {
    border-radius: 0px;
  }

  .lg\:p-0 {
    padding: 0px;
  }

  .lg\:px-10 {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }

  .lg\:px-8 {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .lg\:pt-16 {
    padding-top: 4rem;
  }

  .lg\:pt-0 {
    padding-top: 0px;
  }

  .lg\:pr-8 {
    padding-right: 2rem;
  }

  .lg\:pr-16 {
    padding-right: 4rem;
  }

  .lg\:pr-9 {
    padding-right: 2.25rem;
  }

  .lg\:text-left {
    text-align: left;
  }

  .lg\:text-2xl {
    font-size: 1.5rem;
    line-height: 2rem;
  }

  .lg\:text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .lg\:text-lg {
    font-size: 1.125rem;
    line-height: 1.75rem;
  }

  .lg\:text-base {
    font-size: 1rem;
    line-height: 1.5rem;
  }

  .lg\:hover\:w-full:hover {
    width: 100%;
  }
}

@media (min-width: 1280px) {
  .xl\:absolute {
    position: absolute;
  }

  .xl\:right-1 {
    right: 0.25rem;
  }

  .xl\:top-14 {
    top: 3.5rem;
  }

  .xl\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .xl\:overflow-y-visible {
    overflow-y: visible;
  }

  .xl\:p-4 {
    padding: 1rem;
  }
}

                </style>
            </head>
            <body>
                ${element.innerHTML}
                <script src="${url}"></script>
            </body>
            </html>
        `);

            addStyles(win, styles);

            setTimeout(() => {
                win.document.close();
                win.focus();
                win.print();
                win.close();
                cb();
            }, 1000);

            return true;
        };
    }
};

export default VueHtmlToPaper;
