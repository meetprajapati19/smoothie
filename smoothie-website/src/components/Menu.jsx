import React, { useState, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import "./Menu.css";

// Default menu items to use when Firebase data is not available
const defaultItems = [
  {
    id: 1,
    name: "Tropical Paradise Smoothie",
    ingredients: "Mango, pineapple, banana, coconut milk, honey",
    price: 199,
    type: "Smoothie",
    image: "Menu1.jpg"
  },
  {
    id: 2,
    name: "Berry Blast Smoothie",
    ingredients: "Strawberry, blueberry, raspberry, yogurt, almond milk, chia seeds",
    price: 219,
    type: "Smoothie",
    image: "Menu2.png"
  },
  {
    id: 3,
    name: "Green Energy Smoothie",
    ingredients: "Spinach, kale, banana, apple, ginger, lemon juice",
    price: 229,
    type: "Smoothie",
    image: "Menu3.png"
  },
  {
    id: 4,
    name: "Chocolate Shake",
    ingredients: "Chocolate ice cream, milk, chocolate syrup, whipped cream",
    price: 189,
    type: "Milk shake",
    image: "Menu4.jpg"
  },
  {
    id: 5,
    name: "Vanilla Dream Shake",
    ingredients: "Vanilla ice cream, milk, vanilla extract, whipped cream, sprinkles",
    price: 179,
    type: "Milk shake",
    image: "Menu5.jpg"
  }
];

// Default categories
const defaultCategories = ["Smoothie", "Milk shake"];

export default function Menu() {
  const [categories, setCategories] = useState(defaultCategories);
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState(defaultCategories[0]);
  const [loading, setLoading] = useState(true);

  // Fetch categories from Firebase
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'categories'));
        // Get the first document since it contains the array of categories
        const firstDoc = querySnapshot.docs[0];
        if (firstDoc) {
          const categoryData = firstDoc.data();
          if (Array.isArray(categoryData.name)) {
            setCategories(categoryData.name);
            setActiveCategory(categoryData.name[0]); // Set first category as active
          }
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        // If there's an error, we'll use the default categories
      }
    };
    fetchCategories();
  }, []);

  // Use default items or fetch from Firebase based on active category
  useEffect(() => {
    const fetchItems = async () => {
      if (!activeCategory) return;
      
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'items'));
        const itemsData = querySnapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          .filter(item => item.type && item.type.toLowerCase() === activeCategory.toLowerCase());
        
        if (itemsData.length > 0) {
          setItems(itemsData);
        } else {
          // Fallback to default items if no items found for this category
          const filteredItems = defaultItems.filter(
            item => item.type.toLowerCase() === activeCategory.toLowerCase()
          );
          setItems(filteredItems);
          console.log(`No items found in Firebase for category: ${activeCategory}, using defaults`);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
        // If there's an error, filter the default items
        const filteredItems = defaultItems.filter(
          item => item.type.toLowerCase() === activeCategory.toLowerCase()
        );
        setItems(filteredItems);
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

      <div className="menu-tabs">
        {Array.isArray(categories) && categories.map((category, index) => (
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
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          items.map((item) => (
            <div className="menu-card" key={item.id}>
              <img 
                src={`/${item.image || 'greensmoothie.jpg'}`} 
                alt={item.name} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/greensmoothie.jpg';
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
    </div>
  );
}
