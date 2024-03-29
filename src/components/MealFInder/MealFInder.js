import axios from 'axios';
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
            const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
            const data = await axios(url);
            setLoading(false)
            return data;
        }
        fetchData().then(data => setMeals(data?.data?.meals));
    }, [search])

    return (
        <div className='bg-dark p-3'>
            <h1 className='text-center text-warning py-4'>Find Delicious Foods</h1>
            {/* <p>searching : {search}</p> */}
            <div className="d-flex justify-content-between p-4 px-5">
              <input type="text" className='w-75' onChange={handleChange} placeholder='Search for meals...' />
                {
                    loading && <div className="spinner-border text-warning" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                }
                <h3 className='text-warning'>Meals found : {meals?.length || 0}</h3>
            </div>
            <div className='container'>
                <div className="d-flex justify-content-center">

                </div>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {
                        meals === null ? <h1 className='text-center text-danger'>No Results Found</h1> : meals?.map(meal => <Meal key={meal.idMeal} meal={meal} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default MealFInder;
