import React, { useEffect, useState } from "react";
import {
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Autocomplete,
} from "@mui/material";
import type { IPropertyImage } from "../../entities/IPropertyImage";
import type { IProperty } from "../../entities/IProperty";
import { propertiesApi } from "../../shared/api/property/propertiesApi";
import { propertyImagesApi } from "../../shared/api/property-image/propertyImageApi";

export const PropertyImageForm: React.FC = () => {
  const [formData, setFormData] = useState<IPropertyImage>({
    idPropertyImage: "",
    idProperty: "",
    file: "",
    enabled: true,
  });

  const handleChange = (field: keyof IPropertyImage, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    await insertPropertyImage(formData);
    setFormData({
      idPropertyImage: "",
      idProperty: "",
      file: "",
      enabled: true,
    });
  };
  const [properties, setProperties] = useState<IProperty[]>([]);
  const { getProperties } = propertiesApi();
  const { insertPropertyImage } = propertyImagesApi();
  const listProperties = async () => {
    const response = await getProperties();
    setProperties(response ?? []);
  };
  useEffect(() => {
    listProperties();
  }, []);
  return (
    <div className="my-card" style={{ maxWidth: 500, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
          Nueva Imagen de Propiedad
        </Typography>

        <Stack spacing={2} mt={1}>
          <Autocomplete
            options={properties}
            getOptionLabel={(option) => `${option.name}`}
            value={
              properties.find((p) => p.idProperty === formData.idProperty) ||
              null
            }
            onChange={(_, newValue) =>
              handleChange("idProperty", newValue ? newValue.idProperty : 0)
            }
            renderInput={(params) => (
              <TextField {...params} label="Propiedad" fullWidth />
            )}
          />

          <TextField
            label="URL de la Imagen"
            placeholder="https://ejemplo.com/imagen.jpg"
            fullWidth
            value={formData.file}
            onChange={(e) => handleChange("file", e.target.value)}
          />

          {/* <FormControlLabel
            control={
              <Switch
                checked={formData.enabled}
                onChange={(e) => handleChange("enabled", e.target.checked)}
              />
            }
            label="Habilitada"
          /> */}

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!formData.file.trim() || formData.idProperty === ""}
          >
            Guardar Imagen
          </Button>
        </Stack>
      </CardContent>
    </div>
  );
};
