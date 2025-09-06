import React, { useEffect, useState } from "react";
import {
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Autocomplete,
} from "@mui/material";
import type { IPropertyTrace } from "../../entities/IPropertyTrace";
import type { IProperty } from "../../entities/IProperty";
import { propertyTracesApi } from "../../shared/api/property-trace/propertyTraceApi";
import { propertiesApi } from "../../shared/api/property/propertiesApi";
 
export const PropertyTraceForm: React.FC = () => {
  const [formData, setFormData] = useState<IPropertyTrace>({
    idPropertyTrace: "",
    dateSale: "",
    name: "",
    value: 0,
    tax: 0,
    idProperty: "",
  });

  const handleChange = (field: keyof IPropertyTrace, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const { insertPropertyTrace } = propertyTracesApi();
  const { getProperties } = propertiesApi();
    const [properties, setProperties] = useState<IProperty[]>([]);

  const listProperties = async () => { 
    const response = await getProperties();
    setProperties(response ?? []); 
  };

  useEffect(() => {
    listProperties();
  }, []);

  const handleSubmit = async () => {
    console.log("Trace guardado:", formData);

    await insertPropertyTrace(formData);
    // Reset del formulario
    setFormData({
      idPropertyTrace: "",
      dateSale: "",
      name: "",
      value: 0,
      tax: 0,
      idProperty: "",
    });
  };

  return (
    <div className="my-card" style={{ maxWidth: 500, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
          Nuevo Registro de Trazabilidad
        </Typography>

        <Stack spacing={2} mt={1}>
          <Autocomplete
            options={properties}
            getOptionLabel={(option) => `${option.name}`}
            value={
              properties.find(
                (p) => p.idProperty === formData.idProperty
              ) || null
            }
            onChange={(_, newValue) =>
              handleChange("idProperty", newValue ? newValue.idProperty : 0)
            }
            renderInput={(params) => (
              <TextField {...params} label="Propiedad" fullWidth />
            )}
          />

          <TextField
            label="Fecha de Venta"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.dateSale}
            onChange={(e) => handleChange("dateSale", e.target.value)}
          />

          <TextField
            label="Nombre del Comprador"
            fullWidth
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <TextField
            label="Valor de la Venta"
            type="number"
            fullWidth
            value={formData.value}
            onChange={(e) => handleChange("value", Number(e.target.value))}
          />

          <TextField
            label="Impuesto (%)"
            type="number"
            fullWidth
            value={formData.tax}
            onChange={(e) => handleChange("tax", Number(e.target.value))}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={
              !formData.dateSale.trim() ||
              !formData.name.trim() ||
              formData.value <= 0 ||
              formData.tax < 0 ||
              formData.idProperty === ""
            }
          >
            Guardar Registro
          </Button>
        </Stack>
      </CardContent>
    </div>
  );
};
