import "@/styles/globals.css";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import store from "@/redux-toolkit/store/store";
import EventListeners from "@/components/EventListener/EventListener";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App({ Component, pageProps }: AppProps) {

  const queryClient = new QueryClient()

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <EventListeners />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2000
          }}
        />
        <Component {...pageProps} />
      </QueryClientProvider>
    </Provider>
  )
}
