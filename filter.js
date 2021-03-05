/*
 * Copyright (c) 2020 RethinkDNS and its authors.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

var CreateError = require('@serverless-dns/error')
var BlocklistWrap = require('@serverless-dns/blocklist-wrapper').BlocklistWrap
//const fetch = require('node-fetch');
//const fs = require('fs');


class Filter {
	constructor() {
		this.bufferList
		this.blocklistBasicConfig
		this.blocklistFileTag
		this.Blocklist
	}

	async DownloadLoadFilter(blocklistUrl, latestTimestamp) {
		try {
			var decoder = new TextDecoder()
			
			let buf0 = fileFetch.call(this, blocklistUrl + latestTimestamp + "/basicconfig.json")
			let buf1 = fileFetch.call(this, blocklistUrl + latestTimestamp + "/filetag.json")
			let buf2 = fileFetch.call(this, blocklistUrl + latestTimestamp + "/td.txt")
			let buf3 = fileFetch.call(this, blocklistUrl + latestTimestamp + "/rd.txt")

			this.bufferList = await Promise.all([buf0, buf1, buf2, buf3]);
			
			this.blocklistBasicConfig = JSON.parse(decoder.decode(this.bufferList[0]))
			this.blocklistFileTag = JSON.parse(decoder.decode(this.bufferList[1]))
			this.Blocklist = new BlocklistWrap()
			await this.Blocklist.build(this.bufferList[2], this.bufferList[3], this.blocklistFileTag, this.blocklistBasicConfig)

			/*
			let td_buf = new Uint16Array((fs.readFileSync("./result/td.txt")).buffer);
			let rd_buf = new Uint16Array((fs.readFileSync("./result/rd.txt")).buffer);
			let basic = JSON.parse(fs.readFileSync("./result/basicconfig.json", 'utf8'))
			let tagdic = JSON.parse(fs.readFileSync("./result/filetag.json", 'utf8'))
			this.Blocklist = new BlocklistWrap()
			await this.Blocklist.build(td_buf, rd_buf, tagdic, basic) */
		}
		catch (e) {
			CreateError.CreateError("filter.js Filter DownloadLoadFilter", e)			
		}
	}
}

async function fileFetch(url) {
	const res = await fetch(url, { cf: { cacheTtl: 604800 } });
	const b = await res.arrayBuffer();
	return b;
}

module.exports.Filter = Filter