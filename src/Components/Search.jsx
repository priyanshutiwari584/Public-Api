import { SearchIcon, X } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ type }) => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (event) => {
        if (event.key === 'Enter' && query) {
            const formattedQuery = query.replace(/\s+/g, '-');
            navigate(`/Public-Api/search?type=${type}&q=${formattedQuery}`);
        }
    };

    const handleClear = () => {
        setQuery('');
    };

    return (
        <div className="md:w-[700px] h-[3rem] flex relative items-center border rounded-full m-auto z-0">
            <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search"
                className='w-[80%] md:w-[90%] h-full outline-none rounded-l-full px-3  bg-[#121212]'
                onKeyDown={handleSearch}
            />
            {query && (
                <button type="button" className="absolute opacity-90 rounded-full right-20" onClick={handleClear}>
                    <X />
                </button>
            )}
            <button className='w-[20%] md:w-[10%] h-full flex justify-center items-center px-2 rounded-r-full bg-[#222222]'
                onClick={() => {
                    if (query !== "") {
                        const formattedQuery = query.replace(/\s+/g, '-');
                        navigate(`/Public-Api/search?type=${type}&q=${formattedQuery}`);
                    }
                }}>
                <SearchIcon />
            </button>
        </div>
    );
};

export default SearchBar;
