/* eslint-disable no-unused-vars */
"use client";

import { useState } from "react";

type Category = {
  id: string;
  name: string;
};

type CategorySelectorProps = {
  categories: Category[];
  onSelectCategory: (categoryId: string) => void;
};

const CategorySelector = ({
  categories,
  onSelectCategory,
}: CategorySelectorProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]?.id || "all"
  );

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    onSelectCategory(categoryId);
  };

  return (
    <div className='flex flex-wrap justify-center pt-5 gap-4 mb-8'>
      <button
        className={`
           w-[60px] h-[60px]
          rounded-full 
          font-semibold 
          text-sm 
          transition-all 
          duration-300 
          border-2 
          ${
            selectedCategory === "all"
              ? "bg-[#B88E2F] text-white border-[#A17B29] shadow-lg "
              : "bg-white text-[#B88E2F] border-[#B88E2F] hover:bg-[#B88E2F] hover:text-white"
          }
        `}
        onClick={() => handleCategoryClick("all")}>
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          className={`
            w-[60px] h-[60px]
            rounded-full 
            font-semibold 
            text-sm 
            transition-all 
            duration-300 
            border-2 
         
            ${
              selectedCategory === category.id
                ? "bg-[#B88E2F] text-white border-[#A17B29] shadow-lg  "
                : "bg-white text-[#B88E2F] border-[#B88E2F] hover:bg-[#B88E2F] hover:text-white"
            }
          `}
          onClick={() => handleCategoryClick(category.id)}>
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
