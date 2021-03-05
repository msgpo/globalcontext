/*
 * Copyright (c) 2020 RethinkDNS and its authors.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */



var LocalCache = require('@serverless-dns/cache-wrapper').LocalCache
var GlobalMember = require("./global.js").GlobalMember
var Filter = require("./filter.js").Filter

class SharedContext {
	constructor() {
		this.loaded = false
		this.GlobalContext = undefined
		this.DomainNameCache = undefined
		this.UserConfigCache = undefined
		this.BlockListFilter = undefined
		this.UserInfoCache = undefined
		this.NowLoading = false
		this.RequestLogs = []
		this.ErrorLogs = []
		this.RequestLogThreadBlock = false
		this.ErrorLogThreadBlock = false
		this.UserCountThreadBlock = false
	}

	async RethinkModule(commonContext, thisRequest, event) {
		let retryCount = 0;
		let retryLimit = 5;
		while (commonContext.NowLoading == true) {
			if (retryCount >= retryLimit) {
				break
			}
			await sleep(10)
			retryCount++
		}

		if (commonContext.loaded == false && commonContext.NowLoading == false) {
			await commonContext.Init(thisRequest)
		}
	}

	async Init(thisRequest) {
		try {
			this.NowLoading = true
			this.GlobalContext = new GlobalMember()
			this.DomainNameCache = new LocalCache("Domain-Name-Cache", 5000, 2, 10000, 0.00027, 0.00001, 500, 10) //0.4 % false postive, .1mb size
			this.UserConfigCache = new LocalCache("User-Config-Cache", 1000, 2, 5000, 0.00027, 0.0001, 500, 10) //0% false postive
			this.UserInfoCache = new LocalCache("User-Info-Cache", 1000, 2, 5000, 0.00027, 0.0001, 500, 10) //0% false postive
			this.BlockListFilter = new Filter()
			//await this.BlockListFilter.DownloadLoadFilter("https://media.githubusercontent.com/media/santhosh-ponnusamy/blocklist-metadata/main/", "latest")
			await this.BlockListFilter.DownloadLoadFilter(this.GlobalContext.CFmember.blockListUrl, this.GlobalContext.CFmember.latestBlocklistTimestamp)
			let str = this.BlockListFilter.Blocklist.customTagToFlag(this.GlobalContext.wildCardLists, this.BlockListFilter.blocklistFileTag)
			this.GlobalContext.wildcardUint = new Uint16Array(str.length);
			for (let i = 0; i < this.GlobalContext.wildcardUint.length; i++) {
				this.GlobalContext.wildcardUint[i] = str.charCodeAt(i);
			}
			this.loaded = true
			this.NowLoading = false
		}
		catch (e) {
			thisRequest.StopProcessing = true
			thisRequest.IsException = true
			thisRequest.exception = e
			thisRequest.exceptionFrom = "global-context.js - Init"
		}
	}

	GetBucketId(usrid){
		return this.BlockListFilter.Blocklist.getBucketId(usrid)
	}

}

const sleep = ms => {
	return new Promise(resolve => {
		setTimeout(resolve, ms);
	});
};

module.exports.SharedContext = SharedContext