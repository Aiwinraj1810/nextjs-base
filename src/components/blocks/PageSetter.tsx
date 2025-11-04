"use client";

import { useEffect } from "react";
import { useApp } from "../AppProvider";

const PageSetter = ({ darkHeader }: { darkHeader: boolean }) => {
  const { setIsDarkHeader } = useApp();

  useEffect(() => {
    setIsDarkHeader(darkHeader);

    return () => {
      setIsDarkHeader(false);
    };
  }, []);

  return <></>;
};

export default PageSetter;
