const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const prompt = require('prompt-sync')()

module.exports.exec = function(code, v, callback) {
	if (v.length > -1) {
		v.forEach(e => {
			code = code.replaceAll(`<%QRS_${e}%>`, prompt(`${e}: `))
		})
	}
	//check if internet is available
	fetch("https://play.rust-lang.org/execute", {
		"headers": {
			"accept": "*/*",
			"accept-language": "en-GB,en;q=0.9,bn;q=0.8,hi;q=0.7,ja;q=0.6",
			"content-type": "application/json",
			"Referer": "https://play.rust-lang.org/",
			"Referrer-Policy": "strict-origin-when-cross-origin"
		},
		"body": JSON.stringify({"channel":"stable","mode":"debug","edition":"2021","crateType":"bin","tests":false,"code":code,"backtrace":false}),
		"method": "POST"
	})
	.then(res => res.json())
	.then(data => {
		callback(data)
	})
	.catch(err => {
		callback({internalError:err})
	})
}