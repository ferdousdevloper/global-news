import React, { useState } from "react";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

interface ShareDropdownProps {
  url: string;
}

const ShareDropdown: React.FC<ShareDropdownProps> = ({ url }) => {
  const [isOpen, setIsOpen] = useState(false);

  const shareUrl = encodeURIComponent(url);
  const shareText = encodeURIComponent("Check out this news article!");

  const handleShare = (platform: string) => {
    let shareLink = "";

    switch (platform) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        break;
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`;
        break;
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
        break;
      default:
        return;
    }

    window.open(shareLink, "_blank");
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      {/* Share Icon */}
      <IoShareSocialOutline
        className="cursor-pointer text-slate-100 hover:text-black z-50" // Ensuring higher z-index
        onClick={() => setIsOpen((prev) => !prev)}
      />
      
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 bottom-8 mt-2 w-48 bg-black rounded shadow-lg z-100 glass"> {/* Increased z-index */}
          <div className="flex flex-col p-2">
            <button
              onClick={() => handleShare("facebook")}
              className="flex items-center p-2 hover:bg-colorPrimary text-white"
            >
              <FaFacebookF className="mr-2" /> Facebook
            </button>
            <button
              onClick={() => handleShare("twitter")}
              className="flex items-center p-2 hover:bg-colorPrimary text-white"
            >
              <FaTwitter className="mr-2" /> Twitter
            </button>
            <button
              onClick={() => handleShare("linkedin")}
              className="flex items-center p-2 hover:bg-colorPrimary text-white"
            >
              <FaLinkedinIn className="mr-2" /> LinkedIn
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareDropdown;
