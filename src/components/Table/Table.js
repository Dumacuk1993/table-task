import "./Table.css";

const Table = ({ data, handlerSort }) => {
  return (
    <table className="table table-bordered table-success align-middle">
      <thead>
        <tr>
          <th scope="col">Дата</th>
          <th
            className="sort--active"
            scope="col"
            onClick={() => handlerSort("name")}
          >
            Название
          </th>
          <th
            className="sort--active"
            scope="col"
            onClick={() => handlerSort("quantity")}
          >
            Количество
          </th>
          <th
            className="sort--active"
            scope="col"
            onClick={() => handlerSort("distance")}
          >
            Расстояние
          </th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <div className="table_message">
            Не обнаружено эллементов по заданым значениям
          </div>
        ) : (
          data.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.distance}</td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};

export default Table;
