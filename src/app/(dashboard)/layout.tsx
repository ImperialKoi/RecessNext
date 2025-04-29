import { cookies } from "next/headers";
import { authorizeSession } from "@/lib/sessions";
import { DashboardProvider } from "@/components/DashboardProvider";
import { DashboardNav } from "@/components/DashboardNav";
import { Toaster } from "@/components/Toaster";
import { getApplicationStatus, getRsvpStatus } from "@/lib/sqlc/application_sql";
import { db } from "@/lib/database";

export default async function Layout({
                                         children,
                                     }: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");
    const user = await authorizeSession(sessionCookie?.value);
    const applicationStatus = await getApplicationStatus(db, {
        userId: user.id
    });
    const rsvpStatus = await getRsvpStatus(db, {
        userId: user.id
    });
    return (
        <>
            <DashboardProvider value={{user, applicationStatus, rsvpStatus: rsvpStatus !== null}}>
                <div className="min-h-screen flex flex-row w-full">
                    <DashboardNav/>
                    <div className="overflow-hidden w-full">
                        {children}
                    </div>
                </div>
            </DashboardProvider>
            <Toaster/>
        </>

    );
}
