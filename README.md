# Nx-Todo-App

## Notice

**This project includes these parts:**

- [simple todo app by Angular + NgZorro](apps/todo/)
- [enhanced todo app by Angular + Apollo + NgRx + NgZorro(**WIP**)](apps/enhanced-todo/)
- [api server by NestJS](apps/api/)
- [todo app built by React + Apollo(**WIP**)](apps/react-todo)

For simple Nx usage, just check the [first one](apps/todo/).
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

## Tech

For more infos, see official document below.

- [Nx](https://nx.dev/)
- [Angular](https://angular.cn/) + [NG-ZORRO](https://ng.ant.design/docs/introduce/zh)
- [NestJS](https://nestjs.com/) + [LowDB](https://github.com/typicode/lowdb)

## Todo

- [ ] Unit/E2E Test in Anuglar/Nest App (Jest + Cypress)
- [ ] CI/CD

## Error

fix node-gyp error:

```bash
npm i node-pre-gyp rebuild
```
