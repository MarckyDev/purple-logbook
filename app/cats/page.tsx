'use client';
import { useEffect, useState } from "react";
export default function CatsPage() {
    const [catData, setCatData] = useState([]);

    async function fetchCatData(){
    try{
        const response = fetch('https://api.thecatapi.com/v1/breeds');
        const data = (await response).json();
        return data.then((cats) => setCatData(cats));
    }
    catch(err){
    console.error(err);
    }
    }

    useEffect(() => {
    fetchCatData();
  }, []);

  return (
    <div>
        <h1 className="text-3xl font-bold underline">Cats Page</h1>
        <div className="mt-10 w-full px-4 sm:px-0">
          {/* API Details */}
          <div className="mt-8 w-full">
            {catData.slice(0, 10).map((cat: any) => (
              <div key={cat.id} className="mb-4 p-4 border rounded">
                <h3 className="text-xl text-amber-700 font-semibold">{cat.name}</h3>
                <p className="text-gray-700">{cat.description}</p>
              </div>
            ))

            }
          </div>
        </div>

    </div>
  );
}