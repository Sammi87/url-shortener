import React from "react";
import { UrlListResponse } from "../../types";
import { UrlListItem } from "../UrlListItem/UrlListItem";
import { ListWrapper } from "./styles";

const getPathFromUrl = (url: string) => {
  return new URL(url).pathname.substring(1);
};

export const UrlList = ({ urlList }: { urlList?: UrlListResponse }) => {
  return (
    <>
      <h2>Your urls</h2>
      <ListWrapper>
        <ul>
          {urlList?.map((urlObject) => (
            <UrlListItem urlObject={urlObject} key={urlObject._id} />
          ))}
        </ul>
      </ListWrapper>
    </>
  );
};
