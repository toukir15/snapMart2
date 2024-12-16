import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#F7F7F7] text-gray-800 py-10">
      <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-gray-900">SnapMart</h3>
          <p className="text-sm">
            Your ultimate destination for the trendiest and most comfortable
            shoes. Step into style with SnapMart!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-gray-900">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-orange-500">
                Home
              </a>
            </li>
            <li>
              <a href="/shop" className="hover:text-orange-500">
                Shop
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-orange-500">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-orange-500">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-orange-500">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-gray-900">
            Customer Support
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/returns" className="hover:text-orange-500">
                Return Policy
              </a>
            </li>
            <li>
              <a href="/shipping" className="hover:text-orange-500">
                Shipping Info
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-orange-500">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-orange-500">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-gray-900">
            Contact Us
          </h4>
          <p className="text-sm">
            Email:{" "}
            <a
              href="mailto:info@snapmart.com"
              className="hover:text-orange-500"
            >
              info@snapmart.com
            </a>
          </p>
          <p className="text-sm">
            Phone:{" "}
            <a href="tel:+880123456789" className="hover:text-orange-500">
              +880 123 456 789
            </a>
          </p>
          <div className="flex mt-4 space-x-4">
            <a href="#" className="text-gray-600 hover:text-orange-500">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-orange-500">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-orange-500">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-orange-500">
              <FaYoutube size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-300 pt-4 text-center">
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} SnapMart. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
