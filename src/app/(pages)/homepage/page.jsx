import React from "react";
import Image from "next/image";
// import FullCarousel from "@/app/components/FullCarousel";
import DrinkCategory from "@/app/components/DrinkCategory";
// import CategoryBeerCarousel from "@/app/components/CategoryBeerCarousel";
// import CategoryWineCarousel from "@/app/components/CategoryWineCarousel";
// import CategorySpiritCarousel from "@/app/components/CategorySpiritCarousel";
// import EmblaCarousel from "@/app/components/carousels/embla";

const OPTIONS = { loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const Homepage = () => {
    return (
        <div className="">
            <div className="w-[85%] my-5 mx-auto">
                {/* <FullCarousel /> */}
            </div>
            <div className="grid grid-cols-4 w-[85%] my-20 mx-auto">
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
            <div className="w-[85%] my-10 mx-auto">
                {/* <CategoryBeerCarousel />
                <CategoryWineCarousel />
                <CategorySpiritCarousel /> */}
                {/* <EmblaCarousel slides={SLIDES} options={OPTIONS} /> */}
            </div>
            <div className="bg-gray-200 my-16 mx-auto py-12">
                <h2 className="text-2xl font-semibold">How it works</h2>
                <div className="flex justify-around gap-5 w-[80%] my-5 mx-auto">
                    <div className="flex flex-col items-center justify-center cursor-pointer w-[80%] mx-auto">
                        <div className="rounded-full p-5 bg-white w-30 h-30 transition-all ease-in-out hover:scale-90">
                            <Image
                                src="https://content.gotoliquorstore.com/images/how-it-works/ic_step1.png"
                                alt=""
                                width={50}
                                height={50}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-xl font-bold my-3">Enter your address</h3>
                        <p className="text-base font-normal mb-2">
                            Once you tell your location, we&apos;ll show you what&apos;s
                            available in your local stores.
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center cursor-pointer w-[80%] mx-auto">
                        <div className="rounded-full p-5 bg-white w-30 h-30 transition-all ease-in-out hover:scale-90">
                            <Image
                                src="https://content.gotoliquorstore.com/images/how-it-works/ic_step2.png"
                                alt=""
                                width={50}
                                height={50}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-xl font-bold my-3">Shop items you like</h3>
                        <p className="text-base font-normal mb-2">
                            Select your favorite items, compare price and shop
                            from multiple stores at once.
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center cursor-pointer w-[80%] mx-auto">
                        <div className="rounded-full p-5 bg-white w-30 h-30 transition-all ease-in-out hover:scale-90">
                            <Image
                                src="https://content.gotoliquorstore.com/images/how-it-works/ic_step3.png"
                                alt=""
                                width={50}
                                height={50}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-xl font-bold my-3">Get your items delivered</h3>
                        <p className="text-base font-normal mb-2">
                            Store will deliver your order, or you can select to
                            pickup from the store at your convenience.
                        </p>
                    </div>
                </div>
                <button className="bg-pink-800 border-2 border-pink-800 text-white py-2 px-6 rounded-lg transition-all ease-in-out duration-300 hover:bg-white hover:text-pink-800 hover:shadow-md">
                    Start Shopping
                </button>
            </div>
            <div className="flex justify-center items-center">
                <Image
                    src="https://content.gotoliquorstore.com/images/landing/app.png"
                    alt=""
                    className="w-2/5"
                    width={50}
                    height={50}
                />
                <div className="w-2/5 text-left">
                    <h2 className="text-2xl font-semibold my-3">Download the app</h2>
                    <p className="text-lg font-normal">
                        Download our free mobile app for a better shopping
                        experience. Get your favorite beer, wine, liquor and
                        more delivered from local stores.
                    </p>
                    <div className="flex justify-between w-1/2 my-5">
                        <Image
                            src="https://content.gotoliquorstore.com/images/landing/app-store.png"
                            alt=""
                            width={50}
                            height={50}
                            className="w-2/5 cursor-pointer transition-all ease-in-out duration-300 hover:scale-90"
                        />
                        <Image
                            src="https://content.gotoliquorstore.com/images/landing/play-store.png"
                            alt=""
                            width={50}
                            height={50}
                            className="w-2/5 cursor-pointer transition-all ease-in-out duration-300 hover:scale-90"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;

