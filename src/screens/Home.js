import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card.js';



export default function Home() {
  const [search,setSearch] = useState('');
  const [foodCategory, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    })

    response = await response.json();

    // console.log(response[0],response[1]);
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  }
  useEffect(() => {
    loadData()
  }, [])


  return (
    <div >
      <div><Navbar /></div>
      <div>
          <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" >
            <div className="carousel-inner" id='carousel'>
              <div className="carousel-caption" style={{ zIndex: "10" }}>
                <div className="d-flex justify-content-center">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                  {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                </div>
              </div>
              <div className="carousel-item active">
                <img src="https://www.cubesnjuliennes.com/wp-content/uploads/2020/07/Chicken-Biryani-Recipe.jpg" className="d-block w-100 object-fit-cover " style={{ filter: "brightness(50%)",height:'550px',width:'200px', objectFit: "fill" }} alt="..." />
              </div>
              <div className="carousel-item">
                <img src="https://www.sugarspicenmore.com/wp-content/uploads/2021/04/Palak-Paneer-2.jpg" className="d-block w-100 object-fit-cover" style={{ filter: "brightness(50%)",height:'550px',width:'200px', objectFit: "fill" }} alt="..." />
              </div>
              <div className="carousel-item">
                <img src="https://i.pinimg.com/originals/ee/96/73/ee9673ac715b569f01a8996ffa800d21.jpg" className="d-block w-100 object-fit-cover" style={{ filter: "brightness(50%)",height:'550px',width:'200px', objectFit: "fill" }} alt="..." />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className='container'>
          {
            foodCategory && foodCategory.length > 0
              ? foodCategory.map((category) => (
                <div key={category._id} className='row mb-3'>
                  <div className='fs-3 m-3'>{category.CategoryName}</div>
                  <hr />
                  {
                    foodItem && foodItem.length > 0
                      ? foodItem.filter((item) => (item.CategoryName === category.CategoryName &&(item.name.toLowerCase().includes(search.toLocaleLowerCase()))))
                      .map((filteredItem) => (
                        <div key={filteredItem._id} className='col-12  col-md-6  col-lg-3'>
                          {/* Render your Card component here with filteredItem */}
                          <Card foodItem = {filteredItem}
                            options={filteredItem.options[0]}></Card>
                        </div>
                      ))
                      : "No Such Data Found" /* Render this when foodItem is empty or not defined */
                  }
                </div>
              ))
              : " "
          }

        </div>
        <div><Footer /></div>
      </div>
      )
}
