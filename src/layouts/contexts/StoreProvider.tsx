import { initializeStore, RootStore } from "@store/index";
import { Provider } from "react-redux";

let store: RootStore | undefined;

/**
 * StoreProvider prevent Store from reloading by hydrating
 */
export function StoreProvider(props: any): JSX.Element {
  store = store ?? initializeStore(props.state);

  return <Provider store={store}>{props.children}</Provider>;
}
