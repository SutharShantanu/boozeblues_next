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
            <div className="">
                {/* <FullCarousel /> */}
            </div>
            <div className="">
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
                    text="Spritis"
                />
                <DrinkCategory
                    image="https://content.gotoliquorstore.com/images/home-categ/Extras.jpg"
                    text="Extras"
                />
            </div>
            <div className="">
                {/* <CategoryBeerCarousel />
                <CategoryWineCarousel />
                <CategorySpiritCarousel /> */}
                {/* <EmblaCarousel slides={SLIDES} options={OPTIONS} /> */}
            </div>
            <div className="">
                <h2>How it works</h2>
                <div className="">
                    <div className="">
                        <div className="">
                            <Image
                                src="https://content.gotoliquorstore.com/images/how-it-works/ic_step1.png"
                                alt=""
                                width={50}
                                height={50}
                                className=""
                            />
                        </div>
                        <h3>Enter your address</h3>
                        <p>
                            Once you tell your location, we&apos;ll show you what&apos;s
                            available in your local stores.
                        </p>
                    </div>
                    <div className="">
                        <div className="">
                            <Image
                                src="https://content.gotoliquorstore.com/images/how-it-works/ic_step2.png"
                                alt=""
                                width={50}
                                height={50}
                                className=""
                            />
                        </div>
                        <h3>Shop items you like</h3>
                        <p>
                            Select your favorite items, compare price and shop
                            from multiple stores at once.
                        </p>
                    </div>
                    <div className="">
                        <div className="">
                            <Image
                                src="https://content.gotoliquorstore.com/images/how-it-works/ic_step3.png"
                                alt=""
                                width={50}
                                height={50}
                                className=""
                            />
                        </div>
                        <h3>Get your items delivered</h3>
                        <p>
                            Store will deliver your order, or you can select to
                            pickup from the store at your convenience.
                        </p>
                    </div>
                </div>
                <button className="">Start Shopping</button>
            </div>
            <div className="">
                <Image
                    src="https://content.gotoliquorstore.com/images/landing/app.png"
                    alt=""
                    width={50}
                    height={50}
                    className=""
                />
                <div className="">
                    <h2>Download the app</h2>
                    <p>
                        Download our free mobile app for a better shopping
                        experience. Get your favorite beer, wine, liquor and
                        more delivered from local stores.
                    </p>
                    <div className="">
                        <Image
                            src="https://content.gotoliquorstore.com/images/landing/app-store.png"
                            alt=""
                            width={50}
                            height={50}
                            className=""
                        />
                        <Image
                            src="https://content.gotoliquorstore.com/images/landing/play-store.png"
                            alt=""
                            width={50}
                            height={50}
                            className=""
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;