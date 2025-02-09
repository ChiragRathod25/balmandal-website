import React, { useEffect, useState } from "react";
import databaseService from "../../services/database.services";
import { useSelector } from "react-redux";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";

function AllParent() {
  const [parents, setParents] = useState([]);
  useEffect(() => {
    databaseService
      .getUserParents()
      .then((response) => setParents(response.data));
  }, []);
  const user = useSelector((state) => state.auth.userData.firstName);

  const navigate=useNavigate()
  return parents ? (
    <>
      <h2>{`${user}'s Parent Details`}</h2>
      {Array.isArray(parents) &&
        parents.length > 0 &&
        parents.map((parent) => {
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
            <Button
            onClick={() => navigate(`/parent/edit/${parent._id}`)}
          >
            {`Edit ${parent.role}'s details`}
          </Button>
          </div>;
        })}
          <Button onClick={()=>navigate('/parent/add')}>
        Add Parent
      </Button>
    </>
  ) : null;
}

export default AllParent;
