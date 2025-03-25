import "@/styles/globals.css";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import store from "@/redux-toolkit/store/store";
import EventListeners from "@/components/EventListener/EventListener";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "@/components/Header/Header";

const outfit = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {

  const queryClient = new QueryClient()

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class">
          <EventListeners />
          <Toaster
            richColors
            position="top-center"
            toastOptions={{
              duration: 2000
            }}
          />
          <main className={`${outfit.className}`}>
            <Header />
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  )
}
