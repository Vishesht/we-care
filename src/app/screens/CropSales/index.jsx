"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./styles.css";

const stripePromise = loadStripe("pk_test_7PjSeoEwPuKV2VpgosJlbfr6"); // Replace with your Stripe publishable key

export default function CropSales() {
  const [crops, setCrops] = useState([
    {
      id: 1,
      name: "Wheat",
      price: "₹1,500 per Quintal",
      amount: 150000,
      image:
        "https://cdn.britannica.com/80/157180-050-7B906E02/Heads-wheat-grains.jpg",
      seller: "Farmer A",
    },
    {
      id: 2,
      name: "Rice",
      price: "₹2,000 per Quintal",
      amount: 200000,
      image:
        "https://static.toiimg.com/thumb/msid-106867601,imgsize-151878,width-400,resizemode-4/106867601.jpg",
      seller: "Farmer B",
    },
    {
      id: 3,
      name: "Corn",
      price: "₹1,800 per Quintal",
      amount: 180000,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI8gfsEtItZtEUvgDZ9craI44oFODf99TG-g&s",
      seller: "Farmer C",
    },
    {
      id: 4,
      name: "Barley",
      price: "₹1,400 per Quintal",
      amount: 140000,
      image: "https://m.media-amazon.com/images/I/71zrh-xst0L._SX522_.jpg",
      seller: "Farmer D",
    },
    {
      id: 5,
      name: "Soybean",
      price: "₹2,200 per Quintal",
      amount: 220000,
      image: "https://m.media-amazon.com/images/I/71SUAiZe8ML._SL1500_.jpg",
      seller: "Farmer E",
    },
    {
      id: 6,
      name: "Oats",
      price: "₹1,300 per Quintal",
      amount: 130000,
      image: "https://m.media-amazon.com/images/I/71KnsKT8fgL._SL1007_.jpg",
      seller: "Farmer F",
    },
    {
      id: 7,
      name: "Millets",
      price: "₹1,600 per Quintal",
      amount: 160000,
      image: "https://m.media-amazon.com/images/I/71Hm8JzMzkL._SL1500_.jpg",
      seller: "Farmer G",
    },
    {
      id: 8,
      name: "Sugarcane",
      price: "₹2,500 per Quintal",
      amount: 250000,
      image:
        "https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-2121-1414,pr-true,f-auto,q-80/inventory/product/a49ee19e-77fe-4363-969f-bc0790d88bbf-f646c092-b2e1-483e-b2fd-945d1e46e9a5/Sugarcane.jpeg",
      seller: "Farmer H",
    },
    {
      id: 9,
      name: "Cotton",
      price: "₹2,800 per Quintal",
      amount: 280000,
      image:
        "https://www.longancraft.com/cdn/shop/articles/how-is-cotton-made-into-fabric-870x570.jpg?v=1723519238&width=800",
      seller: "Farmer I",
    },
    {
      id: 10,
      name: "Peanuts",
      price: "₹1,100 per Quintal",
      amount: 110000,
      image:
        "https://5.imimg.com/data5/TB/CI/MY-44644388/raw-peanuts-1000x1000.jpg",
      seller: "Farmer J",
    },
    {
      id: 11,
      name: "Sunflower",
      price: "₹2,100 per Quintal",
      amount: 210000,
      image:
        "https://media.istockphoto.com/id/1298291139/photo/field-with-yellow-sunflowers-at-sunset-in-summer.jpg?s=612x612&w=0&k=20&c=EM9Fl8hF141UesiE9GMKF7KQHIrBVIBK_hFru72Y9H8=",
      seller: "Farmer K",
    },
    {
      id: 12,
      name: "Chili",
      price: "₹1,700 per Quintal",
      amount: 170000,
      image:
        "https://www.protectourlivelihood.in/wp-content/uploads/2016/08/chilli.jpg",
      seller: "Farmer L",
    },
    {
      id: 13,
      name: "Tomato",
      price: "₹1,900 per Quintal",
      amount: 190000,
      image:
        "https://www.farmatma.in/wp-content/uploads/2018/01/tomato-crop.jpg",
      seller: "Farmer M",
    },
    {
      id: 14,
      name: "Potato",
      price: "₹1,000 per Quintal",
      amount: 100000,
      image:
        "https://plantix.net/en/library/assets/custom/crop-images/potato.jpeg",
      seller: "Farmer N",
    },
    {
      id: 15,
      name: "Carrot",
      price: "₹1,200 per Quintal",
      amount: 120000,
      image:
        "https://www.trustbasket.com/cdn/shop/articles/Carrot.jpg?v=1688378789",
      seller: "Farmer O",
    },
    {
      id: 16,
      name: "Cabbage",
      price: "₹800 per Quintal",
      amount: 80000,
      image:
        "https://assets.clevelandclinic.org/transform/LargeFeatureImage/871f96ae-a852-4801-8675-683191ce372d/Benefits-Of-Cabbage-589153824-770x533-1_jpg",
      seller: "Farmer P",
    },
    {
      id: 17,
      name: "Cauliflower",
      price: "₹950 per Quintal",
      amount: 95000,
      image:
        "https://cdn.britannica.com/24/140624-050-A8237BB9/Cauliflower-plant-form-cauliflower-cabbage-flower-structures.jpg?w=300",
      seller: "Farmer Q",
    },
    {
      id: 18,
      name: "Onion",
      price: "₹1,500 per Quintal",
      amount: 150000,
      image:
        "https://cdn.britannica.com/21/174321-050-AA81C4C9/onion-Allium-cepa-bulbs.jpg?w=300",
      seller: "Farmer R",
    },
    {
      id: 19,
      name: "Garlic",
      price: "₹1,400 per Quintal",
      amount: 140000,
      image:
        "https://agricultureguruji.com/wp-content/uploads/2018/10/garlic-2097759_1280-1024x551.jpg.webp",
      seller: "Farmer S",
    },
    {
      id: 20,
      name: "Green Peas",
      price: "₹1,300 per Quintal",
      amount: 130000,
      image:
        "https://4.imimg.com/data4/ST/NX/MY-7467985/fresh-peas-1000x1000.jpg",
      seller: "Farmer T",
    },
  ]);

  const handleBuy = async (crop) => {
    const res = await fetch("http://127.0.0.1:5000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(crop),
    });

    const data = await res.json();
    window.location = data.url;
  };

  return (
    <Elements stripe={stripePromise}>
      <div className="crop-sales-container">
        <h2>Buy Crops</h2>
        <p>Connect with farmers and buy fresh crops directly.</p>

        <div className="crops-list">
          {crops.map((crop) => (
            <div key={crop.id} className="crop-card">
              <img src={crop.image} alt={crop.name} />
              <h3>{crop.name}</h3>
              <p className="price">{crop.price}</p>
              <p className="seller">Seller: {crop.seller}</p>
              <button className="buy-btn" onClick={() => handleBuy(crop)}>
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </Elements>
  );
}
