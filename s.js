
function abrirEmNovaAba(projeto) {
// const lang = document.documentElement.lang + '/'
  window.open(`https://cristianmattos.github.io/${projeto}`, '_blank');
}


document.addEventListener('DOMContentLoaded', () => {
  // Obtém a linguagem principal do navegador (ex: 'en', 'pt', 'ru')
  function getBrowserLanguage() {
    const userLang = navigator.language || navigator.userLanguage;
    return userLang.split('-')[0];
  }

  // Carrega o JSON de idioma com base na linguagem
  function carregarIdioma(lang = "pt") {
    fetch(`./api/${lang}.json`)
      .then(res => {
        if (!res.ok) throw new Error("Idioma não encontrado");
        return res.json();
      })
      .then(data => aplicarTraducoes(data))
      .catch(() => {
        // Fallback: se idioma não encontrado, usa português
        if (lang !== "pt") carregarIdioma("pt");
      });
  }

  // Aplica o conteúdo traduzido na página
  function aplicarTraducoes(data) {
   document.documentElement.lang = data.lang;


    // Título
    document.title = data.title;
    document.getElementById("intro-title").textContent = data.intro.title;
    document.getElementById("intro-location").textContent = data.intro.location;

    // Menu
    document.getElementById("menu-experiencia").textContent = data.menu.experiencia;
    document.getElementById("menu-formacao").textContent = data.menu.formacao;
    document.getElementById("menu-contato").textContent = data.menu.contato;

    // Rodapé
    document.getElementById("footer-msg").textContent = data.footer.mensagem;
  }

  // Detecta idioma e carrega traduções
  const navegadorLang = getBrowserLanguage();
  carregarIdioma(navegadorLang);
});

