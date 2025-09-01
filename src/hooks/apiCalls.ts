/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "src/store";
import { API_BASE_URL, IS_DEMO, IS_PAYMENT } from "src/utils/constants";
import { clearToken } from "src/utils/functions/auth";
import useSWR, { SWRConfiguration } from "swr";

export const apiHandler = async (
  endpoint: string,
  config: AxiosRequestConfig,
  handleError: (data: any) => void,
  handleResponse?: (data: any) => void
) => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
  });
  const lang = localStorage.getItem("i18nextLng");
  const headers = {
    "Content-Type": "application/json",
    "Accept-Language": lang,
  };

  return instance({
    url: `${endpoint}`,
    ...config,
    headers: { ...headers, ...config.headers },
  })
    .then((response) => {
      const dataReturn = response.data;
      if (dataReturn?.status_code === 2000) {
        handleResponse({ ...dataReturn, success: true });
        handleError(null);
        return { ...dataReturn, success: true };
      } else {
        handleError({ ...dataReturn, success: false });
        return { ...dataReturn, success: false };
      }
    })
    .catch((err) => {
      const dataReturn = {
        status: err?.response?.data?.status ?? err?.response?.status,
        success: false,
        message: err?.response?.data?.message ?? err?.message,
      };
      handleError(dataReturn);
      return dataReturn;
    });
};

//  ======== Hook to call API on component render ==========

export const useFetch = (
  endpoint: string,
  config?: AxiosRequestConfig,
  swrConfig?: SWRConfiguration,
  uniqueKey?: string
) => {
  const [error, setError] = useState<any>();

  const handleError = (data: any) => {
    setError(data);
  };
  const fetcher = () => {
    return apiHandler(
      endpoint,
      { method: "GET", ...config },
      handleError,
      () => null
    );
  };
  const response = useSWR(uniqueKey ?? endpoint, fetcher, swrConfig);

  return { ...response, error };
};

export const useApi = (
  endpoint: string,
  config?: AxiosRequestConfig
): [
  (data?: any, rest?: AxiosRequestConfig & { endUrl?: string }) => Promise<any>,
  {
    response: any;
    loading: boolean;
    error: AxiosError;
  }
] => {
  const navigate = useNavigate();
  const { setIsLogin } = useStore((state: any) => state);
  const [response, setResponse] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(undefined);
  const abortControllerRef = useRef(null);

  const handleLogout = () => {
    clearToken();
    navigate("/login");
    setIsLogin(null);
  };

  const handleError = (data: any) => {
    setError(data);
  };
  const handleResponse = (data: any) => {
    setResponse(data);
  };
  const loadQuery = async (
    data?: any,
    rest?: AxiosRequestConfig & { endUrl?: string }
  ) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    try {
      if (!endpoint && !rest?.endUrl) return;
      setLoading(true);
      const res = await apiHandler(
        `${endpoint}${rest?.endUrl ?? ""}`,
        {
          method: "GET",
          ...config,
          data: data,
          signal: controller.signal,
          ...rest,
        },
        handleError,
        handleResponse
      );
      setLoading(false);
      if (res?.error_code === 2020) {
        handleLogout();
      }
      return res;
    } catch (error) {
      setLoading(false);
    }
  };

  return [
    loadQuery,
    {
      response,
      loading,
      error,
    },
  ];
};
