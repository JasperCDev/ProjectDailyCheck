import React from "react";

const SearchFilter = (props: { column: any }) => {
  const { filterValue, setFilter } = props.column;
  return (
    <input
      value={filterValue || ""}
      onChange={(e) => setFilter(e.target.value)}
    />
  );
};

interface SelectFilterProps {
  column: any;
  options: Array<string>;
}

const SelectFilter = (props: SelectFilterProps) => {
  const { filterValue, setFilter } = props.column;
  return (
    <select
      value={filterValue || ""}
      onChange={(e) => setFilter(e.target.value)}
    >
      {props.options.map((option, index) => {
        return (
          <option key={option} value={!index ? "" : option}>
            {option}
          </option>
        );
      })}
    </select>
  );
};

// WILL IMPLEMENT LATER
// const CheckBoxFilter = (props: { column: any }) => {
//   const { filterValue, setFilter } = props.column;
//   return (
//     <div>
//       {(props.column.options as string[]).map((option) => {
//         return (
//           <>
//             <input
//               key={option}
//               type="checkbox"
//               id={option}
//               name={option}
//               value={filterValue || ""}
//               onChange={(e) => setFilter(e.target.value)}
//             />
//             <label htmlFor={option}>{option}</label>
//           </>
//         );
//       })}
//     </div>
//   );
// };

const ColumnFilters = {
  SearchFilter,
  SelectFilter,
  // CheckBoxFilter,
};

export default ColumnFilters;
