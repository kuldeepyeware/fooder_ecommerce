"use client";

import { useState, useEffect } from "react";
import ProductCard from "../Common/ProductCard";
import CategorySelector from "./CategorySelector";
import { fetchProducts, fetchCategories } from "../../data/product";

type Category = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  title: string;
  oldPrice: string | null;
  latestPrice: string;
  reviews: { reviewStars: number }[];
  images: { url: string }[];
};

const ShopProductSection = () => {
  const [products, setProducts] = useState<Product[] | null>([]);
  const [categories, setCategories] = useState<Category[] | null>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const loadData = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
      const fetchedProducts = await fetchProducts(selectedCategory);
      setProducts(fetchedProducts);
    };

    loadData();
  }, [selectedCategory]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <section className='flex flex-col items-center'>
      {categories && (
        <CategorySelector
          categories={categories}
          onSelectCategory={handleCategorySelect}
        />
      )}
      <div className='flex h-full flex-wrap gap-5 justify-center mx-7  mb-5'>
        {products?.map((item, index) => <ProductCard {...item} key={index} />)}
      </div>
    </section>
  );
};

export default ShopProductSection;
