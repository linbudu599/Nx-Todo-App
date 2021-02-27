# Nx-Todo-App

## Notice

**This project includes these parts:**

- [Simple todo app by **Angular** + **NgZorro**](apps/todo/)
- [Enhanced todo app by **Angular** + **Apollo** + **NgRx** + **NgZorro** (**WIP**)](apps/enhanced-todo/)
- [API server by **NestJS**](apps/api/)
- [Todo app built by **React** + **Apollo-Client**](apps/react-todo)

For simple Nx usage, just check the [Simple One](apps/todo/).
## Start

```bash
# This project use PNPM as Package Manager
npm install pnpm nx -g
pnpm install 

# developing

# use 2 terminals
nx serve api
nx serve todo

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

## Todo

- [ ] Unit/E2E Test in Anuglar/Nest App (Jest + Cypress)
- [ ] CI/CD

