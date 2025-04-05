import React from 'react'
import '../About/About.css';
import './Menu_Page.css';
import Footer from "../Footer/Footer";


// Images
import MenuSectionOne from './Images/Menu_section_one.png'
import cropped_image from './Images/cropped_image.png'
import cropped_image1 from './Images/cropped_image (3).png'
import cropped_image2 from './Images/cropped_image (4).png'
import cropped_image3 from './Images/cropped_image (5).png'


const Menu_Page = () => {
  return (
    <>
      {/* SectionOne */}
      <div className="AboutSectionOne pt-5 py-md-0">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Content */}
            <div className="col-lg-6 col-md-6 col-12 text-md-start text-center AboutSectionOneLeft">
              <h5 className="subheading">Menu</h5>
              <h1 className='menu-main-h1'>Our Exclusive Picks</h1>
              <p className='menu-main-p fs-5 text-sm-end text-md-start'>
                Each item has been handpicked, blending innovation and tradition to deliver an unforgettable dining experience.
              </p>
              <button className="hero-button btn btn-outline-light">Buy Now</button>
            </div>

            {/* Right Image */}
            <div className="col-lg-6 col-md-6 col-12 text-center pt-md-5 mt-md-5">
              <img className="AboutSectionOneImage img-fluid mt-5" src={MenuSectionOne} alt="AboutSectionOneImage" />
            </div>
          </div>
        </div>
      </div>

      {/* Section Two */}
      <section class="menu-section">
        <div class="w-layout-blockcontainer container w-container">
          <div class="menu-whole-wrap">
            <div class="menu-main-wrap">
              <div class="menu-title-area">
                <div class="menu-title-wrap">
                  <p class="section-subtitle">Breakfast</p>
                  <h2 class="section-title">Breakfast Menu</h2>
                </div>
              </div>
              <div class="menu-card-wrap">
                <div class="menu-content-area">
                  <div class="special-menu-wrap">
                    <div class="menu-image-area">
                      <div class="menu-image-wrap"><img
                        src={cropped_image}
                        loading="lazy" alt="Menu dish img" class="menu-image" /></div>
                    </div>
                    <div class="menu-content-wrap">
                      <div class="menu-subtitle-wrap">
                        <h3 class="menu-title">Our Delights</h3>
                        <p class="menu-description">The ordinary, inviting you to explore a world of
                          flavours crafted with passion and precision.</p>
                      </div>
                      <div class="menu-item-area">
                        <div class="menu-item-wrap">
                          <p class="menu-text">Double Apple Baked Oatmeal</p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">219/-</p>
                        </div>
                        <div class="menu-item-wrap">
                          <p class="menu-text">Aloo Paratha </p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">189/-</p>
                        </div>
                        <div class="menu-item-wrap">
                          <p class="menu-text">Dal Pakwan Tart (250gm)</p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">249/-</p>
                        </div>
                        <div class="menu-item-wrap">
                          <p class="menu-text">Fluffy Pancakes</p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">219/-</p>
                        </div>
                        <div class="menu-item-wrap">
                          <p class="menu-text">Masala Pauva with Cheese (330 gm)</p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">159/-</p>
                        </div>
                        <div class="menu-item-wrap">
                          <p class="menu-text">Sp.Foodio Pauva</p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">199/-</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="menu-center-border"></div>
                  <div class="classic-menu-wrap">
                    <div class="menu-image-area bottom-image">
                      <div class="menu-image-wrap"><img
                        src={cropped_image1}
                        loading="lazy" alt="Menu dish img" class="menu-image" /></div>
                    </div>
                    <div class="menu-content-wrap">
                      <div class="menu-subtitle-wrap">
                        <h3 class="menu-title">Breakfast Favourites</h3>
                        <p class="menu-description">Array of dishes that evoke warmth, satisfaction, and
                          a touch of culinary nostalgia.</p>
                      </div>
                      <div class="menu-item-area">
                        <div class="menu-item-wrap">
                          <p class="menu-text">Idli Sambher (With HomeMade Idli Batter)</p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">169/-</p>
                        </div>
                        <div class="menu-item-wrap">
                          <p class="menu-text">Sweet Potato Breakfast Burritos</p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">179/-</p>
                        </div>
                        <div class="menu-item-wrap">
                          <p class="menu-text">Muffin with butter and jam</p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">179/-</p>
                        </div>
                        <div class="menu-item-wrap">
                          <p class="menu-text">Parmesan Waffles with Lemon Ricotta</p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">229/-</p>
                        </div>
                        <div class="menu-item-wrap">
                          <p class="menu-text">Methi Thepla With Masala Tea </p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">199/-</p>
                        </div>
                        <div class="menu-item-wrap">
                          <p class="menu-text">Avocado Toast Recipe</p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">219/-</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="menu-main-wrap">
              <div class="menu-title-area">
                <div class="menu-title-wrap">
                  <p class="section-subtitle">Lunch</p>
                  <h2 class="section-title">Lunch Menu</h2>
                </div>
              </div>
              <div class="menu-card-wrap">
                <div class="menu-content-area">
                  <div class="special-menu-wrap">
                    <div class="menu-image-area">
                      <div class="menu-image-wrap"><img
                        src={cropped_image2}
                        loading="lazy" alt="Menu dish img" class="menu-image" /></div>
                    </div>
                    <div class="menu-content-wrap">
                      <div class="menu-subtitle-wrap">
                        <h3 class="menu-title">Our Delights</h3>
                        <p class="menu-description">Where every bite embodies passion, innovation, and
                          the sheer pleasure of exceptional dining.</p>
                      </div>
                      <div class="menu-item-area">
                        <div class="menu-item-wrap">
                          <p class="menu-text">Cheeseburger</p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">359/-</p>
                        </div>
                        <div class="menu-item-wrap">
                          <p class="menu-text">Aglio E Olio (350gm)</p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">579/-</p>
                        </div>
                        <div class="menu-item-wrap">
                          <p class="menu-text">Winter Bean Bao</p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">389/-</p>
                        </div>
                        <div class="menu-item-wrap">
                          <p class="menu-text">Grilled Veggie Wrap</p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">399/-</p>
                        </div>
                        <div class="menu-item-wrap">
                          <p class="menu-text">Asparagus Uramaki Sushi</p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">525/-</p>
                        </div>
                        <div class="menu-item-wrap">
                          <p class="menu-text">Meze Platter </p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">619/-</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="menu-center-border"></div>
                  <div class="classic-menu-wrap">
                    <div class="menu-image-area bottom-image">
                      <div class="menu-image-wrap"><img
                        src="https://cdn.prod.website-files.com/653a12ff1d377f67d4b06d12/66011721edb41c0c18d784be_lunch-menu-02.png"
                        loading="lazy" alt="Menu dish img" class="menu-image" /></div>
                    </div>
                    <div class="menu-content-wrap">
                      <div class="menu-subtitle-wrap">
                        <h3 class="menu-title">Lunch Favourites</h3>
                        <p class="menu-description">Flavours and textures, inviting you to savour the
                          essence of American cuisine at its finest.</p>
                      </div>
                      <div class="menu-item-area">
                        <div class="menu-item-wrap">
                          <p class="menu-text">BBQ Pulled Sandwich</p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">289/-</p>
                        </div>
                        <div class="menu-item-wrap">
                          <p class="menu-text">Caprese Panini</p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">319/-</p>
                        </div>
                        <div class="menu-item-wrap">
                          <p class="menu-text">Mughlai Paneer </p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">359/-</p>
                        </div>
                        <div class="menu-item-wrap">
                          <p class="menu-text">Black Bean Tossed Edamame </p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">459/-</p>
                        </div>
                        <div class="menu-item-wrap">
                          <p class="menu-text">The Gupshup Platter  </p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">559/-</p>
                        </div>
                        <div class="menu-item-wrap">
                          <p class="menu-text">Grilled Veggie Wrap</p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">379/-</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="menu-main-wrap">
              <div class="menu-title-area">
                <div class="menu-title-wrap">
                  <p class="section-subtitle">Dinner</p>
                  <h2 class="section-title">Dinner Menu</h2>
                </div>
              </div>
              <div class="menu-card-wrap">
                <div class="menu-content-area">
                  <div class="special-menu-wrap">
                    <div class="menu-image-area">
                      <div class="menu-image-wrap"><img
                        src={cropped_image3}
                        loading="lazy" alt="Menu dish img" class="menu-image" /></div>
                    </div>
                    <div class="menu-content-wrap">
                      <div class="menu-subtitle-wrap">
                        <h3 class="menu-title">Our Delights</h3>
                        <div class="menu-description-wrap">
                          <p class="menu-description">Innovation premium ingredients, and a passion
                            for crafting memorable dining moments.</p>
                        </div>
                      </div>
                      <div class="menu-item-area">
                        <div class="menu-item-wrap">
                          <p class="menu-text">Classic Paneer Butter Masala</p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">589/-</p>
                        </div>
                        <div class="menu-item-wrap">
                          <p class="menu-text">Mexican Fiesta</p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">699/-</p>
                        </div>
                        <div class="menu-item-wrap">
                          <p class="menu-text">Subz Bahaar Quila </p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">759/-</p>
                        </div>
                        <div class="menu-item-wrap">
                          <p class="menu-text">Bhuna Lasuni Palak Chigoza </p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">449/-</p>
                        </div>
                        <div class="menu-item-wrap">
                          <p class="menu-text">Kofta-E-Gulnar</p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">769/-</p>
                        </div>
                        <div class="menu-item-wrap">
                          <p class="menu-text">Mexican Fiesta</p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">599/-</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="menu-center-border"></div>
                  <div class="classic-menu-wrap">
                    <div class="menu-image-area bottom-image">
                      <div class="menu-image-wrap"><img
                        src="https://cdn.prod.website-files.com/653a12ff1d377f67d4b06d12/660117214e9cb26a2f0990c3_dinner-menu-02.png"
                        loading="lazy" alt="Menu dish img" class="menu-image" /></div>
                    </div>
                    <div class="menu-content-wrap">
                      <div class="menu-subtitle-wrap">
                        <h3 class="menu-title">Dinner Favourites</h3>
                        <p class="menu-description">Array of dishes that evoke comfort, sophistication,
                          and a fusion of culinary traditions.</p>
                      </div>
                      <div class="menu-item-area">
                        <div class="menu-item-wrap">
                          <p class="menu-text">Classic Subz Makhanwala</p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">589/-</p>
                        </div>
                        <div class="menu-item-wrap">
                          <p class="menu-text">  Vegetable Lasagna</p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">499/-</p>
                        </div>
                        <div class="menu-item-wrap">
                          <p class="menu-text">Lucknowi Matka Paneer</p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">589/-</p>
                        </div>
                        <div class="menu-item-wrap">
                          <p class="menu-text">Earth Bowl</p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">999/-</p>
                        </div>
                        <div class="menu-item-wrap">
                          <p class="menu-text">Lucknowi Dum Biryani</p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">479/-</p>
                        </div>
                        <div class="menu-item-wrap">
                          <p class="menu-text">Honey Mustard</p>
                          <div class="menu-border-line"></div>
                          <p class="menu-price">549/-</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     
      {/* Footer */}
      <Footer/>
    </>
  )
}

export default Menu_Page
