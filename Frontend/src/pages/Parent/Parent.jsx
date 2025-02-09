import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import databaseService from "../../services/database.services";
import { Button } from "../../components";

function Parent() {
  const { parentId } = useParams();

  const [parent, setParent] = useState({});

  useEffect(() => {
    if (parentId)
      databaseService
        .getParentDetailsById(parentId)
        .then((response) => setParent(response.data));
  }, [parentId]);
  const navigate = useNavigate();
  return parent ? (
    <>
      <div key={parent?._id}>
        <div>
          <p>{parent.rol}</p>
        </div>
        <div>
          <p>{parent.role}</p>
        </div>
        <div>
          <p>{parent.mobile}</p>
        </div>
        <div>
          <p>{parent.occupation}</p>
        </div>
        <Button onClick={() => navigate(`/parent/edit/${parent._id}`)}>
          {`Edit ${parent.role}'s details`}
        </Button>
      </div>
    </>
  ) : null;
}

export default Parent;
