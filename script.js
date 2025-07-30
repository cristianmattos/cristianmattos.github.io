
function abrirEmNovaAba(projeto) {
const lang = document.documentElement.lang + '/'
  window.open(`https://cristianmattos.github.io/${projeto}`, '_blank');
}

[
 document.addEventListener('DOMContentLoaded', () => {
    // Função para obter o idioma do navegador
    function getBrowserLanguage() {
        const userLang = navigator.language || navigator.userLanguage;
        // Retorna apenas a parte principal do idioma (ex: 'en', 'pt', 'ru')
        return userLang.split('-')[0];
    }



     // Função para redirecionar o usuário
    function redirectToLocalizedPage() {
        const lang = getBrowserLanguage();
        let targetPath = '';

        // Mapeamento de idiomas e suas respectivas pastas
        // Adicione mais idiomas conforme necessário
        switch (lang) {
            case 'en':
                targetPath = '/en/index.html';
                break;
            case 'ru':
                targetPath = '/ru/index.html';
                break;
            case 'pt': // Exemplo para português, caso seu navegador esteja em pt-BR, pt-PT, etc.
                targetPath = '/pt/index.html';
                break;
            default:
                // Idioma padrão caso não haja uma tradução específica
                // Você pode redirecionar para inglês, português, ou uma página neutra
                targetPath = '/en/index.html'; // Redireciona para inglês como padrão
                break;
        }

        // Verifica se o usuário já está na página de idioma correta para evitar loops
        const currentPath = window.location.pathname;
        const currentFolder = currentPath.split('/')[1]; // Pega a primeira pasta (e.g., 'en', 'ru')

        // Se o idioma detectado não corresponder à pasta atual OU
        // Se a página atual for a raiz (index.html) e precisar ser redirecionada
        if (currentFolder !== lang && currentPath !== targetPath) {
            window.location.href = targetPath;
        }
    }

    // Chama a função de redirecionamento quando a página é carregada
    redirectToLocalizedPage();
});



]