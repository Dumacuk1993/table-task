import { useEffect, useState } from "react";
import Form from "../Form/Form";
import Table from "../Table/Table";
import "./App.css";
import data from "../../data";
import Pagination from "../Pagination/Pagination";

function App() {
  const items = data;
  const [sortFlags, setSortFlags] = useState({
    name: true,
    quantity: true,
    distance: true,
  });
  const [filterItems, setFilterItems] = useState(data);
  const [renderItems, setRenderItems] = useState(data);
  const [filterParams, setFilterParams] = useState({
    column: null,
    condition: null,
    input: null,
  });
  const onPageQuantity = 7;
  const [pagination, SetPagination] = useState({
    allPages: Math.ceil(items.length / onPageQuantity),
    currentPage: 1,
  });

  const filterSubmit = (params) => {
    setFilterParams(() => {
      return {
        column: params.column,
        condition: params.condition,
        input: params.input,
      };
    });
  };

  const resetFilters = () => {
    setFilterItems(data);
  };

  const changePage = (num) => {
    SetPagination({ ...pagination, currentPage: num });
  };

  const handlerSort = (group) => {
    switch (group) {
      case "name":
        if (sortFlags.name) {
          setFilterItems([
            ...filterItems.sort((a, b) => (a.name < b.name ? 1 : -1)),
          ]);
          setSortFlags({ ...sortFlags, name: false });
        } else {
          setFilterItems([
            ...filterItems.sort((a, b) => (a.name > b.name ? 1 : -1)),
          ]);
          setSortFlags({ ...sortFlags, name: true });
        }
        break;
      case "quantity":
        if (sortFlags.quantity) {
          setFilterItems([
            ...filterItems.sort((a, b) => (a.quantity < b.quantity ? 1 : -1)),
          ]);
          setSortFlags({ ...sortFlags, quantity: false });
        } else {
          setFilterItems([
            ...filterItems.sort((a, b) => (a.quantity > b.quantity ? 1 : -1)),
          ]);
          setSortFlags({ ...sortFlags, quantity: true });
        }
        break;
      case "distance":
        if (sortFlags.distance) {
          setFilterItems([
            ...filterItems.sort((a, b) => (a.distance < b.distance ? 1 : -1)),
          ]);
          setSortFlags({ ...sortFlags, distance: false });
        } else {
          setFilterItems([
            ...filterItems.sort((a, b) => (a.distance > b.distance ? 1 : -1)),
          ]);
          setSortFlags({ ...sortFlags, distance: true });
        }
        break;
      default:
        return filterItems;
    }
  };

  useEffect(() => {
    switch (filterParams.column) {
      case "name":
        if (filterParams.condition === "equally") {
          setFilterItems([
            ...items.filter((item) => item.name === filterParams.input.trim()),
          ]);
          console.log("complite");
        } else if (filterParams.condition === "contains") {
          setFilterItems([
            ...items.filter((item) =>
              item.name.includes(filterParams.input.trim())
            ),
          ]);
        } else if (filterParams.condition === "more") {
          setFilterItems([
            ...items.filter(
              (item) => item.name.split("").length > filterParams.input.trim()
            ),
          ]);
        } else if (filterParams.condition === "less") {
          setFilterItems([
            ...items.filter(
              (item) => item.name.split("").length < filterParams.input.trim()
            ),
          ]);
        }
        break;
      case "quantity":
        if (filterParams.condition === "equally") {
          setFilterItems([
            ...items.filter((item) => item.quantity === +filterParams.input),
          ]);
          console.log("complite");
        } else if (filterParams.condition === "contains") {
          setFilterItems([
            ...items.filter((item) =>
              item.quantity.toString().includes(filterParams.input.trim())
            ),
          ]);
        } else if (filterParams.condition === "more") {
          setFilterItems([
            ...items.filter((item) => item.quantity > +filterParams.input),
          ]);
        } else if (filterParams.condition === "less") {
          setFilterItems([
            ...items.filter((item) => item.quantity < +filterParams.input),
          ]);
        }
        break;
      case "distance":
        if (filterParams.condition === "equally") {
          setFilterItems([
            ...items.filter((item) => item.distance === +filterParams.input),
          ]);
          console.log("complite");
        } else if (filterParams.condition === "contains") {
          setFilterItems([
            ...items.filter((item) =>
              item.distance.toString().includes(filterParams.input.trim())
            ),
          ]);
        } else if (filterParams.condition === "more") {
          setFilterItems([
            ...items.filter((item) => item.distance > +filterParams.input),
          ]);
        } else if (filterParams.condition === "less") {
          setFilterItems([
            ...items.filter((item) => item.distance < +filterParams.input),
          ]);
        }
        break;
      default:
        setFilterItems(items);
    }
    // eslint-disable-next-line
  }, [filterParams]);

  useEffect(() => {
    SetPagination({
      ...pagination,
      allPages: Math.ceil(filterItems.length / onPageQuantity),
    });
    // eslint-disable-next-line
  }, [filterItems]);

  useEffect(() => {
    pagination.currentPage === 1
      ? setRenderItems(
          filterItems.slice(pagination.currentPage - 1, onPageQuantity)
        )
      : setRenderItems(
          filterItems.slice(
            (pagination.currentPage - 1) * onPageQuantity,
            onPageQuantity * pagination.currentPage
          )
        );
  }, [pagination.currentPage, filterItems]);

  return (
    <div className="App">
      <Form filterSubmit={filterSubmit} resetFilters={resetFilters} />
      <Table data={renderItems} handlerSort={handlerSort} />
      <Pagination pagination={pagination} changePage={changePage} />
    </div>
  );
}

export default App;
