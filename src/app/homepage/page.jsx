import React from "react";
import Image from "next/image";
import DrinkCategory from "../components/DrinkCategory";

const Homepage = () => {
    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            {/* Hero Section */}
            <section className="w-full py-16 px-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white text-center shadow-lg rounded-b-2xl">
                <h1 className="text-5xl font-bold mb-6">Discover Your Favorite Drinks</h1>
                <p className="text-lg mb-8">Find the best selection of beer, wine, spirits, and more delivered to your door.</p>
                <button className="bg-white text-pink-500 py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-all transform hover:scale-105">
                    Start Shopping
                </button>
            </section>

            {/* Drink Categories */}
            <section className="w-full py-16 px-4">
                <h2 className="text-3xl font-semibold text-center mb-12">Browse by Category</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    <DrinkCategory
                        image="https://content.gotoliquorstore.com/images/home-categ/Beer.jpg"
                        text="Beer"
                    />
                    <DrinkCategory
                        image="https://content.gotoliquorstore.com/images/home-categ/Wine.jpg"
                        text="Wine"
                    />
                    <DrinkCategory
                        image="https://content.gotoliquorstore.com/images/home-categ/Spirits.jpg"
                        text="Spirits"
                    />
                    <DrinkCategory
                        image="https://content.gotoliquorstore.com/images/home-categ/Extras.jpg"
                        text="Extras"
                    />
                </div>
            </section>

            {/* Featured Products */}
            <section className="bg-white py-16 px-4 shadow-inner rounded-lg">
                <h2 className="text-3xl font-semibold text-center mb-12">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {[
                        "https://content.gotoliquorstore.com/images/featured/beer1.jpg",
                        "https://content.gotoliquorstore.com/images/featured/wine1.jpg",
                        "https://content.gotoliquorstore.com/images/featured/spirit1.jpg",
                        "https://content.gotoliquorstore.com/images/featured/extra1.jpg",
                    ].map((src, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                            <Image
                                src={src}
                                alt={`Featured Product ${index + 1}`}
                                width={300}
                                height={300}
                                className="w-full h-64 object-cover rounded-t-lg border border-gray-200"
                            />
                            <h3 className="text-xl font-semibold mt-4">Product Name</h3>
                            <p className="text-gray-600 mt-2">$Price</p>
                            <button className="mt-4 bg-pink-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-pink-600 transition-all">
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section className="bg-white py-16 px-4">
                <h2 className="text-3xl font-semibold text-center mb-12">How It Works</h2>
                <div className="flex flex-col md:flex-row justify-around items-center gap-12">
                    {[
                        {
                            image: "https://content.gotoliquorstore.com/images/how-it-works/ic_step1.png",
                            title: "Enter your address",
                            description: "Once you tell your location, we’ll show you what’s available in your local stores.",
                        },
                        {
                            image: "https://content.gotoliquorstore.com/images/how-it-works/ic_step2.png",
                            title: "Shop items you like",
                            description: "Select your favorite items, compare prices, and shop from multiple stores at once.",
                        },
                        {
                            image: "https://content.gotoliquorstore.com/images/how-it-works/ic_step3.png",
                            title: "Get your items delivered",
                            description: "Store will deliver your order or you can select to pick up from the store at your convenience.",
                        },
                    ].map(({ image, title, description }, index) => (
                        <div key={index} className="text-center max-w-xs mx-auto p-6 bg-white rounded-lg shadow-md">
                            <div className="bg-white p-4 rounded-full shadow-lg mx-auto mb-4 border border-gray-200">
                                <Image
                                    src={image}
                                    alt={title}
                                    width={60}
                                    height={60}
                                    className="w-16 h-16 object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{title}</h3>
                            <p className="text-base text-gray-700">{description}</p>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <button className="bg-pink-500 text-white py-3 px-8 rounded-full shadow-lg hover:bg-pink-600 transition-all transform hover:scale-105">
                        Start Shopping
                    </button>
                </div>
            </section>

            {/* Testimonials */}
            <section className="bg-gray-200 py-16 px-4">
                <h2 className="text-3xl font-semibold text-center mb-12">What Our Customers Say</h2>
                <div className="flex flex-col md:flex-row justify-around items-center gap-12">
                    {[
                        {
                            text: "Fantastic selection and fast delivery. Will definitely use again!",
                            name: "John Doe",
                            image: "https://randomuser.me/api/portraits/men/1.jpg",
                        },
                        {
                            text: "Great service and awesome app. Highly recommend!",
                            name: "Jane Smith",
                            image: "https://randomuser.me/api/portraits/women/1.jpg",
                        },
                        {
                            text: "Very user-friendly and great prices. My go-to for drinks now.",
                            name: "Alice Johnson",
                            image: "https://randomuser.me/api/portraits/women/2.jpg",
                        },
                    ].map(({ text, name, image }, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                            <div className="flex justify-center mb-4">
                                <Image
                                    src={image}
                                    alt={name}
                                    width={60}
                                    height={60}
                                    className="w-16 h-16 rounded-full object-cover border border-gray-200"
                                />
                            </div>
                            <p className="text-lg font-medium mb-2">{text}</p>
                            <p className="text-gray-600">- {name}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Promotional Banner */}
            <section className="w-full py-16 px-4 bg-gradient-to-r from-green-400 to-blue-500 text-white text-center rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-4">Special Promotion</h2>
                <p className="text-lg mb-6">Get 20% off your first order! Use code <span className="font-bold">WELCOME20</span> at checkout.</p>
                <button className="bg-white text-green-500 py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-all transform hover:scale-105">
                    Shop Now
                </button>
            </section>

            {/* App Download Section */}
            <section className="w-full py-16 px-4 bg-gray-200">
                <div className="flex flex-col md:flex-row items-center justify-around">
                    <div className="md:w-1/2 text-center md:text-left mb-6 md:mb-0">
                        <h2 className="text-2xl font-semibold mb-4">Download the App</h2>
                        <p className="text-lg text-gray-700 mb-4">
                            Download our mobile app for a better shopping experience. Get your favorite beer, wine, liquor, and more delivered from local stores.
                        </p>
                        <div className="flex justify-center md:justify-start gap-4">
                            <Image
                                src="https://content.gotoliquorstore.com/images/landing/app-store.png"
                                alt="App Store"
                                width={120}
                                height={40}
                                className="cursor-pointer transition-transform transform hover:scale-105"
                            />
                            <Image
                                src="https://content.gotoliquorstore.com/images/landing/play-store.png"
                                alt="Google Play"
                                width={120}
                                height={40}
                                className="cursor-pointer transition-transform transform hover:scale-105"
                            />
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <Image
                            src="https://content.gotoliquorstore.com/images/landing/app.png"
                            alt="App Screenshot"
                            width={500}
                            height={500}
                            className="mx-auto md:mx-0 rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Homepage;
