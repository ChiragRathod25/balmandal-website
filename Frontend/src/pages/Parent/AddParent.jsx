import { Container, ParentForm } from "../../components";

function AddParent() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Container className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <ParentForm />
      </Container>
    </div>
  );
}

export default AddParent;
