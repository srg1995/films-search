import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // 👈 import router
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import App from "./App.jsx";
import Detail from "./pages/Detail.jsx"; // 👈 importa tu página de detalle

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/film/:id" element={<Detail />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
);
