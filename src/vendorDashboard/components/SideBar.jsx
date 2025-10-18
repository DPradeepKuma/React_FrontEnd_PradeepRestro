import React from 'react'

const SideBar = ({
  showFirmHandlerClick,
  showProductHandlerClick,
  showAllProductshandlerClick,
  showFirmTitle
}) => {
  return (
    <div>
      <div className="sideBarSection">
        <ul>
          {showFirmTitle ? <li onClick={showFirmHandlerClick}>Add Firm</li> :""}
            
            <li onClick={showProductHandlerClick}>Add Product</li>
            <li onClick={showAllProductshandlerClick}>All Products</li>
            <li>User Details</li>
            
        </ul>
      </div>
    </div>
  )
}

export default SideBar
