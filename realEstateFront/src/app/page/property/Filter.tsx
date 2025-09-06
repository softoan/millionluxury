import { Box, TextField, Button, Collapse, Typography, IconButton } from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import type { IFilterProps } from "../../entities/IFilterProps";

export const Filter: React.FC<IFilterProps> = ({
    filterName,
    setFilterName,
    filterAddress,
    setFilterAddress,
    filterMinPrice,
    setFilterMinPrice,
    filterMaxPrice,
    setFilterMaxPrice,
    onApplyFilter,
}) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="my-card-f">
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                }}
                onClick={() => setOpen(!open)}
            >
                <Typography variant="h6">Filtros</Typography>
                <IconButton>{open ? <ExpandLessIcon /> : <ExpandMoreIcon />}</IconButton>
            </Box>
            <Collapse in={open}>
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        mt: 2,
                        flexWrap: "wrap",
                        alignItems: "center",
                    }}
                >
                    <TextField
                        label="Nombre"
                        size="small"
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                    />
                    <TextField
                        label="Dirección"
                        size="small"
                        value={filterAddress}
                        onChange={(e) => setFilterAddress(e.target.value)}
                    />
                    <TextField
                        label="Precio Min"
                        size="small"
                        type="number"
                        value={filterMinPrice}
                        onChange={(e) =>
                            setFilterMinPrice(e.target.value === "" ? "" : Number(e.target.value))
                        }
                    />
                    <TextField
                        label="Precio Max"
                        size="small"
                        type="number"
                        value={filterMaxPrice}
                        onChange={(e) =>
                            setFilterMaxPrice(e.target.value === "" ? "" : Number(e.target.value))
                        }
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onApplyFilter}
                        sx={{ height: "40px" }}
                    >
                        Aplicar
                    </Button>
                </Box>
            </Collapse>
        </div>
    );
};
