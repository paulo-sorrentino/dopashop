# PRD - DopaShop

**Versão:** 1.0  
**Status:** MVP implementado / experiência client-side  
**Data:** 26/09/2026  
**Produto:** DopaShop - Simulador de Compras Terapêuticas & Antiestresse

## 1. Resumo executivo

O DopaShop é uma experiência de fake shopping em português brasileiro que reproduz a satisfação de pesquisar, comparar, adicionar ao carrinho e concluir uma compra sem cobrar dinheiro real. A proposta combina humor, estética futurista inspirada em Seul e mecânicas leves de gamificação para canalizar impulsos de consumo para uma atividade segura e gratuita.

O MVP é uma aplicação web single-page feita com Next.js, React e TypeScript. O catálogo, cupons, checkout, pedidos, rastreamento e indicadores são simulados no navegador. Não existe integração de pagamento, entrega, conta de usuário ou backend.

## 2. Problema e oportunidade

### Problema

Usuários podem sentir vontade de comprar itens aspiracionais como forma de entretenimento, alívio momentâneo ou recompensa, mas uma compra real pode gerar dívida, arrependimento e culpa. Uma vitrine passiva não reproduz a antecipação e o ritual da compra que tornam esse comportamento atraente.

### Oportunidade

Criar uma experiência curta, compartilhável e visualmente marcante que entregue o ritual de compra sem transação financeira. O produto pode funcionar como entretenimento e como uma alternativa consciente para interromper um impulso de compra, sempre deixando explícito que os itens, preços e pagamentos são fictícios.

## 3. Objetivos

### Objetivos do MVP

- Permitir que o usuário explore uma vitrine de desejos extravagantes em poucos segundos.
- Oferecer busca, categorias, ordenação, detalhes rápidos e inclusão no carrinho.
- Reproduzir um checkout completo, mas inequivocamente fictício e gratuito.
- Dar recompensas imediatas por interações: dopamina, cupons, confetes, sons e progresso.
- Registrar pedidos simulados e mostrar a economia nominal acumulada.
- Funcionar em desktop e mobile, com navegação dedicada para telas pequenas.
- Preservar pedidos, tema e preferência de som entre sessões no mesmo navegador.

### Não objetivos

- Processar pagamentos, coletar dados bancários ou vender produtos reais.
- Entregar produtos, validar endereços ou integrar transportadoras.
- Substituir atendimento psicológico, tratamento clínico ou aconselhamento financeiro.
- Criar contas, login, perfil, social graph ou sincronização entre dispositivos no MVP.
- Oferecer estoque, disponibilidade, avaliações reais ou dados de mercado verificáveis.

## 4. Público-alvo e necessidades

### Público primário

Adultos conectados que gostam de e-commerce, cultura pop, tecnologia, luxo e humor digital, e querem uma experiência rápida de recompensa sem compromisso financeiro.

### Público secundário

Pessoas que reconhecem um impulso de compra e procuram uma distração interativa; criadores de conteúdo que desejam compartilhar uma conquista fictícia; usuários mobile que preferem interações curtas.

### Necessidades principais

- Entender imediatamente que a compra é simulada.
- Encontrar um item interessante sem navegar por uma estrutura complexa.
- Sentir progresso e recompensa a cada interação.
- Poder abandonar ou reiniciar o fluxo sem consequências.
- Consultar o histórico da própria sessão e o valor que não gastou na vida real.

## 5. Proposta de valor e posicionamento

**Promessa:** “Sinta o prazer de gastar milhões sem gastar um centavo.”

O DopaShop deve parecer uma loja premium e absurda, mas comunicar em todos os momentos que o valor é fictício e que nenhum pagamento real é realizado. A personalidade é exagerada, brincalhona e aspiracional; a confiança vem da transparência, não de simular uma transação real de forma enganosa.

## 6. Escopo funcional do MVP

### 6.1 Descoberta e navegação

- Header fixo com marca, nível de dopamina, saldo fictício, tema, som, roleta, cofre e carrinho.
- Hero com proposta de valor, CTA para explorar desejos e CTA para girar a roleta.
- Navegação inferior no mobile para desejos, roleta, cofre, carrinho e tema.
- Footer com explicação editorial sobre o conceito e acessos rápidos.

### 6.2 Catálogo

- Catálogo inicial de 11 produtos fictícios nas categorias luxo, tech, hype e conforto.
- Cada produto possui nome, imagem externa, descrição, tagline, preço em BRL, preço em KRW, preço original, nota, quantidade de avaliações, badge e nível de dopamina.
- Busca por nome, descrição e tagline.
- Filtros por categoria: todos, mega luxo, tech futurista, hypebeast e puro conforto.
- Ordenação por dopamina, maior preço, menor preço e avaliação.
- Grid responsivo de produtos.
- Quick view com detalhes do produto.
- Ações “+ Carrinho” e “Quero Já!”; a segunda adiciona o item e abre o carrinho.
- Estado vazio com ação para limpar filtros.

### 6.3 Carrinho

- Drawer lateral com abertura por header ou navegação mobile.
- Inclusão repetida aumenta a quantidade do item.
- Controles de aumentar, diminuir e remover item.
- Contagem de itens, subtotal fictício, desconto e total final simulado.
- Barra de progresso para uma meta de luxo de R$ 500.000.000.
- Campo para aplicar e remover cupom.
- Mensagens de sucesso e erro para cupons.
- CTA para iniciar checkout.
- Mensagem explícita de que o gasto real é R$ 0,00.

### 6.4 Cupons e roleta

- Cupons disponíveis: `DOPAMINA99` (99%), `COREIA100` (99,9%), `QUEROTUDO` (95%), `FALENCIAZERO` (90%) e `BILIONARIO` (98%).
- Roleta gratuita com seis fatias, animação, sons, confete e anúncio do cupom sorteado.
- Cupom sorteado é aplicado automaticamente ao carrinho.
- CTA pós-sorteio leva diretamente ao carrinho.
- O produto não deve apresentar a roleta como mecanismo de cobrança ou compra obrigatória.

### 6.5 Checkout fictício

- Modal com seleção de cartão black, Pix cerebral ou criptomoeda cósmica.
- Campos fictícios de titular e local de entrega imaginário.
- Nenhum dado bancário real é solicitado ou transmitido.
- Resumo mostra valor fictício, desconto e total real igual a R$ 0,00.
- Processamento visual de 1,5 segundo, seguido de confete e criação do pedido local.
- Após concluir, abrir automaticamente o rastreamento.

### 6.6 Pedido e rastreamento

- Gerar pedido com identificador, horário, itens, subtotal, desconto, total fictício, método, código de rastreio e status.
- Exibir quatro etapas temporizadas: “Embalando Sonhos”, “Decolagem Cósmica”, “Na Sua Órbita” e “Entregue no Cérebro”.
- Mostrar código `DOPA-XXXXXX`.
- Exibir mensagens automáticas do entregador imaginário.
- Permitir chat simulado com respostas pré-definidas.
- Incluir interação antiestresse de estourar bolhas, que incrementa dopamina.
- Permitir abrir o cofre ou voltar ao catálogo.

### 6.7 Cofre de economia

- Exibir o total nominal que teria sido gasto se os itens fossem reais.
- Exibir quantidade de impulsos vencidos e histórico de pedidos.
- Permitir reabrir o rastreamento de um pedido antigo.
- Permitir copiar uma mensagem de conquista para compartilhamento.
- Persistir histórico no `localStorage`.

### 6.8 Temas e som

- Tema escuro padrão “Cyber Seul” e tema claro “Algodão & Nuvem”.
- Persistência do tema no navegador.
- Efeitos sonoros para adicionar, remover, sortear, concluir e avançar no rastreio.
- Controle de silenciar/ativar som com persistência.
- Respeitar preferências de acessibilidade relacionadas a movimento e som na evolução do produto.

## 7. Regras de negócio

- Todos os preços são fictícios e exibidos como referência de fantasia.
- O total real cobrado deve ser sempre R$ 0,00.
- `finalTotal` nunca pode ser negativo.
- O desconto é calculado sobre o subtotal do carrinho e limitado pelos cupons disponíveis.
- Adicionar produto aumenta o nível de dopamina em 8 pontos.
- Aplicar cupom aumenta o nível em 15 pontos.
- Criar pedido aumenta o nível em 25 pontos.
- Entregar pedido aumenta o nível em 20 pontos.
- Estourar uma bolha aumenta o nível em 1 ponto.
- O nível de dopamina deve permanecer entre 10 e 100.
- Cada pedido incrementa “impulsos vencidos” em 1 e soma o subtotal à economia real.
- O saldo infinito começa em R$ 999.999.999 e só é reduzido pelo total fictício do pedido.
- Pedidos e preferências são locais ao navegador; limpar o armazenamento remove a continuidade da sessão.

## 8. Jornada principal

1. O usuário entra e entende a promessa pelo hero.
2. Pode girar a roleta ou navegar pelo catálogo.
3. Filtra, busca, ordena e abre o quick view de um desejo.
4. Adiciona o item ou usa “Quero Já!” para abrir o carrinho.
5. Ajusta quantidades e aplica um cupom.
6. Abre o checkout e escolhe um método fictício.
7. Confirma a compra sem fornecer dados reais.
8. Recebe feedback visual e sonoro e entra no rastreamento.
9. Acompanha as quatro etapas, conversa com o entregador e acessa o cofre.
10. Consulta a economia acumulada ou compartilha a conquista.

## 9. Requisitos não funcionais

### Experiência e responsividade

- Layout funcional em mobile, tablet e desktop.
- Controles touch com áreas de interação adequadas.
- Modais e drawer com fechamento claro e sem overflow horizontal.
- Imagens com `alt` significativo e carregamento lazy no catálogo.
- Mensagens essenciais não podem depender apenas de cor, som, animação ou emoji.

### Acessibilidade

- Navegação completa por teclado, foco visível e foco contido em modais.
- Labels, nomes acessíveis e estados para controles de ícone.
- Contraste compatível com WCAG 2.2 AA para texto e controles.
- Respeito a `prefers-reduced-motion` e `prefers-reduced-transparency` quando houver animação.
- Feedback de cupom, processamento e conclusão exposto a tecnologias assistivas.

### Privacidade e segurança

- Não solicitar, armazenar ou enviar dados de cartão, Pix, cripto ou endereço real.
- Informar de forma consistente que o checkout é fictício.
- Tratar falhas de `localStorage`, clipboard, áudio e imagens externas sem quebrar o fluxo.
- Avaliar licenciamento e disponibilidade das imagens externas antes de produção.

### Engenharia

- Manter a separação atual entre componentes, contextos, dados e tipos.
- Usar TypeScript sem ampliar o uso de `any`.
- Adicionar testes automatizados para cálculo de carrinho, cupom, criação de pedido e persistência antes de mudanças de alto risco.
- Validar com lint, build de produção e testes de fluxo em viewport mobile e desktop.

## 10. Métricas de sucesso

### Métricas de produto

- Taxa de usuários que chegam do hero ao catálogo.
- Taxa de interação com pelo menos um produto.
- Taxa de inclusão no carrinho.
- Taxa de abertura do checkout após adicionar item.
- Taxa de conclusão de pedido simulado.
- Uso da roleta e aplicação de cupons.
- Retorno ao cofre e número médio de sessões por usuário local.
- Compartilhamentos de conquista.

### Métricas de qualidade

- Zero cobranças ou solicitações de dados reais.
- Erro de JavaScript fatal igual a zero no fluxo principal.
- Lighthouse e auditoria de acessibilidade sem bloqueadores críticos.
- Fluxo principal utilizável em mobile sem scroll horizontal ou sobreposição.
- Estado do carrinho e histórico consistentes após recarregar a página.

## 11. Instrumentação recomendada

O MVP atual não possui analytics de produto. Em uma próxima etapa, instrumentar eventos anônimos e sem dados sensíveis:

- `catalog_viewed`, `product_viewed`, `product_added_to_cart`;
- `cart_opened`, `coupon_applied`, `wheel_spun`;
- `checkout_started`, `fake_order_completed`, `tracking_completed`;
- `vault_opened`, `achievement_shared`, `theme_changed`, `sound_toggled`.

Não registrar texto digitado no endereço/titular, conteúdo de mensagens do chat, identificadores de pedido ou qualquer dado que possa identificar o usuário sem uma justificativa clara.

## 12. Roadmap sugerido

### Fase 1 - Consolidar o MVP

- Criar testes para regras de negócio e fluxos críticos.
- Corrigir e documentar o comando de testes do projeto; atualmente `npm t` falha porque não existe script `test` no `package.json`.
- Validar acessibilidade de modais, drawer, foco e redução de movimento.
- Adicionar tratamento robusto para clipboard e imagens externas.

### Fase 2 - Aprimorar a experiência

- Adicionar mais itens, filtros e coleções temáticas sem perder o caráter fictício.
- Criar metas, conquistas e sequências de sessão com explicações transparentes.
- Melhorar o histórico com detalhes do pedido e opção de apagar dados locais.
- Adicionar estados de carregamento e fallback visual para imagens.

### Fase 3 - Medir e distribuir

- Adicionar analytics com consentimento e eventos anonimizados.
- Criar página de privacidade e explicação do uso de dados locais.
- Testar compartilhamento nativo quando disponível e fallback para cópia.
- Otimizar imagens e avaliar uma fonte de conteúdo própria/licenciada.

### Fora do horizonte sem nova decisão

- Pagamento real, marketplace, estoque, entrega real, contas de usuário e comunidade social.

## 13. Riscos e mitigação

| Risco | Impacto | Mitigação |
|---|---|---|
| Usuário interpretar o checkout como cobrança real | Alto | Repetir “fictício”, “R$ 0,00” e “nenhum dado bancário” no fluxo inteiro; nunca integrar gateway. |
| Linguagem de terapia ou ciência parecer uma promessa clínica | Alto | Usar posicionamento de entretenimento e bem-estar leve; revisar alegações e remover “comprovado” sem fonte. |
| Mecânicas de roleta reforçarem comportamento compulsivo | Médio/alto | Manter gratuita, limitar recompensas, oferecer saída clara e explicar a natureza lúdica. |
| Perda de pedidos ao trocar de dispositivo ou limpar dados | Médio | Informar que o histórico é local; oferecer exportação/importação somente se necessário. |
| Dependência de imagens externas ou indisponibilidade de rede | Médio | Usar assets licenciados/próprios e fallback de imagem. |
| Animações e som prejudicarem acessibilidade | Médio | Controles explícitos, `prefers-reduced-motion`, foco e mensagens textuais equivalentes. |
| Dados inconsistentes em atualizações futuras | Médio | Centralizar regras de negócio, adicionar testes e versionar o formato do estado persistido. |

## 14. Critérios de aceite do MVP

- [ ] A página inicial deixa claro que o produto é uma simulação gratuita.
- [ ] O usuário consegue pesquisar, filtrar, ordenar, visualizar e adicionar qualquer produto.
- [ ] O carrinho atualiza quantidades, subtotal, desconto e contagem sem recarregar a página.
- [ ] Cada cupom válido é aceito de forma case-insensitive; cupons inválidos recebem feedback.
- [ ] A roleta sorteia um cupom válido e o aplica ao carrinho.
- [ ] O checkout nunca coleta ou envia dados financeiros reais e exibe total real de R$ 0,00.
- [ ] A confirmação cria um pedido, limpa o carrinho e abre o rastreamento.
- [ ] O rastreamento percorre as quatro etapas e oferece chat, bolha antiestresse e acesso ao cofre.
- [ ] O cofre mostra economia, impulsos vencidos e histórico após recarregar a página.
- [ ] Tema e preferência de som são preservados no navegador.
- [ ] O fluxo pode ser completado em viewport mobile e desktop sem sobreposição crítica.
- [ ] Lint e build de produção passam; testes automatizados devem existir antes de declarar o produto pronto para produção.

## 15. Questões em aberto

- O DopaShop será mantido como experimento de entretenimento ou terá uma finalidade de bem-estar mais formal?
- Há fonte editorial ou clínica aprovada para as afirmações sobre dopamina exibidas na interface?
- Qual política de retenção e exclusão deve ser oferecida para os dados locais?
- O catálogo continuará usando imagens remotas ou receberá assets próprios/licenciados?
- Devem existir limites de uso, lembretes de pausa ou uma saída de autocontrole para usuários que relatam compulsão?
- Quais eventos de analytics são necessários e qual será a estratégia de consentimento?
