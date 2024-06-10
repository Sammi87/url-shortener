import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { UrlListResponse } from "./types";
import { UrlList } from "./components/UrlList/UrlList";
import { CreateUrlForm } from "./components/CreateUrlForm/CreateUrlForm";

export const App = () => {
  const { data, isLoading, isError, refetch } = useQuery<UrlListResponse>(
    "userData",
    async () => {
      const { data } = await axios.get("http://localhost:5000/api/list");
      return data;
    }
  );

  console.log(data);
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#eee",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          width: "100%",
          padding: "20px",
          boxShadow:
            "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
          background: "#fff",
        }}
      >
        <h1 style={{ marginBottom: "45px" }}>URL SHORTENER</h1>
        <div style={{ marginBottom: "40px" }}>
          <CreateUrlForm onSubmit={() => refetch()} />
        </div>
        <UrlList urlList={data} />
      </div>
    </div>
  );
};
