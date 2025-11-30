import { useState, useCallback } from "react";

const LOG_STORAGE_KEY = "apiCallLogs";
const MAX_LOG_ENTRIES = 50;

const normalizePayload = payload => {
  if (!payload) return null;
  if (typeof payload === "string") {
    try {
      return JSON.parse(payload);
    } catch {
      return payload;
    }
  }
  return payload;
};

const mergeOptions = (baseOptions = {}, overrideOptions = {}) => {
  const { headers: baseHeaders = {}, ...restBase } = baseOptions;
  const { headers: overrideHeaders = {}, ...restOverride } = overrideOptions;

  return {
    ...restBase,
    ...restOverride,
    headers: { ...baseHeaders, ...overrideHeaders },
  };
};

const logToStorage = entry => {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    const currentLogs = JSON.parse(localStorage.getItem(LOG_STORAGE_KEY)) || [];
    currentLogs.push(entry);
    const trimmed = currentLogs.slice(-MAX_LOG_ENTRIES);
    localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(trimmed));
  } catch (err) {
    console.warn("Unable to persist API logs", err);
  }
};

function useFetch(defaultConfig = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { url: defaultUrl, options: defaultOptions } = defaultConfig;

  const execute = useCallback(
    async (overrideConfig = {}) => {
      const requestUrl = overrideConfig.url || defaultUrl;
      if (!requestUrl) {
        throw new Error("useFetch requires a request URL");
      }

      const requestOptions = mergeOptions(
        defaultOptions,
        overrideConfig.options
      );
      const payloadForLog =
        overrideConfig.options?.body ?? defaultOptions?.body ?? null;

      setLoading(true);
      setError(null);

      let hasLogged = false;
      const log = status => {
        if (hasLogged) return;
        try {
          logToStorage({
            url: requestUrl,
            status,
            payload: normalizePayload(payloadForLog),
            timestamp: new Date().toISOString(),
          });
        } finally {
          hasLogged = true;
        }
      };

      try {
        const response = await fetch(requestUrl, requestOptions);
        const contentType = response.headers.get("content-type") || "";
        const isJson = contentType.includes("application/json");
        const rawBody = await response.text();
        let responseBody = rawBody || null;
        if (isJson && rawBody) {
          try {
            responseBody = JSON.parse(rawBody);
          } catch {
            responseBody = rawBody;
          }
        }

        log(response.status);

        if (!response.ok) {
          const error = new Error("Request failed");
          error.status = response.status;
          error.response = responseBody;
          throw error;
        }

        setData(responseBody);
        return responseBody;
      } catch (err) {
        log(err.status ?? "NETWORK_ERROR");
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [defaultUrl, defaultOptions]
  );

  return { data, error, loading, execute };
}

export default useFetch;
