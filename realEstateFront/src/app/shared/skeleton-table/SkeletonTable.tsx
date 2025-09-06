import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
} from "@mui/material";

interface SkeletonTableProps {
  columns: number; // cantidad de columnas
  rows: number; // cantidad de filas
}

const SkeletonTable: React.FC<SkeletonTableProps> = ({ columns, rows }) => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 0, boxShadow: 0,border: "1px solid #ddd", }}>
      <Table>
        <TableHead>
          <TableRow>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <TableCell key={colIndex}>
                <Skeleton variant="text" width="60%" />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton variant="text" width="60%"
                   /*  variant={colIndex === columns - 1 ? "rectangular" : "text"} // última columna tipo botón
                    height={colIndex === columns - 1 ? 30 : 20}
                    width={colIndex === columns - 1 ? 80 : "60%"} */
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SkeletonTable;
