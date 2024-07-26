"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCw, ShieldAlert, ShieldCheck } from "lucide-react";
import axios from "axios";
import { ServerWithMembersWithProfiles } from "@/types";
import { ScrollArea } from "../ui/scroll-area";
import { UserAvatar } from "../user-avatar";


export const MembersModal = () => {

    const { onOpen, isOpen, onClose, type, data } = useModal();

    const isModalOpen = isOpen && type === 'members';

    const { server } = data as { server: ServerWithMembersWithProfiles };

    const roleIconMap = {
        'GUEST': null,
        'MODERATOR': <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500"/>,
        'ADMIN': <ShieldAlert className="h-4 w-4 ml-2 text-rose-500"/>
    };


    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center">
                        Manage Members
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        {server?.member?.length} Members
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="mt-8 max-h-[420px] pr-6">
                    {server?.member?.map((mem) => (
                        <div key={mem.id} className="flex items-center gap-x-2 mb-6">
                            <UserAvatar src={mem.profile.imageUrl} />
                            <div className="flex flex-col gap-y-1">
                                <div className="text-xs font-semibold flex items-center gap-x-1">
                                    {mem.profile.name}
                                    {roleIconMap[mem.role]}
                                </div>
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}