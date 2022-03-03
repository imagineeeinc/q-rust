# QuickRust

Quick Rust is a light weight alternative to rust with a lot of native features missing, perfect for places where you can't use the compiler.

Inspired by [This](https://gist.github.com/badboy/222302b6b40ba6afc412).

## Installation

Simple as installing from npm

```shell
npm install -g q-rust
```

## Usage

```shell
Usage: qrust <file>

        Internet connection is required

Example: qrust src/main.rs

Options:
        -h, --help      Show this help message.   
        -v, --version   Show version.
        -w, --watch     Watch file for changes.   
        --json          load through json. 
```

### Qrust json input

qrust dosn't support input from std, so for that reason we provide a json based input system

JSON options:

```
{
	"file": "path to rust file.rs",
	"watch": false || true,
	"var": ["list", "of vars"]
}
```

you then access these variables through the `<%QRS_...%>` keyword, where the `...` is the var name.

you can run a json by swapping the file in the run command with the json location and adding the `--json` argument.

check out examples on using it [here](https://github.com/imagineeeinc/q-rust/tree/main/example)