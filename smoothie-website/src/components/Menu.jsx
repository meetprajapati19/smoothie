import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./Menu.css";

export default function Menu() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch categories from Firebase
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const firstDoc = querySnapshot.docs[0];
        if (firstDoc) {
          const categoryData = firstDoc.data();
          if (Array.isArray(categoryData.name)) {
            setCategories(categoryData.name);
            setActiveCategory(categoryData.name[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Fetch items from Firebase based on active category
  useEffect(() => {
    const fetchItems = async () => {
      if (!activeCategory) return;
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "items"));
        const itemsData = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(
            (item) =>
              item.type &&
              item.type.toLowerCase() === activeCategory.toLowerCase()
          );
        setItems(itemsData);
      } catch (error) {
        console.error("Error fetching items:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [activeCategory]);

  return (
    <div className="menu-container">
      <h1 className="menu-title">
        MENU <span className="arrow">→</span>
      </h1>

      {loading && <div className="loading">Loading...</div>}

      {!loading && categories.length === 0 && (
        <div className="no-data">No menu categories available.</div>
      )}

      {!loading && categories.length > 0 && (
        <>
          <div className="menu-tabs">
            {categories.map((category, index) => (
              <span
                key={index}
                className={activeCategory === category ? "active-tab" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </span>
            ))}
          </div>

          <div className="menu-grid">
            {items.length === 0 ? (
              <div className="no-data">No items available in this category.</div>
            ) : (
              items.map((item) => (
                <div
                  className="menu-card"
                  key={item.id}
                  onClick={() => navigate(`/item/${item.id}`)}
                >
                  <img
                    src={`/${item.image || "greensmoothie.jpg"}`}
                    alt={item.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/greensmoothie.jpg";
                    }}
                  />
                  <h2>{item.name}</h2>
                  <p>{item.ingredients}</p>
                  <div className="price-container">
                    <div className="size-price">
                      <span>Price:</span>
                      <span>₹{item.price}</span>
                    </div>
                  </div>
                  <button>Add to Cart</button>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
