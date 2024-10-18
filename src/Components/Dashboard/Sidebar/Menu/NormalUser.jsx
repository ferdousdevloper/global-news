import { useState } from "react";
import { BsBookmark, BsFillBookmarksFill } from "react-icons/bs";
import useAuth from "../../../../hooks/useAuth";
import useRole from "../../../../hooks/useRole";
import MenuItem from "./MenuItem";
import RequestReporterModal from "../../RequestReporterModal";
import { MdFavorite } from "react-icons/md";

const NormalUser = () => {
  const { user } = useAuth();
  const [role] = useRole();
  
  // for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  return (
    <>
      {/* Menu for managing saved/bookmarked articles */}
      <MenuItem
        icon={BsBookmark}
        label="Saved Articles"
        address="saved-articles"
      />
      <MenuItem
        icon={BsFillBookmarksFill}
        label="Manage Bookmarks"
        address="manage-bookmarks"
      />
      <MenuItem
        icon={MdFavorite}
        label="My Favorites"
        address="my-favorites"
      />
      <button
        className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-4"
        onClick={openModal} // Open modal when button is clicked
      >
        Request to Become a Reporter
      </button>
      
      {/* Modal for requesting to become a reporter */}
      <RequestReporterModal
        isOpen={isModalOpen}
        onClose={closeModal}
        userEmail={user?.email || ""}
      />
    </>
  );
};

export default NormalUser;
