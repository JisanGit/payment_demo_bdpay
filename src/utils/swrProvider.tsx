import { SWRConfig } from "swr";

interface IProps {
  children: React.ReactNode;
}

export const SWRProvider = ({ children }: IProps) => {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
      }}
    >
      {children}
    </SWRConfig>
  );
};
