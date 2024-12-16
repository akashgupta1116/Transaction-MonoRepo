import { Button } from "./button"

interface AppbarProps {
    user: string;
    onSignIn?: ()=>void;
    onSignOut?: ()=>void
}

export const Appbar = ({
    user,
    onSignIn,
    onSignOut
}: AppbarProps) => {
    return (
        <div className="flex justify-between items-center border-b px-4 border-slate-300 p-2">
            <div className="text-lg ">
                PAYTM
            </div>
            <div>
                <Button onClick={user ? onSignOut : onSignIn}>{user ? "Logout ": "Login"}</Button>
            </div>
        </div>
    )
}
