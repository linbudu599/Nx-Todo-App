# Nx-Todo-App

## Notice

**This project is still under development, so donot regard it as fully qualified.**

See below for what is considered to be included in this project.

If what you want is just a simple demo guiding on how to use Nx in Angular + NestJS monorepo setup, check:

- [api(backend by NestJS)](apps/api/src/app/app.module.ts)
- [todo(frontend by Angular)](apps/todo/src/app/app.module.ts)

## Start

```bash
npm install
npm install nx -g

# developing

# use 2 terminals
nx serve api
nx serve todo

# use one ternimal only
npx nx run-many --target=build --projects=todo,api

# generate workspace lib(common lib)
nx g @nrwl/workspace:lib <lib-name>

# generate Angular lib
nx g @nrwl/angular:lib <lib-name>

# generate Angular Component
# add "--export" enables you to use <todo-app-xxx></<todo-app-xxx> as command executed once
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

## Tech

For more infos, see official document below.

- [Nx](https://nx.dev/)
- [Angular](https://angular.cn/) + [NG-ZORRO](https://ng.ant.design/docs/introduce/zh)
- [NestJS](https://nestjs.com/) + [LowDB](https://github.com/typicode/lowdb)

## Todo

- [ ] Unit/E2E Test in Anuglar/Nest App (Jest + Cypress)
- [ ] CI/CD

## Explore

You can check these explores in another applications, app `todo` will just keep as a simple "Todo App".

### Nx

- [ ] Nx Cloud
- [ ] Workflow Enhancement

### FrontEnd

- [ ] i18n
- [ ] Router for various playgrounds
- [ ] Directives
- [ ] Lifecycle Usage
- [ ] Component Interaction
- [ ] Custom Element
- [ ] Pipes
- [ ] Form
  - [ ] Template Driven / Responsive
  - [ ] Validators
- [ ] Http Client
- [ ] Apollo-Angular
- [ ] More Ng-zorro Components
- [ ] NgRx
- [ ] More Angular libraries

### BackEnd

- [ ] GraphQL API by TypeGraphQL
- [ ] WIP
