# GLPAR Timer

Aplicação de produtividade baseada na técnica Pomodoro. Permite criar ciclos de foco, acompanhar a contagem regressiva e consultar o histórico das sessões.

## Funcionalidades

- criação de ciclos com nome da tarefa e duração;
- contagem regressiva em tempo real;
- interrupção e conclusão automática de ciclos;
- histórico com status de cada sessão;
- persistência dos ciclos no `localStorage`;
- validação de formulários.

## Tecnologias

React, TypeScript, Vite, React Router, Styled Components, React Hook Form, Zod, Immer e date-fns.

## Como instalar e executar

### Pré-requisitos

- Node.js 18 ou superior;
- npm.

```bash
git clone https://github.com/glpar/glpar-timer.git
cd glpar-timer
npm install
npm run dev
```

Abra o endereço exibido pelo Vite, normalmente `http://localhost:5173`.

## Como usar

1. Informe o nome da tarefa.
2. Escolha uma duração entre 5 e 60 minutos.
3. Inicie o ciclo e acompanhe o cronômetro.
4. Interrompa o ciclo quando necessário.
5. Acesse a página de histórico para consultar ciclos concluídos, interrompidos ou em andamento.

## Comandos

- `npm run dev`: inicia o ambiente de desenvolvimento;
- `npm run build`: gera a versão de produção;
- `npm run preview`: visualiza o build localmente;
- `npm run lint`: verifica a qualidade do código.

## Persistência

Os dados são salvos apenas no navegador, por meio do `localStorage`. Não é necessário configurar banco de dados ou variáveis de ambiente.
