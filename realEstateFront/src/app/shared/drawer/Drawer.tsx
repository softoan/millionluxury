import * as React from "react";
import { styled, type Theme, type CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import HomeProperty from "../../page/property/Home";
import { PropertyImageForm } from "../../page/property-image-form/PropertyImageForm";
import { PropertyTraceForm } from "../../page/property-trace-form/PropertyTraceForm";
import OwnerForm from "../../page/owner-form/OwnerForm";
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export const MiniDrawer: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const drawerRef = React.useRef<HTMLDivElement | null>(null);

  // Perfil / Avatar
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);

  const [openSubMenu, setOpenSubMenu] = React.useState<string | null>(null);
  const [activePanel, setActivePanel] = React.useState<string | null>(
    "Propietario"
  ); // 👈 nuevo estado

  const toggleDrawer = () => setOpen((prev) => !prev);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        open &&
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  React.useEffect(() => {
    if (!open) setOpenSubMenu(null);
  }, [open]);

  const menuItems = [
    { text: "Propietario", icon: <AccountCircleIcon /> },
    { text: "Propiedades", icon: <HomeIcon /> },
    { text: "Detalle propiedad", icon: <InventoryIcon /> },
    { text: "Hist. propiedad", icon: <AttachMoneyIcon /> },
  ];

  const [height, setHeight] = React.useState<string>(
    window.innerHeight - 65 + "px"
  );
  React.useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight - 65 + "px");
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        ref={drawerRef}
        variant="permanent"
        open={open}
        onMouseLeave={() => setOpen(false)}
        sx={{
          width: open ? drawerWidth : 64,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : 64,
            transition: "all 0.3s ease",
            overflowX: "hidden",
            borderRight: "none",
            boxShadow: open
              ? "4px 0 20px rgba(0,0,0,0.08)"
              : "2px 0 8px rgba(0,0,0,0.04)",
          },
        }}
      >
        {/* Header con perfil */}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pt: 4,
            pb: 1,
            background: "linear-gradient(135deg, #1E3A8A, #3B82F6)",
            color: "#fff",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <IconButton
            onClick={toggleDrawer}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "#fff",
              bgcolor: "rgba(255,255,255,0.15)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
              transition: "all 0.3s ease",
            }}
          >
            {open ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
          {!open && <br />}
          {/* Avatar con glow */}
          <Box
            sx={{
              position: "relative",
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.05) rotate(-2deg)",
                transition: "all 0.3s ease",
              },
            }}
            onClick={handleMenuOpen}
          >
            <HomeIcon
              sx={{ color: "#fff" }}
              style={{
                width: open ? 80 : 50,
                height: open ? 80 : 50,
                color: "#fff",
              }}
            />

            <Box
              sx={{
                position: "absolute",
                top: -6,
                left: -6,
                width: open ? 84 : 62,
                height: open ? 84 : 62,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(59,130,246,0.5) 0%, rgba(59,130,246,0) 70%)",
                animation: "pulseGlow 2s infinite",
                zIndex: -1,
              }}
            />
          </Box>

          {open && (
            <Box sx={{ textAlign: "center", mt: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Inmobiliaria
              </Typography>
            </Box>
          )}
        </Box>

        {/* Menú */}
        <List>
          {menuItems.map((item) => (
            <React.Fragment key={item.text}>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  onClick={() => {
                    const allowedPanels = [
                      "Propietario",
                      "Detalle propiedad",
                      "Hist. propiedad",
                      "Propiedades",
                    ];
                    if (allowedPanels.includes(item.text)) {
                      setActivePanel(item.text);
                    }
                  }}
                  selected={activePanel === item.text}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    borderRadius: "5px",
                    margin: "4px 8px",
                    "&:hover": {
                      backgroundColor: "#1e3a8a21",
                      transform: "scale(1.02)",
                    },
                    "&.Mui-selected": {
                      background: "linear-gradient(135deg, #1E3A8A, #3B82F6)",
                      color: "#fff",
                      "& .MuiListItemIcon-root": { color: "#fff" },
                      "&:hover": {
                        backgroundColor: "#1e3b8aee",
                        transform: "scale(1.03)",
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: activePanel === item.text ? "#fff" : "#1E3A8A",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      opacity: open ? 1 : 0,
                      transition: "opacity 0.3s ease",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Drawer>

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          overflowX: "hidden",
          px: { xs: 1, sm: 2, md: 3 },
          minHeight: height,
        }}
      >
        <div className="container-dash">
          <div className="row">
            {activePanel === "Propietario" && <OwnerForm />}
            {activePanel === "Propiedades" && <HomeProperty />}
            {activePanel === "Detalle propiedad" && <PropertyImageForm />}
            {activePanel === "Hist. propiedad" && <PropertyTraceForm />}
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default MiniDrawer;
