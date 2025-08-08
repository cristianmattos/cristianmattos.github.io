
    // Configuração única de idiomas com todas as informações
    const IDIOMAS_CONFIG = {
      'pt': { nome: 'Português', bandeira: '🇧🇷', dir: 'ltr', lang: 'pt-BR', fallback: null },
      'en': { nome: 'English', bandeira: '🇺🇸', dir: 'ltr', lang: 'en-US', fallback: 'pt' },
      'es': { nome: 'Español', bandeira: '🇪🇸', dir: 'ltr', lang: 'es', fallback: 'en' },
      'fr': { nome: 'Français', bandeira: '🇫🇷', dir: 'ltr', lang: 'fr', fallback: 'en' },
      'de': { nome: 'Deutsch', bandeira: '🇩🇪', dir: 'ltr', lang: 'de', fallback: 'en' },
      'it': { nome: 'Italiano', bandeira: '🇮🇹', dir: 'ltr', lang: 'it', fallback: 'en' },
      'ja': { nome: '日本語', bandeira: '🇯🇵', dir: 'ltr', lang: 'ja', fallback: 'en' },
      'ko': { nome: '한국어', bandeira: '🇰🇷', dir: 'ltr', lang: 'ko', fallback: 'en' },
      'zh': { nome: '中文', bandeira: '🇨🇳', dir: 'ltr', lang: 'zh', fallback: 'en' },
      'ru': { nome: 'Русский', bandeira: '🇷🇺', dir: 'ltr', lang: 'ru', fallback: 'en' },
      'nl': { nome: 'Nederlands', bandeira: '🇳🇱', dir: 'ltr', lang: 'nl', fallback: 'en' },
      'sv': { nome: 'Svenska', bandeira: '🇸🇪', dir: 'ltr', lang: 'sv', fallback: 'en' },
      'pl': { nome: 'Polski', bandeira: '🇵🇱', dir: 'ltr', lang: 'pl', fallback: 'en' },
      'fi': { nome: 'Suomi', bandeira: '🇫🇮', dir: 'ltr', lang: 'fi', fallback: 'en' },
      'no': { nome: 'Norsk', bandeira: '🇳🇴', dir: 'ltr', lang: 'no', fallback: 'en' },
      'da': { nome: 'Dansk', bandeira: '🇩🇰', dir: 'ltr', lang: 'da', fallback: 'en' },
      'hu': { nome: 'Magyar', bandeira: '🇭🇺', dir: 'ltr', lang: 'hu', fallback: 'en' },
      'cs': { nome: 'Čeština', bandeira: '🇨🇿', dir: 'ltr', lang: 'cs', fallback: 'en' },
      'sk': { nome: 'Slovenčina', bandeira: '🇸🇰', dir: 'ltr', lang: 'sk', fallback: 'en' },
      'vi': { nome: 'Tiếng Việt', bandeira: '🇻🇳', dir: 'ltr', lang: 'vi', fallback: 'en' },
      'id': { nome: 'Bahasa Indonesia', bandeira: '🇮🇩', dir: 'ltr', lang: 'id', fallback: 'en' },
      'ms': { nome: 'Bahasa Melayu', bandeira: '🇲🇾', dir: 'ltr', lang: 'ms', fallback: 'en' },
      'tr': { nome: 'Türkçe', bandeira: '🇹🇷', dir: 'ltr', lang: 'tr', fallback: 'en' },
      'el': { nome: 'Ελληνικά', bandeira: '🇬🇷', dir: 'ltr', lang: 'el', fallback: 'en' },
      'ro': { nome: 'Română', bandeira: '🇷🇴', dir: 'ltr', lang: 'ro', fallback: 'en' },
      'hi': { nome: 'हिंदी', bandeira: '🇮🇳', dir: 'ltr', lang: 'hi', fallback: 'en' },
      // Idiomas RTL
      'ar': { nome: 'العربية', bandeira: '🇸🇦', dir: 'rtl', lang: 'ar', fallback: 'en' },
      'he': { nome: 'עברית', bandeira: '🇮🇱', dir: 'rtl', lang: 'he', fallback: 'en' },
      'fa': { nome: 'فارسی', bandeira: '🇮🇷', dir: 'rtl', lang: 'fa', fallback: 'en' },
      'ur': { nome: 'اردو', bandeira: '🇵🇰', dir: 'rtl', lang: 'ur', fallback: 'en' }
    };

    let idiomaAtual = 'pt';
    let traducaoCache = {};

    // Função para detectar o idioma do navegador
    function detectarIdioma() {
      const idiomaBasico = (navigator.language || navigator.userLanguage).split('-')[0].toLowerCase();
      console.log('Idioma do navegador detectado:', idiomaBasico);

      // Retorna o idioma se suportado, senão retorna português
      return IDIOMAS_CONFIG[idiomaBasico] ? idiomaBasico : 'pt';
    }

    // Função para mostrar/esconder indicador de carregamento
    function mostrarCarregamento(mostrar) {
      const indicator = document.getElementById('loading-indicator');
      indicator.style.display = mostrar ? 'block' : 'none';
    }

    // Função para atualizar lang e dir do HTML
    function atualizarDirecaoHTML(idioma) {
      const htmlElement = document.getElementById('html-element');
      const bodyElement = document.body;
      const config = IDIOMAS_CONFIG[idioma];


      if (config) {
        // Atualiza o lang do HTML
        htmlElement.setAttribute('lang', config.lang);

        // Atualiza a direção do texto
        htmlElement.setAttribute('dir', config.dir);
        bodyElement.setAttribute('dir', config.dir);

        console.log(`Idioma alterado para: ${config.lang}, Direção: ${config.dir}`);
      } else {
        console.warn(`Configuração não encontrada para idioma: ${idioma}`);
        // Fallback para LTR
        htmlElement.setAttribute('lang', idioma);
        htmlElement.setAttribute('dir', 'ltr');
        bodyElement.setAttribute('dir', 'ltr');
      }
    }

    // Função para carregar as traduções com cache
    async function carregarTraducoes(idioma) {
      // Verifica se já está em cache
      if (traducaoCache[idioma]) {
        console.log(`Traduções do cache para ${idioma}`);
        return traducaoCache[idioma];
      }

      try {
        mostrarCarregamento(true);
        console.log(`Carregando traduções para ${idioma}...`);

        const response = await fetch(`./api/${idioma}.json`);
        if (!response.ok) {
          throw new Error(`Erro ${response.status} ao carregar ${idioma}.json`);
        }

        const traducoes = await response.json();
        console.log(`Traduções carregadas para ${idioma}:`, traducoes);

        // Salva no cache
        traducaoCache[idioma] = traducoes;
        return traducoes;

      } catch (error) {
        console.error(`Erro ao carregar traduções para ${idioma}:`, error);

        // Tenta fallback
        const fallback = IDIOMAS_CONFIG[idioma]?.fallback;
        if (fallback && fallback !== idioma) {
          console.log(`Tentando fallback para ${fallback}`);
          return await carregarTraducoes(fallback);
        }

        return null;
      } finally {
        mostrarCarregamento(false);
      }
    }

    // Função para aplicar as traduções na página
    function aplicarTraducoes(traducoes) {
      console.log('Aplicando traduções:', traducoes);

      // Título da introdução
      const introTitle = document.getElementById('intro-title');
      if (introTitle) {
        const title = traducoes.intro?.title || 'Desenvolvedor Front End & UX/UI Designer';
        introTitle.textContent = title;
      }

      // Localização
      const introLocation = document.getElementById('intro-location');
      if (introLocation) {
        const location = traducoes.intro?.location || 'Local capital de São Paulo 📍';
        introLocation.textContent = location;
      }

      // Menu de navegação
      const navExperience = document.getElementById('nav-experience');
      const navEducation = document.getElementById('nav-education');
      const navContact = document.getElementById('nav-contact');

      const navData = traducoes.nav || {};
      const menuData = traducoes.header?.menu || [];

      if (navExperience) {
        navExperience.textContent = navData.experience || menuData[0]?.label || 'Experiência';
      }
      if (navEducation) {
        navEducation.textContent = navData.education || menuData[1]?.label || 'Formação';
      }
      if (navContact) {
        navContact.textContent = navData.contact || menuData[2]?.label || 'Contato';
      }

      // Seção de Experiência
      const experienceTitle = document.getElementById('experience-title');
      if (experienceTitle) {
        experienceTitle.textContent = traducoes.experience?.sectionTitle || 'Experiência';
      }

      const experienceText = document.getElementById('experience-text');
      if (experienceText) {
        const text = traducoes.experience?.text || traducoes.experiencia?.descricao || experienceText.innerHTML;
        experienceText.innerHTML = text;
      }

      // Projetos - CORRIGIDO: Agora traduz títulos, tecnologias e descrições
      const projectTitles = ['project-title-1', 'project-title-2', 'project-title-3'];
      const techLabels = ['tech-label-1', 'tech-label-2', 'tech-label-3'];
      const projectDescs = ['project-desc-1', 'project-desc-2', 'project-desc-3'];
      const projects = traducoes.experience?.projects || traducoes.experiencia?.projetos || [];

      projects.forEach((project, index) => {
        if (index < projectTitles.length) {
          // Traduzir título do projeto
          const projectTitle = document.getElementById(projectTitles[index]);
          if (projectTitle && project.name) {
            projectTitle.textContent = project.name;
          }

          // Traduzir label "Tecnologias"
          const techLabel = document.getElementById(techLabels[index]);
          if (techLabel) {
            techLabel.textContent = project.technologies || 'Tecnologias';
          }

          // Traduzir descrição do projeto
          const projectDesc = document.getElementById(projectDescs[index]);
          if (projectDesc) {
            projectDesc.textContent = project.description || project.descricao || '';
          }
        }
      });

      // Seção de Formação
      const educationTitle = document.getElementById('education-title');
      if (educationTitle) {
        educationTitle.textContent = traducoes.education?.sectionTitle || 'Formação';
      }

      const educationText = document.getElementById('education-text');
      if (educationText) {
        const text = traducoes.education?.text || traducoes.formacao?.descricao || educationText.innerHTML;
        educationText.innerHTML = text;
      }

      // Tipos de formação e cursos - CORRIGIDO
      const degreeTypes = ['degree-type-1', 'degree-type-2', 'degree-type-3'];
      const courseTitles = ['course-title-1', 'course-title-3']; // Só o primeiro e terceiro têm IDs
      const courseIndices = [0, 2]; // Índices correspondentes no array
      const schools = traducoes.education?.schools || traducoes.formacao?.cursos || [];

      schools.forEach((school, index) => {
        // Traduzir tipos de formação
        if (index < degreeTypes.length) {
          const degreeType = document.getElementById(degreeTypes[index]);
          if (degreeType) {
            degreeType.textContent = school.type || school.tipo || '';
          }
        }

        // Traduzir títulos dos cursos (primeiro e terceiro)
        const courseIndex = courseIndices.indexOf(index);
        if (courseIndex !== -1) {
          const courseElement = document.getElementById(courseTitles[courseIndex]);
          if (courseElement && school.course) {
            courseElement.textContent = school.course;
          }
        }
      });

      // Segundo curso (que tem ID específico)
      const degreeCourse2 = document.getElementById('degree-course-2');
      if (degreeCourse2 && schools[1]) {
        degreeCourse2.textContent = schools[1].course || schools[1].curso || degreeCourse2.textContent;
      }

      // Título dos cursos intensivos
      const intensiveCoursesTitle = document.getElementById('intensive-courses-title');
      if (intensiveCoursesTitle) {
        intensiveCoursesTitle.textContent = traducoes.education?.extra?.intensiveCoursesTitle || 'Cursos Intensivos';
      }

      // Lista de cursos intensivos - CORRIGIDO
      const intensiveCourses = traducoes.education?.extra?.courses || [];
      if (intensiveCourses.length > 0) {
        intensiveCourses.forEach((course, index) => {
          const courseElement = document.getElementById(`intensive-course-${index + 1}`);
          if (courseElement) {
            courseElement.innerHTML = course;
          }
        });
      }

      // Footer
      const footerText = document.getElementById('footer-text');
      if (footerText) {
        const text = traducoes.footer?.text || traducoes.contato?.mensagem || footerText.textContent;
        footerText.textContent = text;
      }

      // Atualiza o lang e dir do HTML
      atualizarDirecaoHTML(idiomaAtual);

      console.log('Traduções aplicadas com sucesso!');
    }

    // Função para trocar idioma
    async function trocarIdioma(novoIdioma) {
      if (novoIdioma === 'auto') {
        novoIdioma = detectarIdioma();
      }

      if (novoIdioma === idiomaAtual) {
        console.log('Idioma já está ativo:', novoIdioma);
        return;
      }

      console.log(`Trocando idioma de ${idiomaAtual} para ${novoIdioma}`);

      try {
        const traducoes = await carregarTraducoes(novoIdioma);

        if (traducoes) {
          idiomaAtual = novoIdioma;
          aplicarTraducoes(traducoes);

          // Atualiza o seletor
          const selector = document.getElementById('language-selector');
          selector.value = novoIdioma;

          // Salva preferência
          localStorage.setItem('idioma-preferido', novoIdioma);

        } else {
          console.error('Não foi possível carregar as traduções');
        }
      } catch (error) {
        console.error('Erro ao trocar idioma:', error);
      }
    }

    // Função para abrir links em nova aba
    function abrirEmNovaAba(url) {
  window.open(`https://cristianmattos.github.io/${url}`, '_blank');
      
    }

    // Função principal de inicialização
    async function inicializar() {
      try {
        // Verifica se há idioma salvo
        const idiomaSalvo = localStorage.getItem('idioma-preferido');
        const idioma = idiomaSalvo || detectarIdioma();

        console.log('Inicializando com idioma:', idioma);


        // const optionAperecer = document.querySelector(`#language-selector option[value="${detectarIdioma()}"]`);
        // optionAperecer.style.display = 'block'
        // console.log( optionAperecer)


        // Configura o seletor
        const selector = document.getElementById('language-selector');
        selector.value = idioma;

        // Adiciona evento ao seletor
        selector.addEventListener('change', (e) => {
          trocarIdioma(e.target.value);
        });

        // Carrega traduções iniciais
        await trocarIdioma(idioma);

      } catch (error) {
        console.error('Erro na inicialização:', error);
      }
    }

    // Aguarda o DOM carregar
    document.addEventListener('DOMContentLoaded', inicializar);

    // Expõe função para debug
    window.trocarIdioma = trocarIdioma;
