'use client';

import { useEffect, useState } from "react";

export default function SearchBar() {
    const [cats, setCats] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCats, setFilteredCats] = useState<string[]>([]);

    useEffect(() => {
        fetch('https://api.thecatapi.com/v1/breeds')
        .then(response => response.json())
        .then(data => {
            const catNames = data.map((cat: any) => cat.name);
            setCats(catNames);
        });
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredCats([]);
        } else {
            const filtered = cats.filter(cat => 
                cat.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCats(filtered);
        }
    }, [searchTerm, cats]);

    return (
        <div className="w-full mb-4 relative">
            <input
                type="text"
                placeholder="Search cats..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-purple-600"
            />
            {filteredCats.length > 0 && (
                <ul className="absolute z-10 w-full mt-1 max-h-40 overflow-y-auto border border-gray-200 rounded bg-white shadow-lg">
                    {filteredCats.map((cat, index) => (
                        <li 
                            key={index} 
                            className="p-2 hover:bg-purple-50 cursor-pointer text-gray-700"
                            onClick={() => {
                                setSearchTerm(cat);
                                setFilteredCats([]);
                            }}
                        >
                            {cat}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}