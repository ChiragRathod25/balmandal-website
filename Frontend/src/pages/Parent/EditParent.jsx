import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import databaseService from "../../services/database.services";
import { ParentForm } from "../../components";

function EditParent() {
  const { parentId } = useParams();

  const [parent, setParent] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (parentId)
      databaseService
        .getParentDetailsById({ parentId })
        .then((response) => setParent(response.data));
    else navigate("/parent");
    
  }, [parentId, navigate]);
  return parent ? (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <ParentForm parent={parent} />
      </div>
    </div>
  ) : null;
}

export default EditParent;
