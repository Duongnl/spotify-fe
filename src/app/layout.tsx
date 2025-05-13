import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/shared/header";
import "@fortawesome/fontawesome-free/css/all.min.css"
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Row, Col } from "antd";
import Sidebar from "@/components/shared/sidebar/sidebar";
import MainLayout from "./main_layout";
import 'rc-slider/assets/index.css';
import { PlaybarProvider } from "@/context/playbar-context";
import { UserProvider } from "@/context/user-context";
import { SidebarProvider } from "@/context/sidebar-context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueuebarProvider } from "@/context/queuebar-context";
import NextTopLoader from "nextjs-toploader";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Spotify - clone",
  description: "A clone of Spotify built with Next.js",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/Spotify_icon.png", // Đường dẫn tới file icon trong public
    }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <body>
          <header>
            <NextTopLoader
              color="#00c853"
              initialPosition={0.08}
              crawlSpeed={50}
              height={3}
              crawl={true}
              easing="ease"
              speed={50}
              zIndex={1600}
              showAtBottom={false}
            />
          </header>

          <AntdRegistry>
            <UserProvider>
              <QueuebarProvider>
                <PlaybarProvider>
                  <SidebarProvider>
                    <MainLayout>
                      {children}

                      <ToastContainer
                        position="bottom-center"
                        autoClose={1200}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                      />
                    </MainLayout>
                  </SidebarProvider>
                </PlaybarProvider>
              </QueuebarProvider>
            </UserProvider>
          </AntdRegistry>


        </body>


      </body>
    </html>
  );
}
