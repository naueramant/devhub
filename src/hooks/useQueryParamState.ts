import { useCallback, useEffect, useState } from "react";

/**
 * A hook that syncs state with a URL query parameter.
 * Works like useState but persists the value in the URL.
 *
 * @param key - The query parameter key
 * @param defaultValue - The default value when the param is not present
 * @returns A tuple of [value, setValue] similar to useState
 */
export function useQueryParamState(
  key: string,
  defaultValue: string = ""
): [string, (value: string) => void] {
  // Initialize state from URL or default
  const [value, setValue] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get(key) ?? defaultValue;
  });

  // Update URL when value changes
  useEffect(() => {
    const url = new URL(window.location.href);

    if (value === defaultValue || value === "") {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, value);
    }

    // Use replaceState to avoid polluting browser history
    window.history.replaceState({}, "", url.toString());
  }, [key, value, defaultValue]);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setValue(params.get(key) ?? defaultValue);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [key, defaultValue]);

  const setValueWithUrl = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

  return [value, setValueWithUrl];
}

/**
 * A hook that syncs an array state with a URL query parameter.
 * Values are stored as comma-separated strings in the URL.
 *
 * @param key - The query parameter key
 * @returns A tuple of [values, setValues] similar to useState
 */
export function useQueryParamArrayState(
  key: string
): [string[], (value: string[]) => void] {
  // Initialize state from URL or empty array
  const [values, setValues] = useState<string[]>(() => {
    const params = new URLSearchParams(window.location.search);
    const param = params.get(key);
    return param ? param.split(",").filter(Boolean) : [];
  });

  // Update URL when values change
  useEffect(() => {
    const url = new URL(window.location.href);

    if (values.length === 0) {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, values.join(","));
    }

    // Use replaceState to avoid polluting browser history
    window.history.replaceState({}, "", url.toString());
  }, [key, values]);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const param = params.get(key);
      setValues(param ? param.split(",").filter(Boolean) : []);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [key]);

  const setValuesWithUrl = useCallback((newValues: string[]) => {
    setValues(newValues);
  }, []);

  return [values, setValuesWithUrl];
}
