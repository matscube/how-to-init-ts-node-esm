## How to build
* npm init -y
* mkdir src && touch src/index.ts
* npm i -D typescript @tsconfig/recommended @types/node
* npx tsc --init
* npx tsc --showConfig
* replace tsconfig.json with `"extends": "@tsconfig/recommended/tsconfig.json"`
* (deprecated) if you use ESM, add `"type": "module"` to package.json
* if you bundle js file, npm i -D esbuild

## Requirements
* Use typescript
* Run on Node.js (not Browser. If you want to run on Browser, use vite as bundle along with html/css)
* Use ESM

## How to run
### bundle
- First, type check by tsc --noEmit
  - you don't output js file directory by tsc, because you output bundle js file by esbuild
  - type checking is not included in esbuild process, so you need to run tsc
- Second, bundle js file by esbuild
  - even if output file is run by Node.js, use bundle file rather than individual files
  - it's because you can't use import statement without file extensions when you compile ts files along with ESM to js files
  - esbuild has built-in typescript and it loaded settings from tsconfig file
- Third, run bundle js file by Node.js

### no bundle
- First, run tsc (including type checking)
- Second, run main js file by Node.js (use commonjs)
  - ESM requires developers to use file extension (but, ts files don't commonly use extensions)

## tsconfig.json cheat sheet
* compilerOptions.outDir
* compilerOptions.rootDir
  - **Purpose**:
The rootDir option specifies the root directory of input files for the TypeScript compiler. It's used to control the output directory structure when used in conjunction with the outDir option.
  - **Behavior**:
rootDir does not affect which files are included in the compilation. It doesn't interact with the "include", "exclude", or "files" settings in tsconfig.json.
It helps maintain the same directory structure in the output directory as exists in the input directory.
TypeScript will never write an output file to a directory outside of outDir, and will never skip emitting a file.
* include
  - **Purpose**:
The include option is used to define a set of files or directories that should be considered for type checking and compilation by the TypeScript compiler.

* exclude
  - **Purpose**:
exclude allows you to omit certain files or folders from TypeScript compilation and type checking.
  - **DefaultBehavior**:
If not specified, TypeScript excludes the node_modules, bower_components, jspm_packages, and <outDir> directories by default.
  - **Relationship with include**:
exclude is applied after include, meaning it can remove files that were included by the include option.
If include is not specified, exclude filters the implicit includes (all .ts, .tsx, .d.ts files in the project and its subdirectories).
  - **Common Use Cases**:
Excluding test files from production builds.
Omitting specific libraries or third-party code.
Preventing compilation of output directories.
  - **Important Notes**:
exclude doesn't prevent JavaScript files from being included when using allowJs.
It doesn't affect the files option, which always includes specified files.
VSCode may still perform type checking on excluded files for better IntelliSense, even if they're not compiled.
  - **Best Practices**:
Use exclude judiciously to optimize compilation speed and avoid unnecessary type checking.
Consider using it in conjunction with include for more precise control over your project structure.

* compilerOptions.module
  - **Considerations**:
The choice depends on your target environment and bundler setup.
For modern Node.js projects, "NodeNext" or "Node16" is recommended.
For browser applications that will be bundled, "ES6" or "ESNext" is often preferred.
  - **Relationship with other options**:
Interacts with the target option, which specifies the ECMAScript version for the output.
Affects moduleResolution option, which determines how modules are resolved.
  - **Impact on code**:
Different module settings can result in different JavaScript output for the same TypeScript input.
  - **Best practices**:
Align this setting with your runtime environment and build tools.
For projects targeting both Node.js and browsers, you might need different configurations.

* compilerOptions.target
  - **Behavior**:
TypeScript will compile features not available in the target version to equivalent code that works in that version.
For example, an arrow function () => this will be transformed into an equivalent function expression if target is ES5 or lower.
  - **Considerations**:
Modern browsers support all ES6 features, so "es6" is often a good choice for browser-based applications.
For Node.js projects, the appropriate target depends on the Node.js version being used.
  - **Best practices**:
Choose a target that matches your deployment environment.
For Node.js projects, you can refer to resources like tsconfig/bases or node.green to determine the appropriate target for your Node.js version.
For browser-based projects, consider the minimum browser versions you need to support.

* compilerOptions.moduleResolution
  - **Common values**:
"node": Uses Node.js-style resolution (default for most module types)
"classic": Uses TypeScript's pre-1.6 resolution strategy (rarely used now)
"node16" or "nodenext": For modern Node.js versions supporting ECMAScript modules
"bundler": For use with bundlers, supporting package.json "imports" and "exports"
  - **Behavior**:
Affects how TypeScript searches for module files and resolves import paths.
Interacts closely with the module option.
  - **Node-style resolution**:
Looks in node_modules directories
Supports package.json main field
Allows omitting file extensions
  - **Best practices**:
Use "node16" or "nodenext" for modern Node.js projects
Use "bundler" if you're using a module bundler like webpack or Rollup
Ensure it's compatible with your module setting and target environment

* compilerOptions.esModuleInterop
  - **Common Use Cases**:
Importing CommonJS modules using ES module syntax, such as using default imports for modules that don't explicitly export a default member.
Resolving errors related to module import mismatches when using ES module syntax with CommonJS modules.

* compilerOptions.lib
  - **Behavior**:
Explicitly specifying lib overrides the default libraries included based on target.
You can mix and match different library versions as needed.
  - **Relationship with target**:
lib is often used in conjunction with target to fine-tune available APIs.
If lib is not specified, it's inferred from target.
  - **Best practices**:
Include only the libraries you need for your project.
For browser projects, usually include "dom" along with the appropriate ECMAScript version.
For Node.js projects, you might not need "dom" but may need other specific libraries.

### Documents
* https://github.com/tsconfig/bases?tab=readme-ov-file
