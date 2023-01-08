import { getExampleSearch } from '@/lib/pubmed'
const apiKey = process.env.SENDGRID_API_KEY

const API_KEY = process.env.PUBMED_API_KEY

export default async (req, res) => {
  try {
    // console.log("REQ.BODY", req.body);
    const { esearchresult, header } = await getExampleSearch()
    const { idlist } = esearchresult
    const { count } = esearchresult 
    console.log(esearchresult)
    res.json({ esearchresult, idlist, header, error: ""})
  } catch (error) {
    // console.log(error);
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

};
