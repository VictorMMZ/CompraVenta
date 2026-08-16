import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8000/api/users", {
            credentials: "include",
            headers: {
                Accept: "application/json"
            }
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error("No autenticado");
                }

                return response.json();
            })
            .then((data) => {
                setUser(data);
            })
            .catch(() => {
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Comprobando sesión...</p>;
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}