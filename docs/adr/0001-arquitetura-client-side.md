# ADR 0001: Manter o MVP como experiência client-side

- **Status:** Aceita
- **Data:** 2026-09-26
- **Decisores:** Equipe do projeto
- **Escopo:** MVP do DopaShop

## Contexto

O DopaShop é um simulador de compras fictícias. O produto precisa reproduzir a jornada de descoberta, carrinho, checkout e entrega sem processar dinheiro real, sem vender produtos e sem exigir uma conta do usuário.

O código atual é uma aplicação Next.js com App Router, React e TypeScript. A página principal compõe componentes de interface dentro de `ThemeProvider` e `ShopProvider`. O catálogo e os cupons vivem em módulos estáticos; o carrinho, pedidos, tema, som e indicadores são controlados por contextos React. Pedidos e preferências são persistidos no `localStorage` do navegador. Não há API, banco de dados, autenticação, gateway de pagamento ou integração de entrega.

Esse limite combina com o objetivo do MVP: oferecer uma experiência imediata, segura e gratuita. Introduzir servidor neste momento aumentaria custo operacional e superfície de risco sem habilitar uma necessidade do produto atual.

## Decisão

Manter o DopaShop como uma experiência client-side, com as seguintes regras arquiteturais:

1. **Dados de catálogo e cupons:** permanecerão em módulos TypeScript versionados no repositório enquanto forem pequenos, fictícios e compartilhados por todas as sessões.
2. **Estado de interação:** continuará concentrado nos contextos React existentes, com componentes responsáveis pela apresentação e pelas interações locais.
3. **Persistência:** pedidos simulados, tema e preferência de áudio continuarão no `localStorage`, sempre tratados como dados locais e descartáveis.
4. **Transação:** checkout, pagamento, endereço e entrega permanecerão explicitamente fictícios. Nenhum dado financeiro real será coletado, enviado ou armazenado.
5. **Identidade:** não haverá login, conta ou sincronização entre dispositivos no MVP.
6. **Evolução:** regras de negócio compartilhadas devem ser extraídas para funções testáveis antes de crescerem dentro de componentes ou contextos.
7. **Transparência:** a interface deve manter mensagens claras de que os preços, pedidos, saldo, rastreio e economia são simulados.

## Motivações

- Reduz o risco de cobrança ou exposição de dados sensíveis.
- Mantém o onboarding instantâneo e elimina cadastro.
- Permite funcionamento simples em hospedagem estática ou deployment Next.js sem serviços adicionais.
- Mantém o modelo mental alinhado ao produto: a compra não precisa existir fora do navegador.
- Permite iterar catálogo, humor, animações e mecânicas com baixo custo.
- Evita construir backend para dados que não possuem valor operacional real no MVP.

## Alternativas consideradas

### 1. API e banco de dados desde o início

**Rejeitada neste momento.** Seria adequada para contas, sincronização, catálogo administrável, analytics confiável ou pedidos reais, mas adicionaria autenticação, proteção de dados, migrações, monitoramento e custos sem requisito correspondente no MVP.

### 2. Backend apenas para catálogo e cupons

**Rejeitada neste momento.** Um CMS ou API permitiria atualizações sem deploy, mas o catálogo atual é pequeno, fictício e alterado junto com o código. O benefício não compensa a complexidade adicional.

### 3. Estado somente em memória

**Rejeitada.** Seria a implementação mais simples, mas perderia histórico, tema e preferência de som a cada recarga, enfraquecendo o cofre e a sensação de continuidade da experiência.

### 4. PWA/offline-first completo

**Adiada.** Pode ser uma evolução útil para uma experiência de distração rápida, mas exige decidir estratégia de cache, atualização de assets e comportamento de imagens externas. Não é requisito para validar o MVP.

## Consequências positivas

- Menor superfície de ataque e nenhuma obrigação de proteger dados financeiros reais.
- Menor tempo entre alteração e validação do produto.
- Experiência previsível e barata de hospedar.
- Fácil teste manual e automatizado dos fluxos locais.
- Separação clara entre conteúdo estático, estado de sessão e UI.

## Consequências negativas e riscos

- O histórico não acompanha o usuário em outro dispositivo ou navegador.
- Limpar dados do navegador remove os pedidos simulados.
- `localStorage` tem capacidade limitada e não deve receber logs, dados sensíveis ou crescimento ilimitado.
- Analytics baseados apenas no cliente podem ser incompletos e precisam de consentimento e desenho de privacidade.
- Dados estáticos exigem deploy para atualização.
- A lógica de estado pode ficar difícil de testar se continuar espalhada por efeitos e componentes.

## Guardrails de implementação

- Validar e versionar o formato dos dados lidos do `localStorage`; ignorar conteúdo inválido sem quebrar a aplicação.
- Não salvar número de cartão, chave de Pix, carteira cripto, endereço real ou conteúdo sensível do usuário.
- Usar nomes e textos que reforcem que pagamento e entrega são fictícios.
- Cobrir com testes as funções de subtotal, desconto, total, quantidade, criação de pedido e restauração do estado.
- Tratar indisponibilidade de `localStorage`, clipboard, áudio e imagens remotas como degradações não fatais.
- Respeitar preferências de movimento reduzido e oferecer controle de som.
- Evitar que uma futura instrumentação envie texto de campos livres ou identificadores que não sejam necessários.

## Gatilhos para reavaliar

Reabrir esta decisão quando qualquer um dos seguintes requisitos for aprovado:

- login, conta ou sincronização de histórico entre dispositivos;
- catálogo ou cupons gerenciados por pessoas não técnicas;
- analytics de funil que exijam coleta centralizada e consentida;
- necessidade de exportar, recuperar ou apagar dados do usuário em múltiplos dispositivos;
- integração com pagamentos, marketplace, estoque, entrega ou atendimento real;
- volume de dados ou tráfego que torne o `localStorage` inadequado;
- necessidade de experiência offline confiável com atualização controlada de conteúdo.

## Plano de migração futura

Se a decisão for reaberta, preservar primeiro o contrato de domínio de `Product`, `Coupon`, `CartItem` e `Order`. Em seguida:

1. Extrair cálculos e transições de estado para módulos puros e testados.
2. Definir uma API versionada para catálogo, cupons e pedidos, sem expor dados fictícios como transações reais.
3. Substituir o adaptador de persistência local por uma camada com implementação remota e fallback local quando apropriado.
4. Introduzir autenticação e controles de privacidade somente junto com um requisito explícito.
5. Migrar dados locais de forma opt-in e documentada; não enviar automaticamente o histórico do navegador.
6. Atualizar o PRD, este ADR e a documentação de privacidade antes de ativar qualquer integração real.

## Relação com outros documentos

- [PRD do DopaShop](../PRD.md)
- Implementação do estado: `src/context/ShopContext.tsx` e `src/context/ThemeContext.tsx`
- Tipos do domínio: `src/types/index.ts`
