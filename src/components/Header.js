import React from "react";

function MyStyledHeader(props) {
  const myStyledHeaderStyles = {
    backgroundColor: '#f0a500',
    textAlign: 'center',
    padding: '20px'
  }
  return (
    <div style={myStyledHeaderStyles}>
      <h1>Help Queue</h1>
    </div>
  );
}



export default MyStyledHeader;