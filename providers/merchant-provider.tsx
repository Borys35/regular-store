import { Merchant } from "@chec/commerce.js/types/merchant";
import { createContext, FC, useContext } from "react";

interface ContextProps {
  merchant: Merchant;
}

interface Props {
  value: ContextProps;
}

const MerchantContext = createContext({} as ContextProps);

export const useMerchant = () => useContext(MerchantContext);

export const MerchantProvider: FC<Props> = ({ children, value }) => {
  return (
    <MerchantContext.Provider value={value}>
      {children}
    </MerchantContext.Provider>
  );
};
