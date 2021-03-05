/*
 * Copyright (c) 2020 RethinkDNS and its authors.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

class GlobalMember {
    constructor() {
        this.trimDomainNameLists = new Set()
        setTrimDn.call(this)
        this.safeSearchNotLists = new Map()
        setUniquename.call(this)
        this.processId = Math.random().toString(36).substring(8) + "_" + Date.now().toString()
        this.wildCardLists = new Set()
        setWildcardlist.call(this)
        this.CFmember = {}
        this.wildcardUint
        setCFmember.call(this)
    }
}

function setCFmember(){
    this.CFmember.cacheExpiryDays = CF_CACHE_EXPIRY_DAYS
    this.CFmember.configCmsKey = CF_CONFIG_CMS_KEY
    this.CFmember.infoCmsKey = CF_INFO_CMS_KEY
    this.CFmember.userCmsCacheTime = CF_USER_CMS_CACHE_TIME
    this.CFmember.userCmsTossTime = CF_USER_CMS_TOSS_TIME
    this.CFmember.logFirehoseStream = CF_LOG_FIREHOSE_STREAM
    this.CFmember.debugFirehoseStream = CF_DEBUG_FIREHOSE_STREAM
    this.CFmember.dnsCountFirehoseStream = CF_DNSCOUNT_FIREHOSE_STREAM
    this.CFmember.awsSecretKey = CF_AWS_SECRET_KEY //add to secret
    this.CFmember.awsAccessId = CF_AWS_ACCESSID //add to secret
    this.CFmember.awsRegion = CF_AWS_REGION //add to secret
    this.CFmember.dnsLogWaitTime = CF_DNSLOG_WAIT_TIME
    this.CFmember.dnsCountWaitTime = CF_DNSCOUNT_WAIT_TIME
    this.CFmember.liveLogEndPoint = CF_LIVELOG_END_POINT
    this.CFmember.userConfigCacheTime = CF_USER_CONFIG_CACHE_TIME
    this.CFmember.blockListUrl = CF_BLOCKLIST_URL
    this.CFmember.latestBlocklistTimestamp = CF_LATEST_BLOCKLIST_TIMESTAMP
    this.CFmember.processDnsOnDnsParserException = CF_PROCESS_DNS_ON_DNSPARSER_EXCEPTION
    this.CFmember.processDnsOnServerException = CF_PROCESS_DNS_ON_SERVER_EXCEPTION
    this.CFmember.onInvalidFlagStopProcessing = CF_ON_INVALID_FLAG_STOPPROCESSING
}


function setWildcardlist() {
    this.wildCardLists.add("KBI") // safe-search-not-supported
    this.wildCardLists.add("YWG") // nextdns dht-bootstrap-nodes
    this.wildCardLists.add("SMQ") // nextdns file-hosting
    this.wildCardLists.add("AQX") // nextdns proxies
    this.wildCardLists.add("BTG") // nextdns streaming audio
    this.wildCardLists.add("GUN") // nextdns streaming video
    this.wildCardLists.add("KSH") // nextdns torrent clients
    this.wildCardLists.add("WAS") // nextdns torrent trackers
    this.wildCardLists.add("AZY") // nextdns torrent websites
    this.wildCardLists.add("GWB") // nextdns usenet
    this.wildCardLists.add("YMG") // nextdns warez
    this.wildCardLists.add("CZM") // tiuxo porn
    this.wildCardLists.add("ZVO") // oblat social-networks
    this.wildCardLists.add("YOM") // 9gag srv
    this.wildCardLists.add("THR") // amazon srv
    this.wildCardLists.add("RPW") // blizzard srv
    this.wildCardLists.add("AMG") // dailymotion srv
    this.wildCardLists.add("WTJ") // discord srv
    this.wildCardLists.add("ZXU") // disney+ srv
    this.wildCardLists.add("FJG") // ebay srv
    this.wildCardLists.add("NYS") // facebook srv
    this.wildCardLists.add("OKG") // fortnite srv
    this.wildCardLists.add("KNP") // hulu srv
    this.wildCardLists.add("FLI") // imgur srv
    this.wildCardLists.add("RYX") // instagram srv
    this.wildCardLists.add("CIH") // leagueoflegends srv
    this.wildCardLists.add("PTE") // messenger srv
    this.wildCardLists.add("KEA") // minecraft srv
    this.wildCardLists.add("CMR") // netflix srv
    this.wildCardLists.add("DDO") // pinterest srv
    this.wildCardLists.add("VLM") // reddit srv
    this.wildCardLists.add("JEH") // roblox srv
    this.wildCardLists.add("XLX") // skype srv
    this.wildCardLists.add("OQW") // snapchat srv
    this.wildCardLists.add("FXC") // spotify srv
    this.wildCardLists.add("HZJ") // steam srv
    this.wildCardLists.add("SWK") // telegram srv
    this.wildCardLists.add("VAM") // tiktok srv
    this.wildCardLists.add("AOS") // tinder srv
    this.wildCardLists.add("FAL") // tumblr srv
    this.wildCardLists.add("CZK") // twitch srv
    this.wildCardLists.add("FZB") // twitter srv
    this.wildCardLists.add("PYW") // vimeo srv
    this.wildCardLists.add("JXA") // vk srv
    this.wildCardLists.add("KOR") // whatsapp srv
    this.wildCardLists.add("DEP") // youtube srv
    this.wildCardLists.add("RFX") // zoom srv
    this.wildCardLists.add("RAF") // parked-domains
    this.wildCardLists.add("RKG") // infosec.cert-pa.it
    this.wildCardLists.add("GLV") // covid malware sophos labs
    this.wildCardLists.add("FHW") // alexa native
    this.wildCardLists.add("AGZ") // apple native
    this.wildCardLists.add("IVN") // huawei native
    this.wildCardLists.add("FIB") // roku native
    this.wildCardLists.add("FGF") // samsung native
    this.wildCardLists.add("FLL") // sonos native
    this.wildCardLists.add("IVO") // windows native
    this.wildCardLists.add("ALQ") // xiaomi native
}
function setTrimDn() {
    this.trimDomainNameLists.add("www")
    this.trimDomainNameLists.add("w2")
    this.trimDomainNameLists.add("m")
    this.trimDomainNameLists.add("mobile")
}
function setUniquename() {
    this.safeSearchNotLists.set("KBI", 0)
}

module.exports.GlobalMember = GlobalMember