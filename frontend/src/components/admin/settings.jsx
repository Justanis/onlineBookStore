import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const mockAdminSettingsResponse = {
    success: true,
    admin: {
        id: "admin-1",
        email: "admin@bookstore.com",
    },
};

export default function AdminSettings() {
    const [email, setEmail] = useState(mockAdminSettingsResponse.admin.email);
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className="m-6 space-y-8">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <h2 className="text-3xl font-semibold">Settings</h2>
            </div>

            <div className="rounded-[36px] border border-violet-400/60 bg-neutral-950 p-8 text-white shadow-[0_0_0_1px_rgba(167,139,250,0.18)]">
                <form className="grid gap-8 lg:grid-cols-[220px_1fr]" onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center gap-4 text-center">
                        <div className="h-36 w-36 rounded-full border-4 border-white/70 bg-neutral-900" />
                        <p className="text-lg font-semibold">Admin</p>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="admin-email" className="text-sm font-medium text-white/80">
                                email
                            </Label>
                            <Input
                                id="admin-email"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                className="h-10 border-white/40 bg-transparent text-white placeholder:text-white/40"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="admin-password" className="text-sm font-medium text-white/80">
                                Password
                            </Label>
                            <Input
                                id="admin-password"
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                className="h-10 border-white/40 bg-transparent text-white placeholder:text-white/40"
                                placeholder="••••••••"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="h-11 w-full bg-sky-500 text-base font-semibold text-white hover:bg-sky-400"
                        >
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}