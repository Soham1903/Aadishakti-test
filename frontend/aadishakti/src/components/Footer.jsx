import React from "react";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#921A40" }}>
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
          <div>
            <h2 className="mb-6 text-sm font-semibold text-white uppercase">Company</h2>
            <ul className="text-gray-300 font-medium">
              <li className="mb-4"><a href="#" className="hover:underline">About</a></li>
              <li className="mb-4"><a href="#" className="hover:underline">Careers</a></li>
              <li className="mb-4"><a href="#" className="hover:underline">Brand Center</a></li>
              <li className="mb-4"><a href="#" className="hover:underline">Blog</a></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-white uppercase">Help center</h2>
            <ul className="text-gray-300 font-medium">
              <li className="mb-4"><a href="#" className="hover:underline">Discord Server</a></li>
              <li className="mb-4"><a href="#" className="hover:underline">Twitter</a></li>
              <li className="mb-4"><a href="#" className="hover:underline">Facebook</a></li>
              <li className="mb-4"><a href="#" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-white uppercase">Legal</h2>
            <ul className="text-gray-300 font-medium">
              <li className="mb-4"><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li className="mb-4"><a href="#" className="hover:underline">Licensing</a></li>
              <li className="mb-4"><a href="#" className="hover:underline">Terms & Conditions</a></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-white uppercase">Download</h2>
            <ul className="text-gray-300 font-medium">
              <li className="mb-4"><a href="#" className="hover:underline">iOS</a></li>
              <li className="mb-4"><a href="#" className="hover:underline">Android</a></li>
              <li className="mb-4"><a href="#" className="hover:underline">Windows</a></li>
              <li className="mb-4"><a href="#" className="hover:underline">MacOS</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "#921A40" }} className="px-4 py-6 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-300 sm:text-center">
          © 2024 Your Company. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
