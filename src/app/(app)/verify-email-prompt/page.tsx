import { getEmailByVerificationTokenID } from "@/lib/sqlc/auth_sql";
import { db } from "@/lib/database";
import { redirect } from "next/navigation";
import { ResendEmailForm } from "@/components/ResendEmailForm";

export const dynamic = "force-dynamic";

export default async function VerifyEmailPage({ searchParams }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    let email: string | undefined | null;
    let verificationTokenID: string | string[] | undefined;
    try {
        verificationTokenID = (await searchParams).id?.toString().trim();
        if (!verificationTokenID) {
            redirect("/login");
        }

        email = (await getEmailByVerificationTokenID(db, {
            id: verificationTokenID
        }))?.email;

        if (!email) {
            redirect("/login");
        }
    } catch (error) {
        redirect("/login");
    }

    return (
        <div className="bg-secondary-200 flex items-center justify-center p-32 flex-grow min-h-screen">
            <div
                className="bg-gray-50 p-8 md:p-12 lg:p-16 rounded-2xl text-gray-700 min-w-[40vw] max-w-[90vw] lg:w-[750px]">
                <h1 className="text-2xl md:text-4xl font-bold">Please verify your email</h1>
                <h2 className="md:text-xl font-medium pt-2">
                    You're almost there! We sent an email to
                    <span className="font-bold text-secondary-600 pl-1.5">{email}</span>.
                </h2>
                <p className="pt-4 lg:pt-6">
                    Just click the link in that email to complete your registration. If you don't see it, you may need
                    to
                    <b className="pl-1.5">check your spam folder</b>.
                </p>
                <p className="pt-6">Still can't find the email?</p>
                <ResendEmailForm email={email} id={verificationTokenID}/>
            </div>
        </div>
    );
}