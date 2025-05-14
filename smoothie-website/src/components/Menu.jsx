import React, { useState } from "react";
import "./Menu.css"; // Make sure your CSS supports tab switching

const smoothies = [
  {
    title: "Morning Glory Smoothie",
    desc: "Apple, pineapple, spinach, shredded coconut, chia seeds, cinnamon powder",
    img: "/Menu1.jpg",
  },
  {
    title: "Cacao Nutty Delight",
    desc: "Banana, cacao powder, peanut butter, milk",
    img: "/Menu4.jpg",
  },
  {
    title: "Virgin Pina Colada",
    desc: "Pineapple, coconut milk, vanilla extract",
    img: "/Menu3.png",
  },
  {
    title: "Meloberry Bliss ",
    desc: "Strawberries, watermelon, milk, yoghurt, chia seeds, dates, vanilla extract",
    img: "/Menu2.png",
  },
];

const shakes = [
  {
    title: "Choco Protein Shake",
    desc: "Chocolate whey, milk, banana, almonds",
    img: "/Menu5.jpg",
  },
  {
    title: "Banana date Shake ",
    desc: "Banana, dates, milk ",
    img: "/Menu6.png",
  },
  {
    title: "Strawberry milkshake ",
    desc: "Strawberry, milk, dates",
    img: "/Menu7.png",
  },
];

const bowls = [
  {
    title: "Overnight Oats Bowl",
    desc: "Oats, chia seeds, almond milk, banana, honey",
    img: "/Bowl2.jpg",

  },
  {
    title: "Smoothie Bowl",
    desc: "Banana, strawberries, almond milk, chia seeds, honey",
    img: "/Bowl1.jpg",

  },
  {
    title: "Fruits Bowl",
    desc: "Banana, strawberries, blueberries, chia seeds, honey",
    img: "/Bowl3.jpg",

  },
  
];

export default function Menu() {
  const [activeTab, setActiveTab] = useState("Smoothies");

  const getMenuItems = () => {
    switch (activeTab) {
      case "Bowls":
        return bowls;
      case "Shakes":
        return shakes;
      default:
        return smoothies;
    }
  };

  return (
    <div className="menu-container">
      <h1 className="menu-title">
        MENU <span className="arrow">→</span>
      </h1>

      <div className="menu-tabs">
        {["Bowls", "Shakes", "Smoothies"].map((tab) => (
          <span
            key={tab}
            className={activeTab === tab ? "active-tab" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </span>
        ))}
      </div>

      <div className="menu-grid">
        {getMenuItems().map((item, index) => (
          <div className="menu-card" key={index}>
            <img src={item.img} alt={item.title} />
            <h2>{item.title}</h2>
            <p>{item.desc}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
