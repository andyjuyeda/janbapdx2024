import { useEffect, useState, ChangeEvent, MouseEvent } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type Option = {
  label: string;
  value: string;
};

const TableCell = ({ getValue, row, column, table }: any) => {
  const initialValue = getValue();
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    tableMeta?.updateData(row.index, column.id, e.target.value);
  };

  if (tableMeta?.editedRows[row.id]) {
    return columnMeta?.type === "select" ? (
      <select onChange={onSelectChange} value={initialValue}>
        {columnMeta?.options?.map((option: Option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        type={columnMeta?.type || "text"}
      />
    );
  }
  return <span>{value}</span>;
};

const fetchDataFromEndpoint = async (url: string) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    return null; // or handle the error as needed
  }
};

type Bowler = {
  name: string;
  gender: string;
  average: number;
};

const EditCell = ({ row, table }: any) => {
  const meta = table.options.meta;
  const setEditedRows = (e: MouseEvent<HTMLButtonElement>) => {
    const elName = e.currentTarget.name;
    meta?.setEditedRows((old: []) => ({
      ...old,
      [row.id]: !old[row.id],
    }));
    if (elName !== "edit") {
      meta?.revertData(row.index, e.currentTarget.name === "cancel");
    }
  };
  return meta?.editedRows[row.id] ? (
    <>
      <button onClick={setEditedRows} name="cancel">
        X
      </button>{" "}
      <button onClick={setEditedRows} name="done">
        ✔
      </button>
    </>
  ) : (
    <button onClick={setEditedRows} name="edit">
      ✐
    </button>
  );
};

const columnHelper = createColumnHelper<Bowler>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: TableCell,
    meta: {
      type: "text",
    },
  }),
  columnHelper.accessor("average", {
    header: "Avg.",
    cell: TableCell,
    meta: {
      type: "number",
    },
  }),
  columnHelper.accessor("gender", {
    header: "M/F",
    cell: TableCell,
    meta: {
      type: "select",
      options: [
        { value: "M", label: "M" },
        { value: "F", label: "F" },
      ],
    },
  }),
  columnHelper.display({
    id: "edit",
    cell: EditCell,
  }),
];

export const BowlersTable = () => {
  const [data, setData] = useState<Bowler[]>([]);
  const [originalData, setOriginalData] = useState<Bowler[]>([]);
  const [editedRows, setEditedRows] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:5001/api/bowlers";
      const allBowlers = await fetchDataFromEndpoint(url);
      setData(allBowlers);
    };

    fetchData();
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      editedRows,
      setEditedRows,
      revertData: (rowIndex: number, revert: boolean) => {
        if (revert) {
          setData((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          );
        } else {
          setOriginalData((old) =>
            old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
          );
        }
      },
      updateData: (rowIndex: number, columnId: string, value: string) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
  });

  return (
    <table className="w-full bg-slate-50 text-sm md:text-base">
      <thead className="bg-dark-blue text-left text-white">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="">
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="p-2">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="">
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="border-b p-1.5 md:p-3">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
