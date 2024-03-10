import React from "react";

function Footer() {
  return (
    <div className="box">
    <div className="footer container">
    <link rel="stylesheet" type="text/css" href="/CSS/footer.css" />
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
      <div className="letter">
        <h1>Contact Us</h1>
        <ul>
          <li>📱 Call us at +972586926381</li>
          <li>🗺️ Address: Shprintzak 35 B, Quiryat Motzkin</li>
          <li>
            Take me with Waze{" "}
            <a href="https://ul.waze.com/ul?place=ChIJP0-wyx23HRUR16BtJTOcsBA&ll=32.83648640%2C35.08034330&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location">
              <img
                src="/IMG/waze.png"
                style={{ width: "30px" }}
                alt="Waze"
              />
            </a>
          </li>
          <li>📧 Email: GameZone936@gmail.com</li>
        </ul>
      </div>
      <div className="letter2">
        <h2>About Us</h2>
        <p className="col-10">
          We are a game store for consoles, we can distribute to all parts of
          Israel at better prices. You can find the best games of the year and
          we deliver them to your home!
        </p>
        <button href="/about-us" className="col-2 btn btn btn-outline-info btn-sm">
          Read More
        </button>
        <div className="social-media">
        <a href="https://www.facebook.com" style={{ '--i': 6 }}><i className='bx bxl-facebook'></i></a>
        <a href="http://x.com" style={{ '--i': 7 }}><i class='bx bx-x'></i></a>
        <a href="https://www.instagram.com" style={{ '--i': 8 }}><i className='bx bxl-instagram-alt' ></i></a>
        <a href="https://web.whatsapp.com" style={{ '--i': 9 }}><i className='bx bxl-whatsapp' ></i></a>
    </div>
      </div>
      <div className="img22">
        <img width={300} height={300} src="/IMG/logo.png" alt="Game Zone Logo" />
      </div>
    </div>
    </div>
  );
}

export default Footer;
