(() => {
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // api_ressources.ts
  var URL_PHOTOS = "https://webetu.iutnc.univ-lorraine.fr/www/canals5/phox/api/photos/";
  var URL_API = "https://webetu.iutnc.univ-lorraine.fr";

  // lib/photoloader.ts
  function loadPicture(id2) {
    return __async(this, null, function* () {
      const response = yield fetch(URL_PHOTOS + id2, {
        credentials: "include"
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return yield response.json();
    });
  }
  function loadRessource(uri) {
    return __async(this, null, function* () {
      const url = URL_API + uri;
      const response = yield fetch(url, { credentials: "include" });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return yield response.json();
    });
  }

  // lib/ui.ts
  function displayPicture(data) {
    const templateElement = document.querySelector("#photoTemplate");
    if (!templateElement) {
      throw new Error("Template #photoTemplate introuvable");
    }
    const source = templateElement.innerHTML;
    const template = Handlebars.compile(source);
    const html = template(data);
    const container = document.getElementById("photo");
    if (container) {
      container.innerHTML = html;
    }
  }
  function displayCategory(category) {
    const el = document.getElementById("la_categorie");
    if (!el) {
      throw new Error("Element #la_categorie introuvable");
    }
    const name = category.categorie.nom;
    el.innerHTML = `<p>${name}</p>`;
  }
  function displayComments(data) {
    const ul = document.getElementById("les_commentaires");
    if (!ul) {
      throw new Error("Element #les_commentaires introuvable");
    }
    ul.innerHTML = "";
    data.comments.forEach((comment) => {
      const li = document.createElement("li");
      li.innerHTML = `
            <p>(${comment.pseudo}) ${comment.content}</p>
        `;
      ul.appendChild(li);
    });
  }
  function displayGallery(items) {
    const container = document.getElementById("gallery");
    if (!container) {
      throw new Error("#gallery introuvable");
    }
    container.innerHTML = "";
    items.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("thumbnail");
      div.innerHTML = `
            <img src="https://webetu.iutnc.univ-lorraine.fr${item.photo.thumbnail.href}" />
            <p>${item.photo.titre}</p>
        `;
      container.appendChild(div);
    });
  }

  // lib/gallery.ts
  var currentGallery = null;
  var links = null;
  function load(pageUrl) {
    return __async(this, null, function* () {
      const url = pageUrl != null ? pageUrl : "/www/canals5/phox/api/photos?size=10";
      const data = yield loadRessource(url);
      currentGallery = data;
      links = data.links;
      return data;
    });
  }
  function next() {
    return __async(this, null, function* () {
      var _a6;
      if (!((_a6 = links == null ? void 0 : links.next) == null ? void 0 : _a6.href)) return null;
      return yield load(links.next.href);
    });
  }
  function prev() {
    return __async(this, null, function* () {
      var _a6;
      if (!((_a6 = links == null ? void 0 : links.prev) == null ? void 0 : _a6.href)) return null;
      return yield load(links.prev.href);
    });
  }
  function first() {
    return __async(this, null, function* () {
      var _a6;
      if (!((_a6 = links == null ? void 0 : links.first) == null ? void 0 : _a6.href)) return null;
      return yield load(links.first.href);
    });
  }
  function last() {
    return __async(this, null, function* () {
      var _a6;
      if (!((_a6 = links == null ? void 0 : links.last) == null ? void 0 : _a6.href)) return null;
      return yield load(links.last.href);
    });
  }

  // lib/gallery_ui.ts
  function display_galerie(gallery) {
    const container = document.getElementById("gallery");
    if (!container) return;
    container.innerHTML = "";
    gallery.photos.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("thumbnail");
      div.setAttribute("data-photoId", item.photo.id.toString());
      div.innerHTML = `
            <img src="https://webetu.iutnc.univ-lorraine.fr${item.photo.thumbnail.href}">
            <p>${item.photo.titre}</p>
        `;
      div.addEventListener("click", () => __async(null, null, function* () {
        const id2 = item.photo.id;
        yield getPicture(id2);
      }));
      container.appendChild(div);
    });
  }

  // index.ts
  function getPicture(id2) {
    return __async(this, null, function* () {
      const photo = yield loadPicture(id2);
      if (photo) {
        displayPicture(photo);
        const category = yield getCategory(photo);
        displayCategory(category);
        const commentsData = yield getComments(photo);
        displayComments(commentsData);
      }
    });
  }
  function loadGallery() {
    return __async(this, null, function* () {
      const data = yield loadRessource(
        "/www/canals5/phox/api/photos?size=10"
      );
      displayGallery(data.photos);
    });
  }
  function getCategory(photo) {
    return __async(this, null, function* () {
      return yield loadRessource(photo.links.categorie.href);
    });
  }
  function getComments(photo) {
    return __async(this, null, function* () {
      return yield loadRessource(photo.links.comments.href);
    });
  }
  var _a;
  (_a = document.getElementById("loadGalleryBtn")) == null ? void 0 : _a.addEventListener("click", () => __async(null, null, function* () {
    const data = yield load();
    display_galerie(data);
  }));
  var _a2;
  (_a2 = document.getElementById("nextBtn")) == null ? void 0 : _a2.addEventListener("click", () => __async(null, null, function* () {
    const data = yield next();
    if (data) display_galerie(data);
  }));
  var _a3;
  (_a3 = document.getElementById("prevBtn")) == null ? void 0 : _a3.addEventListener("click", () => __async(null, null, function* () {
    const data = yield prev();
    if (data) display_galerie(data);
  }));
  var _a4;
  (_a4 = document.getElementById("firstBtn")) == null ? void 0 : _a4.addEventListener("click", () => __async(null, null, function* () {
    const data = yield first();
    if (data) display_galerie(data);
  }));
  var _a5;
  (_a5 = document.getElementById("lastBtn")) == null ? void 0 : _a5.addEventListener("click", () => __async(null, null, function* () {
    const data = yield last();
    if (data) display_galerie(data);
  }));
  var id = window.location.hash ? Number(window.location.hash.slice(1)) : 105;
  loadGallery();
})();
//# sourceMappingURL=index.js.map
