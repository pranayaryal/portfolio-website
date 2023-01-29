import Container from "@/components/Container";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Friday = () => {
  const [search, setSearch] = useState("")
  const [buttonText, setButtonText] = useState("Search")
  const [errorMessage, setErrorMessage] = useState("")
  const [articleSummaries, setArticleSummaries] = useState([])

  const handleChange = (e) => {
    setSearch(e.target.value)
    setErrorMessage("")
  }

  const handleSubmit = async () => {
    setArticleSummaries([])
    setButtonText("Searching ...")
    if (search == "") {
      setErrorMessage("You must enter a search term")
      setButtonText("Search")
      return
    }
    setErrorMessage("")
    console.log(search)
    const res = await fetch(`/api/pubmed?term=${search}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    const { error, summaries } = await res.json();
    if (error) {
      setErrorMessage(`There was an error: ${error}`)
      setButtonText("Search")
      return
    }

    // Set the pubMedIds from response
    setArticleSummaries(summaries)
    setButtonText("Search")


  }


  // const handleChange = (e) => {
  //   setSearch(e.target.value)
  // }

  return (
    <Container
      title="Pranay Aryal | Pubmed Demo"
      description="Testing Demo"
    >
      <div className="max-w-4xl mx-auto py-4">
        <p className="mb-4">Search pubmed for a Randomized Controlled Trial</p>
        {errorMessage &&
          <p className="mt-4 mb-2 text-sm text-red-400">{errorMessage}</p>
        }
        <div className="flex flex-row justify-left space-x-4">
          <input
            type="text"
            value={search}
            onChange={(e) => handleChange(e)}
            className="text-black max-w-2/3 h-10 rounded-md border border-indigo-200 py-1 px-2 focus:outline-none focus:border-gray-400 placeholder:text-sm  dark:bg-zinc-800 dark:border-gray-700 dark:text-white mb-1"
            placeholder="Enter a search term"
          />
          <button
            onClick={handleSubmit}
            className="text-black bg-indigo-300 max-w-1/4 px-2 py-2 border-2 border-black  rounded-md font-bold text-sm dark:border-gray-700  mb-4"
          >{buttonText}</button>

        </div>

        <div className="max-w-xl">
          {articleSummaries &&
            articleSummaries.map(summary => {
              return (
                <div>
                  <a target="_blank"
                    href={`https://pubmed.ncbi.nlm.nih.gov/${summary.uid}/`}>
                    <p className="mt-4 text-sm text-gray-900" key={summary.uid}> {summary.title}</p>
                    <span className="text-xs text-indigo-400">{summary.lastauthor} et al |</span>
                    <span className="text-xs text-green-400"> {summary.pubdate} |</span>
                    <span className="text-xs text-red-400"> {summary.source}</span>
                  </a>
                </div>
              )

            })

          }


        </div>

      </div>
    </Container>
  );
};

export default Friday;
