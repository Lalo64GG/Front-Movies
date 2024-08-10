export const SkeletonCard = () => {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col p-4 animate-pulse">
        <div className="bg-gray-200 w-full h-48"></div>
        <div className="flex-1 p-4 space-y-4">
          <div className="bg-gray-200 h-6 w-3/4"></div>
          <div className="bg-gray-200 h-4 w-full"></div>
          <div className="bg-gray-200 h-4 w-1/2"></div>
        </div>
        <div className="p-4">
          <div className="bg-gray-200 h-10 w-full"></div>
        </div>
      </div>
    );
  };

  