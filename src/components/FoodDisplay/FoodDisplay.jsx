import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category = "All" }) => { // Default category as "All"
    const { food_list } = useContext(StoreContext);

    return (
        <div className='food-display ' id='food-display'>
            <h2>Top Dishes Near You</h2>
            <div className="food-display-list">
                {food_list.map((item, index) => {
                    // Check category filter
                    if (category === "All" || category === item.category) {
                        return (
                            <FoodItem
                                key={index}
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                            />
                        );
                    } else {
                        return null; // If the category doesn't match, return nothing
                    }
                })}
            </div>
        </div>
    );
}

export default FoodDisplay;
