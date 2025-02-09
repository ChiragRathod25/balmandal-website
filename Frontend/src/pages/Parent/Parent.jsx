import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import databaseService from "../../services/database.services";
import { Button } from "../../components";

function Parent() {
  console.log("Parent Component");
  const { parentId } = useParams();
  const [parent, setParent] = useState(null);

  const navigate=useNavigate()
  useEffect(() => {
      if (parentId) {
         databaseService
          .getParentDetailsById({ parentId })
          .then((response) => setParent(response.data));
      }
      else
        navigate('/')

  }, [parentId]);

  return parent ? (
    <>
      <div key={parent?._id}>
        <div>
          <p>{parent.rol}</p>
        </div>

        <div>
          <p>{parent.fullName}</p>
        </div>

        <div>
          <p>{parent.email}</p>
        </div>
        <div>
          <p>{parent.mobileNumber}</p>
        </div>
        <div>
          <p>{parent.occupation}</p>
        </div>
        <Button onClick={() => navigate(`/parent/edit/${parent._id}`)}>
          {`Edit ${parent.role}'s details`}
        </Button>
      </div>
    </>
  ) : <h2>Loading...</h2>;
}

export default Parent;
