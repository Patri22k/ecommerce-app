"use client";

import React, {useEffect} from "react";

export default function useAutoClearError(
  error: string | undefined,
  setFieldErrors: React.Dispatch<React.SetStateAction<{ general?: string }>>
) {
  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setFieldErrors({});
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [error, setFieldErrors]);

  return {error};
}