# Súmula Legends v0.5.0

Sistema web para inscrição e organização de atletas em campeonatos. Os dados são armazenados localmente no navegador utilizado.

## Publicação no GitHub Pages

1. Envie todo o conteúdo desta pasta para a raiz do repositório no GitHub.
2. No repositório, abra **Settings → Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**.
4. Selecione a branch principal, a pasta **/(root)** e salve.
5. Aguarde a publicação e abra o endereço HTTPS informado pelo GitHub.

O HTTPS é necessário para que o navegador habilite a instalação e o funcionamento offline.

## Instalação

- No Chrome ou Edge, abra o site e use a opção **Instalar Súmula Legends** no menu do navegador.
- No Android, use **Instalar app** ou **Adicionar à tela inicial**.
- No iPhone/iPad, abra no Safari, toque em **Compartilhar** e depois em **Adicionar à Tela de Início**.

## Atualizações

Ao publicar uma nova versão, altere o nome do cache no início de `service-worker.js`. Isso faz com que os navegadores substituam os arquivos antigos.

## Dados e backup

Campeonatos e configurações ficam no armazenamento local do navegador. Limpar os dados do site, trocar de navegador ou trocar de aparelho não transfere automaticamente os campeonatos. Exporte os dados importantes antes dessas operações.

No menu principal, use **Exportar → Exportar backup JSON** para baixar uma cópia completa dos campeonatos, do campeonato em edição e das configurações. No outro dispositivo, use **Importar backup JSON**, selecione o arquivo e confirme a substituição dos dados locais.

## Uso local

Para testar todos os recursos de instalação e cache, use um servidor web local. Abrir `index.html` diretamente como arquivo permite usar boa parte do sistema, mas não ativa o service worker.

Desenvolvido por LT ARTS.
