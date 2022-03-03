const argv = require('yargs/yargs')(process.argv.slice(2)).argv
const fs = require('fs')
const path = require('path')
const { exec } = require('./qrust.js')
const chokidar = require('chokidar')

if (argv.json) {
	let json = JSON.parse(fs.readFileSync(argv._[0]))
	if (json.watch) {
		console.log(`\u001b[32mStarted watching file ${json.file} \u001b[0m`)
		chokidar.watch(path.resolve(process.cwd(), path.dirname(argv._[0]), json.file)).on('all', (e, p) => {
			console.log(`\u001b[32mFile changed, Reloading... \u001b[0m`)
			var code = fs.readFileSync(path.resolve(process.cwd(), path.dirname(argv._[0]), json.file), 'utf8')
			run(code, json.var, "watch")
		});
	} else {
		var code = fs.readFileSync(path.resolve(process.cwd(), path.dirname(argv._[0]), json.file), 'utf8')
		run(code, json.var)
	}
} else if (argv._[0]) {
	if (argv.watch || argv.w) {
		console.log(`\u001b[32mStarted watching file ${argv._[0]} \u001b[0m`)
		chokidar.watch(path.resolve(process.cwd(), argv._[0])).on('all', (e, p) => {
			console.log(`\u001b[32mFile changed, Reloading... \u001b[0m`)
			var code = fs.readFileSync(path.resolve(process.cwd(), argv._[0]), 'utf8')
			run(code, [], "watch")
		});
	} else {
		var code = fs.readFileSync(path.resolve(process.cwd(), argv._[0]), 'utf8')
		run(code, [])
	}	
} else if(argv.v || argv.version) {
	console.log("QuickRust Version:",require('../package.json').version)
} else if(argv.h || argv.help) {
	help()
} else {
	help()
}
function run(code, v, w) {
	exec(code, v, data => {
		if (data.error) {
			console.log(data.error)
		} else if (data.internalError) {
			console.error("[qrust]: \u001b[31m This is probably due no internet connection","\n\n",data.internalError,'\u001b[0m')
		} else {
			console.log('\u001b[32m',data.stderr.replaceAll("/playground", "/"+argv._[0]),'\u001b[0m')
			console.log(data.stdout)
		}
		if(w)console.log("\u001b[32mWating for file changes...\u001b[0m")
	})
}
function help() {
	console.log("Usage: qrust <file>\n\n\tInternet connection is required\n")
	console.log("Example: qrust src/main.rs\n")
	console.log(`Options:
	-h, --help      Show this help message.
	-v, --version   Show version.
	-w, --watch     Watch file for changes.
	--json          load through json.`)
}
//inside inverted commas: (["'])(?:(?=(\\?))\2.)*?\1/g