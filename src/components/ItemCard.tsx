import React from 'react'

const ItemCard = ( props: {
    class__Name: string;
    text: string;
} ) => {
    const { class__Name, text } = props;

    // background-img need to be fixed...
  return (
    <div className={`card-container ${class__Name}`}>
        <div className="overlay">
            <h2>{ text }</h2>
            <button>Shop Now</button>
        </div>
    </div>
  )
}

export default ItemCard