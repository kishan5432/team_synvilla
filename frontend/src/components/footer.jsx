import { FaFacebookF, FaInstagram, FaPinterest, FaYoutube, FaPhone, FaEnvelope, FaStore, FaGlobe } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#7a6a5e] text-white py-10 px-6 md:px-16 h-90 mt-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        


        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">QUICK LINKS</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Track Order</a></li>
            
            <li><a href="#">Stores</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Gift Cards</a></li>
            <li><a href="#">Easy Returns</a></li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div>
          <h3 className="font-semibold mb-3">GET IN TOUCH</h3>
          <p className="flex items-center gap-2 text-sm"><FaPhone /> Miss.Nandini Patel +91-7400123456</p>
          <p className="flex items-center gap-2 text-sm"><FaPhone /> Miss.Shahna Shah +919811338191</p>
          <p className="flex items-center gap-2 text-sm"><FaEnvelope /> info@synVilla.com</p>
          
          <p className="flex items-center gap-2 text-sm"><FaGlobe /> India</p>
          <p className="mt-2 text-sm">For unresolved issues only: <strong>+919811331181 (Miss Nandini Patel & Shahna Shah )</strong></p>
        </div>

        {/* Social & App Links */}
        <div>
          <h3 className="font-semibold mb-3">FOLLOW US</h3>
          <div className="flex gap-4 text-lg">
            <a href="https://www.facebook.com/profile.php?id=61557083081470" className="hover:text-gray-300"><FaFacebookF /></a>
            <a href="https://www.instagram.com/accounts/login/?hl=en" className="hover:text-gray-300"><FaInstagram /></a>
            <a href="https://in.pinterest.com/login/" className="hover:text-gray-300"><FaPinterest /></a>
            <a href="https://www.youtube.com/" className="hover:text-gray-300"><FaYoutube /></a>
          </div>

          <h3 className="font-semibold mt-5">EXPERIENCE THE SynVilla</h3>
          <div className="flex gap-3 mt-3">
            {/* <img src="/appstore.png" alt="App Store" className="w-24" />
            <img src="/playstore.png" alt="Google Play" className="w-24" /> */}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t border-gray-500 pt-6 text-center">
        
        <p className="text-sm">Shivalik Meta Plast Industries © 2025</p>
      
      </div>
    </footer>
  );
}
