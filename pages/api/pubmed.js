const apiKey = process.env.SENDGRID_API_KEY

const API_KEY = process.env.PUBMED_API_KEY
const BASE_URL = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/`
const SEARCH_ENDPOINT = `esearch.fcgi?db=pubmed&retmode=json&sort=pub_date&term=`
const SUMMARY_ENDPOINT = `esummary.fcgi?db=pubmed&version=2.0&retmode=json&api_key=${API_KEY}&id=`
const SPELLING_ENDPOINT = `espell.fcgi?db=pubmed&term=rhuinitis`
const RELATED_ENDPOINT = `elink.fcgi?dbfrom=pubmed&db=pubmed&id=`

const getPmids = async (term) => {
    // Get the pubMed Ids associated with the search
    const url = `${BASE_URL}${SEARCH_ENDPOINT}${term}+randomized+controlled+trial[pubt]`
    const response  = await fetch(url)

    const search = await response.json()
    return search
}

const getSummary = async (idlist) => {
    const joined = idlist.toString();
    const url = `${BASE_URL}${SUMMARY_ENDPOINT}${joined}`
    const response  = await fetch(url)

    const summary = await response.json()
    return summary
}

export default async (req, res) => {
  try {
    const { term } = req.query
    // console.log("REQ.BODY", req.body);
    const { esearchresult, header } = await getPmids(term)
    const { idlist } = esearchresult

    const summary = await getSummary(idlist)
    const {  result } = summary
    const resultValues = Object.values(result)

    let summaries = []

    resultValues.map(r => {
      if (r.uid != undefined){
        // This wil eliminate the last part of the array
        // which is nothing but the list uids
        summaries.push(r)
      }
    })

    console.log(summaries)


    res.json({ summaries , error: ""})
  } catch (error) {
    // console.log(error);
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

};
