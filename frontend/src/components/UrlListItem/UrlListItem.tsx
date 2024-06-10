import React, { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { EditInput, ListButton } from "./styles";
import { UrlObject } from "../../types";

const getPathFromUrl = (url: string) => {
  return new URL(url).pathname.substring(1);
};

export const UrlListItem = ({ urlObject }: { urlObject: UrlObject }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(urlObject.longUrl);

  const queryClient = useQueryClient();

  const updateMutation = useMutation(
    ({ newLongUrl, hash }: { newLongUrl: string; hash: string }) =>
      axios.patch(`http://localhost:5000/api/update/${hash}`, { newLongUrl }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userData");
      },
    }
  );

  const handleSaveClick = async () => {
    const { _id: id, shortUrl } = urlObject;

    try {
      if (editText !== urlObject.longUrl) {
        const hash = getPathFromUrl(shortUrl);
        await updateMutation.mutateAsync({ newLongUrl: editText, hash });
      }

      setIsEditing(false);

    } catch (error) {
      console.log("Error updating long url");
    }
  };

  return (
    <li
      key={urlObject._id}
      style={{
        fontSize: "14px",
        borderBottom: "1px solid #ddd",
        padding: "6px 0",
      }}
    >
      <p>
        <strong>Short url:</strong>
        <a
          href={urlObject.shortUrl}
          target="_blank"
          style={{ marginLeft: "3px", color: "#f17f1a" }}
        >
          {urlObject.shortUrl}
        </a>
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "90%",
        }}
      >
        {isEditing ? (
          <EditInput
            type="text"
            placeholder="Enter new long url"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        ) : (
          <p>
            <strong>Long url:</strong> {urlObject.longUrl}
          </p>
        )}
        <ListButton
          onClick={() =>
            isEditing ? handleSaveClick() : setIsEditing(true)
          }
        >
          {isEditing ? <span>Save</span> : <span>Edit</span>}
        </ListButton>
      </div>
    </li>
  );
};
