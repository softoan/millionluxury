// PropertyForm.tsx
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Stack,
} from "@mui/material";
import type { IOwner } from "../../entities/IOwner";
import type { IProperty } from "../../entities/IProperty";
import { ownerApi } from "../../shared/api/owner/ownerApi";

interface PropertyFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (property: IProperty) => void;
}

export const PropertyForm: React.FC<PropertyFormProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<IProperty>({
    idProperty: "", // temporal
    name: "",
    address: "",
    price: 0,
    codeInternal: "",
    year: new Date().getFullYear(),
    idOwner: "",
  });

  const handleChange = (field: keyof IProperty, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
    setFormData({
      idProperty: "",
      name: "",
      address: "",
      price: 0,
      codeInternal: "",
      year: new Date().getFullYear(),
      idOwner: "",
    });
  };
  const [selectedOwner, setSelectedOwner] = useState<IOwner | IOwner[]>();
  const { getOwner } = ownerApi();

  const listOwner = async () => {
    const response = await getOwner("");
    setSelectedOwner(response ?? []);
  };
  useEffect(() => {
    listOwner();
  }, []);

  return (
    <Dialog
      open={open}
      onClose={(_, reason) => {
        if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
          onClose();
        }
      }}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Nueva Propiedad</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Nombre"
            fullWidth
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <TextField
            label="Dirección"
            fullWidth
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
          <TextField
            label="Precio"
            type="number"
            fullWidth
            value={formData.price}
            onChange={(e) => handleChange("price", Number(e.target.value))}
          />
          <TextField
            label="Código Interno"
            fullWidth
            value={formData.codeInternal}
            onChange={(e) => handleChange("codeInternal", e.target.value)}
          />
          <TextField
            label="Año"
            type="number"
            fullWidth
            value={formData.year}
            onChange={(e) => handleChange("year", Number(e.target.value))}
          />
          <TextField
            select
            label="Propietario"
            fullWidth
            value={formData.idOwner}
            onChange={(e) => handleChange("idOwner", (e.target.value))}
          >
            {Array.isArray(selectedOwner) &&
              selectedOwner.map((o) => (
                <MenuItem key={o.idOwner} value={o.idOwner}>
                  {o.name}
                </MenuItem>
              ))}
          </TextField>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
