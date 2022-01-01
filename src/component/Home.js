import React from "react";
import { useState, useEffect } from "react";
import gql from "graphql-tag";
import request from "./request";
import { BiSearchAlt } from "react-icons/bi";
import img1 from "../photo/spacex.svg";

const Home = () => {
  const [contain, setContain] = useState([]);
  const [filterData, setFilterData] = useState(contain);
  const [search, setSearch] = useState("");
  const lengthOffilterData = filterData.length;

  useEffect(() => {
    const filterFunction = contain.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilterData(filterFunction);

    console.log(filterFunction);
  }, [search, contain]);

  const fetchShips = async () => {
    const response = await request(gql`
      {
        ships {
          name
          home_port
          image
          roles
        }
      }
    `);
    setContain(response.data.ships);
  };

  useEffect(() => {
    fetchShips();
  }, []);

  function submit(e) {
    e.preventDefault();
  }

  return (
    <div>
      <div className="logo-cont">
        <img src={img1} alt="spaceX" className="logo" />
      </div>
      <div className="searchbar">
        <form onSubmit={submit}>
          <input
            type="text"
            placeholder="search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="input-cont"
          />
          <button className="btn">
            <BiSearchAlt />
          </button>
        </form>
      </div>
      <h1 className="count">Total Count : {lengthOffilterData}</h1>

      <div className="main-cont">
        {filterData.map((item, index) => {
          const { name, image, home_port, roles } = item;
          return (
            <div className="main-item-cont" key={index}>
              <div className="img-cont">
                <img src={image} alt="ship" className="img" />
              </div>

              <div className="info">
                <h1 className="title">{name}</h1>
                <div>
                  <h3 className="sub-title">Port : {home_port}</h3>
                  <h3 className="sub-title">Roles : {roles}</h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
