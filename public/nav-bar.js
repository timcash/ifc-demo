function css() {
  return `
    *:where(:not(iframe, canvas, img, svg, video):not(svg *, symbol *)) {
      all: unset;
      display: revert;
    }
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }
    :root {
      font-family: Monaco; 
    }
    a {
      font-size: 3em;
      font-weight: bold;
      cursor: pointer;
    }
    a:link {
      color: white;
      text-decoration: none;
    }

    a:hover {
      color: var(--color-aware);
    }
    
    ul {
      position: fixed;
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 1.2em;
      z-index: 1;
      align-items: left;
      bottom: 0;
      left: 0;
    }
    button {
      padding: 0 10px 5px 10px;
      cursor: pointer;
      position: fixed;
      bottom: 20px;
      right: 20px;
      font-size: 1.5em;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease-in-out;
      border-radius: 20px 20px;
    }
    button:hover {
      background-color: var(--color-aware);
      color: var(--color-background);
    }
    `;
}
function nav(title) {
  // trigram for heaven in utf-8
  const trigram = "☰";
  const template = document.createElement("template");
  template.innerHTML = `<nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/h3.html">Globe</a></li>
      <li><a href="/e/1">Edit</a></li>
      <li><a href="/file.html">File</a></li>
      <li><a href="/record.html">Record</a></li>
    </ul> 
    <button aria-label="menu"><h1>${trigram}</h1></button>
  </nav>`;
  return template.content.cloneNode(true);
}

class Navigation extends HTMLElement {
  constructor(key) {
    super();
    this.key = this.getAttribute("data-key");
    this.title = this.getAttribute("data-title");
    this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    const template = nav(this.key);
    style.textContent = css();
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(template);

    //this.onclick = onMenuToggle;
  }

  connectedCallback() {
    const links = this.shadowRoot.querySelector("ul");
    const title = this.shadowRoot.querySelector("h1");
    links.style.visibility = "hidden";

    const f = () => {
      links.style.visibility =
        links.style.visibility === "visible" ? "hidden" : "visible";
    };

    title.addEventListener("click", f);
  }

  disconnectedCallback() {}
}

customElements.define("nav-bar", Navigation);
