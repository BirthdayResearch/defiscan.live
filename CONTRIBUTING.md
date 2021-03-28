# DeFi Explorer Contributing Guide

## Backlog Management

```javascript
const backlog = await getProjectBacklog()

const listening = [
  "feedback",
  "idea",
  "suggestion",
  "regression",
  "new feature",
  "..."
]

function createIssue(idea) {
  return {
    title: idea.title,
    body: generateDescription(idea)
  }
}

getCommunity().on(listening, (idea) => {
  const issue = await createIssue(idea)
  backlog.addIssue(issue)
})

getQuality().on(listening, (bug) => {
  const issue = await createIssue(bug)
  backlog.addIssue(issue)
})

getProduct().on(listening, (task) => {
  const issue = await createIssue(idea)
  backlog.addIssue(issue)
})

getEngineering().on(listening, (task) => {
  const issue = await createIssue(task)
  backlog.addIssue(issue)
})
```

## Developing Guides

### All features must be tested with accepted coverage. (Target 100%)

Each package or functionality must be accompanied by full coverage testing.

### TODO comments

TODO comments should usually include the author's github username in parentheses. Example:

```ts
// TODO(fuxingloh): Add tests.
```

### Code of conduct

Please follow the guidelines outlined at https://github.com/DeFiCh/.github/blob/main/CODE_OF_CONDUCT.md

### Explicit over implicit

Each package, feature, code and decision should be explicit and well documented over implicitly guessing.

### TypeScript

TypeScript must be used for all code written in this project.
