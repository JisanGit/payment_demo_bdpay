import { create } from "zustand";

export const useStore = create((set) => ({
  // ====== auth states and functions ============
  isLogin: null,
  setIsLogin: (data: any) => set({ isLogin: data }),
  cartList: [],
  setCartList: (data: any) => set({ cartList: data }),
  handleCartUpdate: (data: any, count: number) =>
    set((state) => {
      const { cartList } = state;
      const foundIndex = cartList?.findIndex((item) => item.id === data.id);
      if (foundIndex === -1) {
        return { cartList: [...cartList, { ...data, count }] };
      }
      return {
        cartList: cartList.map((item, index) =>
          index === foundIndex
            ? { ...item, count: (item?.count ?? 0) + count }
            : item
        ),
      };
    }),
  removeCartItem: (productId) => {
    set((state) => ({
      cartList: state.cartList.filter((c) => c.id !== productId),
    }));
  },
  handleIncrementDecrement: (data: any, type: "inc" | "dec") =>
    set((state) => {
      const { cartList } = state;
      const newList = cartList.map((item) =>
        item.id === data.id
          ? {
              ...item,
              count:
                type === "inc"
                  ? (item?.count ?? 0) + 1
                  : item?.count > 1
                  ? (item.count ?? 0) - 1
                  : item.count,
            }
          : item
      );
      return { cartList: newList };
    }),
}));
