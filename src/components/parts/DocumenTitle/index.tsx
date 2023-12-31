import React from "react";
import Head from "next/head";

const DocumentTitle = ({ title }: { title: string }) => {
  return (
    <div>
      <Head>
        <title> {title} | Sleek </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    </div>
  );
};

export default DocumentTitle;
