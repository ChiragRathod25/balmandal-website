import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import databaseService from "../../services/database.services";
import { ParentForm, QueryHandler } from "../../components";
import useCustomReactQuery  from "../../utils/useCustomReactQuery";

function EditParent() {
  const { parentId } = useParams();

  const [parent, setParent] = useState(null);

  const fetchParent = useCallback(() => databaseService.getParentDetailsById({ parentId }), [parentId]);
  const { data, loading, error } = useCustomReactQuery(fetchParent);

  const navigate = useNavigate();
  useEffect(() => {
   
    if (!parentId) {
      navigate("/");
      return;
    }
    if (data) {
      setParent(data);
    }
    console.log("Edit Parent", parent);
    
  }, [data,parentId, navigate]);
  return (
    <QueryHandler queries={[{ loading, error }]}>
      {
        parent ? (
          <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
              <ParentForm parent={parent} />
            </div>
          </div>
        ) : null
      }
      </QueryHandler>
  )
}

export default EditParent;
