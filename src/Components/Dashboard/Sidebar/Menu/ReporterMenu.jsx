import { BsFileEarmarkPlus, BsFileEarmarkText, BsPencilSquare, BsTrash } from "react-icons/bs";
import { useState } from "react";
import MenuItem from "./MenuItem";

const ReporterMenu = () => {
  const [selectedArticle, setSelectedArticle] = useState(null); 

  return (
    <>
      {/* Menu Item for creating new news articles */}
      <MenuItem
        icon={BsFileEarmarkPlus}
        label="Create New Article"
        address="news-post"
      />

      {/* Menu Item for viewing all submitted articles */}
      <MenuItem
        icon={BsFileEarmarkText}
        label="View Submitted Articles"
        address="submitted-articles"
      />

    </>
  );
};

export default ReporterMenu;
