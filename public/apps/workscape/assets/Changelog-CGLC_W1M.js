import{a as e,n as t,t as n}from"./jsx-runtime-BVQXJMCF.js";import{n as r}from"./api-C-c0313q.js";import{Dr as i}from"./index-BUYWp2Fn.js";var a=e(t(),1),o=n(),s=[{titulo:`Falhas Gerais no acesso rápido`,data:`01/07/2026`,versao:`v1.27`,autor:`Lucas Soares`,descricao:[`Criada a área Falhas Gerais com sites úteis para status, rotas, DNS, e-mail e testes de conexão.`,`Adicionados destaques principais e grupos por Falhas gerais, Diagnóstico cliente, NOC avançado e DNS/E-mail.`,`Incluída busca para filtrar rapidamente por termos como DNS, BGP, Google, WhatsApp e e-mail.`]},{titulo:`Plantão de domingo por setor`,data:`25/05/2026`,versao:`v1.26`,autor:`Lucas Soares`,descricao:[`Criada página de Plantão de Domingo com atalho em Acessos rápidos da Home.`,`Escala passou a ser organizada por setores: NOC, Rede, Cliente e Terceiros.`,`Editor do plantão foi reorganizado por setor, com campos maiores e botão para adicionar pessoas em cada equipe.`]},{titulo:`Exclusão de feedbacks no admin`,data:`22/05/2026`,versao:`v1.25`,autor:`Lucas Soares`,descricao:[`Painel administrativo ganhou ação para excluir bugs e sugestões recebidos.`,`Exclusão pede confirmação antes de remover o feedback da lista.`,`Backend passou a validar a exclusão por administrador e empresa.`]},{titulo:`Responsável por feedback resolvido`,data:`22/05/2026`,versao:`v1.24`,autor:`Lucas Soares`,descricao:[`Painel administrativo ganhou seleção de quem resolveu cada bug ou sugestão recebida.`,`Feedbacks resolvidos passam a registrar responsável e data de resolução no banco.`,`Página de Changelog agora mostra quem resolveu cada bug ou melhoria publicada.`]},{titulo:`Notas Rápidas compartilhadas`,data:`22/05/2026`,versao:`v1.23`,autor:`Lucas Soares`,descricao:[`Adicionado compartilhamento de Notas Rápidas com uma ou mais pessoas do sistema.`,`Notas compartilhadas passaram a aparecer para os usuários selecionados com identificação visual discreta.`,`Permissões mantêm edição, exclusão e alteração de compartilhamentos apenas para o dono da nota.`]},{titulo:`Leitura de notas compartilhadas`,data:`22/05/2026`,versao:`v1.22`,autor:`Lucas Soares`,descricao:[`Adicionado botão “Abrir” para visualizar o conteúdo completo das notas.`,`Usuários com notas compartilhadas podem abrir e copiar o conteúdo sem editar ou excluir.`,`Criado modal de leitura com dados de criação, edição e pessoas com acesso.`]},{titulo:`Home da Intranet`,data:`22/05/2026`,versao:`v1.21`,autor:`Lucas Soares`,descricao:[`Título da Home ajustado para “Intranet Dias Gestão” com animação de entrada.`,`Título da Intranet e botão “Ver avisos internos” foram alinhados em cantos separados acima do banner.`,`Corrigido o menu da Agenda em Acessos rápidos para abrir acima do painel do Grafana.`]},{titulo:`Ícones dos grupos por setor`,data:`22/05/2026`,versao:`v1.20`,autor:`Lucas Soares`,descricao:[`Ícones dos grupos passaram a variar conforme o nome ou setor do grupo.`,`Adicionados ícones específicos para áreas como NOC, Marketing, Comercial, Financeiro, RH e Suporte.`,`Corrigida a prioridade dos ícones para diferenciar Marketing/Redes Sociais/Design de NOC.`]},{titulo:`Changelog com correções resolvidas`,data:`22/05/2026`,versao:`v1.19`,autor:`Lucas Soares`,descricao:[`Criada seção “Correções e feedbacks resolvidos” dentro da aba de Changelog.`,`Feedbacks resolvidos passaram a aparecer sem exibir o nome de quem reportou.`,`Itens do changelog ganharam identificação visual para diferenciar atualizações de correções.`]},{titulo:`Notas Rápidas pessoais`,data:`22/05/2026`,versao:`v1.18`,autor:`Lucas Soares`,descricao:[`Adicionado atalho “Notas Rápidas” na área de acessos rápidos do Chat Interno NOC.`,`Criada tela pessoal para criar, editar, excluir, fixar, copiar e buscar notas do dia a dia.`,`Backend passou a salvar as notas vinculadas ao usuário logado, impedindo acesso a notas de outros usuários.`]},{titulo:`Correção no anexo de áudio`,data:`22/05/2026`,versao:`v1.17`,autor:`Lucas Soares`,descricao:[`Corrigido problema em que o áudio selecionado podia não anexar em alguns navegadores.`,`Ampliado suporte para MP3, M4A, OGG, OPUS, WEBM, AAC, AMR e outros formatos comuns.`,`Backend passou a aceitar áudios com informações de codec no data URL.`]},{titulo:`Arquivos compartilhados nas conversas`,data:`21/05/2026`,versao:`v1.16`,autor:`Lucas Soares`,descricao:[`Criado painel “Arquivos compartilhados” dentro de conversas diretas e grupos.`,`Conteúdos passaram a ser separados por Arquivos, Imagens, Áudios e Links com contador por aba.`,`Adicionadas ações para baixar anexos, abrir imagens e voltar para a mensagem original.`]},{titulo:`Organização da lista de chats`,data:`21/05/2026`,versao:`v1.15`,autor:`Lucas Soares`,descricao:[`Conversas diretas e grupos agora podem ser marcados como favoritos.`,`Favoritos aparecem no topo da lista, e os grupos são separados em Favoritos, Setores e Grupos.`,`Adicionada opção para remover conversas diretas da lista do usuário sem apagar o histórico administrativo.`]},{titulo:`Aviso geral obrigatório`,data:`21/05/2026`,versao:`v1.14`,autor:`Lucas Soares`,descricao:[`Criado aviso editável para todos os membros do sistema.`,`Usuários precisam confirmar o aviso no botão com V para ele sair da tela.`,`Aviso inicial informa que agora é possível ver visualizações de mensagem nos grupos.`]},{titulo:`Visualizações em mensagens de grupo`,data:`21/05/2026`,versao:`v1.13`,autor:`Lucas Soares`,descricao:[`Adicionada a opção “Visualizações” na setinha das mensagens de grupo.`,`Criado painel para mostrar quem recebeu e quem leu cada mensagem.`,`Backend passou a registrar entrega e leitura por membro do grupo.`]},{titulo:`Acessos rápidos de monitoramento`,data:`21/05/2026`,versao:`v1.12`,autor:`Lucas Soares`,descricao:[`Adicionados atalhos para Grafana e Zabbix na seção “Acessos rápidos”.`,`Mantido o mesmo padrão visual dos demais botões da Home.`,`Links abrem em nova aba para facilitar o acompanhamento dos sistemas.`]},{titulo:`Changelog do sistema`,data:`20/05/2026`,versao:`v1.11`,autor:`Lucas Soares`,descricao:[`Criada a página “Changelog” em /changelog.`,`Adicionado botão “Changelog” abaixo do botão “Relatar bug ou sugestão”.`,`Histórico de mudanças passou a ficar disponível para os funcionários.`]},{titulo:`Correção de mensagens em conversas erradas`,data:`20/05/2026`,versao:`v1.10`,autor:`Lucas Soares`,descricao:[`Corrigido bug em que mensagens de outra conversa apareciam temporariamente na tela atual.`,`Listeners do Socket.IO passaram a validar conversa, grupo, remetente e destinatário antes de renderizar mensagens.`,`Adicionada deduplicação para evitar mensagens repetidas após envio e retorno do socket.`]},{titulo:`Lista de conversas diretas`,data:`20/05/2026`,versao:`v1.9`,autor:`Lucas Soares`,descricao:[`A lista de conversas diretas passou a exibir somente pessoas com histórico de conversa.`,`Conversas são ordenadas pela última interação mais recente.`,`Lista geral de usuários ficou separada para iniciar novas conversas sem poluir o histórico.`]},{titulo:`Arquivos e áudios no chat`,data:`20/05/2026`,versao:`v1.8`,autor:`Lucas Soares`,descricao:[`Limite de upload aumentado para 200 MB.`,`Adicionado suporte a PDF, Word e áudio WAV.`,`Mantido suporte aos formatos de imagem e áudio que já funcionavam.`]},{titulo:`Preview e download de anexos`,data:`20/05/2026`,versao:`v1.7`,autor:`Lucas Soares`,descricao:[`Imagens enviadas no chat agora abrem em tela cheia ao clicar.`,`Adicionada opção “Salvar no computador” para imagens, áudios e arquivos.`,`Removida a exibição de nomes técnicos/UUIDs embaixo das mídias.`]},{titulo:`Feedback interno`,data:`20/05/2026`,versao:`v1.6`,autor:`Lucas Soares`,descricao:[`Adicionado fluxo para “Relatar bug ou sugestão”.`,`Funcionários podem registrar problemas encontrados ou ideias de melhoria.`,`Feedbacks ficam disponíveis para acompanhamento no painel administrativo.`]},{titulo:`Avisos internos editáveis`,data:`20/05/2026`,versao:`v1.5`,autor:`Lucas Soares`,descricao:[`Criado painel administrativo para editar os avisos internos.`,`Editor ficou mais simples para evitar edição manual de HTML completo.`,`Conteúdo dos avisos passou a ser salvo no banco de dados.`]},{titulo:`Botão de Avisos Internos`,data:`20/05/2026`,versao:`v1.4`,autor:`Lucas Soares`,descricao:[`Botão “Ver avisos internos” adicionado acima do banner principal.`,`Acesso aos comunicados internos ficou mais visível para os funcionários.`,`Botão pisca em laranja quando há atualização nos avisos internos.`]},{titulo:`Reorganização da Home`,data:`20/05/2026`,versao:`v1.3`,autor:`Lucas Soares`,descricao:[`Logo reposicionado para ocupar menos espaço.`,`Botão “Ver avisos internos” alinhado acima do banner.`,`Banner principal subiu na página para melhorar o aproveitamento da tela.`]},{titulo:`Navegação e marca do chat`,data:`20/05/2026`,versao:`v1.2`,autor:`Lucas Soares`,descricao:[`Título “Chats” foi substituído pela logo da Nexa Telecom.`,`Logo ficou clicável para voltar à página principal com banners.`,`Removida a logo que ficava acima do banner principal para reduzir espaço vazio.`]},{titulo:`Melhorias em grupos`,data:`20/05/2026`,versao:`v1.1`,autor:`Lucas Soares`,descricao:[`Ajustes na gestão de membros dos grupos.`,`Melhorado o controle de acesso para usuários que participam de mais de um grupo.`,`Painel administrativo ganhou opções para adicionar membros por usuário, setor ou cargo.`]}],c={bug:`Bug resolvido`,sugestao:`Sugestão atendida`},ee={bug:`Correção de bug resolvida`,sugestao:`Melhoria aplicada a partir de feedback`},te={baixa:`Baixa`,media:`Média`,alta:`Alta`},l={atualizacao:`Atualização`,correcao:`Correção`},u=()=>{let e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`},d=(e=``)=>({categoria:`atualizacao`,criado_por:e?String(e):``,titulo:``,versao:``,data:u(),texto:``}),f=(e=``)=>String(e).split(/\r?\n/).map(e=>e.trim()).filter(Boolean),p=e=>{if(!e)return`-`;if(/^\d{4}-\d{2}-\d{2}$/.test(e)){let[t,n,r]=e.split(`-`);return`${r}/${n}/${t}`}return new Date(e).toLocaleDateString(`pt-BR`,{day:`2-digit`,month:`2-digit`,year:`numeric`})},m=e=>{if(e.categoria&&l[e.categoria])return{label:l[e.categoria],className:e.categoria===`correcao`?`correcao`:`atualizacao`};let t=e.titulo.toLowerCase(),n=e.descricao.join(` `).toLowerCase();return t.includes(`correção`)||n.includes(`corrigido`)||n.includes(`corrigida`)||n.includes(`corrigir`)?{label:`Correção`,className:`correcao`}:{label:`Atualização`,className:`atualizacao`}},h=e=>e?new Date(e).toLocaleString(`pt-BR`,{day:`2-digit`,month:`2-digit`,year:`numeric`,hour:`2-digit`,minute:`2-digit`}):`-`;function g(){let[e,t]=(0,a.useState)(null),[n,l]=(0,a.useState)(``),[u,g]=(0,a.useState)([]),[_,v]=(0,a.useState)(!0),[y,b]=(0,a.useState)(``),[x,S]=(0,a.useState)([]),[C,w]=(0,a.useState)(!0),[T,E]=(0,a.useState)(``),[D,O]=(0,a.useState)(!1),[k,A]=(0,a.useState)(!1),[j,M]=(0,a.useState)(``),[N,P]=(0,a.useState)(d),[F,I]=(0,a.useState)([]),[L,R]=(0,a.useState)(!1),[z,B]=(0,a.useState)(``),V=(0,a.useMemo)(()=>sessionStorage.getItem(`token`),[]),H=(0,a.useMemo)(()=>V?{Authorization:`Bearer ${V}`}:{},[V]),U=(0,a.useMemo)(()=>{try{return JSON.parse(sessionStorage.getItem(`user`)||`{}`)}catch{return{}}},[]),W=U?.perfil===`admin`,G=(0,a.useMemo)(()=>x.map(e=>({id:`criado-${e.id}`,categoria:e.categoria,titulo:e.titulo,data:p(e.data),versao:e.versao,autor:e.criado_por_nome||`Administração`,descricao:f(e.texto)})),[x]),K=(0,a.useMemo)(()=>[...G,...s],[G]),q=(0,a.useCallback)(async()=>{if(V)try{E(``),w(!0);let{data:e}=await r.get(`/changelog`,{headers:H});S(Array.isArray(e)?e:[])}catch(e){console.error(`Erro ao carregar changelogs criados:`,e),E(`Não foi possível carregar os changelogs criados agora.`)}finally{w(!1)}},[H,V]),J=(0,a.useCallback)(async()=>{if(V&&W)try{B(``),R(!0);let{data:e}=await r.get(`/admin/usuarios`,{headers:H}),t=Array.isArray(e)?e.filter(e=>e.perfil===`admin`):[];I(t)}catch(e){console.error(`Erro ao carregar admins para changelog:`,e),B(`Não foi possível carregar os admins.`)}finally{R(!1)}},[H,W,V]),Y=(0,a.useCallback)(async()=>{if(V)try{b(``),v(!0);let{data:e}=await r.get(`/feedbacks/resolvidos`,{headers:H});g(Array.isArray(e)?e:[])}catch(e){console.error(`Erro ao carregar feedbacks resolvidos:`,e),b(`Não foi possível carregar as correções resolvidas agora.`)}finally{v(!1)}},[H,V]);(0,a.useEffect)(()=>{q(),Y(),J()},[J,q,Y]);let X=(0,a.useCallback)(()=>{let e=F.find(e=>Number(e.id)===Number(U?.id));return String(e?.id||F[0]?.id||U?.id||``)},[F,U?.id]),Z=()=>{M(``),P(d(X())),O(!0)},Q=()=>{k||(O(!1),M(``))},$=(e,t)=>{M(``),P(n=>({...n,[e]:t}))},ne=async e=>{if(e.preventDefault(),!V)return;let t={categoria:N.categoria,criado_por:Number(N.criado_por),titulo:N.titulo.trim(),versao:N.versao.trim(),data:N.data,texto:N.texto.trim()};if(!t.criado_por||!t.titulo||!t.versao||!t.data||!t.texto)M(`Preencha admin responsável, título, versão, data e texto para criar o changelog.`);else try{A(!0),M(``);let{data:e}=await r.post(`/admin/changelog`,t,{headers:H});S(t=>[e,...t]),O(!1),l(`"${e.titulo}" criado no changelog.`),P(d(X()))}catch(e){console.error(`Erro ao criar changelog:`,e),M(e.response?.data?.error||`Não foi possível criar o changelog.`)}finally{A(!1)}},re=async e=>{if(V)try{t(e.titulo),l(``),await r.put(`/admin/aviso-geral`,{titulo:e.titulo,mensagem:[`${e.data}${e.versao?` · ${e.versao}`:``}`,``,...e.descricao.map(e=>`- ${e}`)].join(`
`),ativo:!0},{headers:H}),l(`"${e.titulo}" publicado no aviso da tela.`)}catch(e){console.error(`Erro ao publicar changelog como aviso:`,e),l(e.response?.data?.error||`Não foi possível publicar o aviso.`)}finally{t(null)}};return(0,o.jsxs)(`main`,{className:`changelog-page`,children:[(0,o.jsx)(`style`,{children:`
        .changelog-page {
          min-height: 100vh;
          padding: 32px;
          background:
            radial-gradient(circle at top left, rgba(34, 199, 255, 0.14), transparent 34%),
            #061425;
          color: #ffffff;
        }

        .changelog-shell {
          width: min(100%, 1280px);
          margin: 0 auto;
        }

        .changelog-content-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(320px, 390px);
          align-items: start;
          gap: 22px;
        }

	        .changelog-header {
	          display: flex;
	          align-items: center;
	          justify-content: space-between;
	          gap: 16px;
	          margin-bottom: 28px;
	        }

	        .changelog-header-actions {
	          display: flex;
	          align-items: center;
	          justify-content: flex-end;
	          gap: 10px;
	          flex-wrap: wrap;
	        }

        .changelog-title-block h1 {
          margin: 0 0 8px;
          font-size: clamp(28px, 4vw, 42px);
          line-height: 1.05;
          letter-spacing: 0;
        }

        .changelog-title-block p {
          margin: 0;
          color: rgba(255, 255, 255, 0.68);
          font-size: 15px;
        }

	        .changelog-back-link,
	        .changelog-create-button {
	          display: inline-flex;
	          align-items: center;
	          justify-content: center;
	          border: 1px solid rgba(80, 190, 255, 0.24);
          border-radius: 999px;
          padding: 10px 16px;
          background: rgba(0, 174, 255, 0.08);
          color: #8bdcff;
	          font-size: 13px;
	          font-weight: 800;
	          text-decoration: none;
	          white-space: nowrap;
	          cursor: pointer;
	          transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
	        }

	        .changelog-create-button {
	          background: linear-gradient(135deg, rgba(34, 199, 255, 0.22), rgba(74, 222, 128, 0.14));
	          color: #e9fbff;
	        }

		        .changelog-back-link:hover,
		        .changelog-create-button:hover {
		          transform: translateY(-2px);
		          border-color: rgba(80, 190, 255, 0.42);
		          background: rgba(0, 174, 255, 0.14);
		        }

		        .changelog-section + .changelog-section {
		          margin-top: 34px;
		        }

		        .changelog-content-grid > .changelog-section + .changelog-section {
		          margin-top: 0;
		        }

		        .changelog-resolved-section {
		          position: sticky;
		          top: 24px;
		        }

	        .changelog-section-heading {
	          display: flex;
	          align-items: flex-end;
	          justify-content: space-between;
	          gap: 18px;
	          margin-bottom: 14px;
	        }

	        .changelog-section-heading h2 {
	          margin: 0 0 6px;
	          font-size: 22px;
	          line-height: 1.2;
	          letter-spacing: 0;
	        }

	        .changelog-section-heading p {
	          margin: 0;
	          color: rgba(255, 255, 255, 0.64);
	          font-size: 14px;
	          line-height: 1.5;
	        }

	        .changelog-section-kicker {
	          display: inline-flex;
	          align-items: center;
	          width: fit-content;
	          margin-bottom: 8px;
	          border: 1px solid rgba(139, 220, 255, 0.22);
	          border-radius: 999px;
	          padding: 5px 10px;
	          color: #8bdcff;
	          background: rgba(34, 199, 255, 0.08);
	          font-size: 11px;
	          font-weight: 900;
	          letter-spacing: 0;
	          text-transform: uppercase;
	        }

		        .changelog-list {
		          display: grid;
		          gap: 16px;
		        }

		        .changelog-resolved-section .changelog-list {
		          gap: 12px;
		        }

        .changelog-item {
          padding: 18px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.04);
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.18);
        }

        .changelog-item-top {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 8px;
        }

	        .changelog-item-title {
	          margin: 0;
	          font-size: 18px;
	          line-height: 1.3;
	          letter-spacing: 0;
	        }

		        .changelog-resolved-section .changelog-item {
		          padding: 16px;
		        }

	        .changelog-title-with-type {
	          display: flex;
	          align-items: center;
	          gap: 10px;
	          flex-wrap: wrap;
	        }

	        .changelog-type-badge {
	          display: inline-flex;
	          align-items: center;
	          border-radius: 999px;
	          padding: 5px 9px;
	          font-size: 11px;
	          font-weight: 900;
	          line-height: 1;
	          letter-spacing: 0;
	          text-transform: uppercase;
	        }

	        .changelog-type-atualizacao {
	          border: 1px solid rgba(139, 220, 255, 0.24);
	          background: rgba(34, 199, 255, 0.1);
	          color: #9ee7ff;
	        }

	        .changelog-type-correcao {
	          border: 1px solid rgba(74, 222, 128, 0.28);
	          background: rgba(34, 197, 94, 0.12);
	          color: #86efac;
	        }

	        .changelog-author {
	          color: #22c7ff;
	          font-weight: 800;
	          white-space: nowrap;
        }

        .changelog-date {
          margin-bottom: 10px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 13px;
          font-weight: 700;
        }

        .changelog-version {
          color: #8bdcff;
        }

        .changelog-item ul {
          margin: 0;
          padding-left: 18px;
        }

        .changelog-item li {
          margin-bottom: 6px;
          color: rgba(255, 255, 255, 0.78);
          line-height: 1.5;
        }

        .changelog-item li:last-child {
          margin-bottom: 0;
        }

        .changelog-admin-message {
          margin: 0 0 16px;
          border: 1px solid rgba(34, 199, 255, 0.2);
          border-radius: 12px;
          background: rgba(34, 199, 255, 0.08);
          color: #a7e8ff;
          font-size: 13px;
          font-weight: 800;
          padding: 12px 14px;
        }

        .changelog-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 14px;
        }

        .changelog-notice-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(80, 190, 255, 0.24);
          border-radius: 999px;
          padding: 9px 14px;
          background: rgba(0, 174, 255, 0.08);
          color: #8bdcff;
          cursor: pointer;
          font-size: 13px;
          font-weight: 800;
          transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
        }

        .changelog-notice-button:hover {
          transform: translateY(-2px);
          border-color: rgba(80, 190, 255, 0.42);
          background: rgba(0, 174, 255, 0.14);
        }

	        .changelog-notice-button:disabled {
	          cursor: not-allowed;
	          opacity: 0.6;
	          transform: none;
	        }

	        .changelog-state-card {
	          border: 1px solid rgba(255, 255, 255, 0.08);
	          border-radius: 14px;
	          padding: 18px;
	          background: rgba(255, 255, 255, 0.04);
	          color: rgba(255, 255, 255, 0.72);
	          font-weight: 700;
	        }

	        .changelog-feedback-description {
	          margin: 12px 0 0;
	          color: rgba(255, 255, 255, 0.78);
	          line-height: 1.55;
	          white-space: pre-wrap;
	        }

	        .changelog-feedback-meta {
	          display: flex;
	          flex-wrap: wrap;
	          gap: 8px;
	          margin-top: 14px;
	        }

	        .changelog-feedback-meta span,
	        .changelog-resolved-status {
	          display: inline-flex;
	          align-items: center;
	          border: 1px solid rgba(255, 255, 255, 0.1);
	          border-radius: 999px;
	          padding: 6px 10px;
	          background: rgba(255, 255, 255, 0.04);
	          color: rgba(255, 255, 255, 0.72);
	          font-size: 12px;
	          font-weight: 800;
	        }

	        .changelog-resolved-status {
	          border-color: rgba(74, 222, 128, 0.28);
	          color: #86efac;
	          background: rgba(34, 197, 94, 0.1);
	          white-space: nowrap;
	        }

	        .changelog-modal-overlay {
	          position: fixed;
	          inset: 0;
	          z-index: 60;
	          display: flex;
	          align-items: center;
	          justify-content: center;
	          padding: 20px;
	          background: rgba(1, 8, 18, 0.72);
	          backdrop-filter: blur(10px);
	        }

	        .changelog-modal {
	          width: min(620px, 100%);
	          max-height: calc(100vh - 40px);
	          overflow: auto;
	          border: 1px solid rgba(139, 220, 255, 0.18);
	          border-radius: 16px;
	          background: #071527;
	          color: #ffffff;
	          box-shadow: 0 24px 90px rgba(0, 0, 0, 0.5);
	        }

	        .changelog-modal-header {
	          display: flex;
	          align-items: flex-start;
	          justify-content: space-between;
	          gap: 16px;
	          padding: 18px 18px 14px;
	          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	        }

	        .changelog-modal-header h2 {
	          margin: 0 0 6px;
	          font-size: 20px;
	          letter-spacing: 0;
	        }

	        .changelog-modal-header p {
	          margin: 0;
	          color: rgba(255, 255, 255, 0.64);
	          font-size: 13px;
	          line-height: 1.45;
	        }

	        .changelog-modal-close {
	          width: 34px;
	          height: 34px;
	          border: 1px solid rgba(255, 255, 255, 0.12);
	          border-radius: 50%;
	          background: rgba(255, 255, 255, 0.06);
	          color: #ffffff;
	          cursor: pointer;
	          font-size: 22px;
	          line-height: 1;
	        }

	        .changelog-modal-body {
	          display: grid;
	          grid-template-columns: repeat(2, minmax(0, 1fr));
	          gap: 12px;
	          padding: 18px;
	        }

	        .changelog-modal-body label {
	          display: flex;
	          flex-direction: column;
	          gap: 7px;
	          color: rgba(255, 255, 255, 0.72);
	          font-size: 12px;
	          font-weight: 800;
	        }

	        .changelog-modal-body input,
	        .changelog-modal-body select,
	        .changelog-modal-body textarea {
	          width: 100%;
	          border: 1px solid rgba(139, 220, 255, 0.18);
	          border-radius: 12px;
	          padding: 11px 12px;
	          background: rgba(255, 255, 255, 0.06);
	          color: #ffffff;
	          font: inherit;
	          outline: none;
	        }

	        .changelog-modal-body select option {
	          background: #071527;
	          color: #ffffff;
	        }

	        .changelog-modal-body textarea {
	          min-height: 150px;
	          resize: vertical;
	          line-height: 1.5;
	        }

	        .changelog-modal-body input:focus,
	        .changelog-modal-body select:focus,
	        .changelog-modal-body textarea:focus {
	          border-color: rgba(139, 220, 255, 0.46);
	          box-shadow: 0 0 0 3px rgba(34, 199, 255, 0.12);
	        }

	        .changelog-field-wide {
	          grid-column: 1 / -1;
	        }

	        .changelog-modal-error {
	          grid-column: 1 / -1;
	          border: 1px solid rgba(248, 113, 113, 0.32);
	          border-radius: 12px;
	          padding: 10px 12px;
	          background: rgba(239, 68, 68, 0.12);
	          color: #fecaca;
	          font-size: 13px;
	          font-weight: 800;
	        }

	        .changelog-modal-actions {
	          display: flex;
	          justify-content: flex-end;
	          gap: 10px;
	          padding: 0 18px 18px;
	        }

	        .changelog-modal-secondary,
	        .changelog-modal-primary {
	          display: inline-flex;
	          align-items: center;
	          justify-content: center;
	          border-radius: 999px;
	          padding: 10px 16px;
	          cursor: pointer;
	          font-size: 13px;
	          font-weight: 900;
	          border: 1px solid rgba(255, 255, 255, 0.12);
	        }

	        .changelog-modal-secondary {
	          background: rgba(255, 255, 255, 0.06);
	          color: rgba(255, 255, 255, 0.78);
	        }

	        .changelog-modal-primary {
	          border-color: rgba(80, 190, 255, 0.34);
	          background: rgba(0, 174, 255, 0.16);
	          color: #b7ecff;
	        }

	        .changelog-modal-secondary:disabled,
	        .changelog-modal-primary:disabled,
	        .changelog-modal-close:disabled {
	          cursor: not-allowed;
	          opacity: 0.58;
	        }

	        [data-theme='claro'] .changelog-page {
	          background:
	            radial-gradient(circle at top left, rgba(14, 165, 233, 0.13), transparent 34%),
	            linear-gradient(135deg, #eef7fb 0%, #f8fafc 54%, #effcfb 100%);
	          color: #0f172a;
	        }

	        [data-theme='claro'] .changelog-title-block p,
	        [data-theme='claro'] .changelog-section-heading p,
	        [data-theme='claro'] .changelog-date,
	        [data-theme='claro'] .changelog-item li,
	        [data-theme='claro'] .changelog-feedback-description,
	        [data-theme='claro'] .changelog-feedback-meta span,
	        [data-theme='claro'] .changelog-state-card,
	        [data-theme='claro'] .changelog-modal-header p,
	        [data-theme='claro'] .changelog-modal-body label,
	        [data-theme='claro'] .changelog-modal-secondary {
	          color: #64748b;
	        }

	        [data-theme='claro'] .changelog-item,
	        [data-theme='claro'] .changelog-state-card,
	        [data-theme='claro'] .changelog-modal {
	          border-color: rgba(15, 23, 42, 0.1);
	          background: rgba(255, 255, 255, 0.9);
	          box-shadow: 0 18px 48px rgba(15, 23, 42, 0.09);
	        }

	        [data-theme='claro'] .changelog-back-link,
	        [data-theme='claro'] .changelog-notice-button,
	        [data-theme='claro'] .changelog-modal-secondary,
	        [data-theme='claro'] .changelog-modal-close,
	        [data-theme='claro'] .changelog-feedback-meta span {
	          border-color: rgba(15, 23, 42, 0.12);
	          background: rgba(255, 255, 255, 0.8);
	          color: #0369a1;
	        }

	        [data-theme='claro'] .changelog-create-button,
	        [data-theme='claro'] .changelog-modal-primary {
	          color: #075985;
	          background: linear-gradient(135deg, rgba(14, 165, 233, 0.18), rgba(20, 184, 166, 0.14));
	        }

	        [data-theme='claro'] .changelog-section-kicker,
	        [data-theme='claro'] .changelog-admin-message {
	          border-color: rgba(14, 165, 233, 0.18);
	          background: rgba(14, 165, 233, 0.08);
	          color: #0369a1;
	        }

	        [data-theme='claro'] .changelog-modal-header {
	          border-color: rgba(15, 23, 42, 0.1);
	        }

	        [data-theme='claro'] .changelog-modal-body input,
	        [data-theme='claro'] .changelog-modal-body select,
	        [data-theme='claro'] .changelog-modal-body textarea {
	          border-color: rgba(15, 23, 42, 0.12);
	          background: rgba(248, 250, 252, 0.92);
	          color: #0f172a;
	        }

	        [data-theme='claro'] .changelog-modal-body select option {
	          background: #ffffff;
	          color: #0f172a;
	        }

		        @media (max-width: 768px) {
	          .changelog-page {
	            padding: 20px;
	          }

	          .changelog-header {
	            flex-direction: column;
	            align-items: stretch;
	          }

		          .changelog-header-actions {
		            align-items: stretch;
		            flex-direction: column;
		          }

		          .changelog-content-grid {
		            grid-template-columns: 1fr;
		          }

		          .changelog-resolved-section {
		            position: static;
		          }

	          .changelog-section-heading {
	            align-items: stretch;
	            flex-direction: column;
	          }

	          .changelog-back-link,
	          .changelog-create-button {
	            width: 100%;
	          }

          .changelog-item-top {
            flex-direction: column;
            gap: 4px;
          }

          .changelog-actions {
            justify-content: stretch;
          }

	          .changelog-notice-button {
	            width: 100%;
	          }

	          .changelog-modal-body {
	            grid-template-columns: 1fr;
	          }

	          .changelog-modal-actions {
	            flex-direction: column-reverse;
	          }

	          .changelog-modal-secondary,
	          .changelog-modal-primary {
	            width: 100%;
	          }
	        }
      `}),(0,o.jsxs)(`div`,{className:`changelog-shell`,children:[(0,o.jsxs)(`header`,{className:`changelog-header`,children:[(0,o.jsxs)(`div`,{className:`changelog-title-block`,children:[(0,o.jsx)(`h1`,{children:`Changelog`}),(0,o.jsx)(`p`,{children:`Histórico de mudanças do sistema interno.`})]}),(0,o.jsxs)(`div`,{className:`changelog-header-actions`,children:[W&&(0,o.jsx)(`button`,{type:`button`,className:`changelog-create-button`,onClick:Z,children:`Criar`}),(0,o.jsx)(i,{to:`/chat`,className:`changelog-back-link`,children:`Voltar para Home`})]})]}),W&&n&&(0,o.jsx)(`div`,{className:`changelog-admin-message`,children:n}),(0,o.jsxs)(`div`,{className:`changelog-content-grid`,children:[(0,o.jsxs)(`section`,{className:`changelog-section`,"aria-label":`Atualizações do sistema`,children:[(0,o.jsx)(`div`,{className:`changelog-section-heading`,children:(0,o.jsxs)(`div`,{children:[(0,o.jsx)(`span`,{className:`changelog-section-kicker`,children:`Atualizações`}),(0,o.jsx)(`h2`,{children:`Atualizações do sistema`}),(0,o.jsx)(`p`,{children:`Novidades, melhorias e ajustes publicados no Chat Interno NOC.`})]})}),C&&(0,o.jsx)(`div`,{className:`changelog-state-card`,children:`Carregando changelogs criados...`}),T&&(0,o.jsx)(`div`,{className:`changelog-state-card`,children:T}),(0,o.jsx)(`div`,{className:`changelog-list`,children:K.map(t=>{let n=m(t);return(0,o.jsxs)(`article`,{className:`changelog-item`,children:[(0,o.jsxs)(`div`,{className:`changelog-item-top`,children:[(0,o.jsxs)(`div`,{className:`changelog-title-with-type`,children:[(0,o.jsx)(`span`,{className:`changelog-type-badge changelog-type-${n.className}`,children:n.label}),(0,o.jsx)(`h2`,{className:`changelog-item-title`,children:t.titulo})]}),(0,o.jsx)(`span`,{className:`changelog-author`,children:t.autor})]}),(0,o.jsxs)(`div`,{className:`changelog-date`,children:[t.data,t.versao?(0,o.jsxs)(o.Fragment,{children:[` · `,(0,o.jsx)(`span`,{className:`changelog-version`,children:t.versao})]}):null]}),t.descricao.length>0?(0,o.jsx)(`ul`,{children:t.descricao.map((e,t)=>(0,o.jsx)(`li`,{children:e},`${e}-${t}`))}):null,W&&(0,o.jsx)(`div`,{className:`changelog-actions`,children:(0,o.jsx)(`button`,{type:`button`,className:`changelog-notice-button`,onClick:()=>re(t),disabled:e===t.titulo,children:e===t.titulo?`Publicando...`:`Subir no aviso da tela`})}),(0,o.jsx)(`p`,{className:`changelog-assinatura`,children:`Lucas Soares`})]},t.id||t.titulo)})})]}),(0,o.jsxs)(`section`,{className:`changelog-section changelog-resolved-section`,"aria-label":`Correções e feedbacks resolvidos`,children:[(0,o.jsx)(`div`,{className:`changelog-section-heading`,children:(0,o.jsxs)(`div`,{children:[(0,o.jsx)(`span`,{className:`changelog-section-kicker`,children:`Correções`}),(0,o.jsx)(`h2`,{children:`Correções e feedbacks resolvidos`}),(0,o.jsx)(`p`,{children:`Itens marcados como resolvidos pela administração, exibindo quem resolveu sem mostrar quem reportou.`})]})}),_?(0,o.jsx)(`div`,{className:`changelog-state-card`,children:`Carregando correções resolvidas...`}):y?(0,o.jsx)(`div`,{className:`changelog-state-card`,children:y}):u.length===0?(0,o.jsx)(`div`,{className:`changelog-state-card`,children:`Nenhum feedback resolvido publicado ainda.`}):(0,o.jsx)(`div`,{className:`changelog-list`,children:u.map(e=>(0,o.jsxs)(`article`,{className:`changelog-item`,children:[(0,o.jsxs)(`div`,{className:`changelog-item-top`,children:[(0,o.jsxs)(`div`,{className:`changelog-title-with-type`,children:[(0,o.jsx)(`span`,{className:`changelog-type-badge changelog-type-correcao`,children:c[e.tipo]||`Resolvido`}),(0,o.jsx)(`h2`,{className:`changelog-item-title`,children:ee[e.tipo]||`Feedback resolvido`})]}),(0,o.jsx)(`span`,{className:`changelog-resolved-status`,children:`Resolvido`})]}),(0,o.jsxs)(`div`,{className:`changelog-date`,children:[`Resolvido em `,h(e.resolvido_em||e.updated_at||e.created_at)]}),(0,o.jsx)(`p`,{className:`changelog-feedback-description`,children:e.descricao}),(0,o.jsxs)(`div`,{className:`changelog-feedback-meta`,children:[(0,o.jsxs)(`span`,{children:[`Prioridade: `,te[e.prioridade]||e.prioridade]}),e.resolvido_por_nome?(0,o.jsxs)(`span`,{children:[`Resolvido por: `,e.resolvido_por_nome]}):null,e.pagina?(0,o.jsxs)(`span`,{children:[`Página: `,e.pagina]}):null]}),(0,o.jsx)(`p`,{className:`changelog-assinatura`,children:`Lucas Soares`})]},e.id))})]})]}),D&&(0,o.jsx)(`div`,{className:`changelog-modal-overlay`,onClick:Q,children:(0,o.jsxs)(`form`,{className:`changelog-modal`,onSubmit:ne,onClick:e=>e.stopPropagation(),noValidate:!0,children:[(0,o.jsxs)(`div`,{className:`changelog-modal-header`,children:[(0,o.jsxs)(`div`,{children:[(0,o.jsx)(`h2`,{children:`Criar changelog`}),(0,o.jsx)(`p`,{children:`Publique uma atualização ou correção com versão, data e texto.`})]}),(0,o.jsx)(`button`,{type:`button`,className:`changelog-modal-close`,onClick:Q,disabled:k,"aria-label":`Fechar`,children:`×`})]}),(0,o.jsxs)(`div`,{className:`changelog-modal-body`,children:[j&&(0,o.jsx)(`div`,{className:`changelog-modal-error`,children:j}),(0,o.jsxs)(`label`,{children:[`Categoria`,(0,o.jsxs)(`select`,{value:N.categoria,onChange:e=>$(`categoria`,e.target.value),disabled:k,children:[(0,o.jsx)(`option`,{value:`atualizacao`,children:`Atualização`}),(0,o.jsx)(`option`,{value:`correcao`,children:`Correção`})]})]}),(0,o.jsxs)(`label`,{children:[`Admin responsável`,(0,o.jsxs)(`select`,{value:N.criado_por,onChange:e=>$(`criado_por`,e.target.value),disabled:k||L,children:[(0,o.jsx)(`option`,{value:``,children:L?`Carregando admins...`:`Selecione um admin`}),F.map(e=>(0,o.jsx)(`option`,{value:e.id,children:e.nome},e.id))]})]}),z&&(0,o.jsx)(`div`,{className:`changelog-modal-error`,children:z}),(0,o.jsxs)(`label`,{children:[`Versão`,(0,o.jsx)(`input`,{type:`text`,value:N.versao,onChange:e=>$(`versao`,e.target.value),placeholder:`v1.20`,maxLength:`40`,disabled:k})]}),(0,o.jsxs)(`label`,{className:`changelog-field-wide`,children:[`Título`,(0,o.jsx)(`input`,{type:`text`,value:N.titulo,onChange:e=>$(`titulo`,e.target.value),placeholder:`Ex: Melhorias no painel de atendimento`,maxLength:`180`,disabled:k})]}),(0,o.jsxs)(`label`,{className:`changelog-field-wide`,children:[`Data`,(0,o.jsx)(`input`,{type:`date`,value:N.data,onChange:e=>$(`data`,e.target.value),disabled:k})]}),(0,o.jsxs)(`label`,{className:`changelog-field-wide`,children:[`Texto`,(0,o.jsx)(`textarea`,{value:N.texto,onChange:e=>$(`texto`,e.target.value),placeholder:`Escreva uma mudança por linha para aparecer em tópicos no changelog.`,maxLength:`5000`,disabled:k})]})]}),(0,o.jsxs)(`div`,{className:`changelog-modal-actions`,children:[(0,o.jsx)(`button`,{type:`button`,className:`changelog-modal-secondary`,onClick:Q,disabled:k,children:`Cancelar`}),(0,o.jsx)(`button`,{type:`submit`,className:`changelog-modal-primary`,disabled:k,children:k?`Criando...`:`Criar changelog`})]})]})})]})]})}export{g as default};