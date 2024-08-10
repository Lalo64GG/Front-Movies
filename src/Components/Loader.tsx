import {Spinner} from "@nextui-org/react";

export const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
    <div className="absolute inset-0 bg-cover bg-center"></div>
    <div className="absolute inset-0 bg-gray-500 bg-opacity-50 blur-md"></div>
    <div className="relative z-10 p-4">
      <Spinner label="Loading..." color="primary" size="lg" />
    </div>
  </div>
  );
}
