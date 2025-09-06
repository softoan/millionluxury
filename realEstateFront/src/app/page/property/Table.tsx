import React, { useEffect, useState } from "react";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import { IconButton, Tooltip, Button, Typography, Box } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HistoryIcon from "@mui/icons-material/History";
import ImageIcon from "@mui/icons-material/Image";
import { esES } from "@mui/x-data-grid/locales";
import type { IProperty } from "../../entities/IProperty";
import type { IOwner } from "../../entities/IOwner";
import type { IPropertyTrace } from "../../entities/IPropertyTrace";
import type { IPropertyImage } from "../../entities/IPropertyImage";
import {
  PropertyImage,
  PropertyT,
  PropertyTrace,
} from "../../page/property/Modals";
import { Filter } from "./Filter";
import { PropertyForm } from "./PropertyForm";
import AddIcon from "@mui/icons-material/Add";
import SkeletonTable from "../../shared/skeleton-table/SkeletonTable";
import { propertiesApi } from "../../shared/api/property/propertiesApi";
import { ownerApi } from "../../shared/api/owner/ownerApi";
import { propertyImagesApi } from "../../shared/api/property-image/propertyImageApi";
import { propertyTracesApi } from "../../shared/api/property-trace/propertyTraceApi";

export const PropertyTable: React.FC = () => {
  const [openOwnerDialog, setOpenOwnerDialog] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState<IOwner | null | IOwner[]>(
    null
  );

  const [openTraceDialog, setOpenTraceDialog] = useState(false);
  const [selectedTraces, setSelectedTraces] = useState<IPropertyTrace[]>([]);

  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [selectedImages, setSelectedImages] = useState<IPropertyImage | null>();

  const [filterName, setFilterName] = useState("");
  const [filterAddress, setFilterAddress] = useState("");
  const [filterMinPrice, setFilterMinPrice] = useState<number | "">("");
  const [filterMaxPrice, setFilterMaxPrice] = useState<number | "">("");

  const [properties, setProperties] = useState<IProperty[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [bandTable, setBandTable] = useState(false);

  const { getProperties, insertProperty } = propertiesApi();
  const { getOwner } = ownerApi();
  const { getPropertyImage } = propertyImagesApi();
  const { getPropertyTrace } = propertyTracesApi();

  const insertPropertyFn = async (property: IProperty) => {
    await insertProperty(property);
    await listProperties();
  };
  const listProperties = async () => {
    setBandTable(true);
    const response = await getProperties();
    setProperties(response ?? []);
    setBandTable(false);
  };

  useEffect(() => {
    listProperties();
  }, []);

  const handleViewOwner = async (idOwner: string) => {
    const owner = await getOwner(idOwner);
    setSelectedOwner(owner);
    setOpenOwnerDialog(true);
  };
  const handleCloseOwnerDialog = () => {
    setOpenOwnerDialog(false);
    setSelectedOwner(null);
  };

  const handleViewTrace = async (idProperty: string) => {
    const info = await getPropertyTrace(idProperty);
    const traces = info;
    setSelectedTraces(traces);
    setOpenTraceDialog(true);
  };
  const handleCloseTraceDialog = () => {
    setOpenTraceDialog(false);
    setSelectedTraces([]);
  };

  const handleViewImage = async (idProperty: string) => {
    const datImg = await getPropertyImage(idProperty);

    setSelectedImages(datImg);
    setOpenImageDialog(true);
  };
  const handleCloseImageDialog = () => {
    setOpenImageDialog(false);
    setSelectedImages({
      idPropertyImage: "",
      idProperty: "",
      file: "",
      enabled: false,
    });
  };

  const columns: GridColDef[] = [
    { field: "idProperty", headerName: "ID", width: 250 },
    { field: "name", headerName: "Nombre", width: 200 },
    { field: "address", headerName: "Dirección", width: 230 },
    {
      field: "price",
      headerName: "Precio",
      width: 200,
      renderCell: (params) =>
        `$${Math.round(params.value).toLocaleString("es-CO")}`,
    },
    { field: "codeInternal", headerName: "Código Interno", width: 200 },
    { field: "year", headerName: "Año", width: 100 },
    {
      field: "ownerInfo",
      headerName: "Propietario",
      width: 120,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Tooltip title="Ver Propietario">
          <IconButton
            color="primary"
            onClick={() => handleViewOwner(params.row.idOwner)}
            sx={{ bgcolor: "#e3f2fd", "&:hover": { bgcolor: "#90caf9" } }}
          >
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      field: "propertyTrace",
      headerName: "Historial",
      width: 120,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Tooltip title="Ver Historial">
          <IconButton
            color="secondary"
            onClick={() => handleViewTrace(params.row.idProperty)}
            sx={{ bgcolor: "#f3e5f5", "&:hover": { bgcolor: "#ce93d8" } }}
          >
            <HistoryIcon />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      field: "propertyImage",
      headerName: "Imagen",
      width: 120,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Tooltip title="Ver Imágenes">
          <IconButton
            color="success"
            onClick={() => handleViewImage(params.row.idProperty)}
            sx={{ bgcolor: "#e8f5e9", "&:hover": { bgcolor: "#a5d6a7" } }}
          >
            <ImageIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const [height, setHeight] = useState<string>(window.innerHeight - 65 + "px");
  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight - 65 + "px");
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <React.Fragment>
      <div style={{ width: "100%" }}>
        <div className="my-card" style={{ minHeight: height }}>
          <Typography
            variant="h6"
            gutterBottom
            fontWeight="bold"
            color="primary"
          >
            Propiedades Registradas
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ mb: 2 }}
            onClick={() => setOpenForm(true)}
          >
            Nueva Propiedad
          </Button>

          <Filter
            filterName={filterName}
            setFilterName={setFilterName}
            filterAddress={filterAddress}
            setFilterAddress={setFilterAddress}
            filterMinPrice={filterMinPrice}
            setFilterMinPrice={setFilterMinPrice}
            filterMaxPrice={filterMaxPrice}
            setFilterMaxPrice={setFilterMaxPrice}
            onApplyFilter={() => ""}
          />

          <Box sx={{ width: "100%", overflowX: "auto", height: 400 }}>
            {bandTable ? (
              <SkeletonTable columns={8} rows={5} />
            ) : (
              <>
                {properties.length > 0 && (
                  <DataGrid
                    rows={properties}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                    getRowId={(row) => row.idProperty}
                    initialState={{
                      pagination: { paginationModel: { pageSize: 5 } },
                    }}
                    disableRowSelectionOnClick
                    localeText={
                      esES.components.MuiDataGrid.defaultProps.localeText
                    }
                    getRowHeight={() => "auto"}
                    sx={{
                      "& .MuiDataGrid-columnHeaderTitle": {
                        fontWeight: "bold",
                        fontSize: "0.95rem",
                        color: "black",
                      },
                      "& .MuiDataGrid-cell": { py: 1 },
                      "& .MuiDataGrid-row:hover": {
                        backgroundColor: "#f1f1f1",
                        cursor: "pointer",
                      },
                      "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#1976d2",
                        color: "#fff",
                        fontSize: "0.95rem",
                      },
                    }}
                  />
                )}
              </>
            )}
          </Box>
        </div>

        {/* Formulario de creación */}
        <PropertyForm
          open={openForm}
          onClose={() => setOpenForm(false)}
          onSave={insertPropertyFn}
        />

        {/* Tus otros modales */}
        <PropertyT
          openOwnerDialog={openOwnerDialog}
          handleCloseOwnerDialog={handleCloseOwnerDialog}
          selectedOwner={selectedOwner}
        />
        <PropertyTrace
          openTraceDialog={openTraceDialog}
          handleCloseTraceDialog={handleCloseTraceDialog}
          selectedTraces={selectedTraces}
        />
        <PropertyImage
          openImageDialog={openImageDialog}
          handleCloseImageDialog={handleCloseImageDialog}
          selectedImages={selectedImages || null}
        />
      </div>
    </React.Fragment>
  );
};
