import React from 'react'
import '../About/About.css';
import SectionOneImage from './Images/recipe-banner-img.png'
const Recipes = () => {
    return (
        <>
            {/* SectionOne */}
            <div className="AboutSectionOne pt-5 py-md-0">
                <div className="container">
                    <div className="row align-items-center">
                        {/* Left Content */}
                        <div className="col-lg-6 col-md-6 col-12 text-md-start text-center AboutSectionOneLeft">
                            <h5 className="subheading">Recipes</h5>
                            <h1>Signature Dishes</h1>
                            <p>
                                Each dish is a masterpiece, meticulously curated to represent the pinnacle of our culinary expertise and innovation.
                            </p>
                            <button className="hero-button btn btn-outline-light">Get Menu</button>
                        </div>

                        {/* Right Image */}
                        <div className="col-lg-6 col-md-6 col-12 text-center pt-md-5 mt-md-5">
                            <img className="AboutSectionOneImage img-fluid mt-5" src={SectionOneImage} alt="AboutSectionOneImage" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Recipes
