import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import databaseService from "../../services/database.services";
import { ParentForm } from "../../components";

function EditParent() {
  const { parentId } = useParams();

  const [parent, setParent] = useState({});

  useEffect(() => {
    if (parentId)
      databaseService
        .getParentDetailsById(parentId)
        .then((response) => setParent(response.data));
  }, [parentId]);
  return (
    <div>
      <ParentForm parent={parent} />
    </div>
  );
}

export default EditParent;
