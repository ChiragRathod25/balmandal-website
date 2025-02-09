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
    <div>
      <ParentForm parent={parent} />
    </div>
  ) : null;
}

export default EditParent;
