import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="luxury-footer">
      <div className="luxury-footer__inner">

        {/* BRAND */}
        <div className="luxury-footer__brand">
          <h2 className="luxury-footer__logo">SBM Apparels</h2>
          <p className="luxury-footer__tagline">
            Quality Recycled Textile Manufacturing
          </p>
        </div>

        {/* LINKS */}
        <div className="luxury-footer__links">

          {/* COMPANY */}
          <div className="luxury-footer__column">
            <h4 className="luxury-footer__heading">Company</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Capabilities</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* SERVICES */}
          <div className="luxury-footer__column">
            <h4 className="luxury-footer__heading">Services</h4>
            <ul>
              <li><span>Custom Apparel</span></li>
              <li><span>OEM / Private Label</span></li>
              <li><span>Corporate Wear</span></li>
              <li><span>Sustainable Textiles</span></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="luxury-footer__column">
            <h4 className="luxury-footer__heading">Contact</h4>
            <ul>
              <li>
                <a href="mailto:info@sbmapparels.com">
                  info@sbmapparels.com
                </a>
              </li>
              <li>
                <span>Tirupur, Tamil Nadu, India</span>
              </li>
              <li>
                <span>+91 XXXXX XXXXX</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* BOTTOM */}
      <div className="luxury-footer__bottom">
        <p>
          &copy; {new Date().getFullYear()} SBM Apparels Pvt Limited. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
