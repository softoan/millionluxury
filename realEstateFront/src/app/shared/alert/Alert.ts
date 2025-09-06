// src/alert/Alert.ts
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const Success = (title: string, message: string) => {
    MySwal.fire({
        title: `<div style="font-size:22px; font-weight:bold; color:#1E3A8A;">${title}</div>`,
        html: `<div style="font-size:16px; color:#374151;">${message}</div>`,
        icon: "success",
        background: "#f9fafb",
        color: "#111827",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        toast: true,
        position: "top-end",
    });
};

export const Error = (title: string, message: string) => {
    Swal.fire({
        icon: "error",
        title: title || "Oops...",
        text: message,
        confirmButtonText: "Ok",
        customClass: {
            confirmButton: "custom-ok-button",
        },
        didOpen: () => {
            const button = Swal.getConfirmButton();
            if (button) {
                button.style.background = "linear-gradient(135deg, #1E3A8A, #3B82F6)";
                button.style.color = "#fff";
                button.style.border = "none";
                button.style.borderRadius = "8px";
                button.style.padding = "8px 16px";
                button.style.fontWeight = "bold";
                button.style.border = "1px solid transparent"; // 👈 borde transparente
                button.style.outline = "none"; 
            }
        },
    });
};

export const Warning = (title: string, message: string) => {
    MySwal.fire({
        title: title || "Oops...",
        text: message,
        icon: "warning",
        confirmButtonText: "Entendido",
    });
};