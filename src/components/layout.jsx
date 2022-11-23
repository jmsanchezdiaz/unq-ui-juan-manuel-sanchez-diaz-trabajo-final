import React from "react";

const Layout = ({ children }) => {
  return (
    <div id="container">
      <section className="max-w-lg mx-auto py-2">{children}</section>
    </div>
  );
};

export default Layout;
