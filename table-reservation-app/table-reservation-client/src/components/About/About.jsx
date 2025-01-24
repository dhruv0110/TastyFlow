import React from 'react'
import './About.css';

// Images
import AboutSectionOneImage from './Images/AboutSectionOneImage.png';
import AboutStoryImageOne from './Images/aboutstory01.jpg'
import AboutStoryImageTwo from './Images/aboutstory02.jpg'
import AboutStoryImageThree from './Images/aboutstory03.jpg'
import AboutSectionThreeCarousel from './AboutSectionThreeCarousel';

const About = () => {
    return (
        <>
            {/* SectionOne */}
            <div className="AboutSectionOne">
                <div className="row">
                    <div className="container d-flex">
                        <div className="col-6  AboutSectionOneLeft">
                            <h5 className='subheading'>About</h5>
                            <h1>Our Story</h1>
                            <p>Sustenance and delight—a journey through culinary landscapes where each dish narrates a unique tale.</p>
                            <button className='hero-button'>Get Menu</button>
                        </div>
                        <div className="col-6 AboutSectionOneRight">
                            <img className="AboutSectionOneImage" src={AboutSectionOneImage} alt="AboutSectionOneImage" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Section Two */}
            <div className="AboutSectionTwo pt-5">
                {/* Story Heading */}
                <div className="Subheadingflex">
                    <div className="subheading ">Story</div>
                    <h2 className='AboutStoryheading '>In 1997, our company's journey commenced.</h2>
                    <p className='AboutStorysubheading '>What began as a humble endeavour has blossomed into a
                        celebration of flavours, an expedition through tastes and traditions.</p>
                </div>

                {/* Story Part */}
                <div className="row pt-5">
                    <div className="container AboutStoryContainer d-flex">
                        <div className="col-4 AboutStorySectionTwoLeft">
                            <img className="StoryImage" src={AboutStoryImageOne} alt="" />
                        </div>
                        <div className="col-9 AboutStorySectionTwoRight">
                            <div className="col-10 AboutStorySectionTwoTop">
                                <h2>Our Triumph</h2>
                                <p>Achievement, and every milestone resonates with the spirit of our journey.
                                    Embark with us on this narrative of perseverance and accomplishment, where
                                    each chapter unfolds the stories behind our victories and the essence of
                                    our unwavering determination.</p>
                                <button className='hero-button'>Get Menu</button>
                            </div>

                            <div className="AboutStorySectionTwoBottom d-flex">
                                <div className="col-5">
                                    <img className="StoryImage" src={AboutStoryImageTwo} alt="" />
                                </div>
                                <div className="col-5">
                                    <img className="StoryImage" src={AboutStoryImageThree} alt="" />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section Three */}
            <div className="AboutSectionThree pt-5 ">
                <div className="AboutSectionThreeHeadingflex">
                    <div className="subheading">Our Journey</div>
                    <h2 className='AboutSectionThreeheading '>Memorable Stops Along Our Journey</h2>
                    <p className='AboutSectionThreeubheading '>These stops are not merely destinations but pivotal
                        points that have shaped our narrative, leaving an indelible mark on our collective experience.</p>
                </div>

                <AboutSectionThreeCarousel/>
            </div>
        </>


    )
}

export default About