#!/usr/bin/env node

// @ts-nocheck
const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2)
if (args.length < 2) {
  console.log('Please provide the component type and name.')
  process.exit(1)
}

const typeMapping = {
  page: '2_pages',
  widget: '3_widgets',
  feature: '4_features',
  entity: '5_entities',
  shared: '6_shared',
}

const componentType = typeMapping[args[0]]
const componentName = args[1]
const componentNameCapitalized =
  componentName.charAt(0).toUpperCase() + componentName.slice(1)

if (!componentType) {
  console.log(`Component type "${args[0]}" is not supported.`)
  process.exit(1)
}

// Update tsconfig.json if required
const tsconfigPath = path.join(__dirname, 'tsconfig.json')
if (fs.existsSync(tsconfigPath)) {
  let tsconfig = eval('(' + fs.readFileSync(tsconfigPath, 'utf-8') + ')')
  let mappingPath = `src/${componentType}/*`
  if (
    tsconfig.compilerOptions &&
    tsconfig.compilerOptions.baseUrl
  ) {
    if (!tsconfig.compilerOptions.paths) {
      tsconfig.compilerOptions.paths = {};
    }
    if (!tsconfig.compilerOptions.paths[`${args[0]}/*`]) {
      tsconfig.compilerOptions.paths[`${args[0]}/*`] = [mappingPath]
      fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2))
    }
  }
}

if (componentType === '6_shared') {
  const sharedDirPath = path.join(__dirname, 'src', componentType)
  const sharedFilePath = path.join(sharedDirPath, `${componentName}.ts`)

  if (!fs.existsSync(sharedDirPath)) {
    fs.mkdirSync(sharedDirPath, { recursive: true })
  }
  
  if (!fs.existsSync(sharedFilePath)) {
    fs.writeFileSync(sharedFilePath, '')
    console.log(
      `${args[0]} ${componentName} has been created successfully in the ${componentType} directory.`
    )
  } else {
    console.log(`The file ${sharedFilePath} already exists.`)
  }

  process.exit(0)
}

const componentDirPath = path.join(
  __dirname,
  'src',
  componentType,
  componentName
)
const componentPath = path.join(
  componentDirPath,
  `${componentNameCapitalized}.tsx`
)
const indexPath = path.join(componentDirPath, `index.ts`)

if (!fs.existsSync(componentDirPath)) {
  fs.mkdirSync(componentDirPath, { recursive: true })
}

const componentContent = `export default function ${componentNameCapitalized}() {
  return <div>${componentName.toLowerCase()}</div>
}
`

const indexContent = `export { default } from './${componentNameCapitalized}'
`

fs.writeFileSync(componentPath, componentContent)
fs.writeFileSync(indexPath, indexContent)

console.log(
  `${args[0]} ${componentNameCapitalized} has been created successfully in the ${componentType} directory.`
)
