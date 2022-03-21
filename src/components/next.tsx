import React from "react";

const Next: React.VFC = () => {
  const message: string = "Now next";

  return (
    <div className="home">
      <p>{message}</p>
    </div>
  );
};

export default Next;
