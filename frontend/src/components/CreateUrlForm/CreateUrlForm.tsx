import React, { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { UrlInput, SubmitButton } from "./styles";

export const CreateUrlForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const [inputText, setInputText] = useState("");

  const createMutation = useMutation((data: { longUrl: string }) =>
    axios.post("http://localhost:5000/api/create", data)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.length === 0) return;
    
    try {
      const response = await createMutation.mutateAsync({ longUrl: inputText });
      setInputText("");
      onSubmit();
    } catch (error) {
      console.error("Error creating short url:", error);
    }
  };

  return (
    <>
      <h2>Create new short url</h2>
      <form onSubmit={handleSubmit}>
        <UrlInput
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter long url"
        />
        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </>
  );
};
