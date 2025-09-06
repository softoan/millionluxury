import React, { useState } from "react";
import { TextField, Button, Stack, Typography } from "@mui/material";
import { ownerApi } from "../../shared/api/owner/ownerApi";

interface Owner {
  idOwner: string; // lo genera MongoDB
  name: string;
  address: string;
  photo: string;
  birthday: string;
}

const OwnerForm: React.FC = () => {
  const [owner, setOwner] = useState<Owner>({
    idOwner: "",
    name: "",
    address: "",
    photo: "",
    birthday: "",
  });

  const { insertOwner } = ownerApi();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOwner((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await insertOwner(owner);

    // Resetear el formulario
    setOwner({ idOwner: "", name: "", address: "", photo: "", birthday: "" });
  };

  return (
    <div className="my-card" style={{ maxWidth: 500, borderRadius: 3 }}>
      <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
        Crear Propietario
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Nombre"
            name="name"
            value={owner.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Dirección"
            name="address"
            value={owner.address}
            onChange={handleChange}
            required
          />
          <TextField
            label="URL de Foto"
            name="photo"
            value={owner.photo}
            onChange={handleChange}
          />
          <TextField
            type="date"
            label="Cumpleaños"
            name="birthday"
            value={owner.birthday}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />

          <Button type="submit" variant="contained" color="primary">
            Guardar
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default OwnerForm;
