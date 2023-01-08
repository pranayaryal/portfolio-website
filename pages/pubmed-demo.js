import Container from "@/components/Container";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Friday = () => {
  const [search, setSearch] = useState("")
  const [ errorMessage, setErrorMessage ] = useState("")
  const [ pmids, setPmids ] = useState([])

  const handleSubmit = async () => {
    setErrorMessage("")
    console.log(search)
    const res = await fetch("/api/pubmed", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    const { error, esearchresult, header, idlist } = await res.json();
    if (error) {
      setErrorMessage('There was an error')
      return
    }
    console.log(`The response is ${idlist}`)
    setPmids(idlist)
    console.log(pmids)
 

  }


  // const handleChange = (e) => {
  //   setSearch(e.target.value)
  // }

  return (
    <Container
      title="Pranay Aryal | Pubmed Demo"
      description="Testing Demo"
    >
      <div className="max-w-4xl mx-auto py-40">
        <p className="mb-4">Let's search pubmed for a Randomized Controlled Trial</p>
        { errorMessage && 
          <p className="mt-4 mb-2 text-sm text-red-400">{errorMessage}</p>
        }
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-black rounded-md border border-indigo-200 py-1 px-2 focus:outline-none focus:border-gray-400 placeholder:text-sm  dark:bg-zinc-800 dark:border-gray-700 dark:text-white mb-1"
          placeholder="Enter a search term"
        />
        <button
          onClick={handleSubmit}
          className="text-black w-full px-4 py-4 border-2 border-black  rounded-md font-bold text-xl dark:border-gray-700  mb-4"
        ></button>

        <div className="max-w-xl">
        { pmids && 
          pmids.map(id => {
            return <span> {id},</span>
          })

        }


        </div>

      </div>
    </Container>
  );
};

export default Friday;
