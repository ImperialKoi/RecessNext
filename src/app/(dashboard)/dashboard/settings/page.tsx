import SettingsForm from "@/components/SettingsForm";
import { cookies } from "next/headers";
import { authorizeSession } from "@/lib/sessions";
import ComingSoon from "@/components/ComingSoon";

export default async function ApplicationPage() {
    // const cookieStore = await cookies();
    // const sessionCookie = cookieStore.get("session");
    // const user = await authorizeSession(sessionCookie?.value);

    return (
        // <div className="max-w-screen-lg m-auto py-[10vh]">
        //     <SettingsForm currentFirstName={user.firstName ?? ""} currentLastName={user.lastName ?? ""}
        //                 loginMethod={user.accountType}/>
        // </div>
        <div className="flex justify-center items-center h-screen">
            <ComingSoon text="In development"/>
        </div>
    );
}