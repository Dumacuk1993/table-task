import React, { useState, useEffect } from "react";
import "./Form.css";

const Form = ({ filterSubmit, resetFilters }) => {
  const [column, setColumn] = useState("");
  const [condition, setCondition] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const columnHandler = (e) => {
    setColumn(e.target.value);
  };
  const conditionHandler = (e) => {
    setCondition(e.target.value);
  };
  const inputHandler = (e) => {
    setInput(e.target.value);
  };
  const clearFilter = () => {
    setColumn("");
    setCondition("");
    setInput("");
    setError(null);
    resetFilters();
    setDisabled(true);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (column === "name") {
      filterSubmit({ column, condition, input });
      setError(false);
      setDisabled(true);
    } else if (
      !isNaN(+input) &&
      (column === "quantity" || column === "distance")
    ) {
      filterSubmit({ column, condition, input });
      setError(false);
      setDisabled(true);
    } else {
      setError(true);
      setInput("");
    }
  };

  const errorView = error ? (
    <div class="alert alert-danger" role="alert">
      Введены недопустимые значения
    </div>
  ) : (
    <div class="alert alert-success" role="alert">
      Фильтрация завершена
    </div>
  );

  useEffect(() => {
    if (column !== "" && condition !== "" && input !== "") {
      setDisabled(false);
    }
  }, [column, condition, input]);

  return (
    <form className="row g-3 table__form" onSubmit={onSubmit}>
      <div className="input-group flex-nowrap">
        <select
          className="form-select form-select-sm"
          aria-label="Default select example"
          value={column}
          onChange={columnHandler}
        >
          <option selected>Колонка...</option>
          <option value="name">Название</option>
          <option value="quantity">Количество</option>
          <option value="distance">Расстояние</option>
        </select>
      </div>
      <div className="input-group flex-nowrap">
        <select
          className="form-select form-select-sm"
          aria-label="Default select example"
          value={condition}
          onChange={conditionHandler}
        >
          <option selected>Условие...</option>
          <option value="equally">Равно</option>
          <option value="contains">Содержит</option>
          <option value="more">Больше</option>
          <option value="less">Меньше</option>
        </select>
      </div>
      <div className="input-group flex-nowrap">
        <input
          type="text"
          className={
            error ? "form-control border border-danger" : "form-control"
          }
          placeholder="Введите значение"
          aria-label="Username"
          aria-describedby="addon-wrapping"
          value={input}
          onChange={inputHandler}
        />
      </div>
      {error !== null ? errorView : <></>}
      <div className="col-auto">
        <button
          type="reset"
          className="btn btn-danger mb-3"
          onClick={clearFilter}
        >
          Сбросить
        </button>
      </div>
      <div className="col-auto">
        <button
          type="submit"
          disabled={disabled}
          className="btn btn-primary mb-3"
        >
          Отфильровать
        </button>
      </div>
    </form>
  );
};

export default Form;
