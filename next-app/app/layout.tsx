"use client"
import './globals.css'
import Session from "supertokens-auth-react/recipe/session";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Navbar from "@/components/navbar";
import SuperTokens, {SuperTokensWrapper} from "supertokens-auth-react";
import {useEffect} from "react";

if (typeof window !== 'undefined') {
    SuperTokens.init({
        appInfo: {
            apiDomain: "http://localhost:3000",
            websiteDomain: "http://localhost:3001",
            apiBasePath: "/auth",
            websiteBasePath: "/login",
            appName: "api-test-next",
        },
        recipeList: [
            EmailPassword.init(),
            Session.init()
        ],
    });
}
export default function RootLayout({children}: {
    children: React.ReactNode
}) {

    return (
        <SuperTokensWrapper>
            <html lang="en">
            <body>
            <Navbar/>
            <div className="mx-10">
                {children}
            </div>
            </body>
            </html>
        </SuperTokensWrapper>
    )
}
