import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
import type { IOwner } from "../../entities/IOwner";
import type { IPropertyImage } from "../../entities/IPropertyImage";
import type { IPropertyTrace } from "../../entities/IPropertyTrace";

{
  /* Modal Propietario */
}
export const PropertyT: React.FC<{
  openOwnerDialog: boolean;
  handleCloseOwnerDialog: () => void;
  selectedOwner: IOwner | null | IOwner[];
}> = ({ openOwnerDialog, handleCloseOwnerDialog, selectedOwner }) => (
  <Dialog
    open={openOwnerDialog}
    onClose={handleCloseOwnerDialog}
    PaperProps={{ sx: { borderRadius: 3, p: 2 } }}
  >
    <DialogTitle
      sx={{
        bgcolor: "#1976d2",
        color: "#fff",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
      }}
    >
      Información del Propietario
    </DialogTitle>
    <DialogContent dividers>
      {selectedOwner && !Array.isArray(selectedOwner) && (
        <Stack spacing={2} alignItems="center">
          <Avatar src={selectedOwner.photo} sx={{ width: 100, height: 100 }} />
          <Typography variant="subtitle1">
            <strong>ID:</strong> {selectedOwner.idOwner}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Nombre:</strong> {selectedOwner.name}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Dirección:</strong> {selectedOwner.address}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Fecha Nacimiento:</strong>{" "}
            {selectedOwner.birthday?.toString().split("T")[0]}
          </Typography>
        </Stack>
      )}
    </DialogContent>
    <DialogActions>
      <Button
        onClick={handleCloseOwnerDialog}
        variant="contained"
        color="primary"
      >
        Cerrar
      </Button>
    </DialogActions>
  </Dialog>
);

{
  /* Modal Historial */
}
export const PropertyTrace: React.FC<{
  openTraceDialog: boolean;
  handleCloseTraceDialog: () => void;
  selectedTraces: IPropertyTrace[];
}> = ({ openTraceDialog, handleCloseTraceDialog, selectedTraces }) => (
  <Dialog
    open={openTraceDialog}
    onClose={handleCloseTraceDialog}
    maxWidth="md"
    fullWidth
    PaperProps={{ sx: { borderRadius: 3 } }}
  >
    <DialogTitle sx={{ bgcolor: "#6a1b9a", color: "#fff" }}>
      Historial de Propiedad
    </DialogTitle>
    <DialogContent dividers>
      <DataGrid
        rows={selectedTraces}
        columns={[
          { field: "idPropertyTrace", headerName: "ID Trace", width: 230 },
          {
            field: "dateSale",
            headerName: "Fecha Venta",
            width: 150,
            renderCell: (params) => `${params.value.toString().split("T")[0]}`,
          },
          { field: "name", headerName: "Nombre", width: 200 },
          {
            field: "value",
            headerName: "Valor",
            width: 120,
            renderCell: (params) =>
              `$${Math.round(params.value).toLocaleString("es-CO")}`,
          },
          {
            field: "tax",
            headerName: "Impuesto",
            width: 120,
            renderCell: (params) => `${params.value}`,
          },
        ]}
        getRowId={(row) => row.idPropertyTrace}
        autoHeight
        hideFooter
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            fontWeight: "bold",
            fontSize: "0.95rem",
            color: "black",
          },
        }}
      />
    </DialogContent>
    <DialogActions>
      <Button
        onClick={handleCloseTraceDialog}
        variant="contained"
        color="secondary"
      >
        Cerrar
      </Button>
    </DialogActions>
  </Dialog>
);

{
  /* Modal Imágenes */
}
export const PropertyImage: React.FC<{
  openImageDialog: boolean;
  handleCloseImageDialog: () => void;
  selectedImages: IPropertyImage | null;
}> = ({ openImageDialog, handleCloseImageDialog, selectedImages }) => (
  <Dialog
    open={openImageDialog}
    onClose={handleCloseImageDialog}
    maxWidth="md"
    fullWidth
    PaperProps={{ sx: { borderRadius: 3 } }}
  >
    <DialogTitle sx={{ bgcolor: "#2e7d32", color: "#fff" }}>
      Imágenes de la Propiedad
    </DialogTitle>
    <DialogContent dividers>
      <Stack spacing={2}>
        {selectedImages?.file && (
          <img
            key={selectedImages?.idPropertyImage}
            src={selectedImages?.file}
            alt={`Propiedad ${selectedImages?.idProperty}`}
            style={{
              width: "100%",
              maxHeight: 350,
              borderRadius: 12,
              objectFit: "cover",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
          />
        )}
        {!selectedImages?.idPropertyImage && (
          <Typography textAlign="center" color="textSecondary">
            No hay imágenes disponibles
          </Typography>
        )}
      </Stack>
    </DialogContent>
    <DialogActions>
      <Button
        onClick={handleCloseImageDialog}
        variant="contained"
        color="success"
      >
        Cerrar
      </Button>
    </DialogActions>
  </Dialog>
);
