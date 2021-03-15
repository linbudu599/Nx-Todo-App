# Nx-Todo-App

## Before Start

**This project includes these parts:**

### Apps

- [Simple Todo App by **Angular** + **NgZorro**](apps/todo/)
- [Enhanced Todo App by **Angular** + **Apollo** + **NgZorro** (**WIP**)](apps/enhanced-todo/)
- [API Server by **NestJS**](apps/api/)
- [Todo App Built by **React** + **Apollo-Client**](apps/react-todo)
- [Todo App Built by **NgRx** + **Angular** + **NgZorro**](apps/ngrx-todo)
- [NgRx Practice](apps/ngrx-ngrx-practice)

For simple Nx usage, just check the [Simple One](apps/todo/).

### Libs

- [NgRx State Module: books](libs/books/)
- [NgRx State Module: counter](libs/counter/)
- [NgRx State Module: products](libs/products/)
- [DTO Shared by All Apps](libs/dto/)
- [Generated GraphQL Code(Apollo-Client Hooks / TypeScript Type Definitions)](libs/graphql/)
- [Shared: Angular Directives & Pipes](libs/shared/)
- [Angular UI Components](libs/ui-components/)
- [React UI Components](libs/ui-components-react/)

## Start

```bash
# This project use PNPM as Package Manager
npm install pnpm nx -g
pnpm install 

# developing

# use 2 terminals
nx serve api
nx serve todo

# other application
nx serve enhanced-todo
nx serve react-todo
nx serve ngrx-todo

# use one ternimal only
npx nx run-many --target=build --projects=todo,api

# generate workspace lib(common lib)
# add --dry-run to check what's going to happen
nx g @nrwl/workspace:lib <lib-name>

# generate Angular lib
nx g @nrwl/angular:lib <lib-name>

# generate Angular Component
# add --export enables you to use <todo-app-xxx></<todo-app-xxx> as command executed once
nx g @nrwl/angular:component <component-name> --project=<project-name> --export

# generate NestJS lib
nx g @nrwl/nest:lib <lib-name>

# generate new projects(application)
# --frontEndProject arg will set up proxy between Frontend & Backend applications
nx g @nrwl/nest:app <app-name> --frontEndProject=mustBeExistedProject

# remove generated resources
nx g @nrwl/workspace:remove <resource-to-be-removed>

# display deps graph between libs & apps & modules & ...
nx dep-graph
```

## Stack

For more info, see official document below.

- [Nx](https://nx.dev/)
- [Angular](https://angular.cn/) + [NG-ZORRO](https://ng.ant.design/docs/introduce/zh)
- [NestJS](https://nestjs.com/) + [LowDB](https://github.com/typicode/lowdb)
- [React](https://github.com/facebook/react) + [Ant Design](https://ant.design/) + [Apollo-Client](https://github.com/apollographql/apollo-client)
- [NgRx](https://ngrx.io/)
- [GraphQL-Code-Generator](https://github.com/dotansimha/graphql-code-generator)


