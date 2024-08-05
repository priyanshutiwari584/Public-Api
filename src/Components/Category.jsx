import React from 'react';
import { useNavigate } from 'react-router-dom';

const Category = ({ categories, type }) => {
    const navigate = useNavigate();

    const handleCategoryChange = (category) => {
        navigate(`/Public-Api/category?type=${type}&category=${category}`);
    };

    return (
        <div>
            <div className="flex flex-wrap gap-2 mt-2">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => handleCategoryChange(category)}
                        className="px-4 py-2 bg-blue-300 rounded-lg text-black hover:bg-blue-400"
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Category;
