import React from "react";
import { TalentForm, Container } from "../../components";

function AddTalent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Container className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <TalentForm />
      </Container>
    </div>
  );
}

export default AddTalent;
