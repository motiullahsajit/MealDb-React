import React, { useEffect, useState } from 'react';
import Meal from '../Meal/Meal';

const MealFInder = () => {
    const [loading, setLoading] = useState(true);
    const [search, setSerch] = useState('');
    const [meals, setMeals] = useState([]);
    const handleChange = event => {
        const search = (event.target.value)
        setSerch(search)
    }
    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
            const data = res.json();
            setLoading(false)
            return data;
        }
        fetchData().then(data => setMeals(data?.meals));
    }, [search])
    return (
        <div className='bg-dark'>
            <h1 className='text-center text-warning py-4'>Find Delicious Foods</h1>
            {/* <p>searching : {search}</p> */}
            <div className="d-flex justify-content-between p-4 px-5">
                <input type="text" className='w-50' onChange={handleChange} placeholder='Search for meals...' />
                <h3 className='text-warning'>Meals found : {meals?.length || 0}</h3>
            </div>
            <div className='container'>
                <div className="d-flex justify-content-center">
                    {
                        loading && <div class="spinner-border text-warning text-center" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    }
                </div>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {
                        meals === null ? <h1 className='text-center text-danger'>No Results Found</h1> : meals?.map(meal => <Meal meal={meal} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default MealFInder;


// fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
//             .then(res => res.json())
//             .then(data => setMeals(data?.meals))