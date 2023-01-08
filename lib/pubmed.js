import querystring from 'querystring'

const API_KEY = process.env.PUBMED_API_KEY
const BASE_URL = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/`
const SEARCH_ENDPOINT = `esearch.fcgi?db=pubmed&retmode=json&term=`
const SUMMARY_ENDPOINT = `esummary.fcgi?db=pubmed&version=2.0&id=`
const SPELLING_ENDPOINT = `espell.fcgi?db=pubmed&term=rhuinitis`
const RELATED_ENDPOINT = `elink.fcgi?dbfrom=pubmed&db=pubmed&id=`

export const getExampleSearch = async () => {
    const response  = await fetch(`${BASE_URL}${SEARCH_ENDPOINT}covid+randomized+controlled+trial[pubt]`)

    const search = await response.json()
    return search
}


