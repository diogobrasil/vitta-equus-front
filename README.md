# 🐴 VitaEquus
Sistema completo para Gestão Equina e Reprodução.

O VitaEquus é uma aplicação web voltada para a gestão de propriedades, animais, controle reprodutivo avançado e histórico clínico de equinos. Desenvolvido com tecnologias modernas e focado na usabilidade, o sistema visa facilitar o dia a dia de veterinários, haras e criadores.

## 🌟 Principais Funcionalidades

- **Módulo de Propriedades**: Cadastro e gerenciamento de diferentes haras ou fazendas.
- **Gestão de Animais**: Perfil completo de cada animal, cadastro de dados zootécnicos e acompanhamento geral.
- **Módulo de Reprodução Avançada**:
  - Exames reprodutivos.
  - Registro e acompanhamento de Coberturas.
  - Controle de Gestações e Checkups ultrassonográficos frequentes.
  - Acompanhamento de Partos e registro automatizado de Potros.
- **Módulo Clínico (Prontuário)**:
  - Registro de Atendimentos veterinários (queixa, exame físico, diagnóstico e conduta).
  - Prontuário médico detalhado para histórico contínuo do paciente.
  - Controle e prescrição de Medicações.

## 💻 Tech Stack & Arquitetura

Este projeto foi construído utilizando as melhores ferramentas e práticas do ecossistema front-end:

- **Framework & Linguagem**: React 18 + Vite + TypeScript
- **Estilização & Componentes UI**: Tailwind CSS + shadcn/ui (Componentes acessíveis e modulares baseados no Radix UI)
- **Roteamento**: React Router v6
- **Gerenciamento de Estado & Data Fetching**: React Query (@tanstack/react-query)
- **Formulários & Validação**: React Hook Form + Zod
- **Animações e Micro-interações**: Framer Motion

## 🚀 Como executar o projeto localmente

### 1. Pré-requisitos

- **Node.js** instalado (versão 18+ recomendada)
- **npm** (gerenciador de pacotes do Node)

### 2. Inicializando

No seu terminal, navegue até a pasta do projeto e siga os passos abaixo:

```bash
# 1. Instale todas as dependências necessárias
npm install

# 2. Inicie o servidor de desenvolvimento
npm run dev
```

### 3. Acessando a Aplicação

Abra o seu navegador e acesse a URL que aparecerá no terminal (por padrão: `http://localhost:8080`). O Vite possibilita Hot Module Replacement (HMR), então qualquer alteração no código refletirá instantaneamente na tela!

---

*Desenvolvido para oferecer a mais alta performance e melhor experiência na gestão de haras e da clínica veterinária equina.*
